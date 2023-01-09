"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceChannel3Synth(sound) {
    this.sound = sound;
    this.currentSampleLeft = 0;
    this.currentSampleLeftSecondary = 0;
    this.currentSampleRight = 0;
    this.currentSampleRightSecondary = 0;
    this.lastSampleLookup = 0;
    this.canPlay = false;
    this.WAVERAMBankSpecified = 0;
    this.WAVERAMBankAccessed = 0x20;
    this.WaveRAMBankSize = 0x1F;
    this.totalLength = 0x100;
    this.patternType = 4;
    this.frequency = 0;
    this.FrequencyPeriod = 0x4000;
    this.consecutive = true;
    this.Enabled = false;
    this.nr30 = 0;
    this.nr31 = 0;
    this.nr32 = 0;
    this.nr33 = 0;
    this.nr34 = 0;
    this.cachedSample = 0;
    this.PCM = getInt8Array(0x40);
    this.PCM16 = getUint16View(this.PCM);
    this.PCM32 = getInt32View(this.PCM);
    this.WAVERAM8 = getUint8Array(0x20);
    this.WAVERAM16 = getUint16View(this.WAVERAM8);
    this.WAVERAM32 = getInt32View(this.WAVERAM8);
}
GameBoyAdvanceChannel3Synth.prototype.disabled = function () {
    //Clear NR30:
    this.nr30 = 0;
    this.lastSampleLookup = 0;
    this.canPlay = false;
    this.WAVERAMBankSpecified = 0;
    this.WAVERAMBankAccessed = 0x20;
    this.WaveRAMBankSize = 0x1F;
    //Clear NR31:
    this.totalLength = 0x100;
    //Clear NR32:
    this.nr32 = 0;
    this.patternType = 4;
    //Clear NR33:
    this.nr33 = 0;
    this.frequency = 0;
    this.FrequencyPeriod = 0x4000;
    //Clear NR34:
    this.nr34 = 0;
    this.consecutive = true;
    this.Enabled = false;
    this.counter = 0;
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceChannel3Synth.prototype.updateCache = function () {
        if ((this.patternType | 0) != 3) {
            this.cachedSample = this.PCM[this.lastSampleLookup | 0] >> (this.patternType | 0);
        }
        else {
            this.cachedSample = Math.imul(this.PCM[this.lastSampleLookup | 0] | 0, 3) >> 2;
        }
        this.outputLevelCache();
    }
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceChannel3Synth.prototype.updateCache = function () {
        if ((this.patternType | 0) != 3) {
            this.cachedSample = this.PCM[this.lastSampleLookup | 0] >> (this.patternType | 0);
        }
        else {
            this.cachedSample = (this.PCM[this.lastSampleLookup | 0] * 0.75) | 0;
        }
        this.outputLevelCache();
    }
}
GameBoyAdvanceChannel3Synth.prototype.outputLevelCache = function () {
    this.currentSampleLeft = (this.sound.leftChannel3) ? (this.cachedSample | 0) : 0;
    this.currentSampleRight = (this.sound.rightChannel3) ? (this.cachedSample | 0) : 0;
    this.outputLevelSecondaryCache();
}
GameBoyAdvanceChannel3Synth.prototype.outputLevelSecondaryCache = function () {
    if (this.Enabled) {
        this.currentSampleLeftSecondary = this.currentSampleLeft | 0;
        this.currentSampleRightSecondary = this.currentSampleRight | 0;
    }
    else {
        this.currentSampleLeftSecondary = 0;
        this.currentSampleRightSecondary = 0;
    }
}
GameBoyAdvanceChannel3Synth.prototype.readWAVE8 = function (address) {
    address = ((address | 0) + (this.WAVERAMBankAccessed >> 1)) | 0;
    return this.WAVERAM8[address | 0] | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceChannel3Synth.prototype.writeWAVE8 = function (address, data) {
        address = address | 0;
        data = data | 0;
        if (this.canPlay) {
            this.sound.audioJIT();
        }
        address = ((address | 0) + (this.WAVERAMBankAccessed >> 1)) | 0;
        this.WAVERAM8[address | 0] = data & 0xFF;
        var temp = ((data >> 4) & 0xF);
        temp = temp | ((data & 0xF) << 8);
        this.PCM16[address | 0] = temp | 0;
    }
    GameBoyAdvanceChannel3Synth.prototype.writeWAVE16 = function (address, data) {
        address = address | 0;
        data = data | 0;
        if (this.canPlay) {
            this.sound.audioJIT();
        }
        address = ((address | 0) + (this.WAVERAMBankAccessed >> 2)) | 0;
        this.WAVERAM16[address | 0] = data & 0xFFFF;
        var temp = ((data >> 4) & 0xF);
        temp = temp | ((data & 0xF) << 8);
        temp = temp | ((data & 0xF000) << 4);
        temp = temp | ((data & 0xF00) << 16);
        this.PCM32[address | 0] = temp | 0;
    }
    GameBoyAdvanceChannel3Synth.prototype.writeWAVE32 = function (address, data) {
        address = address | 0;
        data = data | 0;
        if (this.canPlay) {
            this.sound.audioJIT();
        }
        address = ((address | 0) + (this.WAVERAMBankAccessed >> 3)) | 0;
        this.WAVERAM32[address | 0] = data | 0;
        var temp = (data >> 4) & 0xF;
        temp = temp | ((data & 0xF) << 8);
        temp = temp | ((data & 0xF000) << 4);
        temp = temp | ((data & 0xF00) << 16);
        address = address << 1;
        this.PCM32[address | 0] = temp | 0;
        temp = (data >> 20) & 0xF;
        temp = temp | ((data >> 8) & 0xF00);
        temp = temp | ((data >> 12) & 0xF0000);
        temp = temp | (data & 0xF000000);
        this.PCM32[address | 1] = temp | 0;
    }
    GameBoyAdvanceChannel3Synth.prototype.readWAVE16 = function (address) {
        address = ((address | 0) + (this.WAVERAMBankAccessed >> 2)) | 0;
        return this.WAVERAM16[address | 0] | 0;
    }
    GameBoyAdvanceChannel3Synth.prototype.readWAVE32 = function (address) {
        address = ((address | 0) + (this.WAVERAMBankAccessed >> 3)) | 0;
        return this.WAVERAM32[address | 0] | 0;
    }
}
else {
    GameBoyAdvanceChannel3Synth.prototype.writeWAVE8 = function (address, data) {
        if (this.canPlay) {
            this.sound.audioJIT();
        }
        address += this.WAVERAMBankAccessed >> 1;
        this.WAVERAM8[address] = data & 0xFF;
        address <<= 1;
        this.PCM[address] = (data >> 4) & 0xF;
        this.PCM[address | 1] = data & 0xF;
    }
    GameBoyAdvanceChannel3Synth.prototype.writeWAVE16 = function (address, data) {
        if (this.canPlay) {
            this.sound.audioJIT();
        }
        address += this.WAVERAMBankAccessed >> 2;
        address <<= 1;
        this.WAVERAM8[address] = data & 0xFF;
        this.WAVERAM8[address | 1] = (data >> 8) & 0xFF;
        address <<= 1;
        this.PCM[address] = (data >> 4) & 0xF;
        this.PCM[address | 1] = data & 0xF;
        this.PCM[address | 2] = (data >> 12) & 0xF;
        this.PCM[address | 3] = (data >> 8) & 0xF;
    }
    GameBoyAdvanceChannel3Synth.prototype.writeWAVE32 = function (address, data) {
        if (this.canPlay) {
            this.sound.audioJIT();
        }
        address += this.WAVERAMBankAccessed >> 3;
        address <<= 2;
        this.WAVERAM8[address] = data & 0xFF;
        this.WAVERAM8[address | 1] = (data >> 8) & 0xFF;
        this.WAVERAM8[address | 2] = (data >> 16) & 0xFF;
        this.WAVERAM8[address | 3] = data >>> 24;
        address <<= 1;
        this.PCM[address] = (data >> 4) & 0xF;
        this.PCM[address | 1] = data & 0xF;
        this.PCM[address | 2] = (data >> 12) & 0xF;
        this.PCM[address | 3] = (data >> 8) & 0xF;
        this.PCM[address | 4] = (data >> 20) & 0xF;
        this.PCM[address | 5] = (data >> 16) & 0xF;
        this.PCM[address | 6] = data >>> 28;
        this.PCM[address | 7] = (data >> 24) & 0xF;
    }
    GameBoyAdvanceChannel3Synth.prototype.readWAVE16 = function (address) {
        address += this.WAVERAMBankAccessed >> 1;
        return (this.WAVERAM8[address] | (this.WAVERAM8[address | 1] << 8));
    }
    GameBoyAdvanceChannel3Synth.prototype.readWAVE32 = function (address) {
        address += this.WAVERAMBankAccessed >> 1;
        return (this.WAVERAM8[address] | (this.WAVERAM8[address | 1] << 8) |
                (this.WAVERAM8[address | 2] << 16) | (this.WAVERAM8[address | 3] << 24));
    }
}
GameBoyAdvanceChannel3Synth.prototype.enableCheck = function () {
    this.Enabled = (/*this.canPlay && */(this.consecutive || (this.totalLength | 0) > 0));
}
GameBoyAdvanceChannel3Synth.prototype.clockAudioLength = function () {
    if ((this.totalLength | 0) > 1) {
        this.totalLength = ((this.totalLength | 0) - 1) | 0;
    }
    else if ((this.totalLength | 0) == 1) {
        this.totalLength = 0;
        this.enableCheck();
        this.sound.unsetNR52(0xFB);    //Channel #3 On Flag Off
    }
}
GameBoyAdvanceChannel3Synth.prototype.computeAudioChannel = function () {
    if ((this.counter | 0) == 0) {
        if (this.canPlay) {
            this.lastSampleLookup = (((this.lastSampleLookup | 0) + 1) & this.WaveRAMBankSize) | this.WAVERAMBankSpecified;
        }
        this.counter = this.FrequencyPeriod | 0;
    }
}

