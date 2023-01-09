"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceSound(IOCore) {
    //Build references:
    this.IOCore = IOCore;
}
GameBoyAdvanceSound.prototype.initialize = function () {
    this.coreExposed = this.IOCore.coreExposed;
    this.dmaChannel1 = this.IOCore.dmaChannel1;
    this.dmaChannel2 = this.IOCore.dmaChannel2;
    //Did the emulator core initialize us for output yet?
    this.preprocessInitialization(false);
    //Initialize start:
    this.audioTicks = 0;
    this.initializeAudioStartState();
}
GameBoyAdvanceSound.prototype.initializeOutput = function (enabled, audioResamplerFirstPassFactor) {
    this.preprocessInitialization(enabled);
    this.audioIndex = 0;
    this.downsampleInputLeft = 0;
    this.downsampleInputRight = 0;
    this.audioResamplerFirstPassFactor = audioResamplerFirstPassFactor | 0;
}
GameBoyAdvanceSound.prototype.initializeAudioStartState = function () {
    //NOTE: NR 60-63 never get reset in audio halting:
    this.nr60 = 0;
    this.nr61 = 0;
    this.nr62 = (this.IOCore.BIOSFound && !this.IOCore.settings.SKIPBoot) ? 0 : 0xFF;
    this.nr63 = (this.IOCore.BIOSFound && !this.IOCore.settings.SKIPBoot) ? 0 : 0x2;
    this.soundMasterEnabled = (!this.IOCore.BIOSFound || this.IOCore.settings.SKIPBoot);
    this.mixerSoundBIAS = (this.IOCore.BIOSFound && !this.IOCore.settings.SKIPBoot) ? 0 : 0x200;
    this.channel1 = new GameBoyAdvanceChannel1Synth(this);
    this.channel2 = new GameBoyAdvanceChannel2Synth(this);
    this.channel3 = new GameBoyAdvanceChannel3Synth(this);
    this.channel4 = new GameBoyAdvanceChannel4Synth(this);
    this.CGBMixerOutputCacheLeft = 0;
    this.CGBMixerOutputCacheLeftFolded = 0;
    this.CGBMixerOutputCacheRight = 0;
    this.CGBMixerOutputCacheRightFolded = 0;
    this.AGBDirectSoundATimer = 0;
    this.AGBDirectSoundBTimer = 0;
    this.AGBDirectSoundA = 0;
    this.AGBDirectSoundAFolded = 0;
    this.AGBDirectSoundB = 0;
    this.AGBDirectSoundBFolded = 0;
    this.AGBDirectSoundAShifter = 0;
    this.AGBDirectSoundBShifter = 0;
    this.AGBDirectSoundALeftCanPlay = false;
    this.AGBDirectSoundBLeftCanPlay = false;
    this.AGBDirectSoundARightCanPlay = false;
    this.AGBDirectSoundBRightCanPlay = false;
    this.CGBOutputRatio = 2;
    this.FIFOABuffer = new GameBoyAdvanceFIFO();
    this.FIFOBBuffer = new GameBoyAdvanceFIFO();
    this.audioDisabled();       //Clear legacy PAPU registers:
}
GameBoyAdvanceSound.prototype.audioDisabled = function () {
    this.channel1.disabled();
    this.channel2.disabled();
    this.channel3.disabled();
    this.channel4.disabled();
    //Clear FIFO:
    this.AGBDirectSoundAFIFOClear();
    this.AGBDirectSoundBFIFOClear();
    //Clear NR50:
    this.nr50 = 0;
    this.VinLeftChannelMasterVolume = 1;
    this.VinRightChannelMasterVolume = 1;
    //Clear NR51:
    this.nr51 = 0;
    this.rightChannel1 = false;
    this.rightChannel2 = false;
    this.rightChannel3 = false;
    this.rightChannel4 = false;
    this.leftChannel1 = false;
    this.leftChannel2 = false;
    this.leftChannel3 = false;
    this.leftChannel4 = false;
    //Clear NR52:
    this.nr52 = 0;
    this.soundMasterEnabled = false;
    this.mixerOutputCacheLeft = this.mixerSoundBIAS | 0;
    this.mixerOutputCacheRight = this.mixerSoundBIAS | 0;
    this.audioClocksUntilNextEventCounter = 0;
    this.audioClocksUntilNextEvent = 0;
    this.sequencePosition = 0;
    this.sequencerClocks = 0x8000;
    this.PWMWidth = 0x200;
    this.PWMWidthOld = 0x200;
    this.PWMWidthShadow = 0x200;
    this.PWMBitDepthMask = 0x3FE;
    this.PWMBitDepthMaskShadow = 0x3FE;
    this.channel1.outputLevelCache();
    this.channel2.outputLevelCache();
    this.channel3.updateCache();
    this.channel4.updateCache();
}
GameBoyAdvanceSound.prototype.audioEnabled = function () {
    //Set NR52:
    this.nr52 = 0x80;
    this.soundMasterEnabled = true;
}
GameBoyAdvanceSound.prototype.addClocks = function (clocks) {
    clocks = clocks | 0;
    this.audioTicks = ((this.audioTicks | 0) + (clocks | 0)) | 0;
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceSound.prototype.generateAudioReal = function (numSamples) {
        numSamples = numSamples | 0;
        var multiplier = 0;
        if (this.soundMasterEnabled && !this.IOCore.isStopped()) {
            for (var clockUpTo = 0; (numSamples | 0) > 0;) {
                clockUpTo = Math.min(this.PWMWidth | 0, numSamples | 0) | 0;
                this.PWMWidth = ((this.PWMWidth | 0) - (clockUpTo | 0)) | 0;
                numSamples = ((numSamples | 0) - (clockUpTo | 0)) | 0;
                while ((clockUpTo | 0) > 0) {
                    multiplier = Math.min(clockUpTo | 0, ((this.audioResamplerFirstPassFactor | 0) - (this.audioIndex | 0)) | 0) | 0;
                    clockUpTo = ((clockUpTo | 0) - (multiplier | 0)) | 0;
                    this.audioIndex = ((this.audioIndex | 0) + (multiplier | 0)) | 0;
                    this.downsampleInputLeft = ((this.downsampleInputLeft | 0) + Math.imul(this.mixerOutputCacheLeft | 0, multiplier | 0)) | 0;
                    this.downsampleInputRight = ((this.downsampleInputRight | 0) + Math.imul(this.mixerOutputCacheRight | 0, multiplier | 0)) | 0;
                    if ((this.audioIndex | 0) == (this.audioResamplerFirstPassFactor | 0)) {
                        this.audioIndex = 0;
                        this.coreExposed.outputAudio(this.downsampleInputLeft | 0, this.downsampleInputRight | 0);
                        this.downsampleInputLeft = 0;
                        this.downsampleInputRight = 0;
                    }
                }
                if ((this.PWMWidth | 0) == 0) {
                    this.computeNextPWMInterval();
                    this.PWMWidthOld = this.PWMWidthShadow | 0;
                    this.PWMWidth = this.PWMWidthShadow | 0;
                }
            }
        }
        else {
            //SILENT OUTPUT:
            while ((numSamples | 0) > 0) {
                multiplier = Math.min(numSamples | 0, ((this.audioResamplerFirstPassFactor | 0) - (this.audioIndex | 0)) | 0) | 0;
                numSamples = ((numSamples | 0) - (multiplier | 0)) | 0;
                this.audioIndex = ((this.audioIndex | 0) + (multiplier | 0)) | 0;
                if ((this.audioIndex | 0) == (this.audioResamplerFirstPassFactor | 0)) {
                    this.audioIndex = 0;
                    this.coreExposed.outputAudio(this.downsampleInputLeft | 0, this.downsampleInputRight | 0);
                    this.downsampleInputLeft = 0;
                    this.downsampleInputRight = 0;
                }
            }
        }
    }
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceSound.prototype.generateAudioReal = function (numSamples) {
        var multiplier = 0;
        if (this.soundMasterEnabled && !this.IOCore.isStopped()) {
            for (var clockUpTo = 0; numSamples > 0;) {
                clockUpTo = Math.min(this.PWMWidth, numSamples);
                this.PWMWidth = this.PWMWidth - clockUpTo;
                numSamples -= clockUpTo;
                while (clockUpTo > 0) {
                    multiplier = Math.min(clockUpTo, this.audioResamplerFirstPassFactor - this.audioIndex);
                    clockUpTo -= multiplier;
                    this.audioIndex += multiplier;
                    this.downsampleInputLeft += this.mixerOutputCacheLeft * multiplier;
                    this.downsampleInputRight += this.mixerOutputCacheRight * multiplier;
                    if (this.audioIndex == this.audioResamplerFirstPassFactor) {
                        this.audioIndex = 0;
                        this.coreExposed.outputAudio(this.downsampleInputLeft, this.downsampleInputRight);
                        this.downsampleInputLeft = 0;
                        this.downsampleInputRight = 0;
                    }
                }
                if (this.PWMWidth == 0) {
                    this.computeNextPWMInterval();
                    this.PWMWidthOld = this.PWMWidthShadow;
                    this.PWMWidth = this.PWMWidthShadow;
                }
            }
        }
        else {
            //SILENT OUTPUT:
            while (numSamples > 0) {
                multiplier = Math.min(numSamples, this.audioResamplerFirstPassFactor - this.audioIndex);
                numSamples -= multiplier;
                this.audioIndex += multiplier;
                if (this.audioIndex == this.audioResamplerFirstPassFactor) {
                    this.audioIndex = 0;
                    this.coreExposed.outputAudio(this.downsampleInputLeft, this.downsampleInputRight);
                    this.downsampleInputLeft = 0;
                    this.downsampleInputRight = 0;
                }
            }
        }
    }
}
//Generate audio, but don't actually output it (Used for when sound is disabled by user/browser):
GameBoyAdvanceSound.prototype.generateAudioFake = function (numSamples) {
    numSamples = numSamples | 0;
    if (this.soundMasterEnabled && !this.IOCore.isStopped()) {
        for (var clockUpTo = 0; (numSamples | 0) > 0;) {
            clockUpTo = Math.min(this.PWMWidth | 0, numSamples | 0) | 0;
            this.PWMWidth = ((this.PWMWidth | 0) - (clockUpTo | 0)) | 0;
            numSamples = ((numSamples | 0) - (clockUpTo | 0)) | 0;
            if ((this.PWMWidth | 0) == 0) {
                this.computeNextPWMInterval();
                this.PWMWidthOld = this.PWMWidthShadow | 0;
                this.PWMWidth = this.PWMWidthShadow | 0;
            }
        }
    }
}
GameBoyAdvanceSound.prototype.preprocessInitialization = function (audioInitialized) {
    if (audioInitialized) {
        this.generateAudio = this.generateAudioReal;
        this.audioInitialized = true;
    }
    else {
        this.generateAudio = this.generateAudioFake;
        this.audioInitialized = false;
    }
}
GameBoyAdvanceSound.prototype.audioJIT = function () {
    //Audio Sample Generation Timing:
    this.generateAudio(this.audioTicks | 0);
    this.audioTicks = 0;
}
GameBoyAdvanceSound.prototype.computeNextPWMInterval = function () {
    //Clock down the PSG system:
    for (var numSamples = this.PWMWidthOld | 0, clockUpTo = 0; (numSamples | 0) > 0; numSamples = ((numSamples | 0) - 1) | 0) {
        clockUpTo = Math.min(this.audioClocksUntilNextEventCounter | 0, this.sequencerClocks | 0, numSamples | 0) | 0;
        this.audioClocksUntilNextEventCounter = ((this.audioClocksUntilNextEventCounter | 0) - (clockUpTo | 0)) | 0;
        this.sequencerClocks = ((this.sequencerClocks | 0) - (clockUpTo | 0)) | 0;
        numSamples = ((numSamples | 0) - (clockUpTo | 0)) | 0;
        if ((this.sequencerClocks | 0) == 0) {
            this.audioComputeSequencer();
            this.sequencerClocks = 0x8000;
        }
        if ((this.audioClocksUntilNextEventCounter | 0) == 0) {
            this.computeAudioChannels();
        }
    }
    //Copy the new bit-depth mask for the next counter interval:
    this.PWMBitDepthMask = this.PWMBitDepthMaskShadow | 0;
    //Compute next sample for the PWM output:
    this.channel1.outputLevelCache();
    this.channel2.outputLevelCache();
    this.channel3.updateCache();
    this.channel4.updateCache();
    this.CGBMixerOutputLevelCache();
    this.mixerOutputLevelCache();
}
GameBoyAdvanceSound.prototype.audioComputeSequencer = function () {
    switch (this.sequencePosition++) {
        case 0:
            this.clockAudioLength();
            break;
        case 2:
            this.clockAudioLength();
            this.channel1.clockAudioSweep();
            break;
        case 4:
            this.clockAudioLength();
            break;
        case 6:
            this.clockAudioLength();
            this.channel1.clockAudioSweep();
            break;
        case 7:
            this.clockAudioEnvelope();
            this.sequencePosition = 0;
    }
}
GameBoyAdvanceSound.prototype.clockAudioLength = function () {
    //Channel 1:
    this.channel1.clockAudioLength();
    //Channel 2:
    this.channel2.clockAudioLength();
    //Channel 3:
    this.channel3.clockAudioLength();
    //Channel 4:
    this.channel4.clockAudioLength();
}
GameBoyAdvanceSound.prototype.clockAudioEnvelope = function () {
    //Channel 1:
    this.channel1.clockAudioEnvelope();
    //Channel 2:
    this.channel2.clockAudioEnvelope();
    //Channel 4:
    this.channel4.clockAudioEnvelope();
}
GameBoyAdvanceSound.prototype.computeAudioChannels = function () {
    //Clock down the four audio channels to the next closest audio event:
    this.channel1.FrequencyCounter = ((this.channel1.FrequencyCounter | 0) - (this.audioClocksUntilNextEvent | 0)) | 0;
    this.channel2.FrequencyCounter = ((this.channel2.FrequencyCounter | 0) - (this.audioClocksUntilNextEvent | 0)) | 0;
    this.channel3.counter = ((this.channel3.counter | 0) - (this.audioClocksUntilNextEvent | 0)) | 0;
    this.channel4.counter = ((this.channel4.counter | 0) - (this.audioClocksUntilNextEvent | 0)) | 0;
    //Channel 1 counter:
    this.channel1.computeAudioChannel();
    //Channel 2 counter:
    this.channel2.computeAudioChannel();
    //Channel 3 counter:
    this.channel3.computeAudioChannel();
    //Channel 4 counter:
    this.channel4.computeAudioChannel();
    //Find the number of clocks to next closest counter event:
    this.audioClocksUntilNextEventCounter = this.audioClocksUntilNextEvent = Math.min(this.channel1.FrequencyCounter | 0, this.channel2.FrequencyCounter | 0, this.channel3.counter | 0, this.channel4.counter | 0) | 0;
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceSound.prototype.CGBMixerOutputLevelCache = function () {
        this.CGBMixerOutputCacheLeft = Math.imul(((this.channel1.currentSampleLeftTrimary | 0) + (this.channel2.currentSampleLeftTrimary | 0) + (this.channel3.currentSampleLeftSecondary | 0) + (this.channel4.currentSampleLeftSecondary | 0)) | 0, this.VinLeftChannelMasterVolume | 0) | 0;
        this.CGBMixerOutputCacheRight = Math.imul(((this.channel1.currentSampleRightTrimary | 0) + (this.channel2.currentSampleRightTrimary | 0) + (this.channel3.currentSampleRightSecondary | 0) + (this.channel4.currentSampleRightSecondary | 0)) | 0, this.VinRightChannelMasterVolume | 0) | 0;
        this.CGBFolder();
    }
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceSound.prototype.CGBMixerOutputLevelCache = function () {
        this.CGBMixerOutputCacheLeft = (this.channel1.currentSampleLeftTrimary + this.channel2.currentSampleLeftTrimary + this.channel3.currentSampleLeftSecondary + this.channel4.currentSampleLeftSecondary) * this.VinLeftChannelMasterVolume;
        this.CGBMixerOutputCacheRight = (this.channel1.currentSampleRightTrimary + this.channel2.currentSampleRightTrimary + this.channel3.currentSampleRightSecondary + this.channel4.currentSampleRightSecondary) * this.VinRightChannelMasterVolume;
        this.CGBFolder();
    }
}
GameBoyAdvanceSound.prototype.writeWAVE8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.channel3.writeWAVE8(address | 0, data | 0);
}
GameBoyAdvanceSound.prototype.readWAVE8 = function (address) {
    address = address | 0;
    this.IOCore.updateTimerClocking();
    return this.channel3.readWAVE8(address | 0) | 0;
}
GameBoyAdvanceSound.prototype.writeWAVE16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.channel3.writeWAVE16(address >> 1, data | 0);
}
GameBoyAdvanceSound.prototype.readWAVE16 = function (address) {
    address = address | 0;
    this.IOCore.updateTimerClocking();
    return this.channel3.readWAVE16(address >> 1) | 0;
}
GameBoyAdvanceSound.prototype.writeWAVE32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.channel3.writeWAVE32(address >> 2, data | 0);
}
GameBoyAdvanceSound.prototype.readWAVE32 = function (address) {
    address = address | 0;
    this.IOCore.updateTimerClocking();
    return this.channel3.readWAVE32(address >> 2) | 0;
}
GameBoyAdvanceSound.prototype.writeFIFOA8 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.FIFOABuffer.push8(data | 0);
    this.checkFIFOAPendingSignal();
}
GameBoyAdvanceSound.prototype.writeFIFOB8 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.FIFOBBuffer.push8(data | 0);
    this.checkFIFOBPendingSignal();
}
GameBoyAdvanceSound.prototype.writeFIFOA16 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.FIFOABuffer.push16(data | 0);
    this.checkFIFOAPendingSignal();
}
GameBoyAdvanceSound.prototype.writeFIFOB16 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.FIFOBBuffer.push16(data | 0);
    this.checkFIFOBPendingSignal();
}
GameBoyAdvanceSound.prototype.writeFIFOA32 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.FIFOABuffer.push32(data | 0);
    this.checkFIFOAPendingSignal();
}
GameBoyAdvanceSound.prototype.writeFIFOB32 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.FIFOBBuffer.push32(data | 0);
    this.checkFIFOBPendingSignal();
}
GameBoyAdvanceSound.prototype.checkFIFOAPendingSignal = function () {
    if (this.FIFOABuffer.requestingDMA()) {
        this.dmaChannel1.soundFIFOARequest();
    }
}
GameBoyAdvanceSound.prototype.checkFIFOBPendingSignal = function () {
    if (this.FIFOBBuffer.requestingDMA()) {
        this.dmaChannel2.soundFIFOBRequest();
    }
}
GameBoyAdvanceSound.prototype.AGBDirectSoundAFIFOClear = function () {
    this.FIFOABuffer.clear();
    this.AGBDirectSoundATimerIncrement();
}
GameBoyAdvanceSound.prototype.AGBDirectSoundBFIFOClear = function () {
    this.FIFOBBuffer.clear();
    this.AGBDirectSoundBTimerIncrement();
}
GameBoyAdvanceSound.prototype.AGBDirectSoundTimer0ClockTick = function () {
    this.audioJIT();
    if (this.soundMasterEnabled) {
        if ((this.AGBDirectSoundATimer | 0) == 0) {
            this.AGBDirectSoundATimerIncrement();
        }
        if ((this.AGBDirectSoundBTimer | 0) == 0) {
            this.AGBDirectSoundBTimerIncrement();
        }
    }
}
GameBoyAdvanceSound.prototype.AGBDirectSoundTimer1ClockTick = function () {
    this.audioJIT();
    if (this.soundMasterEnabled) {
        if ((this.AGBDirectSoundATimer | 0) == 1) {
            this.AGBDirectSoundATimerIncrement();
        }
        if ((this.AGBDirectSoundBTimer | 0) == 1) {
            this.AGBDirectSoundBTimerIncrement();
        }
    }
}
GameBoyAdvanceSound.prototype.nextFIFOAEventTime = function () {
    var nextEventTime = 0x7FFFFFFF;
    if (this.soundMasterEnabled) {
        if (!this.FIFOABuffer.requestingDMA()) {
            var samplesUntilDMA = this.FIFOABuffer.samplesUntilDMATrigger() | 0;
            if ((this.AGBDirectSoundATimer | 0) == 0) {
                nextEventTime = this.IOCore.timer.nextTimer0Overflow(samplesUntilDMA | 0) | 0;
            }
            else {
                nextEventTime = this.IOCore.timer.nextTimer1Overflow(samplesUntilDMA | 0) | 0;
            }
        }
        else {
            nextEventTime = 0;
        }
    }
    return nextEventTime | 0;
}
GameBoyAdvanceSound.prototype.nextFIFOBEventTime = function () {
    var nextEventTime = 0x7FFFFFFF;
    if (this.soundMasterEnabled) {
        if (!this.FIFOBBuffer.requestingDMA()) {
            var samplesUntilDMA = this.FIFOBBuffer.samplesUntilDMATrigger() | 0;
            if ((this.AGBDirectSoundBTimer | 0) == 0) {
                nextEventTime = this.IOCore.timer.nextTimer0Overflow(samplesUntilDMA | 0) | 0;
            }
            else {
                nextEventTime = this.IOCore.timer.nextTimer1Overflow(samplesUntilDMA | 0) | 0;
            }
        }
        else {
            nextEventTime = 0;
        }
    }
    return nextEventTime | 0;
}
GameBoyAdvanceSound.prototype.AGBDirectSoundATimerIncrement = function () {
    this.AGBDirectSoundA = this.FIFOABuffer.shift() | 0;
    this.checkFIFOAPendingSignal();
    this.AGBFIFOAFolder();
}
GameBoyAdvanceSound.prototype.AGBDirectSoundBTimerIncrement = function () {
    this.AGBDirectSoundB = this.FIFOBBuffer.shift() | 0;
    this.checkFIFOBPendingSignal();
    this.AGBFIFOBFolder();
}
GameBoyAdvanceSound.prototype.AGBFIFOAFolder = function () {
    this.AGBDirectSoundAFolded = this.AGBDirectSoundA >> (this.AGBDirectSoundAShifter | 0);
}
GameBoyAdvanceSound.prototype.AGBFIFOBFolder = function () {
    this.AGBDirectSoundBFolded = this.AGBDirectSoundB >> (this.AGBDirectSoundBShifter | 0);
}
GameBoyAdvanceSound.prototype.CGBFolder = function () {
    this.CGBMixerOutputCacheLeftFolded = (this.CGBMixerOutputCacheLeft << (this.CGBOutputRatio | 0)) >> 1;
    this.CGBMixerOutputCacheRightFolded = (this.CGBMixerOutputCacheRight << (this.CGBOutputRatio | 0)) >> 1;
}
GameBoyAdvanceSound.prototype.mixerOutputLevelCache = function () {
    this.mixerOutputCacheLeft = Math.min(Math.max((((this.AGBDirectSoundALeftCanPlay) ? (this.AGBDirectSoundAFolded | 0) : 0) +
    ((this.AGBDirectSoundBLeftCanPlay) ? (this.AGBDirectSoundBFolded | 0) : 0) +
    (this.CGBMixerOutputCacheLeftFolded | 0) + (this.mixerSoundBIAS | 0)) | 0, 0) | 0, 0x3FF) & this.PWMBitDepthMask;
    this.mixerOutputCacheRight = Math.min(Math.max((((this.AGBDirectSoundARightCanPlay) ? (this.AGBDirectSoundAFolded | 0) : 0) +
    ((this.AGBDirectSoundBRightCanPlay) ? (this.AGBDirectSoundBFolded | 0) : 0) +
    (this.CGBMixerOutputCacheRightFolded | 0) + (this.mixerSoundBIAS | 0)) | 0, 0) | 0, 0x3FF) & this.PWMBitDepthMask;
}
GameBoyAdvanceSound.prototype.setNR52 = function (data) {
    data = data | 0;
    this.nr52 = data | this.nr52;
}
GameBoyAdvanceSound.prototype.unsetNR52 = function (data) {
    data = data | 0;
    this.nr52 = data & this.nr52;
}
GameBoyAdvanceSound.prototype.readSOUND1CNT8_0 = function () {
    //NR10:
    return this.channel1.readSOUND1CNT8_0() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND1CNT8_0 = function (data) {
    //NR10:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.IOCore.updateTimerClocking();
        this.audioJIT();
        this.channel1.writeSOUND1CNT8_0(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND1CNT8_2 = function () {
    //NR11:
    return this.channel1.readSOUND1CNT8_2() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND1CNT8_2 = function (data) {
    //NR11:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.IOCore.updateTimerClocking();
        this.audioJIT();
        this.channel1.writeSOUND1CNT8_2(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND1CNT8_3 = function () {
    //NR12:
    return this.channel1.readSOUND1CNT8_3() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND1CNT8_3 = function (data) {
    //NR12:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.IOCore.updateTimerClocking();
        this.audioJIT();
        this.channel1.writeSOUND1CNT8_3(data | 0);
    }
}
GameBoyAdvanceSound.prototype.writeSOUND1CNT16 = function (data) {
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.IOCore.updateTimerClocking();
        this.audioJIT();
        //NR11:
        this.channel1.writeSOUND1CNT8_2(data | 0);
        //NR12:
        this.channel1.writeSOUND1CNT8_3(data >> 8);
    }
}
GameBoyAdvanceSound.prototype.writeSOUND1CNT32 = function (data) {
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.IOCore.updateTimerClocking();
        this.audioJIT();
        //NR10:
        this.channel1.writeSOUND1CNT8_0(data | 0);
        //NR11:
        this.channel1.writeSOUND1CNT8_2(data >> 16);
        //NR12:
        this.channel1.writeSOUND1CNT8_3(data >> 24);
    }
}
GameBoyAdvanceSound.prototype.writeSOUND1CNT_X0 = function (data) {
    //NR13:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel1.writeSOUND1CNT_X0(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND1CNT_X = function () {
    //NR14:
    return this.channel1.readSOUND1CNT_X() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND1CNT_X1 = function (data) {
    //NR14:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel1.writeSOUND1CNT_X1(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND2CNT_L0 = function () {
    //NR21:
    return this.channel2.readSOUND2CNT_L0() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND2CNT_L0 = function (data) {
    data = data | 0;
    //NR21:
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel2.writeSOUND2CNT_L0(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND2CNT_L1 = function () {
    //NR22:
    return this.channel2.readSOUND2CNT_L1() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND2CNT_L1 = function (data) {
    data = data | 0;
    //NR22:
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel2.writeSOUND2CNT_L1(data | 0);
    }
}
GameBoyAdvanceSound.prototype.writeSOUND2CNT_H0 = function (data) {
    data = data | 0;
    //NR23:
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel2.writeSOUND2CNT_H0(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND2CNT_H = function () {
    //NR24:
    return this.channel2.readSOUND2CNT_H() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND2CNT_H1 = function (data) {
    data = data | 0;
    //NR24:
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel2.writeSOUND2CNT_H1(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND3CNT_L = function () {
    //NR30:
    return this.channel3.readSOUND3CNT_L() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND3CNT_L = function (data) {
    //NR30:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel3.writeSOUND3CNT_L(data | 0);
    }
}
GameBoyAdvanceSound.prototype.writeSOUND3CNT_H0 = function (data) {
    //NR31:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel3.writeSOUND3CNT_H0(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND3CNT_H = function () {
    //NR32:
    return this.channel3.readSOUND3CNT_H() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND3CNT_H1 = function (data) {
    //NR32:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel3.writeSOUND3CNT_H1(data | 0);
    }
}
GameBoyAdvanceSound.prototype.writeSOUND3CNT_X0 = function (data) {
    //NR33:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel3.writeSOUND3CNT_X0(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND3CNT_X = function () {
    //NR34:
    return this.channel3.readSOUND3CNT_X() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND3CNT_X1 = function (data) {
    //NR34:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel3.writeSOUND3CNT_X1(data | 0);
    }
}
GameBoyAdvanceSound.prototype.writeSOUND4CNT_L0 = function (data) {
    //NR41:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel4.writeSOUND4CNT_L0(data | 0);
    }
}
GameBoyAdvanceSound.prototype.writeSOUND4CNT_L1 = function (data) {
    //NR42:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel4.writeSOUND4CNT_L1(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND4CNT_L = function () {
    //NR42:
    return this.channel4.readSOUND4CNT_L() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND4CNT_H0 = function (data) {
    //NR43:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel4.writeSOUND4CNT_H0(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND4CNT_H0 = function () {
    //NR43:
    return this.channel4.readSOUND4CNT_H0() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUND4CNT_H1 = function (data) {
    //NR44:
    data = data | 0;
    if (this.soundMasterEnabled) {
        this.audioJIT();
        this.channel4.writeSOUND4CNT_H1(data | 0);
    }
}
GameBoyAdvanceSound.prototype.readSOUND4CNT_H1 = function () {
    //NR44:
    return this.channel4.readSOUND4CNT_H1() | 0;
}
GameBoyAdvanceSound.prototype.writeSOUNDCNT_L0 = function (data) {
    //NR50:
    data = data | 0;
    if (this.soundMasterEnabled && (this.nr50 | 0) != (data | 0)) {
        this.audioJIT();
        this.nr50 = data | 0;
        this.VinLeftChannelMasterVolume = (((data >> 4) & 0x07) + 1) | 0;
        this.VinRightChannelMasterVolume = ((data & 0x07) + 1) | 0;
    }
}
GameBoyAdvanceSound.prototype.readSOUNDCNT_L0 = function () {
    //NR50:
    return 0x88 | this.nr50;
}
GameBoyAdvanceSound.prototype.writeSOUNDCNT_L1 = function (data) {
    //NR51:
    data = data | 0;
    if (this.soundMasterEnabled && (this.nr51 | 0) != (data | 0)) {
        this.audioJIT();
        this.nr51 = data | 0;
        this.rightChannel1 = ((data & 0x01) == 0x01);
        this.rightChannel2 = ((data & 0x02) == 0x02);
        this.rightChannel3 = ((data & 0x04) == 0x04);
        this.rightChannel4 = ((data & 0x08) == 0x08);
        this.leftChannel1 = ((data & 0x10) == 0x10);
        this.leftChannel2 = ((data & 0x20) == 0x20);
        this.leftChannel3 = ((data & 0x40) == 0x40);
        this.leftChannel4 = (data > 0x7F);
    }
}
GameBoyAdvanceSound.prototype.readSOUNDCNT_L1 = function () {
    //NR51:
    return this.nr51 | 0;
}
GameBoyAdvanceSound.prototype.writeSOUNDCNT_H0 = function (data) {
    //NR60:
    data = data | 0;
    this.audioJIT();
    this.CGBOutputRatio = data & 0x3;
    this.AGBDirectSoundAShifter = (data & 0x04) >> 2;
    this.AGBDirectSoundBShifter = (data & 0x08) >> 3;
    this.nr60 = data | 0;
}
GameBoyAdvanceSound.prototype.readSOUNDCNT_H0 = function () {
    //NR60:
    return this.nr60 | 0;
}
GameBoyAdvanceSound.prototype.writeSOUNDCNT_H1 = function (data) {
    //NR61:
    data = data | 0;
    this.audioJIT();
    this.AGBDirectSoundARightCanPlay = ((data & 0x1) != 0);
    this.AGBDirectSoundALeftCanPlay = ((data & 0x2) != 0);
    this.AGBDirectSoundATimer = (data & 0x4) >> 2;
    if ((data & 0x08) != 0) {
        this.AGBDirectSoundAFIFOClear();
    }
    this.AGBDirectSoundBRightCanPlay = ((data & 0x10) != 0);
    this.AGBDirectSoundBLeftCanPlay = ((data & 0x20) != 0);
    this.AGBDirectSoundBTimer = (data & 0x40) >> 6;
    if ((data & 0x80) != 0) {
        this.AGBDirectSoundBFIFOClear();
    }
    this.nr61 = data | 0;
}
GameBoyAdvanceSound.prototype.readSOUNDCNT_H1 = function () {
    //NR61:
    return this.nr61 | 0;
}
GameBoyAdvanceSound.prototype.writeSOUNDCNT_X = function (data) {
    //NR52:
    data = data | 0;
    if (!this.soundMasterEnabled && (data | 0) > 0x7F) {
        this.audioJIT();
        this.audioEnabled();
    }
    else if (this.soundMasterEnabled && (data | 0) < 0x80) {
        this.audioJIT();
        this.audioDisabled();
    }
}
GameBoyAdvanceSound.prototype.readSOUNDCNT_X = function () {
    //NR52:
    return this.nr52 | 0;
}
GameBoyAdvanceSound.prototype.writeSOUNDBIAS0 = function (data) {
    //NR62:
    data = data | 0;
    this.audioJIT();
    this.mixerSoundBIAS = this.mixerSoundBIAS & 0x300;
    this.mixerSoundBIAS = this.mixerSoundBIAS | data;
    this.nr62 = data | 0;
}
GameBoyAdvanceSound.prototype.readSOUNDBIAS0 = function () {
    //NR62:
    return this.nr62 | 0;
}
GameBoyAdvanceSound.prototype.writeSOUNDBIAS1 = function (data) {
    //NR63:
    data = data | 0;
    this.audioJIT();
    this.mixerSoundBIAS = this.mixerSoundBIAS & 0xFF;
    this.mixerSoundBIAS = this.mixerSoundBIAS | ((data & 0x3) << 8);
    this.PWMWidthShadow = 0x200 >> ((data & 0xC0) >> 6);
    this.PWMBitDepthMaskShadow = ((this.PWMWidthShadow | 0) - 1) << (1 + ((data & 0xC0) >> 6));
    this.nr63 = data | 0;
}
GameBoyAdvanceSound.prototype.readSOUNDBIAS1 = function () {
    //NR63:
    return this.nr63 | 0;
}
