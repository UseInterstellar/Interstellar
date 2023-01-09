"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceEEPROMChip(IOCore) {
    this.saves = null;
    this.largestSizePossible = 0x200;
    this.mode = 0;
    this.bitsProcessed = 0;
    this.address = 0;
    this.buffer = getUint8Array(8);
    this.IOCore = IOCore;
    //Special note to emulator authors: EEPROM command ending bit "0" can also be a "1"...
}
GameBoyAdvanceEEPROMChip.prototype.initialize = function () {
    this.allocate();
}
GameBoyAdvanceEEPROMChip.prototype.allocate = function () {
    if (this.saves == null || (this.saves.length | 0) < (this.largestSizePossible | 0)) {
        //Allocate the new array:
        var newSave = getUint8Array(this.largestSizePossible | 0);
        //Init to default value:
        for (var index = 0; (index | 0) < (this.largestSizePossible | 0); index = ((index | 0) + 1) | 0) {
            newSave[index | 0] = 0xFF;
        }
        //Copy the old save data out:
        if (this.saves != null) {
            for (var index = 0; (index | 0) < (this.saves.length | 0); index = ((index | 0) + 1) | 0) {
                newSave[index | 0] = this.saves[index | 0] | 0;
            }
        }
        //Assign the new array out:
        this.saves = newSave;
    }
}
GameBoyAdvanceEEPROMChip.prototype.load = function (save) {
    if ((save.length | 0) == 0x200 || (save.length | 0) == 0x2000) {
        this.saves = save;
    }
}
GameBoyAdvanceEEPROMChip.prototype.read8 = function () {
    //Can't do real reading with 8-bit reads:
    return 0x1;
}
GameBoyAdvanceEEPROMChip.prototype.read16 = function () {
    var data = 1;
    switch (this.mode | 0) {
        case 0x7:
            //Return 4 junk 0 bits:
            data = 0;
            if ((this.bitsProcessed | 0) < 3) {
                //Increment our bits counter:
                this.bitsProcessed = ((this.bitsProcessed | 0) + 1) | 0;
            }
            else {
                //Reset our bits counter:
                this.bitsProcessed = 0;
                //Change mode for the actual reads:
                this.mode = 8;
            }
            break;
        case 0x8:
            //Return actual serial style data:
            var address = ((this.bitsProcessed >> 3) + (this.address | 0)) | 0;
            data = (this.saves[address | 0] >> ((0x7 - (this.bitsProcessed & 0x7)) | 0)) & 0x1;
            //Check for end of read:
            if ((this.bitsProcessed | 0) < 0x3F) {
                //Increment our bits counter:
                this.bitsProcessed = ((this.bitsProcessed | 0) + 1) | 0;
            }
            else {
                //Finished read and now idle:
                this.resetMode();
            }
    }
    return data | 0;
}
GameBoyAdvanceEEPROMChip.prototype.read32 = function () {
    //Can't do real reading with 32-bit reads:
    return 0x10001;
}
GameBoyAdvanceEEPROMChip.prototype.write16 = function (data) {
    data = data | 0;
    data = data & 0x1;
    //Writes only work in DMA:
    switch (this.mode | 0) {
            //Idle Mode:
        case 0:
            this.mode = data | 0;
            break;
            //Select Mode:
        case 0x1:
            this.selectMode(data | 0);
            break;
            //Address Mode (Write):
        case 0x2:
            //Address Mode (Read):
        case 0x3:
            this.addressMode(data | 0);
            break;
            //Write Mode:
        case 0x4:
            this.writeMode(data | 0);
            break;
            //Ending bit of addressing:
        case 0x5:
        case 0x6:
            this.endAddressing();
            break;
            //Read Mode:
        default:
            this.resetMode();
    }
}
GameBoyAdvanceEEPROMChip.prototype.selectMode = function (data) {
    data = data | 0;
    //Reset our address:
    this.address = 0;
    //Reset our bits counter:
    this.bitsProcessed = 0;
    //Read the mode bit:
    this.mode = 0x2 | data;
}
GameBoyAdvanceEEPROMChip.prototype.addressMode = function (data) {
    data = data | 0;
    //Shift in our address bit:
    this.address = (this.address << 1) | data;
    //Increment our bits counter:
    this.bitsProcessed = ((this.bitsProcessed | 0) + 1) | 0;
    //Check for how many bits we've shifted in:
    switch (this.bitsProcessed | 0) {
        //6 bit address mode:
        case 0x6:
            if ((this.IOCore.dmaChannel3.wordCountShadow | 0) >= (((this.mode | 0) == 2) ? 0x4A : 0xA)) {
                this.largestSizePossible = 0x2000;
                this.allocate();
                break;
            }
        //14 bit address mode:
        case 0xE:
            this.changeModeToActive();
    }
}
GameBoyAdvanceEEPROMChip.prototype.changeModeToActive = function () {
    //Ensure the address range:
    this.address &= 0x3FF;
    //Addressing in units of 8 bytes:
    this.address <<= 3;
    //Reset our bits counter:
    this.bitsProcessed = 0;
    //Change to R/W Mode:
    this.mode = ((this.mode | 0) + 2) | 0;
}
GameBoyAdvanceEEPROMChip.prototype.writeMode = function (data) {
    data = data | 0;
    //Push a bit into the buffer:
    this.pushBuffer(data | 0);
    //Save on last write bit push:
    if ((this.bitsProcessed | 0) == 0x40) {
        //64 bits buffered, so copy our buffer to the save data:
        this.copyBuffer();
        this.mode = 6;
    }
}
GameBoyAdvanceEEPROMChip.prototype.pushBuffer = function (data) {
    data = data | 0;
    //Push a bit through our serial buffer:
    var bufferPosition = this.bitsProcessed >> 3;
    this.buffer[bufferPosition & 0x7] = ((this.buffer[bufferPosition & 0x7] << 1) & 0xFE) | data;
    this.bitsProcessed = ((this.bitsProcessed | 0) + 1) | 0;
}
GameBoyAdvanceEEPROMChip.prototype.copyBuffer = function () {
    //Copy 8 bytes from buffer to EEPROM save data starting at address offset:
    for (var index = 0; (index | 0) < 8; index = ((index | 0) + 1) | 0) {
        this.saves[this.address | index] = this.buffer[index & 0x7] & 0xFF;
    }
}
GameBoyAdvanceEEPROMChip.prototype.endAddressing = function () {
    this.mode = ((this.mode | 0) + 2) | 0;
}
GameBoyAdvanceEEPROMChip.prototype.resetMode = function () {
    //Reset back to idle:
    this.mode = 0;
}