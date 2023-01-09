"use strict";
/*
 Copyright (C) 2012-2014 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceCartridge(IOCore) {
    this.IOCore = IOCore;
}
GameBoyAdvanceCartridge.prototype.initialize = function () {
    this.flash_is128 = false;
    this.flash_isAtmel = false;
    this.ROM = this.getROMArray(this.IOCore.ROM);
    this.ROM16 = getUint16View(this.ROM);
    this.ROM32 = getInt32View(this.ROM);
    this.decodeName();
    this.decodeFlashType();
}
GameBoyAdvanceCartridge.prototype.getROMArray = function (old_array) {
    this.ROMLength = Math.min((old_array.length >> 2) << 2, 0x2000000);
    this.EEPROMStart = ((this.ROMLength | 0) > 0x1000000) ? Math.max(this.ROMLength | 0, 0x1FFFF00) : 0x1000000;
    var newArray = getUint8Array(this.ROMLength | 0);
    for (var index = 0; (index | 0) < (this.ROMLength | 0); index = ((index | 0) + 1) | 0) {
        newArray[index | 0] = old_array[index | 0] | 0;
    }
    return newArray;
}
GameBoyAdvanceCartridge.prototype.decodeName = function () {
    this.name = "GUID_";
    if ((this.ROMLength | 0) >= 0xC0) {
        for (var address = 0xAC; (address | 0) < 0xB3; address = ((address | 0) + 1) | 0) {
            if ((this.ROM[address | 0] | 0) > 0) {
                this.name += String.fromCharCode(this.ROM[address | 0] | 0);
            }
            else {
                this.name += "_";
            }
        }
    }
}
GameBoyAdvanceCartridge.prototype.decodeFlashType = function () {
    this.flash_is128 = false;
    this.flash_isAtmel = false;
    var flash_types = 0;
    var F = ("F").charCodeAt(0) & 0xFF;
    var L = ("L").charCodeAt(0) & 0xFF;
    var A = ("A").charCodeAt(0) & 0xFF;
    var S = ("S").charCodeAt(0) & 0xFF;
    var H = ("H").charCodeAt(0) & 0xFF;
    var underScore = ("_").charCodeAt(0) & 0xFF;
    var five = ("5").charCodeAt(0) & 0xFF;
    var one = ("1").charCodeAt(0) & 0xFF;
    var two = ("2").charCodeAt(0) & 0xFF;
    var M = ("M").charCodeAt(0) & 0xFF;
    var V = ("V").charCodeAt(0) & 0xFF;
    var length = ((this.ROM.length | 0) - 12) | 0;
    for (var index = 0; (index | 0) < (length | 0); index = ((index | 0) + 4) | 0) {
        if ((this.ROM[index | 0] | 0) == (F | 0)) {
            if ((this.ROM[index | 1] | 0) == (L | 0)) {
                if ((this.ROM[index | 2] | 0) == (A | 0)) {
                    if ((this.ROM[index | 3] | 0) == (S | 0)) {
                        var tempIndex = ((index | 0) + 4) | 0;
                        if ((this.ROM[tempIndex | 0] | 0) == (H | 0)) {
                            if ((this.ROM[tempIndex | 1] | 0) == (underScore | 0)) {
                                if ((this.ROM[tempIndex | 2] | 0) == (V | 0)) {
                                    flash_types |= 1;
                                }
                            }
                            else if ((this.ROM[tempIndex | 1] | 0) == (five | 0)) {
                                if ((this.ROM[tempIndex | 2] | 0) == (one | 0)) {
                                    if ((this.ROM[tempIndex | 3] | 0) == (two | 0)) {
                                        tempIndex = ((tempIndex | 0) + 4) | 0;
                                        if ((this.ROM[tempIndex | 0] | 0) == (underScore | 0)) {
                                            if ((this.ROM[tempIndex | 1] | 0) == (V | 0)) {
                                                flash_types |= 2;
                                            }
                                        }
                                    }
                                }
                            }
                            else if ((this.ROM[tempIndex | 1] | 0) == (one | 0)) {
                                if ((this.ROM[tempIndex | 2] | 0) == (M | 0)) {
                                    if ((this.ROM[tempIndex | 3] | 0) == (underScore | 0)) {
                                        tempIndex = ((tempIndex | 0) + 4) | 0;
                                        if ((this.ROM[tempIndex | 0] | 0) == (V | 0)) {
                                            flash_types |= 4;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    this.flash_is128 = ((flash_types | 0) >= 4);
    this.flash_isAtmel = ((flash_types | 0) <= 1);
}
GameBoyAdvanceCartridge.prototype.readROMOnly8 = function (address) {
    address = address | 0;
    var data = 0;
    if ((address | 0) < (this.ROMLength | 0)) {
        data = this.ROM[address & 0x1FFFFFF] | 0;
    }
    return data | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceCartridge.prototype.readROMOnly16 = function (address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) < (this.ROMLength | 0)) {
            data = this.ROM16[(address >> 1) & 0xFFFFFF] | 0;
        }
        return data | 0;
    }
    GameBoyAdvanceCartridge.prototype.readROMOnly32 = function (address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) < (this.ROMLength | 0)) {
            data = this.ROM32[(address >> 2) & 0x7FFFFF] | 0;
        }
        return data | 0;
    }
}
else {
    GameBoyAdvanceCartridge.prototype.readROMOnly16 = function (address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) < (this.ROMLength | 0)) {
            data = this.ROM[address] | (this.ROM[address | 1] << 8);
        }
        return data | 0;
    }
    GameBoyAdvanceCartridge.prototype.readROMOnly32 = function (address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) < (this.ROMLength | 0)) {
            data = this.ROM[address] | (this.ROM[address | 1] << 8) | (this.ROM[address | 2] << 16)  | (this.ROM[address | 3] << 24);
        }
        return data | 0;
    }
}
GameBoyAdvanceCartridge.prototype.readROM8 = function (address) {
    address = address | 0;
    var data = 0;
    if ((address | 0) > 0xC9) {
        //Definitely ROM:
        data = this.readROMOnly8(address | 0) | 0;
    }
    else {
        //Possibly GPIO:
        data = this.IOCore.saves.readGPIO8(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceCartridge.prototype.readROM16 = function (address) {
    address = address | 0;
    var data = 0;
    if ((address | 0) > 0xC9) {
        //Definitely ROM:
        data = this.readROMOnly16(address | 0) | 0;
    }
    else {
        //Possibly GPIO:
        data = this.IOCore.saves.readGPIO16(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceCartridge.prototype.readROM32 = function (address) {
    address = address | 0;
    var data = 0;
    if ((address | 0) > 0xC9) {
        //Definitely ROM:
        data = this.readROMOnly32(address | 0) | 0;
    }
    else {
        //Possibly GPIO:
        data = this.IOCore.saves.readGPIO32(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceCartridge.prototype.readROM8Space2 = function (address) {
    address = address | 0;
    var data = 0;
    if ((address | 0) >= 0xC4 && (address | 0) < 0xCA) {
        //Possibly GPIO:
        data = this.IOCore.saves.readGPIO8(address | 0) | 0;
    }
    else if ((address | 0) >= (this.EEPROMStart | 0)) {
        //Possibly EEPROM:
        data = this.IOCore.saves.readEEPROM8(address | 0) | 0;
    }
    else {
        //Definitely ROM:
        data = this.readROMOnly8(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceCartridge.prototype.readROM16Space2 = function (address) {
    address = address | 0;
    var data = 0;
    if ((address | 0) >= 0xC4 && (address | 0) < 0xCA) {
        //Possibly GPIO:
        data = this.IOCore.saves.readGPIO16(address | 0) | 0;
    }
    else if ((address | 0) >= (this.EEPROMStart | 0)) {
        //Possibly EEPROM:
        data = this.IOCore.saves.readEEPROM16(address | 0) | 0;
    }
    else {
        //Definitely ROM:
        data = this.readROMOnly16(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceCartridge.prototype.readROM32Space2 = function (address) {
    address = address | 0;
    var data = 0;
    if ((address | 0) >= 0xC4 && (address | 0) < 0xCA) {
        //Possibly GPIO:
        data = this.IOCore.saves.readGPIO32(address | 0) | 0;
    }
    else if ((address | 0) >= (this.EEPROMStart | 0)) {
        //Possibly EEPROM:
        data = this.IOCore.saves.readEEPROM32(address | 0) | 0;
    }
    else {
        //Definitely ROM:
        data = this.readROMOnly32(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceCartridge.prototype.writeROM8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    if ((address | 0) >= 0xC4 && (address | 0) < 0xCA) {
        //GPIO Chip (RTC):
        this.IOCore.saves.writeGPIO8(address | 0, data | 0);
    }
}
GameBoyAdvanceCartridge.prototype.writeROM16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    if ((address | 0) >= 0xC4 && (address | 0) < 0xCA) {
        //GPIO Chip (RTC):
        this.IOCore.saves.writeGPIO16(address | 0, data | 0);
    }
}
GameBoyAdvanceCartridge.prototype.writeROM16DMA = function (address, data) {
    address = address | 0;
    data = data | 0;
    if ((address | 0) >= 0xC4 && (address | 0) < 0xCA) {
        //GPIO Chip (RTC):
        this.IOCore.saves.writeGPIO16(address | 0, data | 0);
    }
    else if ((address | 0) >= (this.EEPROMStart | 0)) {
        //Possibly EEPROM:
        this.IOCore.saves.writeEEPROM16(address | 0, data | 0);
    }
}
GameBoyAdvanceCartridge.prototype.writeROM32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    if ((address | 0) >= 0xC4 && (address | 0) < 0xCA) {
        //GPIO Chip (RTC):
        this.IOCore.saves.writeGPIO32(address | 0, data | 0);
    }
}
GameBoyAdvanceCartridge.prototype.nextIRQEventTime = function () {
    //Nothing yet implement that would fire an IRQ:
    return 0x7FFFFFFF;
}