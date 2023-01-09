"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceFIFO() {
    this.count = 0;
    this.position = 0;
    this.buffer = getInt8Array(0x20);
}
GameBoyAdvanceFIFO.prototype.push = function (sample) {
    sample = sample | 0;
    var writePosition = ((this.position | 0) + (this.count | 0)) | 0;
    this.buffer[writePosition & 0x1F] = (sample << 24) >> 24;
    if ((this.count | 0) < 0x20) {
        //Should we cap at 0x20 or overflow back to 0 and reset queue?
        this.count = ((this.count | 0) + 1) | 0;
    }
}
GameBoyAdvanceFIFO.prototype.push8 = function (sample) {
    sample = sample | 0;
    this.push(sample | 0);
    this.push(sample | 0);
    this.push(sample | 0);
    this.push(sample | 0);
}
GameBoyAdvanceFIFO.prototype.push16 = function (sample) {
    sample = sample | 0;
    this.push(sample | 0);
    this.push(sample >> 8);
    this.push(sample | 0);
    this.push(sample >> 8);
}
GameBoyAdvanceFIFO.prototype.push32 = function (sample) {
    sample = sample | 0;
    this.push(sample | 0);
    this.push(sample >> 8);
    this.push(sample >> 16);
    this.push(sample >> 24);
}
GameBoyAdvanceFIFO.prototype.shift = function () {
    var output = 0;
    if ((this.count | 0) > 0) {
        this.count = ((this.count | 0) - 1) | 0;
        output = this.buffer[this.position & 0x1F] << 3;
        this.position = ((this.position | 0) + 1) & 0x1F;
    }
    return output | 0;
}
GameBoyAdvanceFIFO.prototype.requestingDMA = function () {
    return ((this.count | 0) <= 0x10);
}
GameBoyAdvanceFIFO.prototype.samplesUntilDMATrigger = function () {
    return ((this.count | 0) - 0x10) | 0;
}
GameBoyAdvanceFIFO.prototype.clear = function () {
    this.count = 0;
}