GameBoyAdvanceChannel3Synth.prototype.readSOUND3CNT_L = function () {
    //NR30:
    return this.nr30 | 0;
}
GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_L = function (data) {
    data = data | 0;
    //NR30:
    if (!this.canPlay && (data | 0) >= 0x80) {
        this.lastSampleLookup = 0;
    }
    this.canPlay = (data > 0x7F);
    this.WaveRAMBankSize = (data & 0x20) | 0x1F;
    this.WAVERAMBankSpecified = ((data & 0x40) >> 1) ^ (data & 0x20);
    this.WAVERAMBankAccessed = ((data & 0x40) >> 1) ^ 0x20;
    if (this.canPlay && (this.nr30 | 0) > 0x7F && !this.consecutive) {
        this.sound.setNR52(0x4);
    }
    this.nr30 = data | 0;
}
GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_H0 = function (data) {
    data = data | 0;
    //NR31:
    this.totalLength = (0x100 - (data | 0)) | 0;
    this.enableCheck();
}
GameBoyAdvanceChannel3Synth.prototype.readSOUND3CNT_H = function () {
    //NR32:
    return this.nr32 | 0;
}
GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_H1 = function (data) {
    data = data | 0;
    //NR32:
    switch (data >> 5) {
        case 0:
            this.patternType = 4;
            break;
        case 1:
            this.patternType = 0;
            break;
        case 2:
            this.patternType = 1;
            break;
        case 3:
            this.patternType = 2;
            break;
        default:
            this.patternType = 3;
    }
    this.nr32 = data | 0;
}
GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_X0 = function (data) {
    data = data | 0;
    //NR33:
    this.frequency = (this.frequency & 0x700) | data;
    this.FrequencyPeriod = (0x800 - (this.frequency | 0)) << 3;
}
GameBoyAdvanceChannel3Synth.prototype.readSOUND3CNT_X = function () {
    //NR34:
    return this.nr34 | 0;
}
GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_X1 = function (data) {
    data = data | 0;
    //NR34:
    if ((data | 0) > 0x7F) {
        if ((this.totalLength | 0) == 0) {
            this.totalLength = 0x100;
        }
        this.lastSampleLookup = 0;
        if ((data & 0x40) != 0) {
            this.sound.setNR52(0x4);
        }
    }
    this.consecutive = ((data & 0x40) == 0x0);
    this.frequency = ((data & 0x7) << 8) | (this.frequency & 0xFF);
    this.FrequencyPeriod = (0x800 - (this.frequency | 0)) << 3;
    this.enableCheck();
    this.nr34 = data | 0;
}
