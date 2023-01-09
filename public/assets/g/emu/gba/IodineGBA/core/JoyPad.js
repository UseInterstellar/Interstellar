"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceJoyPad(IOCore) {
    this.IOCore = IOCore;
}
GameBoyAdvanceJoyPad.prototype.initialize = function () {
    this.keyInput = 0x3FF;
    this.keyInterrupt = 0;
}
GameBoyAdvanceJoyPad.prototype.keyPress = function (keyPressed) {
    keyPressed = keyPressed | 0;
    keyPressed = 1 << (keyPressed | 0);
    this.keyInput = this.keyInput & (~keyPressed);
    this.checkForMatch();
}
GameBoyAdvanceJoyPad.prototype.keyRelease = function (keyReleased) {
    keyReleased = keyReleased | 0;
    keyReleased = 1 << (keyReleased | 0);
    this.keyInput = this.keyInput | keyReleased;
    this.checkForMatch();
}
GameBoyAdvanceJoyPad.prototype.checkForMatch = function () {
    if ((this.keyInterrupt & 0x8000) != 0) {
        if (((~this.keyInput) & this.keyInterrupt & 0x3FF) == (this.keyInterrupt & 0x3FF)) {
            this.IOCore.deflagStop();
            this.checkForIRQ();
        }
    }
    else if (((~this.keyInput) & this.keyInterrupt & 0x3FF) != 0) {
        this.IOCore.deflagStop();
        this.checkForIRQ();
    }
}
GameBoyAdvanceJoyPad.prototype.checkForIRQ = function () {
    if ((this.keyInterrupt & 0x4000) != 0) {
        this.IOCore.irq.requestIRQ(0x1000);
    }
}
GameBoyAdvanceJoyPad.prototype.readKeyStatus8_0 = function () {
    return this.keyInput & 0xFF;
}
GameBoyAdvanceJoyPad.prototype.readKeyStatus8_1 = function () {
    return (this.keyInput >> 8) | 0;
}
GameBoyAdvanceJoyPad.prototype.readKeyStatus16 = function () {
    return this.keyInput | 0;
}
GameBoyAdvanceJoyPad.prototype.writeKeyControl8_0 = function (data) {
    data = data | 0;
    this.keyInterrupt = this.keyInterrupt & 0xC300;
    data = data & 0xFF;
    this.keyInterrupt = this.keyInterrupt | data;
}
GameBoyAdvanceJoyPad.prototype.writeKeyControl8_1 = function (data) {
    data = data | 0;
    this.keyInterrupt = this.keyInterrupt & 0xFF;
    data = data & 0xC3;
    this.keyInterrupt = this.keyInterrupt | (data << 8);
}
GameBoyAdvanceJoyPad.prototype.writeKeyControl16 = function (data) {
    data = data | 0;
    this.keyInterrupt = data & 0xC3FF;
}
GameBoyAdvanceJoyPad.prototype.readKeyControl8_0 = function () {
    return this.keyInterrupt & 0xFF;
}
GameBoyAdvanceJoyPad.prototype.readKeyControl8_1 = function () {
    return (this.keyInterrupt >> 8) | 0;
}
GameBoyAdvanceJoyPad.prototype.readKeyControl16 = function () {
    return this.keyInterrupt | 0;
}
GameBoyAdvanceJoyPad.prototype.readKeyStatusControl32 = function () {
    return this.keyInput | (this.keyInterrupt << 16);
}