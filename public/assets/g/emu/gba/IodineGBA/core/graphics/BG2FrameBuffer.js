"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceBG2FrameBufferRenderer(gfx) {
    this.gfx = gfx;
}
GameBoyAdvanceBG2FrameBufferRenderer.prototype.initialize = function () {
    this.palette = this.gfx.palette256;
    this.VRAM = this.gfx.VRAM;
    this.VRAM16 = this.gfx.VRAM16;
    this.fetchPixel = this.fetchMode3Pixel;
    this.bgAffineRenderer = this.gfx.bgAffineRenderer0;
    this.frameSelect = 0;
}
GameBoyAdvanceBG2FrameBufferRenderer.prototype.selectMode = function (mode) {
    mode = mode | 0;
    switch (mode | 0) {
        case 3:
            this.fetchPixel = this.fetchMode3Pixel;
            break;
        case 4:
            this.fetchPixel = this.fetchMode4Pixel;
            break;
        case 5:
            this.fetchPixel = this.fetchMode5Pixel;
    }
}
GameBoyAdvanceBG2FrameBufferRenderer.prototype.renderScanLine = function (line) {
    line = line | 0;
    this.bgAffineRenderer.renderScanLine(line | 0, this);
}
if (__LITTLE_ENDIAN__) {
    if (typeof Math.imul == "function") {
        //Math.imul found, insert the optimized path in:
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode3Pixel = function (x, y) {
            x = x | 0;
            y = y | 0;
            //Output pixel:
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 240 && (y | 0) < 160) {
                var address = (Math.imul(y | 0, 240) + (x | 0)) | 0;
                return this.VRAM16[address & 0xFFFF] & 0x7FFF;
            }
            //Out of range, output transparency:
            return 0x3800000;
        }
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode5Pixel = function (x, y) {
            x = x | 0;
            y = y | 0;
            //Output pixel:
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 160 && (y | 0) < 128) {
                var address = ((this.frameSelect | 0) + Math.imul(y | 0, 160) + (x | 0)) | 0;
                return this.VRAM16[address & 0xFFFF] & 0x7FFF;
            }
            //Out of range, output transparency:
            return 0x3800000;
        }
    }
    else {
        //Math.imul not found, use the compatibility method:
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode3Pixel = function (x, y) {
            x = x | 0;
            y = y | 0;
            //Output pixel:
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 240 && (y | 0) < 160) {
                var address = (((y * 240) | 0) + (x | 0)) | 0;
                return this.VRAM16[address & 0xFFFF] & 0x7FFF;
            }
            //Out of range, output transparency:
            return 0x3800000;
        }
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode5Pixel = function (x, y) {
            x = x | 0;
            y = y | 0;
            //Output pixel:
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 160 && (y | 0) < 128) {
                var address = ((this.frameSelect | 0) + ((y * 160) | 0) + (x | 0)) | 0;
                return this.VRAM16[address & 0xFFFF] & 0x7FFF;
            }
            //Out of range, output transparency:
            return 0x3800000;
        }
    }
}
else {
    if (typeof Math.imul == "function") {
        //Math.imul found, insert the optimized path in:
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode3Pixel = function (x, y) {
            x = x | 0;
            y = y | 0;
            //Output pixel:
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 240 && (y | 0) < 160) {
                var address = (Math.imul(y | 0, 240) + (x | 0)) << 1;
                return ((this.VRAM[address | 1] << 8) | this.VRAM[address | 0]) & 0x7FFF;
            }
            //Out of range, output transparency:
            return 0x3800000;
        }
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode5Pixel = function (x, y) {
            x = x | 0;
            y = y | 0;
            //Output pixel:
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 160 && (y | 0) < 128) {
                var address = ((this.frameSelect | 0) + ((Math.imul(y | 0, 160) + (x | 0)) << 1)) | 0;
                return ((this.VRAM[address | 1] << 8) | this.VRAM[address | 0]) & 0x7FFF;
            }
            //Out of range, output transparency:
            return 0x3800000;
        }
    }
    else {
        //Math.imul not found, use the compatibility method:
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode3Pixel = function (x, y) {
            //Output pixel:
            if (x > -1 && y > -1 && x < 240 && y < 160) {
                var address = ((y * 240) + x) << 1;
                return ((this.VRAM[address | 1] << 8) | this.VRAM[address]) & 0x7FFF;
            }
            //Out of range, output transparency:
            return 0x3800000;
        }
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode5Pixel = function (x, y) {
            //Output pixel:
            if (x > -1 && y > -1 && x < 160 && y < 128) {
                var address = this.frameSelect + (((y * 160) + x) << 1);
                return ((this.VRAM[address | 1] << 8) | this.VRAM[address]) & 0x7FFF;
            }
            //Out of range, output transparency:
            return 0x3800000;
        }
    }
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode4Pixel = function (x, y) {
        x = x | 0;
        y = y | 0;
        //Output pixel:
        if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 240 && (y | 0) < 160) {
            var address = ((this.frameSelect | 0) + (Math.imul(y | 0, 240) | 0) + (x | 0)) | 0;
            return this.palette[this.VRAM[address | 0] & 0xFF] | 0;
        }
        //Out of range, output transparency:
        return 0x3800000;
    }
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode4Pixel = function (x, y) {
        //Output pixel:
        if (x > -1 && y > -1 && x < 240 && y < 160) {
            return this.palette[this.VRAM[this.frameSelect + (y * 240) + x]];
        }
        //Out of range, output transparency:
        return 0x3800000;
    }
}
GameBoyAdvanceBG2FrameBufferRenderer.prototype.writeFrameSelect = function (frameSelect) {
    frameSelect = frameSelect >> 31;
    this.frameSelect = frameSelect & 0xA000;
}
