"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceRendererProxy(IOCore) {
    //Build references:
    this.IOCore = IOCore;
}
GameBoyAdvanceRendererProxy.prototype.initialize = function () {
    this.IOData8 = getUint8Array(20);
    this.IOData16 = getUint16View(this.IOData8);
    this.IOData32 = getInt32View(this.IOData8);
    this.gfxState = this.IOCore.gfxState;
    this.renderer = new GameBoyAdvanceGraphicsRenderer(this.IOCore.coreExposed, !this.IOCore.BIOSFound || this.IOCore.settings.SKIPBoot);
}
GameBoyAdvanceRendererProxy.prototype.incrementScanLineQueue = function () {
    this.renderer.incrementScanLineQueue();
}
GameBoyAdvanceRendererProxy.prototype.ensureFraming = function () {
    this.renderer.ensureFraming();
}
GameBoyAdvanceRendererProxy.prototype.writeDISPCNT8_0 = function (data) {
    data = data | 0;
    data = data & 0xF7;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[0] = data | 0;
    this.renderer.writeDISPCNT8_0(data | 0);
    this.gfxState.isRenderingCheckPreprocess();
}
GameBoyAdvanceRendererProxy.prototype.readDISPCNT8_0 = function () {
    return this.IOData8[0] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeDISPCNT8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[1] = data | 0;
    this.renderer.writeDISPCNT8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readDISPCNT8_1 = function () {
    return this.IOData8[1] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeDISPCNT8_2 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[2] = data | 0;
    this.renderer.writeDISPCNT8_2(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readDISPCNT8_2 = function () {
    return this.IOData8[2] | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceRendererProxy.prototype.writeDISPCNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFF7;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[0] = data | 0;
        this.renderer.writeDISPCNT16(data | 0);
        this.gfxState.isRenderingCheckPreprocess();
    }
    GameBoyAdvanceRendererProxy.prototype.readDISPCNT16 = function () {
        return this.IOData16[0] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.writeDISPCNT32 = function (data) {
        data = data | 0;
        data = data & 0x1FFF7;
        this.IOCore.updateGraphicsClocking();
        this.IOData32[0] = data | 0;
        this.renderer.writeDISPCNT32(data | 0);
        this.gfxState.isRenderingCheckPreprocess();
    }
    GameBoyAdvanceRendererProxy.prototype.readDISPCNT32 = function () {
        return this.IOData32[0] | 0;
    }
}
else {
    GameBoyAdvanceRendererProxy.prototype.writeDISPCNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFF7;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[0] = data & 0xF7;
        this.IOData8[1] = data >> 8;
        this.renderer.writeDISPCNT16(data | 0);
        this.gfxState.isRenderingCheckPreprocess();
    }
    GameBoyAdvanceRendererProxy.prototype.readDISPCNT16 = function () {
        return this.IOData8[0] | (this.IOData8[1] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.writeDISPCNT32 = function (data) {
        data = data | 0;
        data = data & 0x1FFF7;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[0] = data & 0xF7;
        this.IOData8[1] = (data >> 8) & 0xFF;
        this.IOData8[2] = data >> 16;
        this.renderer.writeDISPCNT32(data | 0);
        this.gfxState.isRenderingCheckPreprocess();
    }
    GameBoyAdvanceRendererProxy.prototype.readDISPCNT32 = function () {
        return this.IOData8[0] | (this.IOData8[1] << 8) | (this.IOData8[2] << 16);
    }
}
GameBoyAdvanceRendererProxy.prototype.writeBG0CNT8_0 = function (data) {
    data = data | 0;
    data = data & 0xCF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[4] = data | 0;
    this.renderer.writeBG0CNT8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBG0CNT8_0 = function () {
    return this.IOData8[4] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBG0CNT8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[5] = data | 0;
    this.renderer.writeBG0CNT8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBG0CNT8_1 = function () {
    return this.IOData8[5] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBG1CNT8_0 = function (data) {
    data = data | 0;
    data = data & 0xCF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[6] = data | 0;
    this.renderer.writeBG1CNT8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBG1CNT8_0 = function () {
    return this.IOData8[6] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBG1CNT8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[7] = data | 0;
    this.renderer.writeBG1CNT8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBG1CNT8_1 = function () {
    return this.IOData8[7] | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceRendererProxy.prototype.writeBG0CNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[2] = data | 0;
        this.renderer.writeBG0CNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBG1CNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[3] = data | 0;
        this.renderer.writeBG1CNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBG0BG1CNT32 = function (data) {
        data = data | 0;
        data = data & 0xFFCFFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData32[1] = data | 0;
        this.renderer.writeBG0BG1CNT32(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.readBG0CNT16 = function () {
        return this.IOData16[2] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.readBG1CNT16 = function () {
        return this.IOData16[3] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.readBG0BG1CNT32 = function () {
        return this.IOData32[1] | 0;
    }
}
else {
    GameBoyAdvanceRendererProxy.prototype.writeBG0CNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[4] = data & 0xFF;
        this.IOData8[5] = data >> 8;
        this.renderer.writeBG0CNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBG1CNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[6] = data & 0xFF;
        this.IOData8[7] = data >> 8;
        this.renderer.writeBG1CNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBG0BG1CNT32 = function (data) {
        data = data | 0;
        data = data & 0xFFCFFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[4] = data & 0xFF;
        this.IOData8[5] = (data >> 8) & 0xFF;
        this.IOData8[6] = (data >> 16) & 0xFF;
        this.IOData8[7] = data >>> 24;
        this.renderer.writeBG0BG1CNT32(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.readBG0CNT16 = function () {
        return this.IOData8[4] | (this.IOData8[5] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.readBG1CNT16 = function () {
        return this.IOData8[6] | (this.IOData8[7] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.readBG0BG1CNT32 = function () {
        return this.IOData8[4] | (this.IOData8[5] << 8) | (this.IOData8[6] << 16) | (this.IOData8[7] << 24);
    }
}
GameBoyAdvanceRendererProxy.prototype.writeBG2CNT8_0 = function (data) {
    data = data | 0;
    data = data & 0xCF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[8] = data | 0;
    this.renderer.writeBG2CNT8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBG2CNT8_0 = function () {
    return this.IOData8[8] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBG2CNT8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[9] = data | 0;
    this.renderer.writeBG2CNT8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBG2CNT8_1 = function () {
    return this.IOData8[9] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBG3CNT8_0 = function (data) {
    data = data | 0;
    data = data & 0xCF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[10] = data | 0;
    this.renderer.writeBG3CNT8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBG3CNT8_0 = function () {
    return this.IOData8[10] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBG3CNT8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[11] = data | 0;
    this.renderer.writeBG3CNT8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBG3CNT8_1 = function () {
    return this.IOData8[11] | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceRendererProxy.prototype.writeBG2CNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[4] = data | 0;
        this.renderer.writeBG2CNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBG3CNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[5] = data | 0;
        this.renderer.writeBG3CNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBG2BG3CNT32 = function (data) {
        data = data | 0;
        data = data & 0xFFCFFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData32[2] = data | 0;
        this.renderer.writeBG2BG3CNT32(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.readBG2CNT16 = function () {
        return this.IOData16[4] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.readBG3CNT16 = function () {
        return this.IOData16[5] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.readBG2BG3CNT32 = function () {
        return this.IOData32[2] | 0;
    }
}
else {
    GameBoyAdvanceRendererProxy.prototype.writeBG2CNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[8] = data & 0xFF;
        this.IOData8[9] = data >> 8;
        this.renderer.writeBG2CNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBG3CNT16 = function (data) {
        data = data | 0;
        data = data & 0xFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[10] = data & 0xFF;
        this.IOData8[11] = data >> 8;
        this.renderer.writeBG3CNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBG2BG3CNT32 = function (data) {
        data = data | 0;
        data = data & 0xFFCFFFCF;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[8] = data & 0xFF;
        this.IOData8[9] = (data >> 8) & 0xFF;
        this.IOData8[10] = (data >> 16) & 0xFF;
        this.IOData8[11] = data >>> 24;
        this.renderer.writeBG2BG3CNT32(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.readBG2CNT16 = function () {
        return this.IOData8[8] | (this.IOData8[9] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.readBG3CNT16 = function () {
        return this.IOData8[10] | (this.IOData8[11] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.readBG2BG3CNT32 = function () {
        return this.IOData8[8] | (this.IOData8[9] << 8) | (this.IOData8[10] << 16) | (this.IOData8[11] << 24);
    }
}
GameBoyAdvanceRendererProxy.prototype.writeBG0HOFS8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG0HOFS8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG0HOFS8_1 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG0HOFS8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG0HOFS16 = function (data) {
    data = data | 0;
    data = data & 0x1FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG0HOFS16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG0VOFS8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG0VOFS8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG0VOFS8_1 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG0VOFS8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG0VOFS16 = function (data) {
    data = data | 0;
    data = data & 0x1FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG0VOFS16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG0OFS32 = function (data) {
    data = data | 0;
    data = data & 0x1FF01FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG0OFS32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG1HOFS8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG1HOFS8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG1HOFS8_1 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG1HOFS8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG1HOFS16 = function (data) {
    data = data | 0;
    data = data & 0x1FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG1HOFS16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG1VOFS8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG1VOFS8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG1VOFS8_1 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG1VOFS8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG1VOFS16 = function (data) {
    data = data | 0;
    data = data & 0x1FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG1VOFS16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG1OFS32 = function (data) {
    data = data | 0;
    data = data & 0x1FF01FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG1OFS32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2HOFS8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2HOFS8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2HOFS8_1 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2HOFS8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2HOFS16 = function (data) {
    data = data | 0;
    data = data & 0x1FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2HOFS16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2VOFS8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2VOFS8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2VOFS8_1 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2VOFS8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2VOFS16 = function (data) {
    data = data | 0;
    data = data & 0x1FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2VOFS16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2OFS32 = function (data) {
    data = data | 0;
    data = data & 0x1FF01FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2OFS32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3HOFS8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3HOFS8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3HOFS8_1 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3HOFS8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3HOFS16 = function (data) {
    data = data | 0;
    data = data & 0x1FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3HOFS16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3VOFS8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3VOFS8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3VOFS8_1 = function (data) {
    data = data | 0;
    data = data & 0x1;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3VOFS8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3VOFS16 = function (data) {
    data = data | 0;
    data = data & 0x1FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3VOFS16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3OFS32 = function (data) {
    data = data | 0;
    data = data & 0x1FF01FF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3OFS32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PA8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PA8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PA8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PA8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PA16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PA16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PB8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PB8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PB8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PB8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PB16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PB16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PAB32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PAB32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PC8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PC8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PC8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PC8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PC16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PC16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PD8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PD8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PD8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PD8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PD16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PD16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2PCD32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2PCD32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PA8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PA8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PA8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PA8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PA16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PA16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PB8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PB8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PB8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PB8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PB16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PB16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PAB32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PAB32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PC8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PC8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PC8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PC8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PC16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PC16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PD8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PD8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PD8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PD8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PD16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PD16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3PCD32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3PCD32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2X8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2X8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2X8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2X8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2X8_2 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2X8_2(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2X8_3 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2X8_3(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2X16_0 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2X16_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2X16_1 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2X16_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2X32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2X32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2Y8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2Y8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2Y8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2Y8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2Y8_2 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2Y8_2(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2Y8_3 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2Y8_3(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2Y16_0 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2Y16_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2Y16_1 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2Y16_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG2Y32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG2Y32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3X8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3X8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3X8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3X8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3X8_2 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3X8_2(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3X8_3 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3X8_3(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3X16_0 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3X16_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3X16_1 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3X16_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3X32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3X32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3Y8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3Y8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3Y8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3Y8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3Y8_2 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3Y8_2(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3Y8_3 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3Y8_3(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3Y16_0 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3Y16_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3Y16_1 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3Y16_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBG3Y32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBG3Y32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN0XCOORDRight8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN0XCOORDRight8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN0XCOORDLeft8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN0XCOORDLeft8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN0XCOORD16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN0XCOORD16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN1XCOORDRight8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN1XCOORDRight8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN1XCOORDLeft8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN1XCOORDLeft8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN1XCOORD16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN1XCOORD16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWINXCOORD32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWINXCOORD32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN0YCOORDBottom8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN0YCOORDBottom8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN0YCOORDTop8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN0YCOORDTop8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN0YCOORD16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN0YCOORD16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN1YCOORDBottom8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN1YCOORDBottom8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN1YCOORDTop8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN1YCOORDTop8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN1YCOORD16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWIN1YCOORD16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWINYCOORD32 = function (data) {
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeWINYCOORD32(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeWIN0IN8 = function (data) {
    data = data | 0;
    data = data & 0x3F;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[12] = data | 0;
    this.renderer.writeWIN0IN8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readWIN0IN8 = function () {
    return this.IOData8[12] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeWIN1IN8 = function (data) {
    data = data | 0;
    data = data & 0x3F;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[13] = data | 0;
    this.renderer.writeWIN1IN8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readWIN1IN8 = function () {
    return this.IOData8[13] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeWINOUT8 = function (data) {
    data = data | 0;
    data = data & 0x3F;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[14] = data | 0;
    this.renderer.writeWINOUT8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readWINOUT8 = function () {
    return this.IOData8[14] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeWINOBJIN8 = function (data) {
    data = data | 0;
    data = data & 0x3F;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[15] = data | 0;
    this.renderer.writeWINOBJIN8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readWINOBJIN8 = function () {
    return this.IOData8[15] | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceRendererProxy.prototype.writeWININ16 = function (data) {
        data = data | 0;
        data = data & 0x3F3F;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[6] = data | 0;
        this.renderer.writeWININ16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeWINOUT16 = function (data) {
        data = data | 0;
        data = data & 0x3F3F;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[7] = data | 0;
        this.renderer.writeWINOUT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeWINCONTROL32 = function (data) {
        data = data | 0;
        data = data & 0x3F3F3F3F;
        this.IOCore.updateGraphicsClocking();
        this.IOData32[3] = data | 0;
        this.renderer.writeWINCONTROL32(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.readWININ16 = function () {
        return this.IOData16[6] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.readWINOUT16 = function () {
        return this.IOData16[7] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.readWINCONTROL32 = function () {
        return this.IOData32[3] | 0;
    }
}
else {
    GameBoyAdvanceRendererProxy.prototype.writeWININ16 = function (data) {
        data = data | 0;
        data = data & 0x3F3F;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[12] = data & 0xFF;
        this.IOData8[13] = data >> 8;
        this.renderer.writeWININ16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeWINOUT16 = function (data) {
        data = data | 0;
        data = data & 0x3F3F;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[14] = data & 0xFF;
        this.IOData8[15] = data >> 8;
        this.renderer.writeWINOUT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeWINCONTROL32 = function (data) {
        data = data | 0;
        data = data & 0x3F3F3F3F;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[12] = data & 0xFF;
        this.IOData8[13] = (data >> 8) & 0xFF;
        this.IOData8[14] = (data >> 16) & 0xFF;
        this.IOData8[15] = data >>> 24;
        this.renderer.writeWINCONTROL32(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.readWININ16 = function () {
        return this.IOData8[12] | (this.IOData8[13] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.readWINOUT16 = function () {
        return this.IOData8[14] | (this.IOData8[15] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.readWINCONTROL32 = function () {
        return this.IOData8[12] | (this.IOData8[13] << 8) | (this.IOData8[14] << 16) | (this.IOData8[15] << 24);
    }
}
GameBoyAdvanceRendererProxy.prototype.writeMOSAIC8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeMOSAIC8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeMOSAIC8_1 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeMOSAIC8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeMOSAIC16 = function (data) {
    data = data | 0;
    data = data & 0xFFFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeMOSAIC16(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeBLDCNT8_0 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[16] = data | 0;
    this.renderer.writeBLDCNT8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBLDCNT8_0 = function () {
    return this.IOData8[16] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBLDCNT8_1 = function (data) {
    data = data | 0;
    data = data & 0x3F;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[17] = data | 0;
    this.renderer.writeBLDCNT8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBLDCNT8_1 = function () {
    return this.IOData8[17] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBLDALPHA8_0 = function (data) {
    data = data | 0;
    data = data & 0x1F;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[18] = data | 0;
    this.renderer.writeBLDALPHA8_0(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBLDALPHA8_0 = function () {
    return this.IOData8[18] | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeBLDALPHA8_1 = function (data) {
    data = data | 0;
    data = data & 0x1F;
    this.IOCore.updateGraphicsClocking();
    this.IOData8[19] = data | 0;
    this.renderer.writeBLDALPHA8_1(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readBLDALPHA8_1 = function () {
    return this.IOData8[19] | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceRendererProxy.prototype.writeBLDCNT16 = function (data) {
        data = data | 0;
        data = data & 0x3FFF;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[8] = data | 0;
        this.renderer.writeBLDCNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBLDALPHA16 = function (data) {
        data = data | 0;
        data = data & 0x1F1F;
        this.IOCore.updateGraphicsClocking();
        this.IOData16[9] = data | 0;
        this.renderer.writeBLDALPHA16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBLDCNT32 = function (data) {
        data = data | 0;
        data = data & 0x1F1F3FFF;
        this.IOCore.updateGraphicsClocking();
        this.IOData32[4] = data | 0;
        this.renderer.writeBLDCNT32(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.readBLDCNT16 = function () {
        return this.IOData16[8] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.readBLDALPHA16 = function () {
        return this.IOData16[9] | 0;
    }
    GameBoyAdvanceRendererProxy.prototype.readBLDCNT32 = function () {
        return this.IOData32[4] | 0;
    }
}
else {
    GameBoyAdvanceRendererProxy.prototype.writeBLDCNT16 = function (data) {
        data = data | 0;
        data = data & 0x3FFF;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[16] = data & 0xFF;
        this.IOData8[17] = data >> 8;
        this.renderer.writeBLDCNT16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBLDALPHA16 = function (data) {
        data = data | 0;
        data = data & 0x1F1F;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[18] = data & 0xFF;
        this.IOData8[19] = data >> 8;
        this.renderer.writeBLDALPHA16(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.writeBLDCNT32 = function (data) {
        data = data | 0;
        data = data & 0x1F1F3FFF;
        this.IOCore.updateGraphicsClocking();
        this.IOData8[16] = data & 0xFF;
        this.IOData8[17] = (data >> 8) & 0xFF;
        this.IOData8[18] = (data >> 16) & 0xFF;
        this.IOData8[19] = data >>> 24;
        this.renderer.writeBLDCNT32(data | 0);
    }
    GameBoyAdvanceRendererProxy.prototype.readBLDCNT16 = function () {
        return this.IOData8[16] | (this.IOData8[17] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.readBLDALPHA16 = function () {
        return this.IOData8[18] | (this.IOData8[19] << 8);
    }
    GameBoyAdvanceRendererProxy.prototype.readBLDCNT32 = function () {
        return this.IOData8[16] | (this.IOData8[17] << 8) | (this.IOData8[18] << 16) | (this.IOData8[19] << 24);
    }
}
GameBoyAdvanceRendererProxy.prototype.writeBLDY8 = function (data) {
    data = data | 0;
    data = data & 0xFF;
    this.IOCore.updateGraphicsClocking();
    this.renderer.writeBLDY8(data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeVRAM8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.renderer.writeVRAM8(address | 0, data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeVRAM16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.renderer.writeVRAM16(address | 0, data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeVRAM32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.renderer.writeVRAM32(address | 0, data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readVRAM16 = function (address) {
    address = address | 0;
    var data = this.renderer.readVRAM16(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceRendererProxy.prototype.readVRAM32 = function (address) {
    address = address | 0;
    var data = this.renderer.readVRAM32(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceRendererProxy.prototype.writePalette16 = function (address, data) {
    data = data | 0;
    address = address | 0;
    this.renderer.writePalette16(address | 0, data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writePalette32 = function (address, data) {
    data = data | 0;
    address = address | 0;
    this.renderer.writePalette32(address | 0, data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readPalette16 = function (address) {
    address = address | 0;
    var data = this.renderer.readPalette16(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceRendererProxy.prototype.readPalette32 = function (address) {
    address = address | 0;
    var data = this.renderer.readPalette32(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceRendererProxy.prototype.readVRAM8 = function (address) {
    address = address | 0;
    var data = this.renderer.readVRAM8(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceRendererProxy.prototype.writeOAM16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.renderer.writeOAM16(address | 0, data | 0);
}
GameBoyAdvanceRendererProxy.prototype.writeOAM32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.renderer.writeOAM32(address | 0, data | 0);
}
GameBoyAdvanceRendererProxy.prototype.readOAM = function (address) {
    address = address | 0;
    var data = this.renderer.readOAM(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceRendererProxy.prototype.readOAM16 = function (address) {
    address = address | 0;
    var data = this.renderer.readOAM16(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceRendererProxy.prototype.readOAM32 = function (address) {
    address = address | 0;
    var data = this.renderer.readOAM32(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceRendererProxy.prototype.readPalette8 = function (address) {
    address = address | 0;
    var data = this.renderer.readPalette8(address | 0) | 0;
    return data | 0;
}
