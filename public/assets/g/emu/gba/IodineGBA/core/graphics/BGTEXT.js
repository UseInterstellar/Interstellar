"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceBGTEXTRenderer(gfx, BGLayer) {
    BGLayer = BGLayer | 0;
    this.gfx = gfx;
    this.BGLayer = BGLayer | 0;
}
if (__VIEWS_SUPPORTED__) {
    GameBoyAdvanceBGTEXTRenderer.prototype.initialize = function () {
        this.VRAM = this.gfx.VRAM;
        this.VRAM16 = this.gfx.VRAM16;
        this.VRAM32 = this.gfx.VRAM32;
        this.palette16 = this.gfx.palette16;
        this.palette256 = this.gfx.palette256;
        this.offset = ((this.BGLayer << 8) + 0x100) | 0;
        this.scratchBuffer = getInt32ViewCustom(this.gfx.buffer, this.offset | 0, ((this.offset | 0) + 248) | 0);
        this.tileFetched = getInt32ViewCustom(this.gfx.buffer, ((this.offset | 0) + 0xF8) | 0, ((this.offset | 0) + 0x100) | 0);
        this.BGXCoord = 0;
        this.BGYCoord = 0;
        this.do256 = 0;
        this.screenSizePreprocess();
        this.priorityPreprocess();
        this.screenBaseBlockPreprocess();
        this.characterBaseBlockPreprocess();
    }
    GameBoyAdvanceBGTEXTRenderer.prototype.renderWholeTiles8BIT = function (xTileStart, yTileStart, yTileOffset) {
        xTileStart = xTileStart | 0;
        yTileStart = yTileStart | 0;
        yTileOffset = yTileOffset | 0;
        //Process full 8 pixels at a time:
        for (var position = (8 - (this.BGXCoord & 0x7)) | 0; (position | 0) < 240; position = ((position | 0) + 8) | 0) {
            //Fetch tile attributes:
            //Get 8 pixels of data:
            this.process8BitVRAM(this.fetchTile(yTileStart | 0, xTileStart | 0) | 0, yTileOffset | 0);
            //Copy the buffered tile to line:
            this.scratchBuffer[position | 0] = this.tileFetched[0] | 0;
            this.scratchBuffer[((position | 0) + 1) | 0] = this.tileFetched[1] | 0;
            this.scratchBuffer[((position | 0) + 2) | 0] = this.tileFetched[2] | 0;
            this.scratchBuffer[((position | 0) + 3) | 0] = this.tileFetched[3] | 0;
            this.scratchBuffer[((position | 0) + 4) | 0] = this.tileFetched[4] | 0;
            this.scratchBuffer[((position | 0) + 5) | 0] = this.tileFetched[5] | 0;
            this.scratchBuffer[((position | 0) + 6) | 0] = this.tileFetched[6] | 0;
            this.scratchBuffer[((position | 0) + 7) | 0] = this.tileFetched[7] | 0;
            //Increment a tile counter:
            xTileStart = ((xTileStart | 0) + 1) | 0;
        }
    }
    GameBoyAdvanceBGTEXTRenderer.prototype.renderWholeTiles4BIT = function (xTileStart, yTileStart, yTileOffset) {
        xTileStart = xTileStart | 0;
        yTileStart = yTileStart | 0;
        yTileOffset = yTileOffset | 0;
        //Process full 8 pixels at a time:
        for (var position = (8 - (this.BGXCoord & 0x7)) | 0; (position | 0) < 240; position = ((position | 0) + 8) | 0) {
            //Fetch tile attributes:
            //Get 8 pixels of data:
            this.process4BitVRAM(this.fetchTile(yTileStart | 0, xTileStart | 0) | 0, yTileOffset | 0);
            //Copy the buffered tile to line:
            this.scratchBuffer[position | 0] = this.tileFetched[0] | 0;
            this.scratchBuffer[((position | 0) + 1) | 0] = this.tileFetched[1] | 0;
            this.scratchBuffer[((position | 0) + 2) | 0] = this.tileFetched[2] | 0;
            this.scratchBuffer[((position | 0) + 3) | 0] = this.tileFetched[3] | 0;
            this.scratchBuffer[((position | 0) + 4) | 0] = this.tileFetched[4] | 0;
            this.scratchBuffer[((position | 0) + 5) | 0] = this.tileFetched[5] | 0;
            this.scratchBuffer[((position | 0) + 6) | 0] = this.tileFetched[6] | 0;
            this.scratchBuffer[((position | 0) + 7) | 0] = this.tileFetched[7] | 0;
            //Increment a tile counter:
            xTileStart = ((xTileStart | 0) + 1) | 0;
        }
    }
    GameBoyAdvanceBGTEXTRenderer.prototype.fetchVRAMStart = function () {
        //Handle the the first tile of the scan-line specially:
        var pixelPipelinePosition = this.BGXCoord & 0x7;
        switch (pixelPipelinePosition | 0) {
            case 0:
                this.scratchBuffer[0] = this.tileFetched[0] | 0;
            case 1:
                this.scratchBuffer[(1 - (pixelPipelinePosition | 0)) | 0] = this.tileFetched[1] | 0;
            case 2:
                this.scratchBuffer[(2 - (pixelPipelinePosition | 0)) | 0] = this.tileFetched[2] | 0;
            case 3:
                this.scratchBuffer[(3 - (pixelPipelinePosition | 0)) | 0] = this.tileFetched[3] | 0;
            case 4:
                this.scratchBuffer[(4 - (pixelPipelinePosition | 0)) | 0] = this.tileFetched[4] | 0;
            case 5:
                this.scratchBuffer[(5 - (pixelPipelinePosition | 0)) | 0] = this.tileFetched[5] | 0;
            case 6:
                this.scratchBuffer[(6 - (pixelPipelinePosition | 0)) | 0] = this.tileFetched[6] | 0;
            default:
                this.scratchBuffer[(7 - (pixelPipelinePosition | 0)) | 0] = this.tileFetched[7] | 0;
        }
    }
}
else {
    GameBoyAdvanceBGTEXTRenderer.prototype.initialize = function () {
        this.VRAM = this.gfx.VRAM;
        this.VRAM16 = this.gfx.VRAM16;
        this.VRAM32 = this.gfx.VRAM32;
        this.palette16 = this.gfx.palette16;
        this.palette256 = this.gfx.palette256;
        this.offset = (this.BGLayer << 8) + 0x100;
        this.offsetEnd = this.offset + 240;
        this.scratchBuffer = this.gfx.buffer;
        this.tileFetched = getInt32Array(8);
        this.BGXCoord = 0;
        this.BGYCoord = 0;
        this.do256 = 0;
        this.screenSizePreprocess();
        this.priorityPreprocess();
        this.screenBaseBlockPreprocess();
        this.characterBaseBlockPreprocess();
    }
    GameBoyAdvanceBGTEXTRenderer.prototype.renderWholeTiles8BIT = function (xTileStart, yTileStart, yTileOffset) {
        //Process full 8 pixels at a time:
        for (var position = 8 - (this.BGXCoord & 0x7) + this.offset; position < this.offsetEnd;) {
            //Fetch tile attributes:
            //Get 8 pixels of data:
            this.process8BitVRAM(this.fetchTile(yTileStart, xTileStart++), yTileOffset);
            //Copy the buffered tile to line:
            this.scratchBuffer[position++] = this.tileFetched[0];
            this.scratchBuffer[position++] = this.tileFetched[1];
            this.scratchBuffer[position++] = this.tileFetched[2];
            this.scratchBuffer[position++] = this.tileFetched[3];
            this.scratchBuffer[position++] = this.tileFetched[4];
            this.scratchBuffer[position++] = this.tileFetched[5];
            this.scratchBuffer[position++] = this.tileFetched[6];
            this.scratchBuffer[position++] = this.tileFetched[7];
        }
    }
    GameBoyAdvanceBGTEXTRenderer.prototype.renderWholeTiles4BIT = function (xTileStart, yTileStart, yTileOffset) {
        //Process full 8 pixels at a time:
        for (var position = 8 - (this.BGXCoord & 0x7) + this.offset; position < this.offsetEnd;) {
            //Fetch tile attributes:
            //Get 8 pixels of data:
            this.process4BitVRAM(this.fetchTile(yTileStart, xTileStart++), yTileOffset);
            //Copy the buffered tile to line:
            this.scratchBuffer[position++] = this.tileFetched[0];
            this.scratchBuffer[position++] = this.tileFetched[1];
            this.scratchBuffer[position++] = this.tileFetched[2];
            this.scratchBuffer[position++] = this.tileFetched[3];
            this.scratchBuffer[position++] = this.tileFetched[4];
            this.scratchBuffer[position++] = this.tileFetched[5];
            this.scratchBuffer[position++] = this.tileFetched[6];
            this.scratchBuffer[position++] = this.tileFetched[7];
        }
    }
    GameBoyAdvanceBGTEXTRenderer.prototype.fetchVRAMStart = function () {
        //Handle the the first tile of the scan-line specially:
        var pixelPipelinePosition = this.BGXCoord & 0x7;
        var offset = pixelPipelinePosition - this.offset;
        switch (pixelPipelinePosition | 0) {
            case 0:
                this.scratchBuffer[offset] = this.tileFetched[0];
            case 1:
                this.scratchBuffer[1 - offset] = this.tileFetched[1];
            case 2:
                this.scratchBuffer[2 - offset] = this.tileFetched[2];
            case 3:
                this.scratchBuffer[3 - offset] = this.tileFetched[3];
            case 4:
                this.scratchBuffer[4 - offset] = this.tileFetched[4];
            case 5:
                this.scratchBuffer[5 - offset] = this.tileFetched[5];
            case 6:
                this.scratchBuffer[6 - offset] = this.tileFetched[6];
            default:
                this.scratchBuffer[7 - offset] = this.tileFetched[7];
        }
    }
}
GameBoyAdvanceBGTEXTRenderer.prototype.renderScanLine = function (line) {
    line = line | 0;
    if ((this.gfx.BGMosaic[this.BGLayer & 3] | 0) != 0) {
        //Correct line number for mosaic:
        line = ((line | 0) - (this.gfx.mosaicRenderer.getMosaicYOffset(line | 0) | 0)) | 0;
    }
    var yTileOffset = ((line | 0) + (this.BGYCoord | 0)) & 0x7;
    var yTileStart = ((line | 0) + (this.BGYCoord | 0)) >> 3;
    var xTileStart = this.BGXCoord >> 3;
    //Render the tiles:
    if ((this.do256 | 0) != 0) {
        //8-bit palette mode:
        this.render8BITLine(yTileStart | 0, xTileStart | 0, yTileOffset | 0);
    }
    else {
        //4-bit palette mode:
        this.render4BITLine(yTileStart | 0, xTileStart | 0, yTileOffset | 0);
    }
    if ((this.gfx.BGMosaic[this.BGLayer & 3] | 0) != 0) {
        //Pixelize the line horizontally:
        this.gfx.mosaicRenderer.renderMosaicHorizontal(this.offset | 0);
    }
}
GameBoyAdvanceBGTEXTRenderer.prototype.render8BITLine = function (yTileStart, xTileStart, yTileOffset) {
    yTileStart = yTileStart | 0;
    xTileStart = xTileStart | 0;
    yTileOffset = yTileOffset | 0;
    //Fetch tile attributes:
    var chrData = this.fetchTile(yTileStart | 0, xTileStart | 0) | 0;
    xTileStart = ((xTileStart | 0) + 1) | 0;
    //Get 8 pixels of data:
    this.process8BitVRAM(chrData | 0, yTileOffset | 0);
    //Copy the buffered tile to line:
    this.fetchVRAMStart();
    //Render the rest of the tiles fast:
    this.renderWholeTiles8BIT(xTileStart | 0, yTileStart | 0, yTileOffset | 0);
}
GameBoyAdvanceBGTEXTRenderer.prototype.render4BITLine = function (yTileStart, xTileStart, yTileOffset) {
    //Fetch tile attributes:
    var chrData = this.fetchTile(yTileStart | 0, xTileStart | 0) | 0;
    xTileStart = ((xTileStart | 0) + 1) | 0;
    //Get 8 pixels of data:
    this.process4BitVRAM(chrData | 0, yTileOffset | 0);
    //Copy the buffered tile to line:
    this.fetchVRAMStart();
    //Render the rest of the tiles fast:
    this.renderWholeTiles4BIT(xTileStart | 0, yTileStart | 0, yTileOffset | 0);
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceBGTEXTRenderer.prototype.fetchTile = function (yTileStart, xTileStart) {
        yTileStart = yTileStart | 0;
        xTileStart = xTileStart | 0;
        //Find the tile code to locate the tile block:
        var address = ((this.computeTileNumber(yTileStart | 0, xTileStart | 0) | 0) + (this.BGScreenBaseBlock | 0)) | 0;
        return this.VRAM16[address & 0x7FFF] | 0;
    }
}
else {
    GameBoyAdvanceBGTEXTRenderer.prototype.fetchTile = function (yTileStart, xTileStart) {
        //Find the tile code to locate the tile block:
        var address = ((this.computeTileNumber(yTileStart, xTileStart) + this.BGScreenBaseBlock) << 1) & 0xFFFF;
        return (this.VRAM[address | 1] << 8) | this.VRAM[address];
    }
}
GameBoyAdvanceBGTEXTRenderer.prototype.computeTileNumber = function (yTile, xTile) {
    //Return the true tile number:
    yTile = yTile | 0;
    xTile = xTile | 0;
    var tileNumber = xTile & 0x1F;
    switch (this.tileMode | 0) {
        //1x1
        case 0:
            tileNumber = tileNumber | ((yTile & 0x1F) << 5);
            break;
        //2x1
        case 1:
            tileNumber = tileNumber | (((xTile & 0x20) | (yTile & 0x1F)) << 5);
            break;
        //1x2
        case 2:
            tileNumber = tileNumber | ((yTile & 0x3F) << 5);
            break;
        //2x2
        default:
            tileNumber = tileNumber | (((xTile & 0x20) | (yTile & 0x1F)) << 5) | ((yTile & 0x20) << 6);
    }
    return tileNumber | 0;
}
GameBoyAdvanceBGTEXTRenderer.prototype.process4BitVRAM = function (chrData, yOffset) {
    //16 color tile mode:
    chrData = chrData | 0;
    yOffset = yOffset | 0;
    //Parse flip attributes, grab palette, and then output pixel:
    var address = (chrData & 0x3FF) << 3;
    address = ((address | 0) + (this.BGCharacterBaseBlock | 0)) | 0;
    if ((chrData & 0x800) == 0) {
        //No vertical flip:
        address = ((address | 0) + (yOffset | 0)) | 0;

    }
    else {
        //Vertical flip:
        address = ((address | 0) + 7) | 0;
        address = ((address | 0) - (yOffset | 0)) | 0;
    }
    //Copy out our pixels:
    this.render4BitVRAM(chrData >> 8, address | 0);
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceBGTEXTRenderer.prototype.render4BitVRAM = function (chrData, address) {
        chrData = chrData | 0;
        address = address | 0;
        //Unrolled data tile line fetch:
        if ((address | 0) < 0x4000) {
            //Tile address valid:
            var paletteOffset = chrData & 0xF0;
            var data = this.VRAM32[address | 0] | 0;
            if ((chrData & 0x4) == 0) {
                //Normal Horizontal:
                this.tileFetched[0] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[1] = this.palette16[paletteOffset | ((data >> 4) & 0xF)] | this.priorityFlag;
                this.tileFetched[2] = this.palette16[paletteOffset | ((data >> 8) & 0xF)] | this.priorityFlag;
                this.tileFetched[3] = this.palette16[paletteOffset | ((data >> 12) & 0xF)] | this.priorityFlag;
                this.tileFetched[4] = this.palette16[paletteOffset | ((data >> 16) & 0xF)] | this.priorityFlag;
                this.tileFetched[5] = this.palette16[paletteOffset | ((data >> 20) & 0xF)] | this.priorityFlag;
                this.tileFetched[6] = this.palette16[paletteOffset | ((data >> 24) & 0xF)] | this.priorityFlag;
                this.tileFetched[7] = this.palette16[paletteOffset | (data >>> 28)] | this.priorityFlag;
            }
            else {
                //Flipped Horizontally:
                this.tileFetched[0] = this.palette16[paletteOffset | (data >>> 28)] | this.priorityFlag;
                this.tileFetched[1] = this.palette16[paletteOffset | ((data >> 24) & 0xF)] | this.priorityFlag;
                this.tileFetched[2] = this.palette16[paletteOffset | ((data >> 20) & 0xF)] | this.priorityFlag;
                this.tileFetched[3] = this.palette16[paletteOffset | ((data >> 16) & 0xF)] | this.priorityFlag;
                this.tileFetched[4] = this.palette16[paletteOffset | ((data >> 12) & 0xF)] | this.priorityFlag;
                this.tileFetched[5] = this.palette16[paletteOffset | ((data >> 8) & 0xF)] | this.priorityFlag;
                this.tileFetched[6] = this.palette16[paletteOffset | ((data >> 4) & 0xF)] | this.priorityFlag;
                this.tileFetched[7] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
            }
        }
        else {
            //Tile address invalid:
            this.addressInvalidRender();
        }
    }
}
else {
    GameBoyAdvanceBGTEXTRenderer.prototype.render4BitVRAM = function (chrData, address) {
        address <<= 2;
        //Unrolled data tile line fetch:
        if (address < 0x10000) {
            //Tile address valid:
            var paletteOffset = chrData & 0xF0;
            var data = this.VRAM[address];
            if ((chrData & 0x4) == 0) {
                //Normal Horizontal:
                this.tileFetched[0] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[1] = this.palette16[paletteOffset | (data >> 4)] | this.priorityFlag;
                data = this.VRAM[address | 1];
                this.tileFetched[2] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[3] = this.palette16[paletteOffset | (data >> 4)] | this.priorityFlag;
                data = this.VRAM[address | 2];
                this.tileFetched[4] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[5] = this.palette16[paletteOffset | (data >> 4)] | this.priorityFlag;
                data = this.VRAM[address | 3];
                this.tileFetched[6] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[7] = this.palette16[paletteOffset | (data >> 4)] | this.priorityFlag;
            }
            else {
                //Flipped Horizontally:
                this.tileFetched[7] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[6] = this.palette16[paletteOffset | (data >> 4)] | this.priorityFlag;
                data = this.VRAM[address | 1];
                this.tileFetched[5] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[4] = this.palette16[paletteOffset | (data >> 4)] | this.priorityFlag;
                data = this.VRAM[address | 2];
                this.tileFetched[3] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[2] = this.palette16[paletteOffset | (data >> 4)] | this.priorityFlag;
                data = this.VRAM[address | 3];
                this.tileFetched[1] = this.palette16[paletteOffset | (data & 0xF)] | this.priorityFlag;
                this.tileFetched[0] = this.palette16[paletteOffset | (data >> 4)] | this.priorityFlag;
            }
        }
        else {
            //Tile address invalid:
            this.addressInvalidRender();
        }
    }
}
/*
 If there was 64 bit typed array support,
 then process8BitVRAM, render8BitVRAMNormal,
 and render8BitVRAMFlipped could be optimized further.
 Namely make one fetch for tile data instead of two,
 and cancel a y-offset shift.
 */
