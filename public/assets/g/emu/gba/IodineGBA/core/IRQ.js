"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceIRQ(IOCore) {
    //Build references:
    this.IOCore = IOCore;
}
GameBoyAdvanceIRQ.prototype.initialize = function () {
    this.interruptsEnabled = 0;
    this.interruptsRequested = 0;
    this.IME = 0;
    this.gfxState = this.IOCore.gfxState;
    this.timer = this.IOCore.timer;
    this.dmaChannel0 = this.IOCore.dmaChannel0;
    this.dmaChannel1 = this.IOCore.dmaChannel1;
    this.dmaChannel2 = this.IOCore.dmaChannel2;
    this.dmaChannel3 = this.IOCore.dmaChannel3;
}
GameBoyAdvanceIRQ.prototype.IRQMatch = function () {
    //Used to exit HALT:
    return (this.interruptsEnabled & this.interruptsRequested);
}
GameBoyAdvanceIRQ.prototype.checkForIRQFire = function () {
    //Tell the CPU core when the emulated hardware is triggering an IRQ:
    this.IOCore.cpu.triggerIRQ(this.interruptsEnabled & this.interruptsRequested & this.IME);
}
GameBoyAdvanceIRQ.prototype.requestIRQ = function (irqLineToSet) {
    irqLineToSet = irqLineToSet | 0;
    this.interruptsRequested = this.interruptsRequested | irqLineToSet;
    this.checkForIRQFire();
}
GameBoyAdvanceIRQ.prototype.writeIME = function (data) {
    data = data | 0;
    this.IOCore.updateCoreClocking();
    this.IME = (data << 31) >> 31;
    this.checkForIRQFire();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceIRQ.prototype.writeIE8_0 = function (data) {
    data = data | 0;
    this.IOCore.updateCoreClocking();
    var oldValue = this.interruptsEnabled & 0x3F00;
    data = data & 0xFF;
    data = data | oldValue;
    this.interruptsEnabled = data | 0;
    this.checkForIRQFire();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceIRQ.prototype.writeIE8_1 = function (data) {
    data = data | 0;
    this.IOCore.updateCoreClocking();
    var oldValue = this.interruptsEnabled & 0xFF;
    data = (data & 0x3F) << 8;
    data = data | oldValue;
    this.interruptsEnabled = data | 0;
    this.checkForIRQFire();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceIRQ.prototype.writeIE16 = function (data) {
    data = data | 0;
    this.IOCore.updateCoreClocking();
    this.interruptsEnabled = data & 0x3FFF;
    this.checkForIRQFire();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceIRQ.prototype.writeIF8_0 = function (data) {
    data = data | 0;
    this.IOCore.updateCoreClocking();
    data = ~(data & 0xFF);
    this.interruptsRequested = this.interruptsRequested & data;
    this.checkForIRQFire();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceIRQ.prototype.writeIF8_1 = function (data) {
    data = data | 0;
    this.IOCore.updateCoreClocking();
    data = ~((data & 0xFF) << 8);
    this.interruptsRequested = this.interruptsRequested & data;
    this.checkForIRQFire();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceIRQ.prototype.writeIF16 = function (data) {
    data = data | 0;
    this.IOCore.updateCoreClocking();
    data = ~data;
    this.interruptsRequested = this.interruptsRequested & data;
    this.checkForIRQFire();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceIRQ.prototype.writeIRQ32 = function (data) {
    data = data | 0;
    this.IOCore.updateCoreClocking();
    this.interruptsEnabled = data & 0x3FFF;
    data = ~(data >> 16);
    this.interruptsRequested = this.interruptsRequested & data;
    this.checkForIRQFire();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceIRQ.prototype.readIME = function () {
    var data = this.IME & 0x1;
    return data | 0;
}
GameBoyAdvanceIRQ.prototype.readIE8_0 = function () {
    var data = this.interruptsEnabled & 0xFF;
    return data | 0;
}
GameBoyAdvanceIRQ.prototype.readIE8_1 = function () {
    var data = this.interruptsEnabled >> 8;
    return data | 0;
}
GameBoyAdvanceIRQ.prototype.readIE16 = function () {
    var data = this.interruptsEnabled | 0;
    return data | 0;
}
GameBoyAdvanceIRQ.prototype.readIF8_0 = function () {
    this.IOCore.updateCoreSpillRetain();
    var data = this.interruptsRequested & 0xFF;
    return data | 0;
}
GameBoyAdvanceIRQ.prototype.readIF8_1 = function () {
    this.IOCore.updateCoreSpillRetain();
    var data = this.interruptsRequested >> 8;
    return data | 0;
}
GameBoyAdvanceIRQ.prototype.readIF16 = function () {
    this.IOCore.updateCoreSpillRetain();
    var data = this.interruptsRequested | 0;
    return data | 0;
}
GameBoyAdvanceIRQ.prototype.readIRQ32 = function () {
    this.IOCore.updateCoreSpillRetain();
    var data = (this.interruptsRequested << 16) | this.interruptsEnabled;
    return data | 0;
}
GameBoyAdvanceIRQ.prototype.nextEventTime = function () {
    var clocks = 0x7FFFFFFF;
    if ((this.interruptsEnabled & 0x1) != 0) {
        clocks = this.gfxState.nextVBlankIRQEventTime() | 0;
    }
    if ((this.interruptsEnabled & 0x2) != 0) {
        clocks = Math.min(clocks | 0, this.gfxState.nextHBlankIRQEventTime() | 0) | 0;
    }
    if ((this.interruptsEnabled & 0x4) != 0) {
        clocks = Math.min(clocks | 0, this.gfxState.nextVCounterIRQEventTime() | 0) | 0;
    }
    if ((this.interruptsEnabled & 0x8) != 0) {
        clocks = Math.min(clocks | 0, this.timer.nextTimer0IRQEventTime() | 0) | 0;
    }
    if ((this.interruptsEnabled & 0x10) != 0) {
        clocks = Math.min(clocks | 0, this.timer.nextTimer1IRQEventTime() | 0) | 0;
    }
    if ((this.interruptsEnabled & 0x20) != 0) {
        clocks = Math.min(clocks | 0, this.timer.nextTimer2IRQEventTime() | 0) | 0;
    }
    if ((this.interruptsEnabled & 0x40) != 0) {
        clocks = Math.min(clocks | 0, this.timer.nextTimer3IRQEventTime() | 0) | 0;
    }
    /*if ((this.interruptsEnabled & 0x80) != 0) {
        clocks = Math.min(clocks | 0, this.IOCore.serial.nextIRQEventTime() | 0) | 0;
    }
    if ((this.interruptsEnabled & 0x2000) != 0) {
        clocks = Math.min(clocks | 0, this.IOCore.cartridge.nextIRQEventTime() | 0) | 0;
    }*/
    return clocks | 0;
}
GameBoyAdvanceIRQ.prototype.nextIRQEventTime = function () {
    var clocks = 0x7FFFFFFF;
    //Checks IME:
    if ((this.IME | 0) != 0) {
        clocks = this.nextEventTime() | 0;
    }
    return clocks | 0;
}