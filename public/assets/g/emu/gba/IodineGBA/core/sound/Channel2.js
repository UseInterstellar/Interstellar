"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceChannel2Synth(sound) {
    this.sound = sound;
    this.currentSampleLeft = 0;
    this.currentSampleLeftSecondary = 0;
    this.currentSampleLeftTrimary = 0;
    this.currentSampleRight = 0;
    this.currentSampleRightSecondary = 0;
    this.currentSampleRightTrimary = 0;
    this.CachedDuty = this.dutyLookup[0];
    this.totalLength = 0x40;
    this.envelopeVolume = 0;
    this.frequency = 0;
    this.FrequencyTracker = 0x8000;
    this.consecutive = true;
    this.ShadowFrequency = 0x8000;
    this.canPlay = false;
    this.Enabled = false;
    this.envelopeSweeps = 0;
    this.envelopeSweepsLast = -1;
    this.FrequencyCounter = 0;
    this.DutyTracker = 0;
    this.nr21 = 0;
    this.nr22 = 0;
    this.nr23 = 0;
    this.nr24 = 0;
}
GameBoyAdvanceChannel2Synth.prototype.dutyLookup = [
    [false, false, false, false, false, false, false, true],
    [true, false, false, false, false, false, false, true],
    [true, false, false, false, false, true, true, true],
    [false, true, true, true, true, true, true, false]
];
GameBoyAdvanceChannel2Synth.prototype.disabled = function () {
    //Clear NR21:
    this.nr21 = 0;
    this.CachedDuty = this.dutyLookup[0];
    this.totalLength = 0x40;
    //Clear NR22:
    this.nr22 = 0;
    this.envelopeVolume = 0;
    //Clear NR23:
    this.nr23 = 0;
    this.frequency = 0;
    this.FrequencyTracker = 0x8000;
    //Clear NR24:
    this.nr24 = 0;
    this.consecutive = true;
    this.canPlay = false;
    this.Enabled = false;
    this.envelopeSweeps = 0;
    this.envelopeSweepsLast = -1;
    this.FrequencyCounter = 0;
    this.DutyTracker = 0;
}
GameBoyAdvanceChannel2Synth.prototype.clockAudioLength = function () {
    if ((this.totalLength | 0) > 1) {
        this.totalLength = ((this.totalLength | 0) - 1) | 0;
    }
    else if ((this.totalLength | 0) == 1) {
        this.totalLength = 0;
        this.enableCheck();
        this.sound.unsetNR52(0xFD);    //Channel #2 On Flag Off
    }
}
GameBoyAdvanceChannel2Synth.prototype.clockAudioEnvelope = function () {
    if ((this.envelopeSweepsLast | 0) > -1) {
        if ((this.envelopeSweeps | 0) > 0) {
            this.envelopeSweeps = ((this.envelopeSweeps | 0) - 1) | 0;
        }
        else {
            if (!this.envelopeType) {
                if ((this.envelopeVolume | 0) > 0) {
                    this.envelopeVolume = ((this.envelopeVolume | 0) - 1) | 0;
                    this.envelopeSweeps = this.envelopeSweepsLast | 0;
                }
                else {
                    this.envelopeSweepsLast = -1;
                }
            }
            else if ((this.envelopeVolume | 0) < 0xF) {
                this.envelopeVolume = ((this.envelopeVolume | 0) + 1) | 0;
                this.envelopeSweeps = this.envelopeSweepsLast | 0;
            }
            else {
                this.envelopeSweepsLast = -1;
            }
        }
    }
}
GameBoyAdvanceChannel2Synth.prototype.computeAudioChannel = function () {
    if ((this.FrequencyCounter | 0) == 0) {
        this.FrequencyCounter = this.FrequencyTracker | 0;
        this.DutyTracker = ((this.DutyTracker | 0) + 1) & 0x7;
    }
}
GameBoyAdvanceChannel2Synth.prototype.enableCheck = function () {
    this.Enabled = ((this.consecutive || (this.totalLength | 0) > 0) && this.canPlay);
}
GameBoyAdvanceChannel2Synth.prototype.volumeEnableCheck = function () {
    this.canPlay = ((this.nr22 | 0) > 7);
    this.enableCheck();
}
GameBoyAdvanceChannel2Synth.prototype.outputLevelCache = function () {
    this.currentSampleLeft = (this.sound.leftChannel2) ? (this.envelopeVolume | 0) : 0;
    this.currentSampleRight = (this.sound.rightChannel2) ? (this.envelopeVolume | 0) : 0;
    this.outputLevelSecondaryCache();
}
GameBoyAdvanceChannel2Synth.prototype.outputLevelSecondaryCache = function () {
    if (this.Enabled) {
        this.currentSampleLeftSecondary = this.currentSampleLeft | 0;
        this.currentSampleRightSecondary = this.currentSampleRight | 0;
    }
    else {
        this.currentSampleLeftSecondary = 0;
        this.currentSampleRightSecondary = 0;
    }
    this.outputLevelTrimaryCache();
}
GameBoyAdvanceChannel2Synth.prototype.outputLevelTrimaryCache = function () {
    if (this.CachedDuty[this.DutyTracker | 0]) {
        this.currentSampleLeftTrimary = this.currentSampleLeftSecondary | 0;
        this.currentSampleRightTrimary = this.currentSampleRightSecondary | 0;
    }
    else {
        this.currentSampleLeftTrimary = 0;
        this.currentSampleRightTrimary = 0;
    }
}
GameBoyAdvanceChannel2Synth.prototype.readSOUND2CNT_L0 = function () {
    //NR21:
    return this.nr21 | 0;
}
GameBoyAdvanceChannel2Synth.prototype.writeSOUND2CNT_L0 = function (data) {
    data = data | 0;
    //NR21:
    this.CachedDuty = this.dutyLookup[data >> 6];
    this.totalLength = (0x40 - (data & 0x3F)) | 0;
    this.nr21 = data | 0;
    this.enableCheck();
}
GameBoyAdvanceChannel2Synth.prototype.readSOUND2CNT_L1 = function () {
    //NR22:
    return this.nr22 | 0;
}
GameBoyAdvanceChannel2Synth.prototype.writeSOUND2CNT_L1 = function (data) {
    data = data | 0;
    //NR22:
    this.envelopeType = ((data & 0x08) != 0);
    this.nr22 = data | 0;
    this.volumeEnableCheck();
}
GameBoyAdvanceChannel2Synth.prototype.writeSOUND2CNT_H0 = function (data) {
    data = data | 0;
    //NR23:
    this.frequency = (this.frequency & 0x700) | data;
    this.FrequencyTracker = (0x800 - (this.frequency | 0)) << 4;
}
GameBoyAdvanceChannel2Synth.prototype.readSOUND2CNT_H = function () {
    //NR24:
    return this.nr24 | 0;
}
GameBoyAdvanceChannel2Synth.prototype.writeSOUND2CNT_H1 = function (data) {
    data = data | 0;
    //NR24:
    if (data > 0x7F) {
        //Reload nr22:
        this.envelopeVolume = this.nr22 >> 4;
        this.envelopeSweepsLast = ((this.nr22 & 0x7) - 1) | 0;
        if ((this.totalLength | 0) == 0) {
            this.totalLength = 0x40;
        }
        if ((data & 0x40) != 0) {
            this.sound.setNR52(0x2);    //Channel #1 On Flag Off
        }
    }
    this.consecutive = ((data & 0x40) == 0x0);
    this.frequency = ((data & 0x7) << 8) | (this.frequency & 0xFF);
    this.FrequencyTracker = (0x800 - (this.frequency | 0)) << 4;
    this.nr24 = data | 0;
    this.enableCheck();
}
