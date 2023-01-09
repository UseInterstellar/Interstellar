"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceDMA(IOCore) {
    this.IOCore = IOCore;
}
GameBoyAdvanceDMA.prototype.initialize = function () {
    this.dmaChannel0 = this.IOCore.dmaChannel0;
    this.dmaChannel1 = this.IOCore.dmaChannel1;
    this.dmaChannel2 = this.IOCore.dmaChannel2;
    this.dmaChannel3 = this.IOCore.dmaChannel3;
    this.currentMatch = -1;
    this.fetch = 0;
}
GameBoyAdvanceDMA.prototype.getCurrentFetchValue = function () {
    return this.fetch | 0;
}
GameBoyAdvanceDMA.prototype.gfxHBlankRequest = function () {
    //Pass H-Blank signal to all DMA channels:
    this.requestDMA(0x4);
}
GameBoyAdvanceDMA.prototype.gfxVBlankRequest = function () {
    //Pass V-Blank signal to all DMA channels:
    this.requestDMA(0x2);
}
GameBoyAdvanceDMA.prototype.requestDMA = function (DMAType) {
    DMAType = DMAType | 0;
    this.dmaChannel0.requestDMA(DMAType | 0);
    this.dmaChannel1.requestDMA(DMAType | 0);
    this.dmaChannel2.requestDMA(DMAType | 0);
    this.dmaChannel3.requestDMA(DMAType | 0);
}
GameBoyAdvanceDMA.prototype.findLowestDMA = function () {
    if ((this.dmaChannel0.getMatchStatus() | 0) != 0) {
        return 0;
    }
    if ((this.dmaChannel1.getMatchStatus() | 0) != 0) {
        return 1;
    }
    if ((this.dmaChannel2.getMatchStatus() | 0) != 0) {
        return 2;
    }
    if ((this.dmaChannel3.getMatchStatus() | 0) != 0) {
        return 3;
    }
    return 4;
}
GameBoyAdvanceDMA.prototype.update = function () {
    var lowestDMAFound = this.findLowestDMA();
    if ((lowestDMAFound | 0) < 4) {
        //Found an active DMA:
        if ((this.currentMatch | 0) == -1) {
            this.IOCore.flagDMA();
        }
        if ((this.currentMatch | 0) != (lowestDMAFound | 0)) {
            //Re-broadcasting on address bus, so non-seq:
            this.IOCore.wait.NonSequentialBroadcast();
            this.currentMatch = lowestDMAFound | 0;
        }
    }
    else if ((this.currentMatch | 0) != -1) {
        //No active DMA found:
        this.currentMatch = -1;
        this.IOCore.deflagDMA();
        this.IOCore.updateCoreSpill();
    }
}
GameBoyAdvanceDMA.prototype.perform = function () {
    //Call the correct channel to process:
    switch (this.currentMatch | 0) {
        case 0:
            this.dmaChannel0.handleDMACopy();
            break;
        case 1:
            this.dmaChannel1.handleDMACopy();
            break;
        case 2:
            this.dmaChannel2.handleDMACopy();
            break;
        default:
            this.dmaChannel3.handleDMACopy();
    }
}
GameBoyAdvanceDMA.prototype.updateFetch = function (data) {
    data = data | 0;
    this.fetch = data | 0;
}
GameBoyAdvanceDMA.prototype.nextEventTime = function () {
    var clocks = Math.min(this.dmaChannel0.nextEventTime() | 0, this.dmaChannel1.nextEventTime() | 0, this.dmaChannel2.nextEventTime() | 0, this.dmaChannel3.nextEventTime() | 0) | 0;
    return clocks | 0;
}