"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceMosaicRenderer(buffer) {
    this.BGMosaicHSize = 0;
    this.BGMosaicVSize = 0;
    this.OBJMosaicHSize = 0;
    this.OBJMosaicVSize = 0;
    this.buffer = buffer;
}
GameBoyAdvanceMosaicRenderer.prototype.renderMosaicHorizontal = function (offset) {
    offset = offset | 0;
    var currentPixel = 0;
    var mosaicBlur = ((this.BGMosaicHSize | 0) + 1) | 0;
    if ((mosaicBlur | 0) > 1) {    //Don't perform a useless loop.
        for (var position = 0; (position | 0) < 240; position = ((position | 0) + 1) | 0) {
            if ((((position | 0) % (mosaicBlur | 0)) | 0) == 0) {
                currentPixel = this.buffer[position | offset] | 0;
            }
            else {
                this.buffer[position | offset] = currentPixel | 0;
            }
        }
    }
}
GameBoyAdvanceMosaicRenderer.prototype.renderOBJMosaicHorizontal = function (layer, xOffset, xSize) {
    xOffset = xOffset | 0;
    xSize = xSize | 0;
    var currentPixel = 0x3800000;
    var mosaicBlur = ((this.OBJMosaicHSize | 0) + 1) | 0;
    if ((mosaicBlur | 0) > 1) {    //Don't perform a useless loop.
        for (var position = ((xOffset | 0) % (mosaicBlur | 0)) | 0; (position | 0) < (xSize | 0); position = ((position | 0) + 1) | 0) {
            if ((((position | 0) % (mosaicBlur | 0)) | 0) == 0) {
                currentPixel = layer[position | 0] | 0;
            }
            layer[position | 0] = currentPixel | 0;
        }
    }
}
GameBoyAdvanceMosaicRenderer.prototype.getMosaicYOffset = function (line) {
    line = line | 0;
    return ((line | 0) % (((this.BGMosaicVSize | 0) + 1) | 0)) | 0;
}
GameBoyAdvanceMosaicRenderer.prototype.getOBJMosaicYOffset = function (line) {
    line = line | 0;
    return ((line | 0) % (((this.OBJMosaicVSize | 0) + 1) | 0)) | 0;
}
GameBoyAdvanceMosaicRenderer.prototype.writeMOSAIC8_0 = function (data) {
    data = data | 0;
    this.BGMosaicHSize = data & 0xF;
    this.BGMosaicVSize = data >> 4;
}
GameBoyAdvanceMosaicRenderer.prototype.writeMOSAIC8_1 = function (data) {
    data = data | 0;
    this.OBJMosaicHSize = data & 0xF;
    this.OBJMosaicVSize = data >> 4;
}
GameBoyAdvanceMosaicRenderer.prototype.writeMOSAIC16 = function (data) {
    data = data | 0;
    this.BGMosaicHSize = data & 0xF;
    this.BGMosaicVSize = (data >> 4) & 0xF;
    this.OBJMosaicHSize = (data >> 8) & 0xF;
    this.OBJMosaicVSize = data >> 12;
}