GameBoyAdvanceBGTEXTRenderer.prototype.process8BitVRAM = function (chrData, yOffset) {
    //16 color tile mode:
    chrData = chrData | 0;
    yOffset = yOffset | 0;
    //Parse flip attributes, grab palette, and then output pixel:
    var address = (chrData & 0x3FF) << 4;
    address = ((address | 0) + (this.BGCharacterBaseBlock | 0)) | 0;
    //Copy out our pixels:
    switch (chrData & 0xC00) {
        //No Flip:
        case 0:
            address = ((address | 0) + (yOffset << 1)) | 0;
            this.render8BitVRAMNormal(address | 0);
            break;
        //Horizontal Flip:
        case 0x400:
            address = ((address | 0) + (yOffset << 1)) | 0;
            this.render8BitVRAMFlipped(address | 0);
            break;
        //Vertical Flip:
        case 0x800:
            address = ((address | 0) + 14) | 0;
            address = ((address | 0) - (yOffset << 1)) | 0;
            this.render8BitVRAMNormal(address | 0);
            break;
        //Horizontal & Vertical Flip:
        default:
            address = ((address | 0) + 14) | 0;
            address = ((address | 0) - (yOffset << 1)) | 0;
            this.render8BitVRAMFlipped(address | 0);
    }
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceBGTEXTRenderer.prototype.render8BitVRAMNormal = function (address) {
        address = address | 0;
        if ((address | 0) < 0x4000) {
            //Tile address valid:
            //Normal Horizontal:
            var data = this.VRAM32[address | 0] | 0;
            this.tileFetched[0] = this.palette256[data & 0xFF] | this.priorityFlag;
            this.tileFetched[1] = this.palette256[(data >> 8) & 0xFF] | this.priorityFlag;
            this.tileFetched[2] = this.palette256[(data >> 16) & 0xFF] | this.priorityFlag;
            this.tileFetched[3] = this.palette256[data >>> 24] | this.priorityFlag;
            data = this.VRAM32[address | 1] | 0;
            this.tileFetched[4] = this.palette256[data & 0xFF] | this.priorityFlag;
            this.tileFetched[5] = this.palette256[(data >> 8) & 0xFF] | this.priorityFlag;
            this.tileFetched[6] = this.palette256[(data >> 16) & 0xFF] | this.priorityFlag;
            this.tileFetched[7] = this.palette256[data >>> 24] | this.priorityFlag;
        }
        else {
            //Tile address invalid:
            this.addressInvalidRender();
        }
    }
    GameBoyAdvanceBGTEXTRenderer.prototype.render8BitVRAMFlipped = function (address) {
        address = address | 0;
        if ((address | 0) < 0x4000) {
            //Tile address valid:
            //Flipped Horizontally:
            var data = this.VRAM32[address | 0] | 0;
            this.tileFetched[4] = this.palette256[data >>> 24] | this.priorityFlag;
            this.tileFetched[5] = this.palette256[(data >> 16) & 0xFF] | this.priorityFlag;
            this.tileFetched[6] = this.palette256[(data >> 8) & 0xFF] | this.priorityFlag;
            this.tileFetched[7] = this.palette256[data & 0xFF] | this.priorityFlag;
            data = this.VRAM32[address | 1] | 0;
            this.tileFetched[0] = this.palette256[data >>> 24] | this.priorityFlag;
            this.tileFetched[1] = this.palette256[(data >> 16) & 0xFF] | this.priorityFlag;
            this.tileFetched[2] = this.palette256[(data >> 8) & 0xFF] | this.priorityFlag;
            this.tileFetched[3] = this.palette256[data & 0xFF] | this.priorityFlag;
        }
        else {
            //Tile address invalid:
            this.addressInvalidRender();
        }
    }
}
else {
    GameBoyAdvanceBGTEXTRenderer.prototype.render8BitVRAMNormal = function (address) {
        address <<= 2;
        if (address < 0x10000) {
            //Tile address valid:
            //Normal Horizontal:
            this.tileFetched[0] = this.palette256[this.VRAM[address]] | this.priorityFlag;
            this.tileFetched[1] = this.palette256[this.VRAM[address | 1]] | this.priorityFlag;
            this.tileFetched[2] = this.palette256[this.VRAM[address | 2]] | this.priorityFlag;
            this.tileFetched[3] = this.palette256[this.VRAM[address | 3]] | this.priorityFlag;
            this.tileFetched[4] = this.palette256[this.VRAM[address | 4]] | this.priorityFlag;
            this.tileFetched[5] = this.palette256[this.VRAM[address | 5]] | this.priorityFlag;
            this.tileFetched[6] = this.palette256[this.VRAM[address | 6]] | this.priorityFlag;
            this.tileFetched[7] = this.palette256[this.VRAM[address | 7]] | this.priorityFlag;
        }
        else {
            //Tile address invalid:
            this.addressInvalidRender();
        }
    }
    GameBoyAdvanceBGTEXTRenderer.prototype.render8BitVRAMFlipped = function (address) {
        address <<= 2;
        if (address < 0x10000) {
            //Tile address valid:
            //Flipped Horizontally:
            this.tileFetched[7] = this.palette256[this.VRAM[address]] | this.priorityFlag;
            this.tileFetched[6] = this.palette256[this.VRAM[address | 1]] | this.priorityFlag;
            this.tileFetched[5] = this.palette256[this.VRAM[address | 2]] | this.priorityFlag;
            this.tileFetched[4] = this.palette256[this.VRAM[address | 3]] | this.priorityFlag;
            this.tileFetched[3] = this.palette256[this.VRAM[address | 4]] | this.priorityFlag;
            this.tileFetched[2] = this.palette256[this.VRAM[address | 5]] | this.priorityFlag;
            this.tileFetched[1] = this.palette256[this.VRAM[address | 6]] | this.priorityFlag;
            this.tileFetched[0] = this.palette256[this.VRAM[address | 7]] | this.priorityFlag;
        }
        else {
            //Tile address invalid:
            this.addressInvalidRender();
        }
    }
}
GameBoyAdvanceBGTEXTRenderer.prototype.addressInvalidRender = function () {
    //In GBA mode on NDS, we display transparency on invalid tiles:
    var data = this.gfx.transparency | this.priorityFlag;
    this.tileFetched[0] = data | 0;
    this.tileFetched[1] = data | 0;
    this.tileFetched[2] = data | 0;
    this.tileFetched[3] = data | 0;
    this.tileFetched[4] = data | 0;
    this.tileFetched[5] = data | 0;
    this.tileFetched[6] = data | 0;
    this.tileFetched[7] = data | 0;
}
GameBoyAdvanceBGTEXTRenderer.prototype.paletteModeSelect = function (do256) {
    do256 = do256 | 0;
    this.do256 = do256 | 0;
}
GameBoyAdvanceBGTEXTRenderer.prototype.screenSizePreprocess = function () {
    this.tileMode = this.gfx.BGScreenSize[this.BGLayer & 0x3] | 0;
}
GameBoyAdvanceBGTEXTRenderer.prototype.priorityPreprocess = function () {
    this.priorityFlag = (this.gfx.BGPriority[this.BGLayer & 3] << 23) | (1 << (this.BGLayer | 0x10));
}
GameBoyAdvanceBGTEXTRenderer.prototype.screenBaseBlockPreprocess = function () {
    this.BGScreenBaseBlock = this.gfx.BGScreenBaseBlock[this.BGLayer & 3] << 10;
}
GameBoyAdvanceBGTEXTRenderer.prototype.characterBaseBlockPreprocess = function () {
    this.BGCharacterBaseBlock = this.gfx.BGCharacterBaseBlock[this.BGLayer & 3] << 12;
}
GameBoyAdvanceBGTEXTRenderer.prototype.writeBGHOFS8_0 = function (data) {
    data = data | 0;
    this.BGXCoord = (this.BGXCoord & 0x100) | data;
}
GameBoyAdvanceBGTEXTRenderer.prototype.writeBGHOFS8_1 = function (data) {
    data = data | 0;
    this.BGXCoord = (data << 8) | (this.BGXCoord & 0xFF);
}
GameBoyAdvanceBGTEXTRenderer.prototype.writeBGHOFS16 = function (data) {
    data = data | 0;
    this.BGXCoord = data | 0;
}
GameBoyAdvanceBGTEXTRenderer.prototype.writeBGVOFS8_0 = function (data) {
    data = data | 0;
    this.BGYCoord = (this.BGYCoord & 0x100) | data;
}
GameBoyAdvanceBGTEXTRenderer.prototype.writeBGVOFS8_1 = function (data) {
    data = data | 0;
    this.BGYCoord = (data << 8) | (this.BGYCoord & 0xFF);
}
GameBoyAdvanceBGTEXTRenderer.prototype.writeBGVOFS16 = function (data) {
    data = data | 0;
    this.BGYCoord = data | 0;
}
GameBoyAdvanceBGTEXTRenderer.prototype.writeBGOFS32 = function (data) {
    data = data | 0;
    this.BGXCoord = data & 0x1FF;
    this.BGYCoord = data >> 16;
}
