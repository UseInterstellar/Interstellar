"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceMemory(IOCore) {
    //Reference to the emulator core:
    this.IOCore = IOCore;
}
GameBoyAdvanceMemory.prototype.initialize = function () {
    //WRAM Map Control Stuff:
    this.WRAMControlFlags = 0x20;
    //Load the BIOS:
    this.BIOS = getUint8Array(0x4000);
    this.BIOS16 = getUint16View(this.BIOS);
    this.BIOS32 = getInt32View(this.BIOS);
    this.loadBIOS();
    //Initialize Some RAM:
    this.externalRAM = getUint8Array(0x40000);
    this.externalRAM16 = getUint16View(this.externalRAM);
    this.externalRAM32 = getInt32View(this.externalRAM);
    this.internalRAM = getUint8Array(0x8000);
    this.internalRAM16 = getUint16View(this.internalRAM);
    this.internalRAM32 = getInt32View(this.internalRAM);
    this.lastBIOSREAD = 0;        //BIOS read bus last.
    //After all sub-objects initialized, initialize dispatches:
    this.memoryRead8 = this.memoryRead8Generated[1];
    this.memoryWrite8 = this.memoryWrite8Generated[1];
    this.memoryRead16 = this.memoryRead16Generated[1];
    this.memoryReadDMA16 = this.memoryReadDMA16Generated[1];
    this.memoryReadDMAFull16 = this.memoryReadDMA16FullGenerated[1];
    this.memoryReadCPU16 = this.memoryReadCPU16Generated[1];
    this.memoryWrite16 = this.memoryWrite16Generated[1];
    this.memoryWriteDMA16 = this.memoryWriteDMA16Generated[1];
    this.memoryWriteDMAFull16 = this.memoryWriteDMA16FullGenerated[1];
    this.memoryRead32 = this.memoryRead32Generated[1];
    this.memoryReadDMA32 = this.memoryReadDMA32Generated[1];
    this.memoryReadDMAFull32 = this.memoryReadDMA32FullGenerated[1];
    this.memoryReadCPU32 = this.memoryReadCPU32Generated[1];
    this.memoryWrite32 = this.memoryWrite32Generated[1];
    this.memoryWriteDMA32 = this.memoryWriteDMA32Generated[1];
    this.memoryWriteDMAFull32 = this.memoryWriteDMA32FullGenerated[1];
    //Initialize the various handler objects:
    this.dma = this.IOCore.dma;
    this.dmaChannel0 = this.IOCore.dmaChannel0;
    this.dmaChannel1 = this.IOCore.dmaChannel1;
    this.dmaChannel2 = this.IOCore.dmaChannel2;
    this.dmaChannel3 = this.IOCore.dmaChannel3;
    this.gfxState = this.IOCore.gfxState;
    this.gfxRenderer = this.IOCore.gfxRenderer;
    this.sound = this.IOCore.sound;
    this.timer = this.IOCore.timer;
    this.irq = this.IOCore.irq;
    this.serial = this.IOCore.serial;
    this.joypad = this.IOCore.joypad;
    this.cartridge = this.IOCore.cartridge;
    this.wait = this.IOCore.wait;
    this.cpu = this.IOCore.cpu;
    this.saves = this.IOCore.saves;
}
GameBoyAdvanceMemory.prototype.writeExternalWRAM8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    //External WRAM:
    this.wait.WRAMAccess();
    this.externalRAM[address & 0x3FFFF] = data & 0xFF;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceMemory.prototype.writeExternalWRAM16 = function (address, data) {
        address = address | 0;
        data = data | 0;
        //External WRAM:
        this.wait.WRAMAccess();
        this.externalRAM16[(address >> 1) & 0x1FFFF] = data & 0xFFFF;
    }
    GameBoyAdvanceMemory.prototype.writeExternalWRAM32 = function (address, data) {
        address = address | 0;
        data = data | 0;
        //External WRAM:
        this.wait.WRAMAccess32();
        this.externalRAM32[(address >> 2) & 0xFFFF] = data | 0;
    }
}
else {
    GameBoyAdvanceMemory.prototype.writeExternalWRAM16 = function (address, data) {
        //External WRAM:
        this.wait.WRAMAccess();
        address &= 0x3FFFE;
        this.externalRAM[address++] = data & 0xFF;
        this.externalRAM[address] = (data >> 8) & 0xFF;
    }
    GameBoyAdvanceMemory.prototype.writeExternalWRAM32 = function (address, data) {
        //External WRAM:
        this.wait.WRAMAccess32();
        address &= 0x3FFFC;
        this.externalRAM[address++] = data & 0xFF;
        this.externalRAM[address++] = (data >> 8) & 0xFF;
        this.externalRAM[address++] = (data >> 16) & 0xFF;
        this.externalRAM[address] = data >>> 24;
    }
}
GameBoyAdvanceMemory.prototype.writeInternalWRAM8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    //Internal WRAM:
    this.wait.singleClock();
    this.internalRAM[address & 0x7FFF] = data & 0xFF;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceMemory.prototype.writeInternalWRAM16 = function (address, data) {
        address = address | 0;
        data = data | 0;
        //Internal WRAM:
        this.wait.singleClock();
        this.internalRAM16[(address >> 1) & 0x3FFF] = data & 0xFFFF;
    }
    GameBoyAdvanceMemory.prototype.writeInternalWRAM32 = function (address, data) {
        address = address | 0;
        data = data | 0;
        //Internal WRAM:
        this.wait.singleClock();
        this.internalRAM32[(address >> 2) & 0x1FFF] = data | 0;
    }
}
else {
    GameBoyAdvanceMemory.prototype.writeInternalWRAM16 = function (address, data) {
        //Internal WRAM:
        this.wait.singleClock();
        address &= 0x7FFE;
        this.internalRAM[address++] = data & 0xFF;
        this.internalRAM[address] = (data >> 8) & 0xFF;
    }
    GameBoyAdvanceMemory.prototype.writeInternalWRAM32 = function (address, data) {
        //Internal WRAM:
        this.wait.singleClock();
        address &= 0x7FFC;
        this.internalRAM[address++] = data & 0xFF;
        this.internalRAM[address++] = (data >> 8) & 0xFF;
        this.internalRAM[address++] = (data >> 16) & 0xFF;
        this.internalRAM[address] = data >>> 24;
    }
}
GameBoyAdvanceMemory.prototype.writeIODispatch8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.singleClock();
    switch (address | 0) {
        //4000000h - DISPCNT - LCD Control (Read/Write)
        case 0x4000000:
            this.gfxRenderer.writeDISPCNT8_0(data | 0);
            break;
        //4000001h - DISPCNT - LCD Control (Read/Write)
        case 0x4000001:
            this.gfxRenderer.writeDISPCNT8_1(data | 0);
            break;
        //4000002h - Undocumented - Green Swap (R/W)
        case 0x4000002:
            this.gfxRenderer.writeDISPCNT8_2(data | 0);
            break;
        //4000003h - Undocumented - Green Swap (R/W)
        //4000004h - DISPSTAT - General LCD Status (Read/Write)
        case 0x4000004:
            this.gfxState.writeDISPSTAT8_0(data | 0);
            break;
        //4000005h - DISPSTAT - General LCD Status (Read/Write)
        case 0x4000005:
            this.gfxState.writeDISPSTAT8_1(data | 0);
            break;
        //4000006h - VCOUNT - Vertical Counter (Read only)
        //4000007h - VCOUNT - Vertical Counter (Read only)
        //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
        case 0x4000008:
            this.gfxRenderer.writeBG0CNT8_0(data | 0);
            break;
        //4000009h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
        case 0x4000009:
            this.gfxRenderer.writeBG0CNT8_1(data | 0);
            break;
        //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
        case 0x400000A:
            this.gfxRenderer.writeBG1CNT8_0(data | 0);
            break;
        //400000Bh - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
        case 0x400000B:
            this.gfxRenderer.writeBG1CNT8_1(data | 0);
            break;
        //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
        case 0x400000C:
            this.gfxRenderer.writeBG2CNT8_0(data | 0);
            break;
        //400000Dh - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
        case 0x400000D:
            this.gfxRenderer.writeBG2CNT8_1(data | 0);
            break;
        //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
        case 0x400000E:
            this.gfxRenderer.writeBG3CNT8_0(data | 0);
            break;
        //400000Fh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
        case 0x400000F:
            this.gfxRenderer.writeBG3CNT8_1(data | 0);
            break;
        //4000010h - BG0HOFS - BG0 X-Offset (W)
        case 0x4000010:
            this.gfxRenderer.writeBG0HOFS8_0(data | 0);
            break;
        //4000011h - BG0HOFS - BG0 X-Offset (W)
        case 0x4000011:
            this.gfxRenderer.writeBG0HOFS8_1(data | 0);
            break;
        //4000012h - BG0VOFS - BG0 Y-Offset (W)
        case 0x4000012:
            this.gfxRenderer.writeBG0VOFS8_0(data | 0);
            break;
        //4000013h - BG0VOFS - BG0 Y-Offset (W)
        case 0x4000013:
            this.gfxRenderer.writeBG0VOFS8_1(data | 0);
            break;
        //4000014h - BG1HOFS - BG1 X-Offset (W)
        case 0x4000014:
            this.gfxRenderer.writeBG1HOFS8_0(data | 0);
            break;
        //4000015h - BG1HOFS - BG1 X-Offset (W)
        case 0x4000015:
            this.gfxRenderer.writeBG1HOFS8_1(data | 0);
            break;
        //4000016h - BG1VOFS - BG1 Y-Offset (W)
        case 0x4000016:
            this.gfxRenderer.writeBG1VOFS8_0(data | 0);
            break;
        //4000017h - BG1VOFS - BG1 Y-Offset (W)
        case 0x4000017:
            this.gfxRenderer.writeBG1VOFS8_1(data | 0);
            break;
        //4000018h - BG2HOFS - BG2 X-Offset (W)
        case 0x4000018:
            this.gfxRenderer.writeBG2HOFS8_0(data | 0);
            break;
        //4000019h - BG2HOFS - BG2 X-Offset (W)
        case 0x4000019:
            this.gfxRenderer.writeBG2HOFS8_1(data | 0);
            break;
        //400001Ah - BG2VOFS - BG2 Y-Offset (W)
        case 0x400001A:
            this.gfxRenderer.writeBG2VOFS8_0(data | 0);
            break;
        //400001Bh - BG2VOFS - BG2 Y-Offset (W)
        case 0x400001B:
            this.gfxRenderer.writeBG2VOFS8_1(data | 0);
            break;
        //400001Ch - BG3HOFS - BG3 X-Offset (W)
        case 0x400001C:
            this.gfxRenderer.writeBG3HOFS8_0(data | 0);
            break;
        //400001Dh - BG3HOFS - BG3 X-Offset (W)
        case 0x400001D:
            this.gfxRenderer.writeBG3HOFS8_1(data | 0);
            break;
        //400001Eh - BG3VOFS - BG3 Y-Offset (W)
        case 0x400001E:
            this.gfxRenderer.writeBG3VOFS8_0(data | 0);
            break;
        //400001Fh - BG3VOFS - BG3 Y-Offset (W)
        case 0x400001F:
            this.gfxRenderer.writeBG3VOFS8_1(data | 0);
            break;
        //4000020h - BG2PA - BG2 Rotation/Scaling Parameter A (alias dx) (W)
        case 0x4000020:
            this.gfxRenderer.writeBG2PA8_0(data | 0);
            break;
        //4000021h - BG2PA - BG2 Rotation/Scaling Parameter A (alias dx) (W)
        case 0x4000021:
            this.gfxRenderer.writeBG2PA8_1(data | 0);
            break;
        //4000022h - BG2PB - BG2 Rotation/Scaling Parameter B (alias dmx) (W)
        case 0x4000022:
            this.gfxRenderer.writeBG2PB8_0(data | 0);
            break;
        //4000023h - BG2PB - BG2 Rotation/Scaling Parameter B (alias dmx) (W)
        case 0x4000023:
            this.gfxRenderer.writeBG2PB8_1(data | 0);
            break;
        //4000024h - BG2PC - BG2 Rotation/Scaling Parameter C (alias dy) (W)
        case 0x4000024:
            this.gfxRenderer.writeBG2PC8_0(data | 0);
            break;
        //4000025h - BG2PC - BG2 Rotation/Scaling Parameter C (alias dy) (W)
        case 0x4000025:
            this.gfxRenderer.writeBG2PC8_1(data | 0);
            break;
        //4000026h - BG2PD - BG2 Rotation/Scaling Parameter D (alias dmy) (W)
        case 0x4000026:
            this.gfxRenderer.writeBG2PD8_0(data | 0);
            break;
        //4000027h - BG2PD - BG2 Rotation/Scaling Parameter D (alias dmy) (W)
        case 0x4000027:
            this.gfxRenderer.writeBG2PD8_1(data | 0);
            break;
        //4000028h - BG2X_L - BG2 Reference Point X-Coordinate, lower 16 bit (W)
        case 0x4000028:
            this.gfxRenderer.writeBG2X8_0(data | 0);
            break;
        //4000029h - BG2X_L - BG2 Reference Point X-Coordinate, lower 16 bit (W)
        case 0x4000029:
            this.gfxRenderer.writeBG2X8_1(data | 0);
            break;
        //400002Ah - BG2X_H - BG2 Reference Point X-Coordinate, upper 12 bit (W)
        case 0x400002A:
            this.gfxRenderer.writeBG2X8_2(data | 0);
            break;
        //400002Bh - BG2X_H - BG2 Reference Point X-Coordinate, upper 12 bit (W)
        case 0x400002B:
            this.gfxRenderer.writeBG2X8_3(data | 0);
            break;
        //400002Ch - BG2Y_L - BG2 Reference Point Y-Coordinate, lower 16 bit (W)
        case 0x400002C:
            this.gfxRenderer.writeBG2Y8_0(data | 0);
            break;
        //400002Dh - BG2Y_L - BG2 Reference Point Y-Coordinate, lower 16 bit (W)
        case 0x400002D:
            this.gfxRenderer.writeBG2Y8_1(data | 0);
            break;
        //400002Eh - BG2Y_H - BG2 Reference Point Y-Coordinate, upper 12 bit (W)
        case 0x400002E:
            this.gfxRenderer.writeBG2Y8_2(data | 0);
            break;
        //400002Fh - BG2Y_H - BG2 Reference Point Y-Coordinate, upper 12 bit (W)
        case 0x400002F:
            this.gfxRenderer.writeBG2Y8_3(data | 0);
            break;
        //4000030h - BG3PA - BG3 Rotation/Scaling Parameter A (alias dx) (W)
        case 0x4000030:
            this.gfxRenderer.writeBG3PA8_0(data | 0);
            break;
        //4000031h - BG3PA - BG3 Rotation/Scaling Parameter A (alias dx) (W)
        case 0x4000031:
            this.gfxRenderer.writeBG3PA8_1(data | 0);
            break;
        //4000032h - BG3PB - BG3 Rotation/Scaling Parameter B (alias dmx) (W)
        case 0x4000032:
            this.gfxRenderer.writeBG3PB8_0(data | 0);
            break;
        //4000033h - BG3PB - BG3 Rotation/Scaling Parameter B (alias dmx) (W)
        case 0x4000033:
            this.gfxRenderer.writeBG3PB8_1(data | 0);
            break;
        //4000034h - BG3PC - BG3 Rotation/Scaling Parameter C (alias dy) (W)
        case 0x4000034:
            this.gfxRenderer.writeBG3PC8_0(data | 0);
            break;
        //4000035h - BG3PC - BG3 Rotation/Scaling Parameter C (alias dy) (W)
        case 0x4000035:
            this.gfxRenderer.writeBG3PC8_1(data | 0);
            break;
        //4000036h - BG3PD - BG3 Rotation/Scaling Parameter D (alias dmy) (W)
        case 0x4000036:
            this.gfxRenderer.writeBG3PD8_0(data | 0);
            break;
        //4000037h - BG3PD - BG3 Rotation/Scaling Parameter D (alias dmy) (W)
        case 0x4000037:
            this.gfxRenderer.writeBG3PD8_1(data | 0);
            break;
        //4000038h - BG3X_L - BG3 Reference Point X-Coordinate, lower 16 bit (W)
        case 0x4000038:
            this.gfxRenderer.writeBG3X8_0(data | 0);
            break;
        //4000039h - BG3X_L - BG3 Reference Point X-Coordinate, lower 16 bit (W)
        case 0x4000039:
            this.gfxRenderer.writeBG3X8_1(data | 0);
            break;
        //400003Ah - BG3X_H - BG3 Reference Point X-Coordinate, upper 12 bit (W)
        case 0x400003A:
            this.gfxRenderer.writeBG3X8_2(data | 0);
            break;
        //400003Bh - BG3X_H - BG3 Reference Point X-Coordinate, upper 12 bit (W)
        case 0x400003B:
            this.gfxRenderer.writeBG3X8_3(data | 0);
            break;
        //400003Ch - BG3Y_L - BG3 Reference Point Y-Coordinate, lower 16 bit (W)
        case 0x400003C:
            this.gfxRenderer.writeBG3Y8_0(data | 0);
            break;
        //400003Dh - BGY_L - BG3 Reference Point Y-Coordinate, lower 16 bit (W)
        case 0x400003D:
            this.gfxRenderer.writeBG3Y8_1(data | 0);
            break;
        //400003Eh - BG3Y_H - BG3 Reference Point Y-Coordinate, upper 12 bit (W)
        case 0x400003E:
            this.gfxRenderer.writeBG3Y8_2(data | 0);
            break;
        //400003Fh - BG3Y_H - BG3 Reference Point Y-Coordinate, upper 12 bit (W)
        case 0x400003F:
            this.gfxRenderer.writeBG3Y8_3(data | 0);
            break;
        //4000040h - WIN0H - Window 0 Horizontal Dimensions (W)
        case 0x4000040:
            this.gfxRenderer.writeWIN0XCOORDRight8(data | 0);
            break;
        //4000041h - WIN0H - Window 0 Horizontal Dimensions (W)
        case 0x4000041:
            this.gfxRenderer.writeWIN0XCOORDLeft8(data | 0);
            break;
        //4000042h - WIN1H - Window 1 Horizontal Dimensions (W)
        case 0x4000042:
            this.gfxRenderer.writeWIN1XCOORDRight8(data | 0);
            break;
        //4000043h - WIN1H - Window 1 Horizontal Dimensions (W)
        case 0x4000043:
            this.gfxRenderer.writeWIN1XCOORDLeft8(data | 0);
            break;
        //4000044h - WIN0V - Window 0 Vertical Dimensions (W)
        case 0x4000044:
            this.gfxRenderer.writeWIN0YCOORDBottom8(data | 0);
            break;
        //4000045h - WIN0V - Window 0 Vertical Dimensions (W)
        case 0x4000045:
            this.gfxRenderer.writeWIN0YCOORDTop8(data | 0);
            break;
        //4000046h - WIN1V - Window 1 Vertical Dimensions (W)
        case 0x4000046:
            this.gfxRenderer.writeWIN1YCOORDBottom8(data | 0);
            break;
        //4000047h - WIN1V - Window 1 Vertical Dimensions (W)
        case 0x4000047:
            this.gfxRenderer.writeWIN1YCOORDTop8(data | 0);
            break;
        //4000048h - WININ - Control of Inside of Window(s) (R/W)
        case 0x4000048:
            this.gfxRenderer.writeWIN0IN8(data | 0);
            break;
        //4000049h - WININ - Control of Inside of Window(s) (R/W)
        case 0x4000049:
            this.gfxRenderer.writeWIN1IN8(data | 0);
            break;
        //400004Ah- WINOUT - Control of Outside of Windows (R/W)
        case 0x400004A:
            this.gfxRenderer.writeWINOUT8(data | 0);
            break;
        //400004AB- WINOUT - Inside of OBJ Window (R/W)
        case 0x400004B:
            this.gfxRenderer.writeWINOBJIN8(data | 0);
            break;
        //400004Ch - MOSAIC - Mosaic Size (W)
        case 0x400004C:
            this.gfxRenderer.writeMOSAIC8_0(data | 0);
            break;
        //400004Dh - MOSAIC - Mosaic Size (W)
        case 0x400004D:
            this.gfxRenderer.writeMOSAIC8_1(data | 0);
            break;
        //400004Eh - NOT USED - ZERO
        //400004Fh - NOT USED - ZERO
        //4000050h - BLDCNT - Color Special Effects Selection (R/W)
        case 0x4000050:
            this.gfxRenderer.writeBLDCNT8_0(data | 0);
            break;
        //4000051h - BLDCNT - Color Special Effects Selection (R/W)
        case 0x4000051:
            this.gfxRenderer.writeBLDCNT8_1(data | 0);
            break;
        //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
        case 0x4000052:
            this.gfxRenderer.writeBLDALPHA8_0(data | 0);
            break;
        //4000053h - BLDALPHA - Alpha Blending Coefficients (R/W)
        case 0x4000053:
            this.gfxRenderer.writeBLDALPHA8_1(data | 0);
            break;
        //4000054h - BLDY - Brightness (Fade-In/Out) Coefficient (W)
        case 0x4000054:
            this.gfxRenderer.writeBLDY8(data | 0);
            break;
        //4000055h through 400005Fh - NOT USED - ZERO/GLITCHED
        //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
        case 0x4000060:
            //NR10:
            this.sound.writeSOUND1CNT8_0(data | 0);
            break;
        //4000061h - NOT USED - ZERO
        //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
        case 0x4000062:
            //NR11:
            this.sound.writeSOUND1CNT8_2(data | 0);
            break;
        //4000063h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
        case 0x4000063:
            //NR12:
            this.sound.writeSOUND1CNT8_3(data | 0);
            break;
        //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
        case 0x4000064:
            //NR13:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_X0(data & 0xFF);
            break;
        //4000065h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
        case 0x4000065:
            //NR14:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_X1(data & 0xFF);
            break;
        //4000066h - NOT USED - ZERO
        //4000067h - NOT USED - ZERO
        //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
        case 0x4000068:
            //NR21:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_L0(data & 0xFF);
            break;
        //4000069h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
        case 0x4000069:
            //NR22:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_L1(data & 0xFF);
            break;
        //400006Ah - NOT USED - ZERO
        //400006Bh - NOT USED - ZERO
        //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
        case 0x400006C:
            //NR23:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_H0(data & 0xFF);
            break;
        //400006Dh - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
        case 0x400006D:
            //NR24:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_H1(data & 0xFF);
            break;
        //400006Eh - NOT USED - ZERO
        //400006Fh - NOT USED - ZERO
        //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
        case 0x4000070:
            //NR30:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_L(data & 0xFF);
            break;
        //4000071h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
        //4000072h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
        case 0x4000072:
            //NR31:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_H0(data & 0xFF);
            break;
        //4000073h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
        case 0x4000073:
            //NR32:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_H1(data & 0xFF);
            break;
        //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
        case 0x4000074:
            //NR33:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_X0(data & 0xFF);
            break;
        //4000075h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
        case 0x4000075:
            //NR34:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_X1(data & 0xFF);
            break;
        //4000076h - NOT USED - ZERO
        //4000077h - NOT USED - ZERO
        //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
        case 0x4000078:
            //NR41:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_L0(data & 0xFF);
            break;
        //4000079h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
        case 0x4000079:
            //NR42:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_L1(data & 0xFF);
            break;
        //400007Ah - NOT USED - ZERO
        //400007Bh - NOT USED - ZERO
        //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
        case 0x400007C:
            //NR43:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_H0(data & 0xFF);
            break;
        //400007Dh - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
        case 0x400007D:
            //NR44:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_H1(data & 0xFF);
            break;
        //400007Eh - NOT USED - ZERO
        //400007Fh - NOT USED - ZERO
        //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
        case 0x4000080:
            //NR50:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_L0(data & 0xFF);
            break;
        //4000081h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
        case 0x4000081:
            //NR51:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_L1(data & 0xFF);
            break;
        //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
        case 0x4000082:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_H0(data & 0xFF);
            break;
        //4000083h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
        case 0x4000083:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_H1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
        case 0x4000084:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_X(data & 0xFF);
            break;
        //4000085h - NOT USED - ZERO
        //4000086h - NOT USED - ZERO
        //4000087h - NOT USED - ZERO
        //4000088h - SOUNDBIAS - Sound PWM Control (R/W)
        case 0x4000088:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDBIAS0(data & 0xFF);
            break;
        //4000089h - SOUNDBIAS - Sound PWM Control (R/W)
        case 0x4000089:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDBIAS1(data & 0xFF);
            break;
        //400008Ah through 400008Fh - NOT USED - ZERO/GLITCHED
        //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000090:
        //4000091h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000091:
        //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000092:
        //4000093h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000093:
        //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000094:
        //4000095h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000095:
        //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000096:
        //4000097h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000097:
        //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000098:
        //4000099h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000099:
        //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009A:
        //400009Bh - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009B:
        //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009C:
        //400009Dh - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009D:
        //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009E:
        //400009Fh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009F:
            this.sound.writeWAVE8(address & 0xF, data | 0);
            break;
        //40000A0h - FIFO_A_L - FIFO Channel A First Word (W)
        case 0x40000A0:
        //40000A1h - FIFO_A_L - FIFO Channel A First Word (W)
        case 0x40000A1:
        //40000A2h - FIFO_A_H - FIFO Channel A Second Word (W)
        case 0x40000A2:
        //40000A3h - FIFO_A_H - FIFO Channel A Second Word (W)
        case 0x40000A3:
            this.sound.writeFIFOA8(data | 0);
            break;
        //40000A4h - FIFO_B_L - FIFO Channel B First Word (W)
        case 0x40000A4:
        //40000A5h - FIFO_B_L - FIFO Channel B First Word (W)
        case 0x40000A5:
        //40000A6h - FIFO_B_H - FIFO Channel B Second Word (W)
        case 0x40000A6:
        //40000A7h - FIFO_B_H - FIFO Channel B Second Word (W)
        case 0x40000A7:
            this.sound.writeFIFOB8(data | 0);
            break;
        //40000A8h through 40000AFh - NOT USED - GLITCHED
        //40000B0h - DMA0SAD - DMA 0 Source Address (W) (internal memory)
        case 0x40000B0:
            this.dmaChannel0.writeDMASource8_0(data | 0);
            break;
        //40000B1h - DMA0SAD - DMA 0 Source Address (W) (internal memory)
        case 0x40000B1:
            this.dmaChannel0.writeDMASource8_1(data | 0);
            break;
        //40000B2h - DMA0SAH - DMA 0 Source Address (W) (internal memory)
        case 0x40000B2:
            this.dmaChannel0.writeDMASource8_2(data | 0);
            break;
        //40000B3h - DMA0SAH - DMA 0 Source Address (W) (internal memory)
        case 0x40000B3:
            this.dmaChannel0.writeDMASource8_3(data | 0);
            break;
        //40000B4h - DMA0DAD - DMA 0 Destination Address (W) (internal memory)
        case 0x40000B4:
            this.dmaChannel0.writeDMADestination8_0(data | 0);
            break;
        //40000B5h - DMA0DAD - DMA 0 Destination Address (W) (internal memory)
        case 0x40000B5:
            this.dmaChannel0.writeDMADestination8_1(data | 0);
            break;
        //40000B6h - DMA0DAH - DMA 0 Destination Address (W) (internal memory)
        case 0x40000B6:
            this.dmaChannel0.writeDMADestination8_2(data | 0);
            break;
        //40000B7h - DMA0DAH - DMA 0 Destination Address (W) (internal memory)
        case 0x40000B7:
            this.dmaChannel0.writeDMADestination8_3(data | 0);
            break;
        //40000B8h - DMA0CNT_L - DMA 0 Word Count (W) (14 bit, 1..4000h)
        case 0x40000B8:
            this.dmaChannel0.writeDMAWordCount8_0(data | 0);
            break;
        //40000B9h - DMA0CNT_L - DMA 0 Word Count (W) (14 bit, 1..4000h)
        case 0x40000B9:
            this.dmaChannel0.writeDMAWordCount8_1(data | 0);
            break;
        //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
        case 0x40000BA:
            this.dmaChannel0.writeDMAControl8_0(data | 0);
            break;
        //40000BBh - DMA0CNT_H - DMA 0 Control (R/W)
        case 0x40000BB:
            this.dmaChannel0.writeDMAControl8_1(data | 0);
            break;
        //40000BCh - DMA1SAD - DMA 1 Source Address (W) (internal memory)
        case 0x40000BC:
            this.dmaChannel1.writeDMASource8_0(data | 0);
            break;
        //40000BDh - DMA1SAD - DMA 1 Source Address (W) (internal memory)
        case 0x40000BD:
            this.dmaChannel1.writeDMASource8_1(data | 0);
            break;
        //40000BEh - DMA1SAH - DMA 1 Source Address (W) (internal memory)
        case 0x40000BE:
            this.dmaChannel1.writeDMASource8_2(data | 0);
            break;
        //40000BFh - DMA1SAH - DMA 1 Source Address (W) (internal memory)
        case 0x40000BF:
            this.dmaChannel1.writeDMASource8_3(data | 0);
            break;
        //40000C0h - DMA1DAD - DMA 1 Destination Address (W) (internal memory)
        case 0x40000C0:
            this.dmaChannel1.writeDMADestination8_0(data | 0);
            break;
        //40000C1h - DMA1DAD - DMA 1 Destination Address (W) (internal memory)
        case 0x40000C1:
            this.dmaChannel1.writeDMADestination8_1(data | 0);
            break;
        //40000C2h - DMA1DAH - DMA 1 Destination Address (W) (internal memory)
        case 0x40000C2:
            this.dmaChannel1.writeDMADestination8_2(data | 0);
            break;
        //40000C3h - DMA1DAH - DMA 1 Destination Address (W) (internal memory)
        case 0x40000C3:
            this.dmaChannel1.writeDMADestination8_3(data | 0);
            break;
        //40000C4h - DMA1CNT_L - DMA 1 Word Count (W) (14 bit, 1..4000h)
        case 0x40000C4:
            this.dmaChannel1.writeDMAWordCount8_0(data | 0);
            break;
        //40000C5h - DMA1CNT_L - DMA 1 Word Count (W) (14 bit, 1..4000h)
        case 0x40000C5:
            this.dmaChannel1.writeDMAWordCount8_1(data | 0);
            break;
        //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
        case 0x40000C6:
            this.dmaChannel1.writeDMAControl8_0(data | 0);
            break;
        //40000C7h - DMA1CNT_H - DMA 1 Control (R/W)
        case 0x40000C7:
            this.dmaChannel1.writeDMAControl8_1(data | 0);
            break;
        //40000C8h - DMA2SAD - DMA 2 Source Address (W) (internal memory)
        case 0x40000C8:
            this.dmaChannel2.writeDMASource8_0(data | 0);
            break;
        //40000C9h - DMA2SAD - DMA 2 Source Address (W) (internal memory)
        case 0x40000C9:
            this.dmaChannel2.writeDMASource8_1(data | 0);
            break;
        //40000CAh - DMA2SAH - DMA 2 Source Address (W) (internal memory)
        case 0x40000CA:
            this.dmaChannel2.writeDMASource8_2(data | 0);
            break;
        //40000CBh - DMA2SAH - DMA 2 Source Address (W) (internal memory)
        case 0x40000CB:
            this.dmaChannel2.writeDMASource8_3(data | 0);
            break;
        //40000CCh - DMA2DAD - DMA 2 Destination Address (W) (internal memory)
        case 0x40000CC:
            this.dmaChannel2.writeDMADestination8_0(data | 0);
            break;
        //40000CDh - DMA2DAD - DMA 2 Destination Address (W) (internal memory)
        case 0x40000CD:
            this.dmaChannel2.writeDMADestination8_1(data | 0);
            break;
        //40000CEh - DMA2DAH - DMA 2 Destination Address (W) (internal memory)
        case 0x40000CE:
            this.dmaChannel2.writeDMADestination8_2(data | 0);
            break;
        //40000CFh - DMA2DAH - DMA 2 Destination Address (W) (internal memory)
        case 0x40000CF:
            this.dmaChannel2.writeDMADestination8_3(data | 0);
            break;
        //40000D0h - DMA2CNT_L - DMA 2 Word Count (W) (14 bit, 1..4000h)
        case 0x40000D0:
            this.dmaChannel2.writeDMAWordCount8_0(data | 0);
            break;
        //40000D1h - DMA2CNT_L - DMA 2 Word Count (W) (14 bit, 1..4000h)
        case 0x40000D1:
            this.dmaChannel2.writeDMAWordCount8_1(data | 0);
            break;
        //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
        case 0x40000D2:
            this.dmaChannel2.writeDMAControl8_0(data | 0);
            break;
        //40000D3h - DMA2CNT_H - DMA 2 Control (R/W)
        case 0x40000D3:
            this.dmaChannel2.writeDMAControl8_1(data | 0);
            break;
        //40000D4h - DMA3SAD - DMA 3 Source Address (W) (internal memory)
        case 0x40000D4:
            this.dmaChannel3.writeDMASource8_0(data | 0);
            break;
        //40000D5h - DMA3SAD - DMA 3 Source Address (W) (internal memory)
        case 0x40000D5:
            this.dmaChannel3.writeDMASource8_1(data | 0);
            break;
        //40000D6h - DMA3SAH - DMA 3 Source Address (W) (internal memory)
        case 0x40000D6:
            this.dmaChannel3.writeDMASource8_2(data | 0);
            break;
        //40000D7h - DMA3SAH - DMA 3 Source Address (W) (internal memory)
        case 0x40000D7:
            this.dmaChannel3.writeDMASource8_3(data | 0);
            break;
        //40000D8h - DMA3DAD - DMA 3 Destination Address (W) (internal memory)
        case 0x40000D8:
            this.dmaChannel3.writeDMADestination8_0(data | 0);
            break;
        //40000D9h - DMA3DAD - DMA 3 Destination Address (W) (internal memory)
        case 0x40000D9:
            this.dmaChannel3.writeDMADestination8_1(data | 0);
            break;
        //40000DAh - DMA3DAH - DMA 3 Destination Address (W) (internal memory)
        case 0x40000DA:
            this.dmaChannel3.writeDMADestination8_2(data | 0);
            break;
        //40000DBh - DMA3DAH - DMA 3 Destination Address (W) (internal memory)
        case 0x40000DB:
            this.dmaChannel3.writeDMADestination8_3(data | 0);
            break;
        //40000DCh - DMA3CNT_L - DMA 3 Word Count (W) (16 bit, 1..10000h)
        case 0x40000DC:
            this.dmaChannel3.writeDMAWordCount8_0(data | 0);
            break;
        //40000DDh - DMA3CNT_L - DMA 3 Word Count (W) (16 bit, 1..10000h)
        case 0x40000DD:
            this.dmaChannel3.writeDMAWordCount8_1(data | 0);
            break;
        //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
        case 0x40000DE:
            this.dmaChannel3.writeDMAControl8_0(data | 0);
            break;
        //40000DFh - DMA3CNT_H - DMA 3 Control (R/W)
        case 0x40000DF:
            this.dmaChannel3.writeDMAControl8_1(data | 0);
            break;
        //40000E0h through 40000FFh - NOT USED - GLITCHED
        //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
        case 0x4000100:
            this.timer.writeTM0CNT8_0(data | 0);
            break;
        //4000101h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
        case 0x4000101:
            this.timer.writeTM0CNT8_1(data | 0);
            break;
        //4000102h - TM0CNT_H - Timer 0 Control (R/W)
        case 0x4000102:
            this.timer.writeTM0CNT8_2(data | 0);
            break;
        //4000103h - TM0CNT_H - Timer 0 Control (R/W)
        //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
        case 0x4000104:
            this.timer.writeTM1CNT8_0(data | 0);
            break;
        //4000105h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
        case 0x4000105:
            this.timer.writeTM1CNT8_1(data | 0);
            break;
        //4000106h - TM1CNT_H - Timer 1 Control (R/W)
        case 0x4000106:
            this.timer.writeTM1CNT8_2(data | 0);
            break;
        //4000107h - TM1CNT_H - Timer 1 Control (R/W)
        //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
        case 0x4000108:
            this.timer.writeTM2CNT8_0(data | 0);
            break;
        //4000109h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
        case 0x4000109:
            this.timer.writeTM2CNT8_1(data | 0);
            break;
        //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
        case 0x400010A:
            this.timer.writeTM2CNT8_2(data | 0);
            break;
        //400010Bh - TM2CNT_H - Timer 2 Control (R/W)
        //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
        case 0x400010C:
            this.timer.writeTM3CNT8_0(data | 0);
            break;
        //400010Dh - TM3CNT_L - Timer 3 Counter/Reload (R/W)
        case 0x400010D:
            this.timer.writeTM3CNT8_1(data | 0);
            break;
        //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
        case 0x400010E:
            this.timer.writeTM3CNT8_2(data | 0);
            break;
        //400010Fh - TM3CNT_H - Timer 3 Control (R/W)
        //4000110h through 400011Fh - NOT USED - GLITCHED
        //4000120h - Serial Data A (R/W)
        case 0x4000120:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_A0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000121h - Serial Data A (R/W)
        case 0x4000121:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_A1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000122h - Serial Data B (R/W)
        case 0x4000122:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_B0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000123h - Serial Data B (R/W)
        case 0x4000123:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_B1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000124h - Serial Data C (R/W)
        case 0x4000124:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_C0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000125h - Serial Data C (R/W)
        case 0x4000125:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_C1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000126h - Serial Data D (R/W)
        case 0x4000126:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_D0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000127h - Serial Data D (R/W)
        case 0x4000127:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_D1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
        case 0x4000128:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIOCNT0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000129h - SIOCNT - SIO Sub Mode Control (R/W)
        case 0x4000129:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIOCNT1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
        case 0x400012A:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA8_0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //400012Bh - SIOMLT_SEND - Data Send Register (R/W)
        case 0x400012B:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA8_1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //400012Ch through 400012Fh - NOT USED - GLITCHED
        //4000130h - KEYINPUT - Key Status (R)
        //4000131h - KEYINPUT - Key Status (R)
        //4000132h - KEYCNT - Key Interrupt Control (R/W)
        case 0x4000132:
            this.joypad.writeKeyControl8_0(data | 0);
            break;
        //4000133h - KEYCNT - Key Interrupt Control (R/W)
        case 0x4000133:
            this.joypad.writeKeyControl8_1(data | 0);
            break;
        //4000134h - RCNT (R/W) - Mode Selection
        case 0x4000134:
            this.IOCore.updateSerialClocking();
            this.serial.writeRCNT0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000135h - RCNT (R/W) - Mode Selection
        case 0x4000135:
            this.IOCore.updateSerialClocking();
            this.serial.writeRCNT1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000136h through 400013Fh - NOT USED - GLITCHED
        //4000140h - JOYCNT - JOY BUS Control Register (R/W)
        case 0x4000140:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYCNT(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000141h - JOYCNT - JOY BUS Control Register (R/W)
        //4000142h through 400014Fh - NOT USED - GLITCHED
        //4000150h - JoyBus Receive (R/W)
        case 0x4000150:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000151h - JoyBus Receive (R/W)
        case 0x4000151:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000152h - JoyBus Receive (R/W)
        case 0x4000152:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV2(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000153h - JoyBus Receive (R/W)
        case 0x4000153:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV3(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000154h - JoyBus Send (R/W)
        case 0x4000154:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND0(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000155h - JoyBus Send (R/W)
        case 0x4000155:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND1(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000156h - JoyBus Send (R/W)
        case 0x4000156:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND2(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000157h - JoyBus Send (R/W)
        case 0x4000157:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND3(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000158h - JoyBus Stat (R/W)
        case 0x4000158:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_STAT(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000159h through 40001FFh - NOT USED - GLITCHED
        //4000200h - IE - Interrupt Enable Register (R/W)
        case 0x4000200:
            this.irq.writeIE8_0(data | 0);
            break;
        //4000201h - IE - Interrupt Enable Register (R/W)
        case 0x4000201:
            this.irq.writeIE8_1(data | 0);
            break;
        //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
        case 0x4000202:
            this.irq.writeIF8_0(data | 0);
            break;
        //4000203h - IF - Interrupt Request Flags / IRQ Acknowledge
        case 0x4000203:
            this.irq.writeIF8_1(data | 0);
            break;
        //4000204h - WAITCNT - Waitstate Control (R/W)
        case 0x4000204:
            this.wait.writeWAITCNT0(data & 0xFF);
            break;
        //4000205h - WAITCNT - Waitstate Control (R/W)
        case 0x4000205:
            this.wait.writeWAITCNT1(data & 0xFF);
            break;
        //4000206h - WAITCNT - Waitstate Control (R/W)
        //4000207h - WAITCNT - Waitstate Control (R/W)
        //4000208h - IME - Interrupt Master Enable Register (R/W)
        case 0x4000208:
            this.irq.writeIME(data | 0);
            break;
        //4000209h through 40002FFh - NOT USED - GLITCHED
        //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
        case 0x4000300:
            this.wait.writePOSTBOOT(data & 0xFF);
            break;
        //4000301h - HALTCNT - BYTE - Undocumented - Low Power Mode Control (W)
        case 0x4000301:
            this.wait.writeHALTCNT(data & 0xFF);
            break;
        default:
            if ((address & 0xFFFC) == 0x800) {
                //WRAM wait state control:
                this.wait.writeConfigureWRAM8(address | 0, data & 0xFF);
            }
    }
}
GameBoyAdvanceMemory.prototype.writeIODispatch16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.singleClock();
    switch (address & -2) {
        //4000000h - DISPCNT - LCD Control (Read/Write)
        case 0x4000000:
            this.gfxRenderer.writeDISPCNT16(data | 0);
            break;
        //4000002h - Undocumented - Green Swap (R/W)
        case 0x4000002:
            this.gfxRenderer.writeDISPCNT8_2(data | 0);
            break;
        //4000004h - DISPSTAT - General LCD Status (Read/Write)
        case 0x4000004:
            this.gfxState.writeDISPSTAT16(data | 0);
            break;
        //4000006h - VCOUNT - Vertical Counter (Read only)
        //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
        case 0x4000008:
            this.gfxRenderer.writeBG0CNT16(data | 0);
            break;
        //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
        case 0x400000A:
            this.gfxRenderer.writeBG1CNT16(data | 0);
            break;
        //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
        case 0x400000C:
            this.gfxRenderer.writeBG2CNT16(data | 0);
            break;
        //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
        case 0x400000E:
            this.gfxRenderer.writeBG3CNT16(data | 0);
            break;
        //4000010h - BG0HOFS - BG0 X-Offset (W)
        case 0x4000010:
            this.gfxRenderer.writeBG0HOFS16(data | 0);
            break;
        //4000012h - BG0VOFS - BG0 Y-Offset (W)
        case 0x4000012:
            this.gfxRenderer.writeBG0VOFS16(data | 0);
            break;
        //4000014h - BG1HOFS - BG1 X-Offset (W)
        case 0x4000014:
            this.gfxRenderer.writeBG1HOFS16(data | 0);
            break;
        //4000016h - BG1VOFS - BG1 Y-Offset (W)
        case 0x4000016:
            this.gfxRenderer.writeBG1VOFS16(data | 0);
            break;
        //4000018h - BG2HOFS - BG2 X-Offset (W)
        case 0x4000018:
            this.gfxRenderer.writeBG2HOFS16(data | 0);
            break;
        //400001Ah - BG2VOFS - BG2 Y-Offset (W)
        case 0x400001A:
            this.gfxRenderer.writeBG2VOFS16(data | 0);
            break;
        //400001Ch - BG3HOFS - BG3 X-Offset (W)
        case 0x400001C:
            this.gfxRenderer.writeBG3HOFS16(data | 0);
            break;
        //400001Eh - BG3VOFS - BG3 Y-Offset (W)
        case 0x400001E:
            this.gfxRenderer.writeBG3VOFS16(data | 0);
            break;
        //4000020h - BG2PA - BG2 Rotation/Scaling Parameter A (alias dx) (W)
        case 0x4000020:
            this.gfxRenderer.writeBG2PA16(data | 0);
            break;
        //4000022h - BG2PB - BG2 Rotation/Scaling Parameter B (alias dmx) (W)
        case 0x4000022:
            this.gfxRenderer.writeBG2PB16(data | 0);
            break;
        //4000024h - BG2PC - BG2 Rotation/Scaling Parameter C (alias dy) (W)
        case 0x4000024:
            this.gfxRenderer.writeBG2PC16(data | 0);
            break;
        //4000026h - BG2PD - BG2 Rotation/Scaling Parameter D (alias dmy) (W)
        case 0x4000026:
            this.gfxRenderer.writeBG2PD16(data | 0);
            break;
        //4000028h - BG2X_L - BG2 Reference Point X-Coordinate, lower 16 bit (W)
        case 0x4000028:
            this.gfxRenderer.writeBG2X16_0(data | 0);
            break;
        //400002Ah - BG2X_H - BG2 Reference Point X-Coordinate, upper 12 bit (W)
        case 0x400002A:
            this.gfxRenderer.writeBG2X16_1(data | 0);
            break;
        //400002Ch - BG2Y_L - BG2 Reference Point Y-Coordinate, lower 16 bit (W)
        case 0x400002C:
            this.gfxRenderer.writeBG2Y16_0(data | 0);
            break;
        //400002Eh - BG2Y_H - BG2 Reference Point Y-Coordinate, upper 12 bit (W)
        case 0x400002E:
            this.gfxRenderer.writeBG2Y16_1(data | 0);
            break;
        //4000030h - BG3PA - BG3 Rotation/Scaling Parameter A (alias dx) (W)
        case 0x4000030:
            this.gfxRenderer.writeBG3PA16(data | 0);
            break;
        //4000032h - BG3PB - BG3 Rotation/Scaling Parameter B (alias dmx) (W)
        case 0x4000032:
            this.gfxRenderer.writeBG3PB16(data | 0);
            break;
        //4000034h - BG3PC - BG3 Rotation/Scaling Parameter C (alias dy) (W)
        case 0x4000034:
            this.gfxRenderer.writeBG3PC16(data | 0);
            break;
        //4000036h - BG3PD - BG3 Rotation/Scaling Parameter D (alias dmy) (W)
        case 0x4000036:
            this.gfxRenderer.writeBG3PD16(data | 0);
            break;
        //4000038h - BG3X_L - BG3 Reference Point X-Coordinate, lower 16 bit (W)
        case 0x4000038:
            this.gfxRenderer.writeBG3X16_0(data | 0);
            break;
        //400003Ah - BG3X_H - BG3 Reference Point X-Coordinate, upper 12 bit (W)
        case 0x400003A:
            this.gfxRenderer.writeBG3X16_1(data | 0);
            break;
        //400003Ch - BG3Y_L - BG3 Reference Point Y-Coordinate, lower 16 bit (W)
        case 0x400003C:
            this.gfxRenderer.writeBG3Y16_0(data | 0);
            break;
        //400003Eh - BG3Y_H - BG3 Reference Point Y-Coordinate, upper 12 bit (W)
        case 0x400003E:
            this.gfxRenderer.writeBG3Y16_1(data | 0);
            break;
        //4000040h - WIN0H - Window 0 Horizontal Dimensions (W)
        case 0x4000040:
            this.gfxRenderer.writeWIN0XCOORD16(data | 0);
            break;
        //4000042h - WIN1H - Window 1 Horizontal Dimensions (W)
        case 0x4000042:
            this.gfxRenderer.writeWIN1XCOORD16(data | 0);
            break;
        //4000044h - WIN0V - Window 0 Vertical Dimensions (W)
        case 0x4000044:
            this.gfxRenderer.writeWIN0YCOORD16(data | 0);
            break;
        //4000046h - WIN1V - Window 1 Vertical Dimensions (W)
        case 0x4000046:
            this.gfxRenderer.writeWIN1YCOORD16(data | 0);
            break;
        //4000048h - WININ - Control of Inside of Window(s) (R/W)
        case 0x4000048:
            this.gfxRenderer.writeWININ16(data | 0);
            break;
        //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
        case 0x400004A:
            this.gfxRenderer.writeWINOUT16(data | 0);
            break;
        //400004Ch - MOSAIC - Mosaic Size (W)
        case 0x400004C:
            this.gfxRenderer.writeMOSAIC16(data | 0);
            break;
        //400004Eh - NOT USED - ZERO
        //4000050h - BLDCNT - Color Special Effects Selection (R/W)
        case 0x4000050:
            this.gfxRenderer.writeBLDCNT16(data | 0);
            break;
        //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
        case 0x4000052:
            this.gfxRenderer.writeBLDALPHA16(data | 0);
            break;
        //4000054h - BLDY - Brightness (Fade-In/Out) Coefficient (W)
        case 0x4000054:
            this.gfxRenderer.writeBLDY8(data | 0);
            break;
        //4000055h through 400005Fh - NOT USED - ZERO/GLITCHED
        //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
        case 0x4000060:
            //NR10:
            this.sound.writeSOUND1CNT8_0(data | 0);
            break;
        //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
        case 0x4000062:
            this.sound.writeSOUND1CNT16(data | 0);
            break;
        //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
        case 0x4000064:
            //NR13:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_X0(data & 0xFF);
            //NR14:
            this.sound.writeSOUND1CNT_X1((data >> 8) & 0xFF);
            break;
        //4000066h - NOT USED - ZERO
        //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
        case 0x4000068:
            //NR21:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_L0(data & 0xFF);
            //NR22:
            this.sound.writeSOUND2CNT_L1((data >> 8) & 0xFF);
            break;
        //400006Ah - NOT USED - ZERO
        //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
        case 0x400006C:
            //NR23:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_H0(data & 0xFF);
            //NR24:
            this.sound.writeSOUND2CNT_H1((data >> 8) & 0xFF);
            break;
        //400006Eh - NOT USED - ZERO
        //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
        case 0x4000070:
            //NR30:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_L(data & 0xFF);
            break;
        //4000072h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
        case 0x4000072:
            //NR31:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_H0(data & 0xFF);
            //NR32:
            this.sound.writeSOUND3CNT_H1((data >> 8) & 0xFF);
            break;
        //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
        case 0x4000074:
            //NR33:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_X0(data & 0xFF);
            //NR34:
            this.sound.writeSOUND3CNT_X1((data >> 8) & 0xFF);
            break;
        //4000076h - NOT USED - ZERO
        //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
        case 0x4000078:
            //NR41:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_L0(data & 0xFF);
            //NR42:
            this.sound.writeSOUND4CNT_L1((data >> 8) & 0xFF);
            break;
        //400007Ah - NOT USED - ZERO
        //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
        case 0x400007C:
            //NR43:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_H0(data & 0xFF);
            //NR44:
            this.sound.writeSOUND4CNT_H1((data >> 8) & 0xFF);
            break;
        //400007Eh - NOT USED - ZERO
        //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
        case 0x4000080:
            //NR50:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_L0(data & 0xFF);
            //NR51:
            this.sound.writeSOUNDCNT_L1((data >> 8) & 0xFF);
            break;
        //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
        case 0x4000082:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_H0(data & 0xFF);
            this.sound.writeSOUNDCNT_H1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
        case 0x4000084:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_X(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000086h - NOT USED - ZERO
        //4000088h - SOUNDBIAS - Sound PWM Control (R/W)
        case 0x4000088:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDBIAS0(data & 0xFF);
            this.sound.writeSOUNDBIAS1((data >> 8) & 0xFF);
            break;
        //400008Ah through 400008Fh - NOT USED - ZERO/GLITCHED
        //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000090:
        //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000092:
        //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000094:
        //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000096:
        //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000098:
        //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009A:
        //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009C:
        //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009E:
            this.sound.writeWAVE16(address & 0xF, data | 0);
            break;
        //40000A0h - FIFO_A_L - FIFO Channel A First Word (W)
        case 0x40000A0:
        //40000A2h - FIFO_A_H - FIFO Channel A Second Word (W)
        case 0x40000A2:
            this.sound.writeFIFOA16(data | 0);
            break;
        //40000A4h - FIFO_B_L - FIFO Channel B First Word (W)
        case 0x40000A4:
        //40000A6h - FIFO_B_H - FIFO Channel B Second Word (W)
        case 0x40000A6:
            this.sound.writeFIFOB16(data | 0);
            break;
        //40000A8h through 40000AFh - NOT USED - GLITCHED
        //40000B0h - DMA0SAD - DMA 0 Source Address (W) (internal memory)
        case 0x40000B0:
            this.dmaChannel0.writeDMASource16_0(data | 0);
            break;
        //40000B2h - DMA0SAH - DMA 0 Source Address (W) (internal memory)
        case 0x40000B2:
            this.dmaChannel0.writeDMASource16_1(data | 0);
            break;
        //40000B4h - DMA0DAD - DMA 0 Destination Address (W) (internal memory)
        case 0x40000B4:
            this.dmaChannel0.writeDMADestination16_0(data | 0);
            break;
        //40000B6h - DMA0DAH - DMA 0 Destination Address (W) (internal memory)
        case 0x40000B6:
            this.dmaChannel0.writeDMADestination16_1(data | 0);
            break;
        //40000B8h - DMA0CNT_L - DMA 0 Word Count (W) (14 bit, 1..4000h)
        case 0x40000B8:
            this.dmaChannel0.writeDMAWordCount16(data | 0);
            break;
        //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
        case 0x40000BA:
            this.dmaChannel0.writeDMAControl16(data | 0);
            break;
        //40000BCh - DMA1SAD - DMA 1 Source Address (W) (internal memory)
        case 0x40000BC:
            this.dmaChannel1.writeDMASource16_0(data | 0);
            break;
        //40000BEh - DMA1SAH - DMA 1 Source Address (W) (internal memory)
        case 0x40000BE:
            this.dmaChannel1.writeDMASource16_1(data | 0);
            break;
        //40000C0h - DMA1DAD - DMA 1 Destination Address (W) (internal memory)
        case 0x40000C0:
            this.dmaChannel1.writeDMADestination16_0(data | 0);
            break;
        //40000C2h - DMA1DAH - DMA 1 Destination Address (W) (internal memory)
        case 0x40000C2:
            this.dmaChannel1.writeDMADestination16_1(data | 0);
            break;
        //40000C4h - DMA1CNT_L - DMA 1 Word Count (W) (14 bit, 1..4000h)
        case 0x40000C4:
            this.dmaChannel1.writeDMAWordCount16(data | 0);
            break;
        //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
        case 0x40000C6:
            this.dmaChannel1.writeDMAControl16(data | 0);
            break;
        //40000C8h - DMA2SAD - DMA 2 Source Address (W) (internal memory)
        case 0x40000C8:
            this.dmaChannel2.writeDMASource16_0(data | 0);
            break;
        //40000CAh - DMA2SAH - DMA 2 Source Address (W) (internal memory)
        case 0x40000CA:
            this.dmaChannel2.writeDMASource16_1(data | 0);
            break;
        //40000CCh - DMA2DAD - DMA 2 Destination Address (W) (internal memory)
        case 0x40000CC:
            this.dmaChannel2.writeDMADestination16_0(data | 0);
            break;
        //40000CEh - DMA2DAH - DMA 2 Destination Address (W) (internal memory)
        case 0x40000CE:
            this.dmaChannel2.writeDMADestination16_1(data | 0);
            break;
        //40000D0h - DMA2CNT_L - DMA 2 Word Count (W) (14 bit, 1..4000h)
        case 0x40000D0:
            this.dmaChannel2.writeDMAWordCount16(data | 0);
            break;
        //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
        case 0x40000D2:
            this.dmaChannel2.writeDMAControl16(data | 0);
            break;
        //40000D4h - DMA3SAD - DMA 3 Source Address (W) (internal memory)
        case 0x40000D4:
            this.dmaChannel3.writeDMASource16_0(data | 0);
            break;
        //40000D6h - DMA3SAH - DMA 3 Source Address (W) (internal memory)
        case 0x40000D6:
            this.dmaChannel3.writeDMASource16_1(data | 0);
            break;
        //40000D8h - DMA3DAD - DMA 3 Destination Address (W) (internal memory)
        case 0x40000D8:
            this.dmaChannel3.writeDMADestination16_0(data | 0);
            break;
        //40000DAh - DMA3DAH - DMA 3 Destination Address (W) (internal memory)
        case 0x40000DA:
            this.dmaChannel3.writeDMADestination16_1(data | 0);
            break;
        //40000DCh - DMA3CNT_L - DMA 3 Word Count (W) (16 bit, 1..10000h)
        case 0x40000DC:
            this.dmaChannel3.writeDMAWordCount16(data | 0);
            break;
        //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
        case 0x40000DE:
            this.dmaChannel3.writeDMAControl16(data | 0);
            break;
        //40000E0h through 40000FFh - NOT USED - GLITCHED
        //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
        case 0x4000100:
            this.timer.writeTM0CNT16(data | 0);
            break;
        //4000102h - TM0CNT_H - Timer 0 Control (R/W)
        case 0x4000102:
            this.timer.writeTM0CNT8_2(data | 0);
            break;
        //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
        case 0x4000104:
            this.timer.writeTM1CNT16(data | 0);
            break;
        //4000106h - TM1CNT_H - Timer 1 Control (R/W)
        case 0x4000106:
            this.timer.writeTM1CNT8_2(data | 0);
            break;
        //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
        case 0x4000108:
            this.timer.writeTM2CNT16(data | 0);
            break;
        //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
        case 0x400010A:
            this.timer.writeTM2CNT8_2(data | 0);
            break;
        //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
        case 0x400010C:
            this.timer.writeTM3CNT16(data | 0);
            break;
        //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
        case 0x400010E:
            this.timer.writeTM3CNT8_2(data | 0);
            break;
        //4000110h through 400011Fh - NOT USED - GLITCHED
        //4000120h - Serial Data A (R/W)
        case 0x4000120:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_A0(data & 0xFF);
            this.serial.writeSIODATA_A1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000122h - Serial Data B (R/W)
        case 0x4000122:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_B0(data & 0xFF);
            this.serial.writeSIODATA_B1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000124h - Serial Data C (R/W)
        case 0x4000124:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_C0(data & 0xFF);
            this.serial.writeSIODATA_C1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000126h - Serial Data D (R/W)
        case 0x4000126:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_D0(data & 0xFF);
            this.serial.writeSIODATA_D1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
        case 0x4000128:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIOCNT0(data & 0xFF);
            this.serial.writeSIOCNT1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
        case 0x400012A:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA8_0(data & 0xFF);
            this.serial.writeSIODATA8_1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //400012Ch through 400012Fh - NOT USED - GLITCHED
        //4000130h - KEYINPUT - Key Status (R)
        //4000132h - KEYCNT - Key Interrupt Control (R/W)
        case 0x4000132:
            this.joypad.writeKeyControl16(data | 0);
            break;
        //4000134h - RCNT (R/W) - Mode Selection
        case 0x4000134:
            this.IOCore.updateSerialClocking();
            this.serial.writeRCNT0(data & 0xFF);
            this.serial.writeRCNT1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000136h through 400013Fh - NOT USED - GLITCHED
        //4000140h - JOYCNT - JOY BUS Control Register (R/W)
        case 0x4000140:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYCNT(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000142h through 400014Fh - NOT USED - GLITCHED
        //4000150h - JoyBus Receive (R/W)
        case 0x4000150:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV0(data & 0xFF);
            this.serial.writeJOYBUS_RECV1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000152h - JoyBus Receive (R/W)
        case 0x4000152:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV2(data & 0xFF);
            this.serial.writeJOYBUS_RECV3((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000154h - JoyBus Send (R/W)
        case 0x4000154:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND0(data & 0xFF);
            this.serial.writeJOYBUS_SEND1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000156h - JoyBus Send (R/W)
        case 0x4000156:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND2(data & 0xFF);
            this.serial.writeJOYBUS_SEND3((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000158h - JoyBus Stat (R/W)
        case 0x4000158:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_STAT(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000159h through 40001FFh - NOT USED - GLITCHED
        //4000200h - IE - Interrupt Enable Register (R/W)
        case 0x4000200:
            this.irq.writeIE16(data | 0);
            break;
        //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
        case 0x4000202:
            this.irq.writeIF16(data | 0);
            break;
        //4000204h - WAITCNT - Waitstate Control (R/W)
        case 0x4000204:
            this.wait.writeWAITCNT0(data & 0xFF);
            this.wait.writeWAITCNT1((data >> 8) & 0xFF);
            break;
        //4000206h - WAITCNT - Waitstate Control (R/W)
        //4000208h - IME - Interrupt Master Enable Register (R/W)
        case 0x4000208:
            this.irq.writeIME(data | 0);
            break;
        //4000209h through 40002FFh - NOT USED - GLITCHED
        //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
        case 0x4000300:
            this.wait.writePOSTBOOT(data & 0xFF);
            this.wait.writeHALTCNT((data >> 8) & 0xFF);
            break;
        default:
            if ((address & 0xFFFC) == 0x800) {
                //WRAM wait state control:
                this.wait.writeConfigureWRAM16(address | 0, data & 0xFFFF);
            }
    }
}
GameBoyAdvanceMemory.prototype.writeIODispatch32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.singleClock();
    switch (address & -4) {
        //4000000h - DISPCNT - LCD Control (Read/Write)
        //4000002h - Undocumented - Green Swap (R/W)
        case 0x4000000:
            this.gfxRenderer.writeDISPCNT32(data | 0);
            break;
        //4000004h - DISPSTAT - General LCD Status (Read/Write)
        //4000006h - VCOUNT - Vertical Counter (Read only)
        case 0x4000004:
            this.gfxState.writeDISPSTAT16(data | 0);
            break;
        //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
        //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
        case 0x4000008:
            this.gfxRenderer.writeBG0BG1CNT32(data | 0);
            break;
        //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
        //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
        case 0x400000C:
            this.gfxRenderer.writeBG2BG3CNT32(data | 0);
            break;
        //4000010h - BG0HOFS - BG0 X-Offset (W)
        //4000012h - BG0VOFS - BG0 Y-Offset (W)
        case 0x4000010:
            this.gfxRenderer.writeBG0OFS32(data | 0);
            break;
        //4000014h - BG1HOFS - BG1 X-Offset (W)
        //4000016h - BG1VOFS - BG1 Y-Offset (W)
        case 0x4000014:
            this.gfxRenderer.writeBG1OFS32(data | 0);
            break;
        //4000018h - BG2HOFS - BG2 X-Offset (W)
        //400001Ah - BG2VOFS - BG2 Y-Offset (W)
        case 0x4000018:
            this.gfxRenderer.writeBG2OFS32(data | 0);
            break;
        //400001Ch - BG3HOFS - BG3 X-Offset (W)
        //400001Eh - BG3VOFS - BG3 Y-Offset (W)
        case 0x400001C:
            this.gfxRenderer.writeBG3OFS32(data | 0);
            break;
        //4000020h - BG2PA - BG2 Rotation/Scaling Parameter A (alias dx) (W)
        //4000022h - BG2PB - BG2 Rotation/Scaling Parameter B (alias dmx) (W)
        case 0x4000020:
            this.gfxRenderer.writeBG2PAB32(data | 0);
            break;
        //4000024h - BG2PC - BG2 Rotation/Scaling Parameter C (alias dy) (W)
        //4000026h - BG2PD - BG2 Rotation/Scaling Parameter D (alias dmy) (W)
        case 0x4000024:
            this.gfxRenderer.writeBG2PCD32(data | 0);
            break;
        //4000028h - BG2X_L - BG2 Reference Point X-Coordinate, lower 16 bit (W)
        //400002Ah - BG2X_H - BG2 Reference Point X-Coordinate, upper 12 bit (W)
        case 0x4000028:
            this.gfxRenderer.writeBG2X32(data | 0);
            break;
        //400002Ch - BG2Y_L - BG2 Reference Point Y-Coordinate, lower 16 bit (W)
        //400002Eh - BG2Y_H - BG2 Reference Point Y-Coordinate, upper 12 bit (W)
        case 0x400002C:
            this.gfxRenderer.writeBG2Y32(data | 0);
            break;
        //4000030h - BG3PA - BG3 Rotation/Scaling Parameter A (alias dx) (W)
        //4000032h - BG3PB - BG3 Rotation/Scaling Parameter B (alias dmx) (W)
        case 0x4000030:
            this.gfxRenderer.writeBG3PAB32(data | 0);
            break;
        //4000034h - BG3PC - BG3 Rotation/Scaling Parameter C (alias dy) (W)
        //4000036h - BG3PD - BG3 Rotation/Scaling Parameter D (alias dmy) (W)
        case 0x4000034:
            this.gfxRenderer.writeBG3PCD32(data | 0);
            break;
        //4000038h - BG3X_L - BG3 Reference Point X-Coordinate, lower 16 bit (W)
        //400003Ah - BG3X_H - BG3 Reference Point X-Coordinate, upper 12 bit (W)
        case 0x4000038:
            this.gfxRenderer.writeBG3X32(data | 0);
            break;
        //400003Ch - BG3Y_L - BG3 Reference Point Y-Coordinate, lower 16 bit (W)
        //400003Eh - BG3Y_H - BG3 Reference Point Y-Coordinate, upper 12 bit (W)
        case 0x400003C:
            this.gfxRenderer.writeBG3Y32(data | 0);
            break;
        //4000040h - WIN0H - Window 0 Horizontal Dimensions (W)
        //4000042h - WIN1H - Window 1 Horizontal Dimensions (W)
        case 0x4000040:
            this.gfxRenderer.writeWINXCOORD32(data | 0);
            break;
        //4000044h - WIN0V - Window 0 Vertical Dimensions (W)
        //4000046h - WIN1V - Window 1 Vertical Dimensions (W)
        case 0x4000044:
            this.gfxRenderer.writeWINYCOORD32(data | 0);
            break;
        //4000048h - WININ - Control of Inside of Window(s) (R/W)
        //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
        case 0x4000048:
            this.gfxRenderer.writeWINCONTROL32(data | 0);
            break;
        //400004Ch - MOSAIC - Mosaic Size (W)
        //400004Eh - NOT USED - ZERO
        case 0x400004C:
            this.gfxRenderer.writeMOSAIC16(data | 0);
            break;
        //4000050h - BLDCNT - Color Special Effects Selection (R/W)
        //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
        case 0x4000050:
            this.gfxRenderer.writeBLDCNT32(data | 0);
            break;
        //4000054h - BLDY - Brightness (Fade-In/Out) Coefficient (W)
        case 0x4000054:
            this.gfxRenderer.writeBLDY8(data | 0);
            break;
        //4000055h through 400005Fh - NOT USED - ZERO/GLITCHED
        //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
        //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
        case 0x4000060:
            //NR10:
            this.sound.writeSOUND1CNT32(data | 0);
            break;
        //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
        //4000066h - NOT USED - ZERO
        case 0x4000064:
            //NR13:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_X0(data & 0xFF);
            //NR14:
            this.sound.writeSOUND1CNT_X1((data >> 8) & 0xFF);
            break;
        //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
        //400006Ah - NOT USED - ZERO
        case 0x4000068:
            //NR21:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_L0(data & 0xFF);
            //NR22:
            this.sound.writeSOUND2CNT_L1((data >> 8) & 0xFF);
            break;
        //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
        //400006Eh - NOT USED - ZERO
        case 0x400006C:
            //NR23:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_H0(data & 0xFF);
            //NR24:
            this.sound.writeSOUND2CNT_H1((data >> 8) & 0xFF);
            break;
        //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
        //4000072h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
        case 0x4000070:
            //NR30:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_L(data & 0xFF);
            //NR31:
            this.sound.writeSOUND3CNT_H0((data >> 16) & 0xFF);
            //NR32:
            this.sound.writeSOUND3CNT_H1(data >>> 24);
            break;
        //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
        //4000076h - NOT USED - ZERO
        case 0x4000074:
            //NR33:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_X0(data & 0xFF);
            //NR34:
            this.sound.writeSOUND3CNT_X1((data >> 8) & 0xFF);
            break;
        //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
        //400007Ah - NOT USED - ZERO
        case 0x4000078:
            //NR41:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_L0(data & 0xFF);
            //NR42:
            this.sound.writeSOUND4CNT_L1((data >> 8) & 0xFF);
            break;
        //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
        //400007Eh - NOT USED - ZERO
        case 0x400007C:
            //NR43:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_H0(data & 0xFF);
            //NR44:
            this.sound.writeSOUND4CNT_H1((data >> 8) & 0xFF);
            break;
        //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
        //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
        case 0x4000080:
            //NR50:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_L0(data & 0xFF);
            //NR51:
            this.sound.writeSOUNDCNT_L1((data >> 8) & 0xFF);
            this.sound.writeSOUNDCNT_H0((data >> 16) & 0xFF);
            this.sound.writeSOUNDCNT_H1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
        //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
        //4000086h - NOT USED - ZERO
        case 0x4000084:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_X(data & 0xFF);
            break;
        //4000088h - SOUNDBIAS - Sound PWM Control (R/W)
        case 0x4000088:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDBIAS0(data & 0xFF);
            this.sound.writeSOUNDBIAS1((data >> 8) & 0xFF);
            break;
        //400008Ah through 400008Fh - NOT USED - ZERO/GLITCHED
        //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
        //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000090:
        //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
        //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000094:
        //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
        //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000098:
        //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
        //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009C:
            this.sound.writeWAVE32(address & 0xF, data | 0);
            break;
        //40000A0h - FIFO_A_L - FIFO Channel A First Word (W)
        //40000A2h - FIFO_A_H - FIFO Channel A Second Word (W)
        case 0x40000A0:
            this.sound.writeFIFOA32(data | 0);
            break;
        //40000A4h - FIFO_B_L - FIFO Channel B First Word (W)
        //40000A6h - FIFO_B_H - FIFO Channel B Second Word (W)
        case 0x40000A4:
            this.sound.writeFIFOB32(data | 0);
            break;
        //40000A8h through 40000AFh - NOT USED - GLITCHED
        //40000B0h - DMA0SAH - DMA 0 Source Address (W) (internal memory)
        //40000B2h - DMA0SAD - DMA 0 Source Address (W) (internal memory)
        case 0x40000B0:
            this.dmaChannel0.writeDMASource32(data | 0);
            break;
        //40000B4h - DMA0DAD - DMA 0 Destination Address (W) (internal memory)
        //40000B6h - DMA0DAH - DMA 0 Destination Address (W) (internal memory)
        case 0x40000B4:
            this.dmaChannel0.writeDMADestination32(data | 0);
            break;
        //40000B8h - DMA0CNT_L - DMA 0 Word Count (W) (14 bit, 1..4000h)
        //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
        case 0x40000B8:
            this.dmaChannel0.writeDMAControl32(data | 0);
            break;
        //40000BCh - DMA1SAD - DMA 1 Source Address (W) (internal memory)
        //40000BEh - DMA1SAH - DMA 1 Source Address (W) (internal memory)
        case 0x40000BC:
            this.dmaChannel1.writeDMASource32(data | 0);
            break;
        //40000C0h - DMA1DAD - DMA 1 Destination Address (W) (internal memory)
        //40000C2h - DMA1DAH - DMA 1 Destination Address (W) (internal memory)
        case 0x40000C0:
            this.dmaChannel1.writeDMADestination32(data | 0);
            break;
        //40000C4h - DMA1CNT_L - DMA 1 Word Count (W) (14 bit, 1..4000h)
        //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
        case 0x40000C4:
            this.dmaChannel1.writeDMAControl32(data | 0);
            break;
        //40000C8h - DMA2SAD - DMA 2 Source Address (W) (internal memory)
        //40000CAh - DMA2SAH - DMA 2 Source Address (W) (internal memory)
        case 0x40000C8:
            this.dmaChannel2.writeDMASource32(data | 0);
            break;
        //40000CCh - DMA2DAD - DMA 2 Destination Address (W) (internal memory)
        //40000CEh - DMA2DAH - DMA 2 Destination Address (W) (internal memory)
        case 0x40000CC:
            this.dmaChannel2.writeDMADestination32(data | 0);
            break;
        //40000D0h - DMA2CNT_L - DMA 2 Word Count (W) (14 bit, 1..4000h)
        //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
        case 0x40000D0:
            this.dmaChannel2.writeDMAControl32(data | 0);
            break;
        //40000D4h - DMA3SAD - DMA 3 Source Address (W) (internal memory)
        //40000D6h - DMA3SAH - DMA 3 Source Address (W) (internal memory)
        case 0x40000D4:
            this.dmaChannel3.writeDMASource32(data | 0);
            break;
        //40000D8h - DMA3DAD - DMA 3 Destination Address (W) (internal memory)
        //40000DAh - DMA3DAH - DMA 3 Destination Address (W) (internal memory)
        case 0x40000D8:
            this.dmaChannel3.writeDMADestination32(data | 0);
            break;
        //40000DCh - DMA3CNT_L - DMA 3 Word Count (W) (16 bit, 1..10000h)
        //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
        case 0x40000DC:
            this.dmaChannel3.writeDMAControl32(data | 0);
            break;
        //40000E0h through 40000FFh - NOT USED - GLITCHED
        //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
        //4000102h - TM0CNT_H - Timer 0 Control (R/W)
        case 0x4000100:
            this.timer.writeTM0CNT32(data | 0);
            break;
        //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
        //4000106h - TM1CNT_H - Timer 1 Control (R/W)
        case 0x4000104:
            this.timer.writeTM1CNT32(data | 0);
            break;
        //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
        //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
        case 0x4000108:
            this.timer.writeTM2CNT32(data | 0);
            break;
        //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
        //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
        case 0x400010C:
            this.timer.writeTM3CNT32(data | 0);
            break;
        //4000110h through 400011Fh - NOT USED - GLITCHED
        //4000120h - Serial Data A (R/W)
        //4000122h - Serial Data B (R/W)
        case 0x4000120:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_A0(data & 0xFF);
            this.serial.writeSIODATA_A1((data >> 8) & 0xFF);
            this.serial.writeSIODATA_B0((data >> 16) & 0xFF);
            this.serial.writeSIODATA_B1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
        //4000124h - Serial Data C (R/W)
        //4000126h - Serial Data D (R/W)
        case 0x4000124:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_C0(data & 0xFF);
            this.serial.writeSIODATA_C1((data >> 8) & 0xFF);
            this.serial.writeSIODATA_D0((data >> 16) & 0xFF);
            this.serial.writeSIODATA_D1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
        //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
        //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
        case 0x4000128:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIOCNT0(data & 0xFF);
            this.serial.writeSIOCNT1((data >> 8) & 0xFF);
            this.serial.writeSIODATA8_0((data >> 16) & 0xFF);
            this.serial.writeSIODATA8_1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
        //400012Ch through 400012Fh - NOT USED - GLITCHED
        //4000130h - KEYINPUT - Key Status (R)
        //4000132h - KEYCNT - Key Interrupt Control (R/W)
        case 0x4000130:
            this.joypad.writeKeyControl16(data >> 16);
            break;
        //4000134h - RCNT (R/W) - Mode Selection
        case 0x4000134:
            this.IOCore.updateSerialClocking();
            this.serial.writeRCNT0(data & 0xFF);
            this.serial.writeRCNT1((data >> 8) & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000136h through 400013Fh - NOT USED - GLITCHED
        //4000140h - JOYCNT - JOY BUS Control Register (R/W)
        case 0x4000140:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYCNT(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000142h through 400014Fh - NOT USED - GLITCHED
        //4000150h - JoyBus Receive (R/W)
        //4000152h - JoyBus Receive (R/W)
        case 0x4000150:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV0(data & 0xFF);
            this.serial.writeJOYBUS_RECV1((data >> 8) & 0xFF);
            this.serial.writeJOYBUS_RECV2((data >> 16) & 0xFF);
            this.serial.writeJOYBUS_RECV3(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
        //4000154h - JoyBus Send (R/W)
        //4000156h - JoyBus Send (R/W)
        case 0x4000154:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND0(data & 0xFF);
            this.serial.writeJOYBUS_SEND1((data >> 8) & 0xFF);
            this.serial.writeJOYBUS_SEND2((data >> 16) & 0xFF);
            this.serial.writeJOYBUS_SEND3(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
        //4000158h - JoyBus Stat (R/W)
        case 0x4000158:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_STAT(data & 0xFF);
            this.IOCore.updateCoreEventTime();
            break;
        //4000159h through 40001FFh - NOT USED - GLITCHED
        //4000200h - IE - Interrupt Enable Register (R/W)
        //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
        case 0x4000200:
            this.irq.writeIRQ32(data | 0);
            break;
        //4000204h - WAITCNT - Waitstate Control (R/W)
        //4000206h - WAITCNT - Waitstate Control (R/W)
        case 0x4000204:
            this.wait.writeWAITCNT0(data & 0xFF);
            this.wait.writeWAITCNT1((data >> 8) & 0xFF);
            break;
        //4000208h - IME - Interrupt Master Enable Register (R/W)
        case 0x4000208:
            this.irq.writeIME(data | 0);
            break;
        //4000209h through 40002FFh - NOT USED - GLITCHED
        //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
        //4000302h - NOT USED - ZERO
        case 0x4000300:
            this.wait.writePOSTBOOT(data & 0xFF);
            this.wait.writeHALTCNT((data >> 8) & 0xFF);
            break;
        default:
            if ((address & 0xFFFC) == 0x800) {
                //WRAM wait state control:
                this.wait.writeConfigureWRAM32(data | 0);
            }
    }
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceMemory.prototype.writeVRAM8Preliminary = function (address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.updateGraphicsClocking();
        switch (address >> 24) {
            case 0x5:
                this.wait.VRAMAccess();
                this.gfxRenderer.writePalette16(address & 0x3FE, Math.imul(data & 0xFF, 0x101) | 0);
                break;
            case 0x6:
                this.wait.VRAMAccess();
                this.gfxRenderer.writeVRAM8(address | 0, data | 0);
                break;
            default:
                this.wait.OAMAccess();
        }
    }
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceMemory.prototype.writeVRAM8Preliminary = function (address, data) {
        this.IOCore.updateGraphicsClocking();
        switch (address >> 24) {
            case 0x5:
                this.wait.VRAMAccess();
                this.gfxRenderer.writePalette16(address & 0x3FE, (data & 0xFF) * 0x101);
                break;
            case 0x6:
                this.wait.VRAMAccess();
                this.gfxRenderer.writeVRAM8(address, data);
                break;
            default:
                this.wait.OAMAccess();
        }
    }
}
GameBoyAdvanceMemory.prototype.writePalette16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.wait.VRAMAccess();
    this.gfxRenderer.writePalette16(address & 0x3FE, data & 0xFFFF);
}
GameBoyAdvanceMemory.prototype.writeVRAM16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.wait.VRAMAccess();
    this.gfxRenderer.writeVRAM16(address | 0, data | 0);
}
GameBoyAdvanceMemory.prototype.writeOBJ16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.wait.OAMAccess();
    this.gfxRenderer.writeOAM16(address & 0x3FE, data & 0xFFFF);
}
GameBoyAdvanceMemory.prototype.writePalette32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.wait.VRAMAccess32();
    this.gfxRenderer.writePalette32(address & 0x3FC, data | 0);
}
GameBoyAdvanceMemory.prototype.writeVRAM32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.wait.VRAMAccess32();
    this.gfxRenderer.writeVRAM32(address | 0, data | 0);
}
GameBoyAdvanceMemory.prototype.writeOBJ32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.IOCore.updateGraphicsClocking();
    this.wait.OAMAccess();
    this.gfxRenderer.writeOAM32(address & 0x3FC, data | 0);
}
GameBoyAdvanceMemory.prototype.writeROM8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.ROMAccess(address | 0);
    this.cartridge.writeROM8(address & 0x1FFFFFF, data & 0xFF);
}
GameBoyAdvanceMemory.prototype.writeROM16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.ROMAccess(address | 0);
    this.cartridge.writeROM16(address & 0x1FFFFFE, data & 0xFFFF);
}
GameBoyAdvanceMemory.prototype.writeROM16DMA = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.ROMAccess(address | 0);
    this.cartridge.writeROM16DMA(address & 0x1FFFFFE, data & 0xFFFF);
}
GameBoyAdvanceMemory.prototype.writeROM32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.ROMAccess32(address | 0);
    this.cartridge.writeROM32(address & 0x1FFFFFC, data | 0);
}
GameBoyAdvanceMemory.prototype.writeSRAM8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.SRAMAccess();
    this.saves.writeSRAM(address & 0xFFFF, data & 0xFF);
}
GameBoyAdvanceMemory.prototype.writeSRAM16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.SRAMAccess();
    this.saves.writeSRAM(address & 0xFFFE, (data >> ((address & 0x2) << 3)) & 0xFF);
}
GameBoyAdvanceMemory.prototype.writeSRAM32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    this.wait.SRAMAccess();
    this.saves.writeSRAM(address & 0xFFFC, data & 0xFF);
}
GameBoyAdvanceMemory.prototype.writeUnused = function () {
    //Ignore the data write...
    this.wait.singleClock();
}
GameBoyAdvanceMemory.prototype.remapWRAM = function (data) {
    data = data & 0x21;
    if ((data | 0) != (this.WRAMControlFlags | 0)) {
        switch (data | 0) {
            case 0:
                //Mirror Internal RAM to External:
                this.memoryRead8 = this.memoryRead8Generated[0];
                this.memoryWrite8 = this.memoryWrite8Generated[0];
                this.memoryRead16 = this.memoryRead16Generated[0];
                this.memoryReadDMA16 = this.memoryReadDMA16Generated[0];
                this.memoryReadDMAFull16 = this.memoryReadDMA16FullGenerated[0];
                this.memoryReadCPU16 = this.memoryReadCPU16Generated[0];
                this.memoryWrite16 = this.memoryWrite16Generated[0];
                this.memoryWriteDMA16 = this.memoryWriteDMA16Generated[0];
                this.memoryWriteDMAFull16 = this.memoryWriteDMA16FullGenerated[0];
                this.memoryRead32 = this.memoryRead32Generated[0];
                this.memoryReadDMA32 = this.memoryReadDMA32Generated[0];
                this.memoryReadDMAFull32 = this.memoryReadDMA32FullGenerated[0];
                this.memoryReadCPU32 = this.memoryReadCPU32Generated[0];
                this.memoryWrite32 = this.memoryWrite32Generated[0];
                this.memoryWriteDMA32 = this.memoryWriteDMA32Generated[0];
                this.memoryWriteDMAFull32 = this.memoryWriteDMA32FullGenerated[0];
                break;
            case 0x20:
                //Use External RAM:
                this.memoryRead8 = this.memoryRead8Generated[1];
                this.memoryWrite8 = this.memoryWrite8Generated[1];
                this.memoryRead16 = this.memoryRead16Generated[1];
                this.memoryReadDMA16 = this.memoryReadDMA16Generated[1];
                this.memoryReadDMAFull16 = this.memoryReadDMA16FullGenerated[1];
                this.memoryReadCPU16 = this.memoryReadCPU16Generated[1];
                this.memoryWrite16 = this.memoryWrite16Generated[1];
                this.memoryWriteDMA16 = this.memoryWriteDMA16Generated[1];
                this.memoryWriteDMAFull16 = this.memoryWriteDMA16FullGenerated[1];
                this.memoryRead32 = this.memoryRead32Generated[1];
                this.memoryReadDMA32 = this.memoryReadDMA32Generated[1];
                this.memoryReadDMAFull32 = this.memoryReadDMA32FullGenerated[1];
                this.memoryReadCPU32 = this.memoryReadCPU32Generated[1];
                this.memoryWrite32 = this.memoryWrite32Generated[1];
                this.memoryWriteDMA32 = this.memoryWriteDMA32Generated[1];
                this.memoryWriteDMAFull32 = this.memoryWriteDMA32FullGenerated[1];
                break;
            default:
                //WRAM Disabled:
                this.memoryRead8 = this.memoryRead8Generated[2];
                this.memoryWrite8 = this.memoryWrite8Generated[2];
                this.memoryRead16 = this.memoryRead16Generated[2];
                this.memoryReadDMA16 = this.memoryReadDMA16Generated[2];
                this.memoryReadDMAFull16 = this.memoryReadDMA16FullGenerated[2];
                this.memoryReadCPU16 = this.memoryReadCPU16Generated[2];
                this.memoryWrite16 = this.memoryWrite16Generated[2];
                this.memoryWriteDMA16 = this.memoryWriteDMA16Generated[2];
                this.memoryWriteDMAFull16 = this.memoryWriteDMA16FullGenerated[2];
                this.memoryRead32 = this.memoryRead32Generated[2];
                this.memoryReadDMA32 = this.memoryReadDMA32Generated[2];
                this.memoryReadDMAFull32 = this.memoryReadDMA32FullGenerated[2];
                this.memoryReadCPU32 = this.memoryReadCPU32Generated[2];
                this.memoryWrite32 = this.memoryWrite32Generated[2];
                this.memoryWriteDMA32 = this.memoryWriteDMA32Generated[2];
                this.memoryWriteDMAFull32 = this.memoryWriteDMA32FullGenerated[2];
        }
        this.WRAMControlFlags = data | 0;
    }
}
GameBoyAdvanceMemory.prototype.readBIOS8 = function (address) {
    address = address | 0;
    var data = 0;
    this.wait.singleClock();
    if ((address | 0) < 0x4000) {
        if ((this.cpu.registers[15] | 0) < 0x4000) {
            //If reading from BIOS while executing it:
            data = this.BIOS[address & 0x3FFF] | 0;
        }
        else {
            //Not allowed to read from BIOS while executing outside of it:
            data = (this.lastBIOSREAD >> ((address & 0x3) << 3)) & 0xFF;
        }
    }
    else {
        data = this.readUnused8CPUBase(address | 0) | 0;
    }
    return data | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceMemory.prototype.readBIOS16 = function (address) {
        address = address | 0;
        var data = 0;
        this.wait.singleClock();
        if ((address | 0) < 0x4000) {
            address = address >> 1;
            if ((this.cpu.registers[15] | 0) < 0x4000) {
                //If reading from BIOS while executing it:
                data = this.BIOS16[address & 0x1FFF] | 0;
            }
            else {
                //Not allowed to read from BIOS while executing outside of it:
                data = (this.lastBIOSREAD >> ((address & 0x1) << 4)) & 0xFFFF;
            }
        }
        else {
            data = this.readUnused16CPUBase(address | 0) | 0;
        }
        return data | 0;
    }
    GameBoyAdvanceMemory.prototype.readBIOS16DMA = function (address) {
        address = address | 0;
        var data = 0;
        this.wait.singleClock();
        if ((address | 0) < 0x4000) {
            address = address >> 1;
            if ((this.cpu.registers[15] | 0) < 0x4000) {
                //If reading from BIOS while executing it:
                data = this.BIOS16[address & 0x1FFF] | 0;
            }
        }
        else {
            data = this.readUnused16DMABase(address | 0) | 0;
        }
        return data | 0;
    }
    GameBoyAdvanceMemory.prototype.readBIOS16CPU = function (address) {
        address = address | 0;
        var data = 0;
        this.IOCore.updateCoreSingle();
        if ((address | 0) < 0x4000) {
            address = address >> 1;
            //If reading from BIOS while executing it:
            data = this.BIOS16[address & 0x1FFF] | 0;
            this.lastBIOSREAD = data | 0;
        }
        else {
            data = this.readUnused16CPUBase(address | 0) | 0;
        }
        return data | 0;
    }
    GameBoyAdvanceMemory.prototype.readBIOS32 = function (address) {
        address = address | 0;
        var data = 0;
        this.wait.singleClock();
        if ((address | 0) < 0x4000) {
            address = address >> 2;
            if ((this.cpu.registers[15] | 0) < 0x4000) {
                //If reading from BIOS while executing it:
                data = this.BIOS32[address & 0xFFF] | 0;
            }
            else {
                //Not allowed to read from BIOS while executing outside of it:
                data = this.lastBIOSREAD | 0;
            }
        }
        else {
            data = this.cpu.getCurrentFetchValue() | 0;
        }
        return data | 0;
    }
    GameBoyAdvanceMemory.prototype.readBIOS32DMA = function (address) {
        address = address | 0;
        var data = 0;
        this.wait.singleClock();
        if ((address | 0) < 0x4000) {
            address = address >> 2;
            if ((this.cpu.registers[15] | 0) < 0x4000) {
                //If reading from BIOS while executing it:
                data = this.BIOS32[address & 0xFFF] | 0;
            }
        }
        else {
            data = this.dma.getCurrentFetchValue() | 0;
        }
        return data | 0;
    }
    GameBoyAdvanceMemory.prototype.readBIOS32CPU = function (address) {
        address = address | 0;
        var data = 0;
        this.IOCore.updateCoreSingle();
        if ((address | 0) < 0x4000) {
            address = address >> 2;
            //If reading from BIOS while executing it:
            data = this.BIOS32[address & 0xFFF] | 0;
            this.lastBIOSREAD = data | 0;
        }
        else {
            data = this.cpu.getCurrentFetchValue() | 0;
        }
        return data | 0;
    }
}
else {
    GameBoyAdvanceMemory.prototype.readBIOS16 = function (address) {
        this.wait.singleClock();
        if (address < 0x4000) {
            if (this.cpu.registers[15] < 0x4000) {
                //If reading from BIOS while executing it:
                return this.BIOS[address & -2] | (this.BIOS[address | 1] << 8);
            }
            else {
                //Not allowed to read from BIOS while executing outside of it:
                return (this.lastBIOSREAD >> ((address & 0x2) << 3)) & 0xFFFF;
            }
        }
        else {
            return this.readUnused16CPUBase(address);
        }
    }
    GameBoyAdvanceMemory.prototype.readBIOS16DMA = function (address) {
        this.wait.singleClock();
        if (address < 0x4000) {
            if (this.cpu.registers[15] < 0x4000) {
                //If reading from BIOS while executing it:
                return this.BIOS[address & -2] | (this.BIOS[address | 1] << 8);
            }
            else {
                //Not allowed to read from BIOS while executing outside of it:
                return 0;
            }
        }
        else {
            return this.readUnused16DMABase(address);
        }
    }
    GameBoyAdvanceMemory.prototype.readBIOS16CPU = function (address) {
        this.IOCore.updateCoreSingle();
        if (address < 0x4000) {
            //If reading from BIOS while executing it:
            var data = this.BIOS[address & -2] | (this.BIOS[address | 1] << 8);
            this.lastBIOSREAD = data;
            return data;
        }
        else {
            return this.readUnused16CPUBase(address);
        }
    }
    GameBoyAdvanceMemory.prototype.readBIOS32 = function (address) {
        this.wait.singleClock();
        if (address < 0x4000) {
            if (this.cpu.registers[15] < 0x4000) {
                //If reading from BIOS while executing it:
                address &= -4;
                return this.BIOS[address] | (this.BIOS[address + 1] << 8) | (this.BIOS[address + 2] << 16)  | (this.BIOS[address + 3] << 24);
            }
            else {
                //Not allowed to read from BIOS while executing outside of it:
                return this.lastBIOSREAD;
            }
        }
        else {
            return this.cpu.getCurrentFetchValue();
        }
    }
    GameBoyAdvanceMemory.prototype.readBIOS32DMA = function (address) {
        this.wait.singleClock();
        if (address < 0x4000) {
            if (this.cpu.registers[15] < 0x4000) {
                //If reading from BIOS while executing it:
                address &= -4;
                return this.BIOS[address] | (this.BIOS[address + 1] << 8) | (this.BIOS[address + 2] << 16)  | (this.BIOS[address + 3] << 24);
            }
            else {
                //Not allowed to read from BIOS while executing outside of it:
                return 0;
            }
        }
        else {
            return this.dma.getCurrentFetchValue();
        }
    }
    GameBoyAdvanceMemory.prototype.readBIOS32CPU = function (address) {
        this.IOCore.updateCoreSingle();
        if (address < 0x4000) {
            //If reading from BIOS while executing it:
            address &= -4;
            var data = this.BIOS[address] | (this.BIOS[address + 1] << 8) | (this.BIOS[address + 2] << 16)  | (this.BIOS[address + 3] << 24);
            this.lastBIOSREAD = data;
            return data;
        }
        else {
            return this.cpu.getCurrentFetchValue();
        }
    }
}
GameBoyAdvanceMemory.prototype.readExternalWRAM8 = function (address) {
    address = address | 0;
    //External WRAM:
    this.wait.WRAMAccess();
    return this.externalRAM[address & 0x3FFFF] | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceMemory.prototype.readExternalWRAM16 = function (address) {
        address = address | 0;
        //External WRAM:
        this.wait.WRAMAccess();
        return this.externalRAM16[(address >> 1) & 0x1FFFF] | 0;
    }
    GameBoyAdvanceMemory.prototype.readExternalWRAM16CPU = function (address) {
        address = address | 0;
        //External WRAM:
        this.wait.WRAMAccess16CPU();
        return this.externalRAM16[(address >> 1) & 0x1FFFF] | 0;
    }
    GameBoyAdvanceMemory.prototype.readExternalWRAM32 = function (address) {
        address = address | 0;
        //External WRAM:
        this.wait.WRAMAccess32();
        return this.externalRAM32[(address >> 2) & 0xFFFF] | 0;
    }
    GameBoyAdvanceMemory.prototype.readExternalWRAM32CPU = function (address) {
        address = address | 0;
        //External WRAM:
        this.wait.WRAMAccess32CPU();
        return this.externalRAM32[(address >> 2) & 0xFFFF] | 0;
    }
}
else {
    GameBoyAdvanceMemory.prototype.readExternalWRAM16 = function (address) {
        //External WRAM:
        this.wait.WRAMAccess();
        address &= 0x3FFFE;
        return this.externalRAM[address] | (this.externalRAM[address + 1] << 8);
    }
    GameBoyAdvanceMemory.prototype.readExternalWRAM16CPU = function (address) {
        //External WRAM:
        this.wait.WRAMAccess16CPU();
        address &= 0x3FFFE;
        return this.externalRAM[address] | (this.externalRAM[address + 1] << 8);
    }
    GameBoyAdvanceMemory.prototype.readExternalWRAM32 = function (address) {
        //External WRAM:
        this.wait.WRAMAccess32();
        address &= 0x3FFFC;
        return this.externalRAM[address] | (this.externalRAM[address + 1] << 8) | (this.externalRAM[address + 2] << 16) | (this.externalRAM[address + 3] << 24);
    }
    GameBoyAdvanceMemory.prototype.readExternalWRAM32CPU = function (address) {
        //External WRAM:
        this.wait.WRAMAccess32CPU();
        address &= 0x3FFFC;
        return this.externalRAM[address] | (this.externalRAM[address + 1] << 8) | (this.externalRAM[address + 2] << 16) | (this.externalRAM[address + 3] << 24);
    }
}
GameBoyAdvanceMemory.prototype.readInternalWRAM8 = function (address) {
    address = address | 0;
    //Internal WRAM:
    this.wait.singleClock();
    return this.internalRAM[address & 0x7FFF] | 0;
}
if (__LITTLE_ENDIAN__) {
    GameBoyAdvanceMemory.prototype.readInternalWRAM16 = function (address) {
        address = address | 0;
        //Internal WRAM:
        this.wait.singleClock();
        return this.internalRAM16[(address >> 1) & 0x3FFF] | 0;
    }
    GameBoyAdvanceMemory.prototype.readInternalWRAM16CPU = function (address) {
        address = address | 0;
        //Internal WRAM:
        this.IOCore.updateCoreSingle();
        return this.internalRAM16[(address >> 1) & 0x3FFF] | 0;
    }
    GameBoyAdvanceMemory.prototype.readInternalWRAM32 = function (address) {
        address = address | 0;
        //Internal WRAM:
        this.wait.singleClock();
        return this.internalRAM32[(address >> 2) & 0x1FFF] | 0;
    }
    GameBoyAdvanceMemory.prototype.readInternalWRAM32CPU = function (address) {
        address = address | 0;
        //Internal WRAM:
        this.IOCore.updateCoreSingle();
        return this.internalRAM32[(address >> 2) & 0x1FFF] | 0;
    }
}
else {
    GameBoyAdvanceMemory.prototype.readInternalWRAM16 = function (address) {
        //Internal WRAM:
        this.wait.singleClock();
        address &= 0x7FFE;
        return this.internalRAM[address] | (this.internalRAM[address + 1] << 8);
    }
    GameBoyAdvanceMemory.prototype.readInternalWRAM16CPU = function (address) {
        //Internal WRAM:
        this.IOCore.updateCoreSingle();
        address &= 0x7FFE;
        return this.internalRAM[address] | (this.internalRAM[address + 1] << 8);
    }
    GameBoyAdvanceMemory.prototype.readInternalWRAM32 = function (address) {
        //Internal WRAM:
        this.wait.singleClock();
        address &= 0x7FFC;
        return this.internalRAM[address] | (this.internalRAM[address + 1] << 8) | (this.internalRAM[address + 2] << 16) | (this.internalRAM[address + 3] << 24);
    }
    GameBoyAdvanceMemory.prototype.readInternalWRAM32CPU = function (address) {
        //Internal WRAM:
        this.IOCore.updateCoreSingle();
        address &= 0x7FFC;
        return this.internalRAM[address] | (this.internalRAM[address + 1] << 8) | (this.internalRAM[address + 2] << 16) | (this.internalRAM[address + 3] << 24);
    }
}
GameBoyAdvanceMemory.prototype.readIODispatch8 = function (address) {
    address = address | 0;
    this.wait.singleClock();
    var data = 0;
    switch (address | 0) {
        //4000000h - DISPCNT - LCD Control (Read/Write)
        case 0x4000000:
            data = this.gfxRenderer.readDISPCNT8_0() | 0;
            break;
        //4000001h - DISPCNT - LCD Control (Read/Write)
        case 0x4000001:
            data = this.gfxRenderer.readDISPCNT8_1() | 0;
            break;
        //4000002h - Undocumented - Green Swap (R/W)
        case 0x4000002:
            data = this.gfxRenderer.readDISPCNT8_2() | 0;
            break;
        //4000004h - DISPSTAT - General LCD Status (Read/Write)
        case 0x4000004:
            data = this.gfxState.readDISPSTAT8_0() | 0;
            break;
        //4000005h - DISPSTAT - General LCD Status (Read/Write)
        case 0x4000005:
            data = this.gfxState.readDISPSTAT8_1() | 0;
            break;
        //4000006h - VCOUNT - Vertical Counter (Read only)
        case 0x4000006:
            data = this.gfxState.readDISPSTAT8_2() | 0;
            break;
        //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
        case 0x4000008:
            data = this.gfxRenderer.readBG0CNT8_0() | 0;
            break;
        //4000009h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
        case 0x4000009:
            data = this.gfxRenderer.readBG0CNT8_1() | 0;
            break;
        //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
        case 0x400000A:
            data = this.gfxRenderer.readBG1CNT8_0() | 0;
            break;
        //400000Bh - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
        case 0x400000B:
            data = this.gfxRenderer.readBG1CNT8_1() | 0;
            break;
        //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
        case 0x400000C:
            data = this.gfxRenderer.readBG2CNT8_0() | 0;
            break;
        //400000Dh - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
        case 0x400000D:
            data = this.gfxRenderer.readBG2CNT8_1() | 0;
            break;
        //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
        case 0x400000E:
            data = this.gfxRenderer.readBG3CNT8_0() | 0;
            break;
        //400000Fh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
        case 0x400000F:
            data = this.gfxRenderer.readBG3CNT8_1() | 0;
            break;
        //4000010h through 4000047h - WRITE ONLY
        //4000048h - WININ - Control of Inside of Window(s) (R/W)
        case 0x4000048:
            data = this.gfxRenderer.readWIN0IN8() | 0;
            break;
        //4000049h - WININ - Control of Inside of Window(s) (R/W)
        case 0x4000049:
            data = this.gfxRenderer.readWIN1IN8() | 0;
            break;
        //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
        case 0x400004A:
            data = this.gfxRenderer.readWINOUT8() | 0;
            break;
        //400004AB- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
        case 0x400004B:
            data = this.gfxRenderer.readWINOBJIN8() | 0;
            break;
        //4000050h - BLDCNT - Color Special Effects Selection (R/W)
        case 0x4000050:
            data = this.gfxRenderer.readBLDCNT8_0() | 0;
            break;
        //4000051h - BLDCNT - Color Special Effects Selection (R/W)
        case 0x4000051:
            data = this.gfxRenderer.readBLDCNT8_1() | 0;
            break;
        //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
        case 0x4000052:
            data = this.gfxRenderer.readBLDALPHA8_0() | 0;
            break;
        //4000053h - BLDALPHA - Alpha Blending Coefficients (R/W)
        case 0x4000053:
            data = this.gfxRenderer.readBLDALPHA8_1() | 0;
            break;
        //4000054h through 400005Fh - NOT USED - GLITCHED
        //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
        case 0x4000060:
            //NR10:
            data = this.sound.readSOUND1CNT8_0() | 0;
            break;
        //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
        case 0x4000062:
            //NR11:
            data = this.sound.readSOUND1CNT8_2() | 0;
            break;
        //4000063h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
        case 0x4000063:
            //NR12:
            data = this.sound.readSOUND1CNT8_3() | 0;
            break;
        //4000065h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
        case 0x4000065:
            //NR14:
            data = this.sound.readSOUND1CNT_X() | 0;
            break;
        //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
        case 0x4000068:
            //NR21:
            data = this.sound.readSOUND2CNT_L0() | 0;
            break;
        //4000069h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
        case 0x4000069:
            //NR22:
            data = this.sound.readSOUND2CNT_L1() | 0;
            break;
        //400006Dh - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
        case 0x400006D:
            //NR24:
            data = this.sound.readSOUND2CNT_H() | 0;
            break;
        //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
        case 0x4000070:
            //NR30:
            data = this.sound.readSOUND3CNT_L() | 0;
            break;
        //4000073h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
        case 0x4000073:
            //NR32:
            data = this.sound.readSOUND3CNT_H() | 0;
            break;
        //4000075h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
        case 0x4000075:
            //NR34:
            data = this.sound.readSOUND3CNT_X() | 0;
            break;
        //4000079h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
        case 0x4000079:
            //NR42:
            data = this.sound.readSOUND4CNT_L() | 0;
            break;
        //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
        case 0x400007C:
            //NR43:
            data = this.sound.readSOUND4CNT_H0() | 0;
            break;
        //400007Dh - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
        case 0x400007D:
            //NR44:
            data = this.sound.readSOUND4CNT_H1() | 0;
            break;
        //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
        case 0x4000080:
            //NR50:
            data = this.sound.readSOUNDCNT_L0() | 0;
            break;
        //4000081h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
        case 0x4000081:
            //NR51:
            data = this.sound.readSOUNDCNT_L1() | 0;
            break;
        //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
        case 0x4000082:
            data = this.sound.readSOUNDCNT_H0() | 0;
            break;
        //4000083h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
        case 0x4000083:
            data = this.sound.readSOUNDCNT_H1() | 0;
            break;
        //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
        case 0x4000084:
            this.IOCore.updateTimerClocking();
            data = this.sound.readSOUNDCNT_X() | 0;
            break;
        //4000088h - SOUNDBIAS - Sound PWM Control (R/W, see below)
        case 0x4000088:
            data = this.sound.readSOUNDBIAS0() | 0;
            break;
        //4000089h - SOUNDBIAS - Sound PWM Control (R/W, see below)
        case 0x4000089:
            data = this.sound.readSOUNDBIAS1() | 0;
            break;
        //400008Ch - NOT USED - GLITCHED
        //400008Dh - NOT USED - GLITCHED
        //400008Eh - NOT USED - GLITCHED
        //400008Fh - NOT USED - GLITCHED
        //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000090:
        //4000091h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000091:
        //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000092:
        //4000093h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000093:
        //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000094:
        //4000095h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000095:
        //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000096:
        //4000097h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000097:
        //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000098:
        //4000099h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000099:
        //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009A:
        //400009Bh - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009B:
        //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009C:
        //400009Dh - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009D:
        //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009E:
        //400009Fh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009F:
            data = this.sound.readWAVE8(address & 0xF) | 0;
            break;
        //40000A0h through 40000B9h - WRITE ONLY
        //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
        case 0x40000BA:
            data = this.dmaChannel0.readDMAControl8_0() | 0;
            break;
        //40000BBh - DMA0CNT_H - DMA 0 Control (R/W)
        case 0x40000BB:
            data = this.dmaChannel0.readDMAControl8_1() | 0;
            break;
        //40000BCh through 40000C5h - WRITE ONLY
        //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
        case 0x40000C6:
            data = this.dmaChannel1.readDMAControl8_0() | 0;
            break;
        //40000C7h - DMA1CNT_H - DMA 1 Control (R/W)
        case 0x40000C7:
            data = this.dmaChannel1.readDMAControl8_1() | 0;
            break;
        //40000C8h through 40000D1h - WRITE ONLY
        //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
        case 0x40000D2:
            data = this.dmaChannel2.readDMAControl8_0() | 0;
            break;
        //40000D3h - DMA2CNT_H - DMA 2 Control (R/W)
        case 0x40000D3:
            data = this.dmaChannel2.readDMAControl8_1() | 0;
            break;
        //40000D4h through 40000DDh - WRITE ONLY
        //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
        case 0x40000DE:
            data = this.dmaChannel3.readDMAControl8_0() | 0;
            break;
        //40000DFh - DMA3CNT_H - DMA 3 Control (R/W)
        case 0x40000DF:
            data = this.dmaChannel3.readDMAControl8_1() | 0;
            break;
        //40000E0h through 40000FFh - NOT USED - GLITCHED
        //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
        case 0x4000100:
            data = this.timer.readTM0CNT8_0() | 0;
            break;
        //4000101h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
        case 0x4000101:
            data = this.timer.readTM0CNT8_1() | 0;
            break;
        //4000102h - TM0CNT_H - Timer 0 Control (R/W)
        case 0x4000102:
            data = this.timer.readTM0CNT8_2() | 0;
            break;
        //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
        case 0x4000104:
            data = this.timer.readTM1CNT8_0() | 0;
            break;
        //4000105h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
        case 0x4000105:
            data = this.timer.readTM1CNT8_1() | 0;
            break;
        //4000106h - TM1CNT_H - Timer 1 Control (R/W)
        case 0x4000106:
            data = this.timer.readTM1CNT8_2() | 0;
            break;
        //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
        case 0x4000108:
            data = this.timer.readTM2CNT8_0() | 0;
            break;
        //4000109h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
        case 0x4000109:
            data = this.timer.readTM2CNT8_1() | 0;
            break;
        //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
        case 0x400010A:
            data = this.timer.readTM2CNT8_2() | 0;
            break;
        //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
        case 0x400010C:
            data = this.timer.readTM3CNT8_0() | 0;
            break;
        //400010Dh - TM3CNT_L - Timer 3 Counter/Reload (R/W)
        case 0x400010D:
            data = this.timer.readTM3CNT8_1() | 0;
            break;
        //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
        case 0x400010E:
            data = this.timer.readTM3CNT8_2() | 0;
            break;
        //4000110h through 400011Fh - NOT USED - GLITCHED
        //4000120h - Serial Data A (R/W)
        case 0x4000120:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_A0() | 0;
            break;
        //4000121h - Serial Data A (R/W)
        case 0x4000121:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_A1() | 0;
            break;
        //4000122h - Serial Data B (R/W)
        case 0x4000122:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_B0() | 0;
            break;
        //4000123h - Serial Data B (R/W)
        case 0x4000123:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_B1() | 0;
            break;
        //4000124h - Serial Data C (R/W)
        case 0x4000124:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_C0() | 0;
            break;
        //4000125h - Serial Data C (R/W)
        case 0x4000125:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_C1() | 0;
            break;
        //4000126h - Serial Data D (R/W)
        case 0x4000126:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_D0() | 0;
            break;
        //4000127h - Serial Data D (R/W)
        case 0x4000127:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_D1() | 0;
            break;
        //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
        case 0x4000128:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIOCNT0() | 0;
            break;
        //4000129h - SIOCNT - SIO Sub Mode Control (R/W)
        case 0x4000129:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIOCNT1() | 0;
            break;
        //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
        case 0x400012A:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA8_0() | 0;
            break;
        //400012Bh - SIOMLT_SEND - Data Send Register (R/W)
        case 0x400012B:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA8_1() | 0;
            break;
        //400012Ch through 400012Fh - NOT USED - GLITCHED
        //4000130h - KEYINPUT - Key Status (R)
        case 0x4000130:
            data = this.joypad.readKeyStatus8_0() | 0;
            break;
        //4000131h - KEYINPUT - Key Status (R)
        case 0x4000131:
            data = this.joypad.readKeyStatus8_1() | 0;
            break;
        //4000132h - KEYCNT - Key Interrupt Control (R/W)
        case 0x4000132:
            data = this.joypad.readKeyControl8_0() | 0;
            break;
        //4000133h - KEYCNT - Key Interrupt Control (R/W)
        case 0x4000133:
            data = this.joypad.readKeyControl8_1() | 0;
            break;
        //4000134h - RCNT (R/W) - Mode Selection
        case 0x4000134:
            this.IOCore.updateSerialClocking();
            data = this.serial.readRCNT0() | 0;
            break;
        //4000135h - RCNT (R/W) - Mode Selection
        case 0x4000135:
            this.IOCore.updateSerialClocking();
            data = this.serial.readRCNT1() | 0;
            break;
        //4000138h through 400013Fh - NOT USED - GLITCHED
        //4000140h - JOYCNT - JOY BUS Control Register (R/W)
        case 0x4000140:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYCNT() | 0;
            break;
        //4000144h through 400014Fh - NOT USED - GLITCHED
        //4000150h - JoyBus Receive (R/W)
        case 0x4000150:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV0() | 0;
            break;
        //4000151h - JoyBus Receive (R/W)
        case 0x4000151:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV1() | 0;
            break;
        //4000152h - JoyBus Receive (R/W)
        case 0x4000152:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV2() | 0;
            break;
        //4000153h - JoyBus Receive (R/W)
        case 0x4000153:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV3() | 0;
            break;
        //4000154h - JoyBus Send (R/W)
        case 0x4000154:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND0() | 0;
            break;
        //4000155h - JoyBus Send (R/W)
        case 0x4000155:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND1() | 0;
            break;
        //4000156h - JoyBus Send (R/W)
        case 0x4000156:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND2() | 0;
            break;
        //4000157h - JoyBus Send (R/W)
        case 0x4000157:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND3() | 0;
            break;
        //4000158h - JoyBus Stat (R/W)
        case 0x4000158:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_STAT() | 0;
            break;
        //400015Ch through 40001FFh - NOT USED - GLITCHED
        //4000200h - IE - Interrupt Enable Register (R/W)
        case 0x4000200:
            data = this.irq.readIE8_0() | 0;
            break;
        //4000201h - IE - Interrupt Enable Register (R/W)
        case 0x4000201:
            data = this.irq.readIE8_1() | 0;
            break;
        //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
        case 0x4000202:
            data = this.irq.readIF8_0() | 0;
            break;
        //4000203h - IF - Interrupt Request Flags / IRQ Acknowledge
        case 0x4000203:
            data = this.irq.readIF8_1() | 0;
            break;
        //4000204h - WAITCNT - Waitstate Control (R/W)
        case 0x4000204:
            data = this.wait.readWAITCNT0() | 0;
            break;
        //4000205h - WAITCNT - Waitstate Control (R/W)
        case 0x4000205:
            data = this.wait.readWAITCNT1() | 0;
            break;
        //4000208h - IME - Interrupt Master Enable Register (R/W)
        case 0x4000208:
            data = this.irq.readIME() | 0;
            break;
        //400020Ch through 40002FFh - NOT USED - GLITCHED
        //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
        case 0x4000300:
            data = this.wait.readPOSTBOOT() | 0;
            break;
        default:
            data = this.readIO8LessCalled(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readIO8LessCalled = function (address) {
    address = address | 0;
    var data = 0;
    switch (address | 0) {
            //4000003h - Undocumented - Green Swap (R/W)
        case 0x4000003:
            //4000007h - VCOUNT - Vertical Counter (Read only)
        case 0x4000007:
            //400004Ch - MOSAIC - Mosaic Size (W)
        case 0x400004C:
            //400004Dh - MOSAIC - Mosaic Size (W)
        case 0x400004D:
            //400004Eh - NOT USED - ZERO
        case 0x400004E:
            //400004Fh - NOT USED - ZERO
        case 0x400004F:
            //4000061h - NOT USED - ZERO
        case 0x4000061:
            //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
        case 0x4000064:
            //4000066h - NOT USED - ZERO
        case 0x4000066:
            //4000067h - NOT USED - ZERO
        case 0x4000067:
            //400006Ah - NOT USED - ZERO
        case 0x400006A:
            //400006Bh - NOT USED - ZERO
        case 0x400006B:
            //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
        case 0x400006C:
            //400006Eh - NOT USED - ZERO
        case 0x400006E:
            //400006Fh - NOT USED - ZERO
        case 0x400006F:
            //4000071h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
        case 0x4000071:
            //4000072h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
        case 0x4000072:
            //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
        case 0x4000074:
            //4000076h - NOT USED - ZERO
        case 0x4000076:
            //4000077h - NOT USED - ZERO
        case 0x4000077:
            //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
        case 0x4000078:
            //400007Ah - NOT USED - ZERO
        case 0x400007A:
            //400007Bh - NOT USED - ZERO
        case 0x400007B:
            //400007Eh - NOT USED - ZERO
        case 0x400007E:
            //400007Fh - NOT USED - ZERO
        case 0x400007F:
            //4000085h - NOT USED - ZERO
        case 0x4000085:
            //4000086h - NOT USED - ZERO
        case 0x4000086:
            //4000087h - NOT USED - ZERO
        case 0x4000087:
            //400008Ah - NOT USED - ZERO
        case 0x400008A:
            //400008Bh - NOT USED - ZERO
        case 0x400008B:
            //4000103h - TM0CNT_H - Timer 0 Control (R/W)
        case 0x4000103:
            //4000107h - TM1CNT_H - Timer 1 Control (R/W)
        case 0x4000107:
            //400010Bh - TM2CNT_H - Timer 2 Control (R/W)
        case 0x400010B:
            //400010Fh - TM3CNT_H - Timer 3 Control (R/W)
        case 0x400010F:
            //4000136h - NOT USED - ZERO
        case 0x4000136:
            //4000137h - NOT USED - ZERO
        case 0x4000137:
            //4000141h - JOYCNT - JOY BUS Control Register (R/W)
        case 0x4000141:
            //4000142h - NOT USED - ZERO
        case 0x4000142:
            //4000143h - NOT USED - ZERO
        case 0x4000143:
            //4000159h - JoyBus Stat (R/W)
        case 0x4000159:
            //400015Ah - NOT USED - ZERO
        case 0x400015A:
            //400015Bh - NOT USED - ZERO
        case 0x400015B:
            //4000206h - NOT USED - ZERO
        case 0x4000206:
            //4000207h - NOT USED - ZERO
        case 0x4000207:
            //4000209h - IME - Interrupt Master Enable Register (R/W)
        case 0x4000209:
            //400020Ah - NOT USED - ZERO
        case 0x400020A:
            //400020Bh - NOT USED - ZERO
        case 0x400020B:
            //4000301h - HALTCNT - BYTE - Undocumented - Low Power Mode Control (W)
        case 0x4000301:
            //4000302h - NOT USED - ZERO
        case 0x4000302:
            //4000303h - NOT USED - ZERO
        case 0x4000303:
            break;
        default:
            if ((address & 0xFFFC) == 0x800) {
                //WRAM wait state control:
                data = this.wait.readConfigureWRAM8(address | 0) | 0;
            }
            else {
                //Undefined Illegal I/O:
                data = this.readUnused8CPUBase(address | 0) | 0;
            }
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readIODispatch16 = function (address) {
    address = address | 0;
    var data = 0;
    this.wait.singleClock();
    var data = this.readIO16(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readIODispatch16CPU = function (address) {
    address = address | 0;
    this.IOCore.updateCoreSingle();
    var data = this.readIO16(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readIO16 = function (address) {
    address = address | 0;
    var data = 0;
    switch (address & -2) {
        //4000000h - DISPCNT - LCD Control (Read/Write)
        case 0x4000000:
            data = this.gfxRenderer.readDISPCNT16() | 0;
            break;
        //4000002h - Undocumented - Green Swap (R/W)
        case 0x4000002:
            data = this.gfxRenderer.readDISPCNT8_2() | 0;
            break;
        //4000004h - DISPSTAT - General LCD Status (Read/Write)
        case 0x4000004:
            data = this.gfxState.readDISPSTAT16_0() | 0;
            break;
        //4000006h - VCOUNT - Vertical Counter (Read only)
        case 0x4000006:
            data = this.gfxState.readDISPSTAT8_2() | 0;
            break;
        //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
        case 0x4000008:
            data = this.gfxRenderer.readBG0CNT16() | 0;
            break;
        //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
        case 0x400000A:
            data = this.gfxRenderer.readBG1CNT16() | 0;
            break;
        //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
        case 0x400000C:
            data = this.gfxRenderer.readBG2CNT16() | 0;
            break;
        //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
        case 0x400000E:
            data = this.gfxRenderer.readBG3CNT16() | 0;
            break;
        //4000010h through 4000047h - WRITE ONLY
        //4000048h - WININ - Control of Inside of Window(s) (R/W)
        case 0x4000048:
            data = this.gfxRenderer.readWININ16() | 0;
            break;
        //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
        case 0x400004A:
            data = this.gfxRenderer.readWINOUT16() | 0;
            break;
        //4000050h - BLDCNT - Color Special Effects Selection (R/W)
        case 0x4000050:
            data = this.gfxRenderer.readBLDCNT16() | 0;
            break;
        //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
        case 0x4000052:
            data = this.gfxRenderer.readBLDALPHA16() | 0;
            break;
        //4000054h through 400005Fh - NOT USED - GLITCHED
        //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
        case 0x4000060:
            //NR10:
            data = this.sound.readSOUND1CNT8_0() | 0;
            break;
        //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
        case 0x4000062:
            //NR11:
            //NR12:
            data = this.sound.readSOUND1CNT8_2() | (this.sound.readSOUND1CNT8_3() << 8);
            break;
        //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
        case 0x4000064:
            //NR14:
            data = this.sound.readSOUND1CNT_X() << 8;
            break;
        //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
        case 0x4000068:
            //NR21:
            //NR22:
            data = this.sound.readSOUND2CNT_L0() | (this.sound.readSOUND2CNT_L1() << 8);
            break;
        //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
        case 0x400006C:
            //NR24:
            data = this.sound.readSOUND2CNT_H() << 8;
            break;
        //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
        case 0x4000070:
            //NR30:
            data = this.sound.readSOUND3CNT_L() | 0;
            break;
        //4000073h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
        case 0x4000072:
            //NR32:
            data = this.sound.readSOUND3CNT_H() << 8;
            break;
        //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
        case 0x4000074:
            //NR34:
            data = this.sound.readSOUND3CNT_X() << 8;
            break;
        //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
        case 0x4000078:
            //NR42:
            data = this.sound.readSOUND4CNT_L() << 8;
            break;
        //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
        case 0x400007C:
            //NR43:
            //NR44:
            data = this.sound.readSOUND4CNT_H0() | (this.sound.readSOUND4CNT_H1() << 8);
            break;
        //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
        case 0x4000080:
            //NR50:
            //NR51:
            data = this.sound.readSOUNDCNT_L0() | (this.sound.readSOUNDCNT_L1() << 8);
            break;
        //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
        case 0x4000082:
            data = this.sound.readSOUNDCNT_H0() | (this.sound.readSOUNDCNT_H1() << 8);
            break;
        //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
        case 0x4000084:
            this.IOCore.updateTimerClocking();
            data = this.sound.readSOUNDCNT_X() | 0;
            break;
        //4000088h - SOUNDBIAS - Sound PWM Control (R/W, see below)
        case 0x4000088:
            data = this.sound.readSOUNDBIAS0() | (this.sound.readSOUNDBIAS1() << 8);
            break;
        //400008Ch - NOT USED - GLITCHED
        //400008Eh - NOT USED - GLITCHED
        //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000090:
        //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000092:
        //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000094:
        //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000096:
        //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000098:
        //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009A:
        //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009C:
        //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009E:
            data = this.sound.readWAVE16(address & 0xF) | 0;
            break;
        //40000A0h through 40000B9h - WRITE ONLY
        //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
        case 0x40000BA:
            data = this.dmaChannel0.readDMAControl16() | 0;
            break;
        //40000BCh through 40000C5h - WRITE ONLY
        //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
        case 0x40000C6:
            data = this.dmaChannel1.readDMAControl16() | 0;
            break;
        //40000C8h through 40000D1h - WRITE ONLY
        //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
        case 0x40000D2:
            data = this.dmaChannel2.readDMAControl16() | 0;
            break;
        //40000D4h through 40000DDh - WRITE ONLY
        //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
        case 0x40000DE:
            data = this.dmaChannel3.readDMAControl16() | 0;
            break;
        //40000E0h through 40000FFh - NOT USED - GLITCHED
        //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
        case 0x4000100:
            data = this.timer.readTM0CNT16() | 0;
            break;
        //4000102h - TM0CNT_H - Timer 0 Control (R/W)
        case 0x4000102:
            data = this.timer.readTM0CNT8_2() | 0;
            break;
        //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
        case 0x4000104:
            data = this.timer.readTM1CNT16() | 0;
            break;
        //4000106h - TM1CNT_H - Timer 1 Control (R/W)
        case 0x4000106:
            data = this.timer.readTM1CNT8_2() | 0;
            break;
        //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
        case 0x4000108:
            data = this.timer.readTM2CNT16() | 0;
            break;
        //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
        case 0x400010A:
            data = this.timer.readTM2CNT8_2() | 0;
            break;
        //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
        case 0x400010C:
            data = this.timer.readTM3CNT16() | 0;
            break;
        //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
        case 0x400010E:
            data = this.timer.readTM3CNT8_2() | 0;
            break;
        //4000110h through 400011Fh - NOT USED - GLITCHED
        //4000120h - Serial Data A (R/W)
        case 0x4000120:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_A0() | (this.serial.readSIODATA_A1() << 8);
            break;
        //4000122h - Serial Data B (R/W)
        case 0x4000122:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_B0() | (this.serial.readSIODATA_B1() << 8);
            break;
        //4000124h - Serial Data C (R/W)
        case 0x4000124:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_C0() | (this.serial.readSIODATA_C1() << 8);
            break;
        //4000126h - Serial Data D (R/W)
        case 0x4000126:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_D0() | (this.serial.readSIODATA_D1() << 8);
            break;
        //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
        case 0x4000128:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIOCNT0() | (this.serial.readSIOCNT1() << 8);
            break;
        //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
        case 0x400012A:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA8_0() | (this.serial.readSIODATA8_1() << 8);
            break;
        //400012Ch through 400012Fh - NOT USED - GLITCHED
        //4000130h - KEYINPUT - Key Status (R)
        case 0x4000130:
            data = this.joypad.readKeyStatus16() | 0;
            break;
        //4000132h - KEYCNT - Key Interrupt Control (R/W)
        case 0x4000132:
            data = this.joypad.readKeyControl16() | 0;
            break;
        //4000134h - RCNT (R/W) - Mode Selection
        case 0x4000134:
            this.IOCore.updateSerialClocking();
            data = this.serial.readRCNT0() | (this.serial.readRCNT1() << 8);
            break;
        //4000138h through 400013Fh - NOT USED - GLITCHED
        //4000140h - JOYCNT - JOY BUS Control Register (R/W)
        case 0x4000140:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYCNT() | 0;
            break;
        //4000144h through 400014Fh - NOT USED - GLITCHED
        //4000150h - JoyBus Receive (R/W)
        case 0x4000150:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV0() | (this.serial.readJOYBUS_RECV1() << 8);
            break;
        //4000152h - JoyBus Receive (R/W)
        case 0x4000152:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV2() | (this.serial.readJOYBUS_RECV3() << 8);
            break;
        //4000154h - JoyBus Send (R/W)
        case 0x4000154:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND0() | (this.serial.readJOYBUS_SEND1() << 8);
            break;
        //4000156h - JoyBus Send (R/W)
        case 0x4000156:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND2() | (this.serial.readJOYBUS_SEND3() << 8);
            break;
        //4000158h - JoyBus Stat (R/W)
        case 0x4000158:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_STAT() | 0;
            break;
        //400015Ch through 40001FFh - NOT USED - GLITCHED
        //4000200h - IE - Interrupt Enable Register (R/W)
        case 0x4000200:
            data = this.irq.readIE16() | 0;
            break;
        //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
        case 0x4000202:
            data = this.irq.readIF16() | 0;
            break;
        //4000204h - WAITCNT - Waitstate Control (R/W)
        case 0x4000204:
            data = this.wait.readWAITCNT0() | (this.wait.readWAITCNT1() << 8);
            break;
        //4000208h - IME - Interrupt Master Enable Register (R/W)
        case 0x4000208:
            data = this.irq.readIME() | 0;
            break;
        //400020Ch through 40002FFh - NOT USED - GLITCHED
        //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
        case 0x4000300:
            data = this.wait.readPOSTBOOT() | 0;
            break;
        default:
            data = this.readIO16LessCalled(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readIO16LessCalled = function (address) {
    address = address | 0;
    var data = 0;
    switch (address & -2) {
        //400004Ch - MOSAIC - Mosaic Size (W)
        case 0x400004C:
        //400004Eh - NOT USED - ZERO
        case 0x400004E:
        //4000066h - NOT USED - ZERO
        case 0x4000066:
        //400006Ah - NOT USED - ZERO
        case 0x400006A:
        //400006Eh - NOT USED - ZERO
        case 0x400006E:
        //4000076h - NOT USED - ZERO
        case 0x4000076:
        //400007Ah - NOT USED - ZERO
        case 0x400007A:
        //400007Eh - NOT USED - ZERO
        case 0x400007E:
        //4000086h - NOT USED - ZERO
        case 0x4000086:
        //400008Ah - NOT USED - ZERO
        case 0x400008A:
        //4000136h - NOT USED - ZERO
        case 0x4000136:
        //4000142h - NOT USED - ZERO
        case 0x4000142:
        //400015Ah - NOT USED - ZERO
        case 0x400015A:
        //4000206h - NOT USED - ZERO
        case 0x4000206:
        //400020Ah - NOT USED - ZERO
        case 0x400020A:
        //4000302h - NOT USED - ZERO
        case 0x4000302:
            break;
        default:
            if ((address & 0xFFFC) == 0x800) {
                //WRAM wait state control:
                data = this.wait.readConfigureWRAM16(address | 0) | 0;
            }
            else {
                //Undefined Illegal I/O:
                data = this.readUnused16MultiBase(address | 0) | 0;
            }
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readIODispatch32 = function (address) {
    address = address | 0;
    this.wait.singleClock();
    var data = this.readIO32(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readIODispatch32CPU = function (address) {
    address = address | 0;
    this.IOCore.updateCoreSingle();
    var data = this.readIO32(address | 0) | 0;
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readIO32 = function (address) {
    address = address | 0;
    var data = 0;
    switch (address & -4) {
        //4000000h - DISPCNT - LCD Control (Read/Write)
        //4000002h - Undocumented - Green Swap (R/W)
        case 0x4000000:
            data = this.gfxRenderer.readDISPCNT32() | 0;
            break;
        //4000004h - DISPSTAT - General LCD Status (Read/Write)
        //4000006h - VCOUNT - Vertical Counter (Read only)
        case 0x4000004:
            data = this.gfxState.readDISPSTAT32() | 0;
            break;
        //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
        //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
        case 0x4000008:
            data = this.gfxRenderer.readBG0BG1CNT32() | 0;
            break;
        //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
        //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
        case 0x400000C:
            data = this.gfxRenderer.readBG2BG3CNT32() | 0;
            break;
        //4000010h through 4000047h - WRITE ONLY
        //4000048h - WININ - Control of Inside of Window(s) (R/W)
        //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
        case 0x4000048:
            data = this.gfxRenderer.readWINCONTROL32() | 0;
            break;
        //400004Ch - MOSAIC - Mosaic Size (W)
        //4000050h - BLDCNT - Color Special Effects Selection (R/W)
        //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
        case 0x4000050:
            data = this.gfxRenderer.readBLDCNT32() | 0;
            break;
        //4000054h through 400005Fh - NOT USED - GLITCHED
        //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
        //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
        case 0x4000060:
            //NR10:
            //NR11:
            //NR12:
            data = this.sound.readSOUND1CNT8_0() |
            (this.sound.readSOUND1CNT8_2() << 16) |
            (this.sound.readSOUND1CNT8_3() << 24);
            break;
        //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
        //4000066h - NOT USED - ZERO
        case 0x4000064:
            //NR14:
            data = this.sound.readSOUND1CNT_X() << 8;
            break;
        //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
        //400006Ah - NOT USED - ZERO
        case 0x4000068:
            //NR21:
            //NR22:
            data = this.sound.readSOUND2CNT_L0() | (this.sound.readSOUND2CNT_L1() << 8);
            break;
        //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
        //400006Eh - NOT USED - ZERO
        case 0x400006C:
            //NR24:
            data = this.sound.readSOUND2CNT_H() << 8;
            break;
        //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
        //4000073h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
        case 0x4000070:
            //NR30:
            //NR32:
            data = this.sound.readSOUND3CNT_L() | (this.sound.readSOUND3CNT_H() << 24);
            break;
        //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
        //4000076h - NOT USED - ZERO
        case 0x4000074:
            //NR34:
            data = this.sound.readSOUND3CNT_X() << 8;
            break;
        //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
        //400007Ah - NOT USED - ZERO
        case 0x4000078:
            //NR42:
            data = this.sound.readSOUND4CNT_L() << 8;
            break;
        //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
        //400007Eh - NOT USED - ZERO
        case 0x400007C:
            //NR43:
            //NR44:
            data = this.sound.readSOUND4CNT_H0() | (this.sound.readSOUND4CNT_H1() << 8);
            break;
        //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
        //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
        case 0x4000080:
            //NR50:
            //NR51:
            data = this.sound.readSOUNDCNT_L0() |
            (this.sound.readSOUNDCNT_L1() << 8) |
            (this.sound.readSOUNDCNT_H0() << 16) |
            (this.sound.readSOUNDCNT_H1() << 24);
            break;
        //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
        //4000086h - NOT USED - ZERO
        case 0x4000084:
            this.IOCore.updateTimerClocking();
            data = this.sound.readSOUNDCNT_X() | 0;
            break;
        //4000088h - SOUNDBIAS - Sound PWM Control (R/W, see below)
        //400008Ah - NOT USED - ZERO
        case 0x4000088:
            data = this.sound.readSOUNDBIAS0() | (this.sound.readSOUNDBIAS1() << 8);
            break;
        //400008Ch - NOT USED - GLITCHED
        //400008Eh - NOT USED - GLITCHED
        //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
        //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000090:
        //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
        //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000094:
        //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
        //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x4000098:
        //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
        //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
        case 0x400009C:
            data = this.sound.readWAVE32(address & 0xF) | 0;
            break;
        //40000A0h through 40000B9h - WRITE ONLY
        //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
        case 0x40000B8:
            data = this.dmaChannel0.readDMAControl16() << 16;
            break;
        //40000BCh through 40000C5h - WRITE ONLY
        //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
        case 0x40000C4:
            data = this.dmaChannel1.readDMAControl16() << 16;
            break;
        //40000C8h through 40000D1h - WRITE ONLY
        //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
        case 0x40000D0:
            data = this.dmaChannel2.readDMAControl16() << 16;
            break;
        //40000D4h through 40000DDh - WRITE ONLY
        //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
        case 0x40000DC:
            data = this.dmaChannel3.readDMAControl16() << 16;
            break;
        //40000E0h through 40000FFh - NOT USED - GLITCHED
        //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
        //4000102h - TM0CNT_H - Timer 0 Control (R/W)
        case 0x4000100:
            data = this.timer.readTM0CNT32() | 0;
            break;
        //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
        //4000106h - TM1CNT_H - Timer 1 Control (R/W)
        case 0x4000104:
            data = this.timer.readTM1CNT32() | 0;
            break;
        //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
        //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
        case 0x4000108:
            data = this.timer.readTM2CNT32() | 0;
            break;
        //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
        //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
        case 0x400010C:
            data = this.timer.readTM3CNT32() | 0;
            break;
        //4000110h through 400011Fh - NOT USED - GLITCHED
        //4000120h - Serial Data A (R/W)
        //4000122h - Serial Data B (R/W)
        case 0x4000110:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_A0() |
            (this.serial.readSIODATA_A1() << 8) |
            (this.serial.readSIODATA_B0() << 16) |
            (this.serial.readSIODATA_B1() << 24);
            break;
        //4000124h - Serial Data C (R/W)
        //4000126h - Serial Data D (R/W)
        case 0x4000124:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_C0() |
            (this.serial.readSIODATA_C1() << 8) |
            (this.serial.readSIODATA_D0() << 16) |
            (this.serial.readSIODATA_D1() << 24);
            break;
        //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
        //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
        case 0x4000128:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIOCNT0() |
            (this.serial.readSIOCNT1() << 8) |
            (this.serial.readSIODATA8_0() << 16) |
            (this.serial.readSIODATA8_1() << 24);
            break;
        //400012Ch through 400012Fh - NOT USED - GLITCHED
        //4000130h - KEYINPUT - Key Status (R)
        //4000132h - KEYCNT - Key Interrupt Control (R/W)
        case 0x4000130:
            data = this.joypad.readKeyStatusControl32() | 0;
            break;
        //4000134h - RCNT (R/W) - Mode Selection
        //4000136h - NOT USED - ZERO
        case 0x4000134:
            this.IOCore.updateSerialClocking();
            data = this.serial.readRCNT0() | (this.serial.readRCNT1() << 8);
            break;
        //4000138h through 400013Fh - NOT USED - GLITCHED
        //4000140h - JOYCNT - JOY BUS Control Register (R/W)
        //4000142h - NOT USED - ZERO
        case 0x4000138:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYCNT() | 0;
            break;
        //4000144h through 400014Fh - NOT USED - GLITCHED
        //4000150h - JoyBus Receive (R/W)
        //4000152h - JoyBus Receive (R/W)
        case 0x4000144:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV0() |
            (this.serial.readJOYBUS_RECV1() << 8) |
            (this.serial.readJOYBUS_RECV2() << 16) |
            (this.serial.readJOYBUS_RECV3() << 24);
            break;
        //4000154h - JoyBus Send (R/W)
        //4000156h - JoyBus Send (R/W)
        case 0x4000154:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND0() |
            (this.serial.readJOYBUS_SEND1() << 8) |
            (this.serial.readJOYBUS_SEND2() << 16) |
            (this.serial.readJOYBUS_SEND3() << 24);
            break;
        //4000158h - JoyBus Stat (R/W)
        //400015Ah - NOT USED - ZERO
        case 0x4000158:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_STAT() | 0;
            break;
        //400015Ch through 40001FFh - NOT USED - GLITCHED
        //4000200h - IE - Interrupt Enable Register (R/W)
        //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
        case 0x4000200:
            data = this.irq.readIRQ32() | 0;
            break;
        //4000204h - WAITCNT - Waitstate Control (R/W)
        //4000206h - NOT USED - ZERO
        case 0x4000204:
            data = this.wait.readWAITCNT0() | (this.wait.readWAITCNT1() << 8);
            break;
        //4000208h - IME - Interrupt Master Enable Register (R/W)
        //400020Ah - NOT USED - ZERO
        case 0x4000208:
            data = this.irq.readIME() | 0;
            break;
        //400020Ch through 40002FFh - NOT USED - GLITCHED
        //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
        //4000302h - NOT USED - ZERO
        case 0x4000300:
            data = this.wait.readPOSTBOOT() | 0;
            break;
        //UNDEFINED / ILLEGAL:
        default:
            if ((address & 0xFFFC) == 0x800) {
                //WRAM wait state control:
                data = this.wait.readConfigureWRAM32() | 0;
            }
            else {
                //Undefined Illegal I/O:
                data = this.readUnused32MultiBase() | 0;
            }
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readVRAM8Preliminary = function (address) {
    address = address | 0;
    this.IOCore.updateGraphicsClocking();
    var data = 0;
    switch (address >> 24) {
        case 0x5:
            this.wait.VRAMAccess();
            data = this.gfxRenderer.readPalette8(address | 0) | 0;
            break;
        case 0x6:
            this.wait.VRAMAccess();
            data = this.gfxRenderer.readVRAM8(address | 0) | 0;
            break;
        default:
            this.wait.OAMAccess();
            data = this.gfxRenderer.readOAM(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readVRAM16Preliminary = function (address) {
    address = address | 0;
    this.IOCore.updateGraphicsClocking();
    var data = 0;
    switch (address >> 24) {
        case 0x5:
            this.wait.VRAMAccess();
            data = this.gfxRenderer.readPalette16(address | 0) | 0;
            break;
        case 0x6:
            this.wait.VRAMAccess();
            data = this.gfxRenderer.readVRAM16(address | 0) | 0;
            break;
        default:
            this.wait.OAMAccess();
            data = this.gfxRenderer.readOAM16(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readVRAM16CPUPreliminary = function (address) {
    address = address | 0;
    this.IOCore.updateGraphicsClocking();
    var data = 0;
    switch (address >> 24) {
        case 0x5:
            this.wait.VRAMAccess16CPU();
            data = this.gfxRenderer.readPalette16(address | 0) | 0;
            break;
        case 0x6:
            this.wait.VRAMAccess16CPU();
            data = this.gfxRenderer.readVRAM16(address | 0) | 0;
            break;
        default:
            this.wait.OAMAccessCPU();
            data = this.gfxRenderer.readOAM16(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readVRAM32Preliminary = function (address) {
    address = address | 0;
    this.IOCore.updateGraphicsClocking();
    var data = 0;
    switch (address >> 24) {
        case 0x5:
            this.wait.VRAMAccess32();
            data = this.gfxRenderer.readPalette32(address | 0) | 0;
            break;
        case 0x6:
            this.wait.VRAMAccess32();
            data = this.gfxRenderer.readVRAM32(address | 0) | 0;
            break;
        default:
            this.wait.OAMAccess();
            data = this.gfxRenderer.readOAM32(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readVRAM32CPUPreliminary = function (address) {
    address = address | 0;
    this.IOCore.updateGraphicsClocking();
    var data = 0;
    switch (address >> 24) {
        case 0x5:
            this.wait.VRAMAccess32CPU();
            data = this.gfxRenderer.readPalette32(address | 0) | 0;
            break;
        case 0x6:
            this.wait.VRAMAccess32CPU();
            data = this.gfxRenderer.readVRAM32(address | 0) | 0;
            break;
        default:
            this.wait.OAMAccessCPU();
            data = this.gfxRenderer.readOAM32(address | 0) | 0;
    }
    return data | 0;
}
GameBoyAdvanceMemory.prototype.readROM8 = function (address) {
    address = address | 0;
    this.wait.ROMAccess(address | 0);
    return this.cartridge.readROM8(address & 0x1FFFFFF) | 0;
}
GameBoyAdvanceMemory.prototype.readROM16 = function (address) {
    address = address | 0;
    this.wait.ROMAccess(address | 0);
    return this.cartridge.readROM16(address & 0x1FFFFFE) | 0;
}
GameBoyAdvanceMemory.prototype.readROM16CPU = function (address) {
    address = address | 0;
    this.wait.ROMAccess16CPU(address | 0);
    return this.cartridge.readROM16(address & 0x1FFFFFE) | 0;
}
GameBoyAdvanceMemory.prototype.readROM32 = function (address) {
    address = address | 0;
    this.wait.ROMAccess32(address | 0);
    return this.cartridge.readROM32(address & 0x1FFFFFC) | 0;
}
GameBoyAdvanceMemory.prototype.readROM32CPU = function (address) {
    address = address | 0;
    this.wait.ROMAccess32CPU(address | 0);
    return this.cartridge.readROM32(address & 0x1FFFFFC) | 0;
}
GameBoyAdvanceMemory.prototype.readROM28 = function (address) {
    address = address | 0;
    this.wait.ROMAccess(address | 0);
    return this.cartridge.readROM8Space2(address & 0x1FFFFFF) | 0;
}
GameBoyAdvanceMemory.prototype.readROM216 = function (address) {
    address = address | 0;
    this.wait.ROMAccess(address | 0);
    return this.cartridge.readROM16Space2(address & 0x1FFFFFE) | 0;
}
GameBoyAdvanceMemory.prototype.readROM216CPU = function (address) {
    address = address | 0;
    this.wait.ROMAccess16CPU(address | 0);
    return this.cartridge.readROM16Space2(address & 0x1FFFFFE) | 0;
}
GameBoyAdvanceMemory.prototype.readROM232 = function (address) {
    address = address | 0;
    this.wait.ROMAccess32(address | 0);
    return this.cartridge.readROM32Space2(address & 0x1FFFFFC) | 0;
}
GameBoyAdvanceMemory.prototype.readROM232CPU = function (address) {
    address = address | 0;
    this.wait.ROMAccess32CPU(address | 0);
    return this.cartridge.readROM32Space2(address & 0x1FFFFFC) | 0;
}
GameBoyAdvanceMemory.prototype.readSRAM8 = function (address) {
    address = address | 0;
    this.wait.SRAMAccess();
    return this.saves.readSRAM(address & 0xFFFF) | 0;
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceMemory.prototype.readSRAM16 = function (address) {
        address = address | 0;
        this.wait.SRAMAccess();
        return Math.imul(this.saves.readSRAM(address & 0xFFFE) | 0, 0x101) | 0;
    }
    GameBoyAdvanceMemory.prototype.readSRAM16CPU = function (address) {
        address = address | 0;
        this.wait.SRAMAccessCPU();
        return Math.imul(this.saves.readSRAM(address & 0xFFFE) | 0, 0x101) | 0;
    }
    GameBoyAdvanceMemory.prototype.readSRAM32 = function (address) {
        address = address | 0;
        this.wait.SRAMAccess();
        return Math.imul(this.saves.readSRAM(address & 0xFFFC) | 0, 0x1010101) | 0;
    }
    GameBoyAdvanceMemory.prototype.readSRAM32CPU = function (address) {
        address = address | 0;
        this.wait.SRAMAccessCPU();
        return Math.imul(this.saves.readSRAM(address & 0xFFFC) | 0, 0x1010101) | 0;
    }
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceMemory.prototype.readSRAM16 = function (address) {
        address = address | 0;
        this.wait.SRAMAccess();
        return ((this.saves.readSRAM(address & 0xFFFE) | 0) * 0x101) | 0;
    }
    GameBoyAdvanceMemory.prototype.readSRAM16CPU = function (address) {
        address = address | 0;
        this.wait.SRAMAccessCPU();
        return ((this.saves.readSRAM(address & 0xFFFE) | 0) * 0x101) | 0;
    }
    GameBoyAdvanceMemory.prototype.readSRAM32 = function (address) {
        address = address | 0;
        this.wait.SRAMAccess();
        return ((this.saves.readSRAM(address & 0xFFFC) | 0) * 0x1010101) | 0;
    }
    GameBoyAdvanceMemory.prototype.readSRAM32CPU = function (address) {
        address = address | 0;
        this.wait.SRAMAccessCPU();
        return ((this.saves.readSRAM(address & 0xFFFC) | 0) * 0x1010101) | 0;
    }
}
GameBoyAdvanceMemory.prototype.readUnused8 = function (address) {
    address = address | 0;
    this.wait.singleClock();
    return this.readUnused8CPUBase(address | 0) | 0;
}
GameBoyAdvanceMemory.prototype.readUnused8CPUBase = function (address) {
    address = address | 0;
    return (this.cpu.getCurrentFetchValue() >> ((address & 0x3) << 3)) & 0xFF;
}
GameBoyAdvanceMemory.prototype.readUnused16 = function (address) {
    address = address | 0;
    this.wait.singleClock();
    return this.readUnused16CPUBase(address | 0) | 0;
}
GameBoyAdvanceMemory.prototype.readUnused16CPU = function (address) {
    address = address | 0;
    this.IOCore.updateCoreSingle();
    return this.readUnused16CPUBase(address | 0) | 0;
}
GameBoyAdvanceMemory.prototype.readUnused16CPUBase = function (address) {
    address = address | 0;
    return (this.cpu.getCurrentFetchValue() >> ((address & 0x2) << 3)) & 0xFFFF;
}
GameBoyAdvanceMemory.prototype.readUnused16DMA = function (address) {
    address = address | 0;
    this.wait.singleClock();
    return this.readUnused16DMABase(address | 0) | 0;
}
GameBoyAdvanceMemory.prototype.readUnused16DMABase = function (address) {
    address = address | 0;
    return (this.dma.getCurrentFetchValue() >> ((address & 0x2) << 3)) & 0xFFFF;
}
GameBoyAdvanceMemory.prototype.readUnused16MultiBase = function (address) {
    address = address | 0;
    return (this.readUnused32MultiBase() >> ((address & 0x2) << 3)) & 0xFFFF;
}
GameBoyAdvanceMemory.prototype.readUnused32 = function () {
    this.wait.singleClock();
    return this.cpu.getCurrentFetchValue() | 0;
}
GameBoyAdvanceMemory.prototype.readUnused32CPU = function () {
    this.IOCore.updateCoreSingle();
    return this.cpu.getCurrentFetchValue() | 0;
}
GameBoyAdvanceMemory.prototype.readUnused32DMA = function () {
    this.wait.singleClock();
    return this.dma.getCurrentFetchValue() | 0;
}
GameBoyAdvanceMemory.prototype.readUnused32MultiBase = function () {
    return this.IOCore.getCurrentFetchValue() | 0;
}
GameBoyAdvanceMemory.prototype.loadBIOS = function () {
    //Ensure BIOS is of correct length:
    if ((this.IOCore.BIOS.length | 0) == 0x4000) {
        this.IOCore.BIOSFound = true;
        for (var index = 0; (index | 0) < 0x4000; index = ((index | 0) + 1) | 0) {
            this.BIOS[index & 0x3FFF] = this.IOCore.BIOS[index & 0x3FFF] & 0xFF;
        }
    }
    else {
        this.IOCore.BIOSFound = false;
        throw(new Error("BIOS invalid."));
    }
}
function generateMemoryTopLevelDispatch() {
    //Generic memory read dispatch generator:
    function compileMemoryReadDispatch(readUnused, readExternalWRAM, readInternalWRAM,
                                       readIODispatch, readVRAM, readROM, readROM2, readSRAM, readBIOS) {
        var code = "address = address | 0;var data = 0;switch (address >> 24) {";
        /*
         Decoder for the nibble at bits 24-27
         (Top 4 bits of the address falls through to default (unused),
         so the next nibble down is used for dispatch.):
         */
        /*
         BIOS Area (00000000-00003FFF)
         Unused (00004000-01FFFFFF)
         */
        code += "case 0:{data = this." + readBIOS + "(address | 0) | 0;break};";
        /*
         Unused (00004000-01FFFFFF)
         */
        /*
         WRAM - On-board Work RAM (02000000-0203FFFF)
         Unused (02040000-02FFFFFF)
         */
        if (readExternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x2:";
            if (readExternalWRAM.slice(0, 12) != "readInternal") {
                code += "{data = this." + readExternalWRAM + "(address | 0) | 0;break};";
            }
        }
        /*
         WRAM - In-Chip Work RAM (03000000-03007FFF)
         Unused (03008000-03FFFFFF)
         */
        if (readInternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x3:{data = this." + readInternalWRAM + "(address | 0) | 0;break};";
        }
        /*
         I/O Registers (04000000-040003FE)
         Unused (04000400-04FFFFFF)
         */
        code += "case 0x4:{data = this." + readIODispatch + "(address | 0) | 0;break};";
        /*
         BG/OBJ Palette RAM (05000000-050003FF)
         Unused (05000400-05FFFFFF)
         */
        code += "case 0x5:";
        /*
         VRAM - Video RAM (06000000-06017FFF)
         Unused (06018000-06FFFFFF)
         */
        code += "case 0x6:";
        /*
         OAM - OBJ Attributes (07000000-070003FF)
         Unused (07000400-07FFFFFF)
         */
        code += "case 0x7:{data = this." + readVRAM + "(address | 0) | 0;break};";
        /*
         Game Pak ROM (max 16MB) - Wait State 0 (08000000-08FFFFFF)
         */
        code += "case 0x8:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 0 (09000000-09FFFFFF)
         */
        code += "case 0x9:";
        /*
         Game Pak ROM (max 16MB) - Wait State 1 (0A000000-0AFFFFFF)
         */
        code += "case 0xA:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 1 (0B000000-0BFFFFFF)
         */
        code += "case 0xB:{data = this." + readROM + "(address | 0) | 0;break};";
        /*
         Game Pak ROM (max 16MB) - Wait State 2 (0C000000-0CFFFFFF)
         */
        code += "case 0xC:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 2 (0D000000-0DFFFFFF)
         */
        code += "case 0xD:{data = this." + readROM2 + "(address | 0) | 0;break};";
        /*
         Game Pak SRAM  (max 64 KBytes) - 8bit Bus width (0E000000-0E00FFFF)
         */
        code += "case 0xE:";
        /*
         Game Pak SRAM  (max 64 KBytes) - 8bit Bus width (0E000000-0E00FFFF)
         Mirrored up to 0FFFFFFF
         */
        code += "case 0xF:{data = this." + readSRAM + "(address | 0) | 0;break};";
        /*
         Unused (10000000-FFFFFFFF)
         */
        code += "default:{data = this." + readUnused + "(" + ((readUnused.slice(0, 12) == "readUnused32") ? "" : "address | 0") + ") | 0};";
        //Generate the function:
        code += "}return data | 0;";
        return Function("address", code);
    }
    //Optimized for DMA 0:
    function compileMemoryDMA0ReadDispatch(readUnused, readExternalWRAM, readInternalWRAM,
                                       readIODispatch, readVRAM, readBIOS) {
        var code = "address = address | 0;var data = 0;switch (address >> 24) {";
        /*
         Decoder for the nibble at bits 24-27
         (Top 4 bits of the address falls through to default (unused),
         so the next nibble down is used for dispatch.):
         */
        /*
         BIOS Area (00000000-00003FFF)
         Unused (00004000-01FFFFFF)
         */
        code += "case 0:{data = this." + readBIOS + "(address | 0) | 0;break};";
        /*
         Unused (00004000-01FFFFFF)
         */
        /*
         WRAM - On-board Work RAM (02000000-0203FFFF)
         Unused (02040000-02FFFFFF)
         */
        if (readExternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x2:";
            if (readExternalWRAM.slice(0, 12) != "readInternal") {
                code += "{data = this." + readExternalWRAM + "(address | 0) | 0;break};";
            }
        }
        /*
         WRAM - In-Chip Work RAM (03000000-03007FFF)
         Unused (03008000-03FFFFFF)
         */
        if (readInternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x3:{data = this." + readInternalWRAM + "(address | 0) | 0;break};";
        }
        /*
         I/O Registers (04000000-040003FE)
         Unused (04000400-04FFFFFF)
         */
        code += "case 0x4:{data = this." + readIODispatch + "(address | 0) | 0;break};";
        /*
         BG/OBJ Palette RAM (05000000-050003FF)
         Unused (05000400-05FFFFFF)
         */
        code += "case 0x5:";
        /*
         VRAM - Video RAM (06000000-06017FFF)
         Unused (06018000-06FFFFFF)
         */
        code += "case 0x6:";
        /*
         OAM - OBJ Attributes (07000000-070003FF)
         Unused (07000400-07FFFFFF)
         */
        code += "case 0x7:{data = this." + readVRAM + "(address | 0) | 0;break};";
        /*
         Unused, DMA 0 cannot read past 07FFFFFF:
         */
        code += "default:{data = this." + readUnused + "(" + ((readUnused.slice(0, 12) == "readUnused32") ? "" : "address | 0") + ") | 0};";
        //Generate the function:
        code += "}return data | 0;";
        return Function("address", code);
    }
    //Optimized for DMA 1-3:
    function compileMemoryDMAReadDispatch(readUnused, readExternalWRAM, readInternalWRAM,
                                       readIODispatch, readVRAM, readROM, readROM2, readBIOS) {
        var code = "address = address | 0;var data = 0;switch (address >> 24) {";
        /*
         Decoder for the nibble at bits 24-27
         (Top 4 bits of the address falls through to default (unused),
         so the next nibble down is used for dispatch.):
         */
        /*
         BIOS Area (00000000-00003FFF)
         Unused (00004000-01FFFFFF)
         */
        code += "case 0:{data = this." + readBIOS + "(address | 0) | 0;break};";
        /*
         Unused (00004000-01FFFFFF)
         */
        /*
         WRAM - On-board Work RAM (02000000-0203FFFF)
         Unused (02040000-02FFFFFF)
         */
        if (readExternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x2:";
            if (readExternalWRAM.slice(0, 12) != "readInternal") {
                code += "{data = this." + readExternalWRAM + "(address | 0) | 0;break};";
            }
        }
        /*
         WRAM - In-Chip Work RAM (03000000-03007FFF)
         Unused (03008000-03FFFFFF)
         */
        if (readInternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x3:{data = this." + readInternalWRAM + "(address | 0) | 0;break};";
        }
        /*
         I/O Registers (04000000-040003FE)
         Unused (04000400-04FFFFFF)
         */
        code += "case 0x4:{data = this." + readIODispatch + "(address | 0) | 0;break};";
        /*
         BG/OBJ Palette RAM (05000000-050003FF)
         Unused (05000400-05FFFFFF)
         */
        code += "case 0x5:";
        /*
         VRAM - Video RAM (06000000-06017FFF)
         Unused (06018000-06FFFFFF)
         */
        code += "case 0x6:";
        /*
         OAM - OBJ Attributes (07000000-070003FF)
         Unused (07000400-07FFFFFF)
         */
        code += "case 0x7:{data = this." + readVRAM + "(address | 0) | 0;break};";
        /*
         Game Pak ROM (max 16MB) - Wait State 0 (08000000-08FFFFFF)
         */
        code += "case 0x8:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 0 (09000000-09FFFFFF)
         */
        code += "case 0x9:";
        /*
         Game Pak ROM (max 16MB) - Wait State 1 (0A000000-0AFFFFFF)
         */
        code += "case 0xA:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 1 (0B000000-0BFFFFFF)
         */
        code += "case 0xB:{data = this." + readROM + "(address | 0) | 0;break};";
        /*
         Game Pak ROM (max 16MB) - Wait State 2 (0C000000-0CFFFFFF)
         */
        code += "case 0xC:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 2 (0D000000-0DFFFFFF)
         */
        code += "case 0xD:{data = this." + readROM2 + "(address | 0) | 0;break};";
        /*
         Unused, DMA 1-3 cannot read past 0DFFFFFF:
         */
        code += "default:{data = this." + readUnused + "(" + ((readUnused.slice(0, 12) == "readUnused32") ? "" : "address | 0") + ") | 0};";
        //Generate the function:
        code += "}return data | 0;";
        return Function("address", code);
    }
    //Graphics should not be handled as often for this one:
    function compileMemoryWriteDispatch(writeUnused, writeExternalWRAM, writeInternalWRAM,
                                        writeIODispatch, writeVRAM, writeROM, writeSRAM) {
        var code = "address = address | 0;data = data | 0;switch (address >> 24) {";
        /*
         Decoder for the nibble at bits 24-27
         (Top 4 bits of the address falls through to default (unused),
         so the next nibble down is used for dispatch.):
         */
        /*
         BIOS Area (00000000-00003FFF)
         Unused (00004000-01FFFFFF)
         */
        /*
         Unused (00004000-01FFFFFF)
         */
        /*
         WRAM - On-board Work RAM (02000000-0203FFFF)
         Unused (02040000-02FFFFFF)
         */
        if (writeExternalWRAM != "writeUnused") {
            code += "case 0x2:";
            if (writeExternalWRAM.slice(0, 13) != "writeInternal") {
                code += "{this." + writeExternalWRAM + "(address | 0, data | 0);break};";
            }
        }
        /*
         WRAM - In-Chip Work RAM (03000000-03007FFF)
         Unused (03008000-03FFFFFF)
         */
        if (writeInternalWRAM != "writeUnused") {
            code += "case 0x3:{this." + writeInternalWRAM + "(address | 0, data | 0);break};";
        }
        /*
         I/O Registers (04000000-040003FE)
         Unused (04000400-04FFFFFF)
         */
        code += "case 0x4:{this." + writeIODispatch + "(address | 0, data | 0);break};";
        /*
         BG/OBJ Palette RAM (05000000-050003FF)
         Unused (05000400-05FFFFFF)
         */
        code += "case 0x5:";
        /*
         VRAM - Video RAM (06000000-06017FFF)
         Unused (06018000-06FFFFFF)
         */
        code += "case 0x6:";
        /*
         OAM - OBJ Attributes (07000000-070003FF)
         Unused (07000400-07FFFFFF)
         */
        code += "case 0x7:{this." + writeVRAM + "(address | 0, data | 0);break};";
        /*
         Game Pak ROM (max 16MB) - Wait State 0 (08000000-08FFFFFF)
         */
        code += "case 0x8:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 0 (09000000-09FFFFFF)
         */
        code += "case 0x9:";
        /*
         Game Pak ROM (max 16MB) - Wait State 1 (0A000000-0AFFFFFF)
         */
        code += "case 0xA:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 1 (0B000000-0BFFFFFF)
         */
        code += "case 0xB:";
        /*
         Game Pak ROM (max 16MB) - Wait State 2 (0C000000-0CFFFFFF)
         */
        code += "case 0xC:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 2 (0D000000-0DFFFFFF)
         */
        code += "case 0xD:{this." + writeROM + "(address | 0, data | 0);break};";
        /*
         Game Pak SRAM  (max 64 KBytes) - 8bit Bus width (0E000000-0E00FFFF)
         */
        code += "case 0xE:";
        /*
         Game Pak SRAM  (max 64 KBytes) - 8bit Bus width (0E000000-0E00FFFF)
         Mirrored up to 0FFFFFFF
         */
        code += "case 0xF:{this." + writeSRAM + "(address | 0, data | 0);break};";
        /*
         Unused (10000000-FFFFFFFF)
         */
        code += "default:{this." + writeUnused + "()}";
        //Generate the function:
        code += "}";
        return Function("address", "data", code);
    }
    //Graphics calls slightly faster in this one, at the expense of other calls:
    function compileMemoryWriteDispatch2(writeUnused, writeExternalWRAM, writeInternalWRAM,
                                        writeIODispatch, writePalette, writeVRAM, writeOAM, writeROM, writeSRAM) {
        var code = "address = address | 0;data = data | 0;switch (address >> 24) {";
        /*
         Decoder for the nibble at bits 24-27
         (Top 4 bits of the address falls through to default (unused),
         so the next nibble down is used for dispatch.):
         */
        /*
         BIOS Area (00000000-00003FFF)
         Unused (00004000-01FFFFFF)
         */
        /*
         Unused (00004000-01FFFFFF)
         */
        /*
         WRAM - On-board Work RAM (02000000-0203FFFF)
         Unused (02040000-02FFFFFF)
         */
        if (writeExternalWRAM != "writeUnused") {
            code += "case 0x2:";
            if (writeExternalWRAM.slice(0, 13) != "writeInternal") {
                code += "{this." + writeExternalWRAM + "(address | 0, data | 0);break};";
            }
        }
        /*
         WRAM - In-Chip Work RAM (03000000-03007FFF)
         Unused (03008000-03FFFFFF)
         */
        if (writeInternalWRAM != "writeUnused") {
            code += "case 0x3:{this." + writeInternalWRAM + "(address | 0, data | 0);break};";
        }
        /*
         I/O Registers (04000000-040003FE)
         Unused (04000400-04FFFFFF)
         */
        code += "case 0x4:{this." + writeIODispatch + "(address | 0, data | 0);break};";
        /*
         BG/OBJ Palette RAM (05000000-050003FF)
         Unused (05000400-05FFFFFF)
         */
        code += "case 0x5:{this." + writePalette + "(address | 0, data | 0);break};";
        /*
         VRAM - Video RAM (06000000-06017FFF)
         Unused (06018000-06FFFFFF)
         */
        code += "case 0x6:{this." + writeVRAM + "(address | 0, data | 0);break};";
        /*
         OAM - OBJ Attributes (07000000-070003FF)
         Unused (07000400-07FFFFFF)
         */
        code += "case 0x7:{this." + writeOAM + "(address | 0, data | 0);break};";
        /*
         Game Pak ROM (max 16MB) - Wait State 0 (08000000-08FFFFFF)
         */
        code += "case 0x8:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 0 (09000000-09FFFFFF)
         */
        code += "case 0x9:";
        /*
         Game Pak ROM (max 16MB) - Wait State 1 (0A000000-0AFFFFFF)
         */
        code += "case 0xA:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 1 (0B000000-0BFFFFFF)
         */
        code += "case 0xB:";
        /*
         Game Pak ROM (max 16MB) - Wait State 2 (0C000000-0CFFFFFF)
         */
        code += "case 0xC:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 2 (0D000000-0DFFFFFF)
         */
        code += "case 0xD:{this." + writeROM + "(address | 0, data | 0);break};";
        /*
         Game Pak SRAM  (max 64 KBytes) - 8bit Bus width (0E000000-0E00FFFF)
         */
        code += "case 0xE:";
        /*
         Game Pak SRAM  (max 64 KBytes) - 8bit Bus width (0E000000-0E00FFFF)
         Mirrored up to 0FFFFFFF
         */
        code += "case 0xF:{this." + writeSRAM + "(address | 0, data | 0);break};";
        /*
         Unused (10000000-FFFFFFFF)
         */
        code += "default:{this." + writeUnused + "()}";
        //Generate the function:
        code += "}";
        return Function("address", "data", code);
    }
    //Optimized for DMA 0-2:
    function compileMemoryDMAWriteDispatch(writeUnused, writeExternalWRAM, writeInternalWRAM,
                                        writeIODispatch, writePalette, writeVRAM, writeOAM) {
        var code = "address = address | 0;data = data | 0;switch (address >> 24) {";
        /*
         Decoder for the nibble at bits 24-27
         (Top 4 bits of the address falls through to default (unused),
         so the next nibble down is used for dispatch.):
         */
        /*
         BIOS Area (00000000-00003FFF)
         Unused (00004000-01FFFFFF)
         */
        /*
         Unused (00004000-01FFFFFF)
         */
        /*
         WRAM - On-board Work RAM (02000000-0203FFFF)
         Unused (02040000-02FFFFFF)
         */
        if (writeExternalWRAM != "writeUnused") {
            code += "case 0x2:";
            if (writeExternalWRAM.slice(0, 13) != "writeInternal") {
                code += "{this." + writeExternalWRAM + "(address | 0, data | 0);break};";
            }
        }
        /*
         WRAM - In-Chip Work RAM (03000000-03007FFF)
         Unused (03008000-03FFFFFF)
         */
        if (writeInternalWRAM != "writeUnused") {
            code += "case 0x3:{this." + writeInternalWRAM + "(address | 0, data | 0);break};";
        }
        /*
         I/O Registers (04000000-040003FE)
         Unused (04000400-04FFFFFF)
         */
        code += "case 0x4:{this." + writeIODispatch + "(address | 0, data | 0);break};";
        /*
         BG/OBJ Palette RAM (05000000-050003FF)
         Unused (05000400-05FFFFFF)
         */
        code += "case 0x5:{this." + writePalette + "(address | 0, data | 0);break};";
        /*
         VRAM - Video RAM (06000000-06017FFF)
         Unused (06018000-06FFFFFF)
         */
        code += "case 0x6:{this." + writeVRAM + "(address | 0, data | 0);break};";
        /*
         OAM - OBJ Attributes (07000000-070003FF)
         Unused (07000400-07FFFFFF)
         */
        code += "case 0x7:{this." + writeOAM + "(address | 0, data | 0);break};";
        /*
         Unused, DMA 0-2 cannot write past 07FFFFFF:
         */
        code += "default:{this." + writeUnused + "()}";
        //Generate the function:
        code += "}";
        return Function("address", "data", code);
    }
    //Optimized for DMA 3:
    function compileMemoryDMA3WriteDispatch(writeUnused, writeExternalWRAM, writeInternalWRAM,
                                         writeIODispatch, writePalette, writeVRAM, writeOAM, writeROM) {
        var code = "address = address | 0;data = data | 0;switch (address >> 24) {";
        /*
         Decoder for the nibble at bits 24-27
         (Top 4 bits of the address falls through to default (unused),
         so the next nibble down is used for dispatch.):
         */
        /*
         BIOS Area (00000000-00003FFF)
         Unused (00004000-01FFFFFF)
         */
        /*
         Unused (00004000-01FFFFFF)
         */
        /*
         WRAM - On-board Work RAM (02000000-0203FFFF)
         Unused (02040000-02FFFFFF)
         */
        if (writeExternalWRAM != "writeUnused") {
            code += "case 0x2:";
            if (writeExternalWRAM.slice(0, 13) != "writeInternal") {
                code += "{this." + writeExternalWRAM + "(address | 0, data | 0);break};";
            }
        }
        /*
         WRAM - In-Chip Work RAM (03000000-03007FFF)
         Unused (03008000-03FFFFFF)
         */
        if (writeInternalWRAM != "writeUnused") {
            code += "case 0x3:{this." + writeInternalWRAM + "(address | 0, data | 0);break};";
        }
        /*
         I/O Registers (04000000-040003FE)
         Unused (04000400-04FFFFFF)
         */
        code += "case 0x4:{this." + writeIODispatch + "(address | 0, data | 0);break};";
        /*
         BG/OBJ Palette RAM (05000000-050003FF)
         Unused (05000400-05FFFFFF)
         */
        code += "case 0x5:{this." + writePalette + "(address | 0, data | 0);break};";
        /*
         VRAM - Video RAM (06000000-06017FFF)
         Unused (06018000-06FFFFFF)
         */
        code += "case 0x6:{this." + writeVRAM + "(address | 0, data | 0);break};";
        /*
         OAM - OBJ Attributes (07000000-070003FF)
         Unused (07000400-07FFFFFF)
         */
        code += "case 0x7:{this." + writeOAM + "(address | 0, data | 0);break};";
        /*
         Game Pak ROM (max 16MB) - Wait State 0 (08000000-08FFFFFF)
         */
        code += "case 0x8:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 0 (09000000-09FFFFFF)
         */
        code += "case 0x9:";
        /*
         Game Pak ROM (max 16MB) - Wait State 1 (0A000000-0AFFFFFF)
         */
        code += "case 0xA:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 1 (0B000000-0BFFFFFF)
         */
        code += "case 0xB:";
        /*
         Game Pak ROM (max 16MB) - Wait State 2 (0C000000-0CFFFFFF)
         */
        code += "case 0xC:";
        /*
         Game Pak ROM/FlashROM (max 16MB) - Wait State 2 (0D000000-0DFFFFFF)
         */
        code += "case 0xD:{this." + writeROM + "(address | 0, data | 0);break};";
        /*
         Unused, DMA 3 cannot write past 0DFFFFFF:
         */
        code += "default:{this." + writeUnused + "()}";
        //Generate the function:
        code += "}";
        return Function("address", "data", code);
    }
    //Generic 8-Bit Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryRead8Generated = [
                                                             compileMemoryReadDispatch(
                                                                                        "readUnused8",
                                                                                        "readInternalWRAM8",
                                                                                        "readInternalWRAM8",
                                                                                        "readIODispatch8",
                                                                                        "readVRAM8Preliminary",
                                                                                        "readROM8",
                                                                                        "readROM28",
                                                                                        "readSRAM8",
                                                                                        "readBIOS8"
                                                                                        ),
                                                             compileMemoryReadDispatch(
                                                                                        "readUnused8",
                                                                                        "readExternalWRAM8",
                                                                                        "readInternalWRAM8",
                                                                                        "readIODispatch8",
                                                                                        "readVRAM8Preliminary",
                                                                                        "readROM8",
                                                                                        "readROM28",
                                                                                        "readSRAM8",
                                                                                        "readBIOS8"
                                                                                        ),
                                                             compileMemoryReadDispatch(
                                                                                        "readUnused8",
                                                                                        "readUnused8",
                                                                                        "readUnused8",
                                                                                        "readIODispatch8",
                                                                                        "readVRAM8Preliminary",
                                                                                        "readROM8",
                                                                                        "readROM28",
                                                                                        "readSRAM8",
                                                                                        "readBIOS8"
                                                                                        )
                                                             ];
    //Generic 8-Bit Write Dispatch:
    GameBoyAdvanceMemory.prototype.memoryWrite8Generated = [
                                                             compileMemoryWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeInternalWRAM8",
                                                                                         "writeInternalWRAM8",
                                                                                         "writeIODispatch8",
                                                                                         "writeVRAM8Preliminary",
                                                                                         "writeROM8",
                                                                                         "writeSRAM8"
                                                                                         ),
                                                             compileMemoryWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeExternalWRAM8",
                                                                                         "writeInternalWRAM8",
                                                                                         "writeIODispatch8",
                                                                                         "writeVRAM8Preliminary",
                                                                                         "writeROM8",
                                                                                         "writeSRAM8"
                                                                                         ),
                                                             compileMemoryWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeUnused",
                                                                                         "writeUnused",
                                                                                         "writeIODispatch8",
                                                                                         "writeVRAM8Preliminary",
                                                                                         "writeROM8",
                                                                                         "writeSRAM8"
                                                                                         )
                                                             ];
    //Generic 16-Bit Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryRead16Generated = [
                                                              compileMemoryReadDispatch(
                                                                                         "readUnused16",
                                                                                         "readInternalWRAM16",
                                                                                         "readInternalWRAM16",
                                                                                         "readIODispatch16",
                                                                                         "readVRAM16Preliminary",
                                                                                         "readROM16",
                                                                                         "readROM216",
                                                                                         "readSRAM16",
                                                                                         "readBIOS16"
                                                                                         ),
                                                              compileMemoryReadDispatch(
                                                                                         "readUnused16",
                                                                                         "readExternalWRAM16",
                                                                                         "readInternalWRAM16",
                                                                                         "readIODispatch16",
                                                                                         "readVRAM16Preliminary",
                                                                                         "readROM16",
                                                                                         "readROM216",
                                                                                         "readSRAM16",
                                                                                         "readBIOS16"
                                                                                         ),
                                                              compileMemoryReadDispatch(
                                                                                         "readUnused16",
                                                                                         "readUnused16",
                                                                                         "readUnused16",
                                                                                         "readIODispatch16",
                                                                                         "readVRAM16Preliminary",
                                                                                         "readROM16",
                                                                                         "readROM216",
                                                                                         "readSRAM16",
                                                                                         "readBIOS16"
                                                                                         )
                                                              ];
    //DMA 0 Optimized 16-Bit Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryReadDMA16Generated = [
                                                            compileMemoryDMA0ReadDispatch(
                                                                                      "readUnused16DMA",
                                                                                      "readInternalWRAM16",
                                                                                      "readInternalWRAM16",
                                                                                      "readIODispatch16",
                                                                                      "readVRAM16Preliminary",
                                                                                      "readBIOS16DMA"
                                                                                      ),
                                                            compileMemoryDMA0ReadDispatch(
                                                                                      "readUnused16DMA",
                                                                                      "readExternalWRAM16",
                                                                                      "readInternalWRAM16",
                                                                                      "readIODispatch16",
                                                                                      "readVRAM16Preliminary",
                                                                                      "readBIOS16DMA"
                                                                                      ),
                                                            compileMemoryDMA0ReadDispatch(
                                                                                      "readUnused16DMA",
                                                                                      "readUnused16DMA",
                                                                                      "readUnused16DMA",
                                                                                      "readIODispatch16",
                                                                                      "readVRAM16Preliminary",
                                                                                      "readBIOS16DMA"
                                                                                      )
                                                            ];
    //DMA 1-3 Optimized 16-Bit Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryReadDMA16FullGenerated = [
                                                            compileMemoryDMAReadDispatch(
                                                                                      "readUnused16DMA",
                                                                                      "readInternalWRAM16",
                                                                                      "readInternalWRAM16",
                                                                                      "readIODispatch16",
                                                                                      "readVRAM16Preliminary",
                                                                                      "readROM16",
                                                                                      "readROM216",
                                                                                      "readBIOS16DMA"
                                                                                      ),
                                                            compileMemoryDMAReadDispatch(
                                                                                      "readUnused16DMA",
                                                                                      "readExternalWRAM16",
                                                                                      "readInternalWRAM16",
                                                                                      "readIODispatch16",
                                                                                      "readVRAM16Preliminary",
                                                                                      "readROM16",
                                                                                      "readROM216",
                                                                                      "readBIOS16DMA"
                                                                                      ),
                                                            compileMemoryDMAReadDispatch(
                                                                                      "readUnused16DMA",
                                                                                      "readUnused16DMA",
                                                                                      "readUnused16DMA",
                                                                                      "readIODispatch16",
                                                                                      "readVRAM16Preliminary",
                                                                                      "readROM16",
                                                                                      "readROM216",
                                                                                      "readBIOS16DMA"
                                                                                      )
                                                            ];
    //Generic 16-Bit Instruction Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryReadCPU16Generated = [
                                                                 compileMemoryReadDispatch(
                                                                                            "readUnused16CPU",
                                                                                            "readInternalWRAM16CPU",
                                                                                            "readInternalWRAM16CPU",
                                                                                            "readIODispatch16CPU",
                                                                                            "readVRAM16CPUPreliminary",
                                                                                            "readROM16CPU",
                                                                                            "readROM216CPU",
                                                                                            "readSRAM16CPU",
                                                                                            "readBIOS16CPU"
                                                                                            ),
                                                                 compileMemoryReadDispatch(
                                                                                            "readUnused16CPU",
                                                                                            "readExternalWRAM16CPU",
                                                                                            "readInternalWRAM16CPU",
                                                                                            "readIODispatch16CPU",
                                                                                            "readVRAM16CPUPreliminary",
                                                                                            "readROM16CPU",
                                                                                            "readROM216CPU",
                                                                                            "readSRAM16CPU",
                                                                                            "readBIOS16CPU"
                                                                                            ),
                                                                 compileMemoryReadDispatch(
                                                                                            "readUnused16CPU",
                                                                                            "readUnused16CPU",
                                                                                            "readUnused16CPU",
                                                                                            "readIODispatch16CPU",
                                                                                            "readVRAM16CPUPreliminary",
                                                                                            "readROM16CPU",
                                                                                            "readROM216CPU",
                                                                                            "readSRAM16CPU",
                                                                                            "readBIOS16CPU"
                                                                                            )
                                                                 ];
    //Generic 16-Bit Write Dispatch:
    GameBoyAdvanceMemory.prototype.memoryWrite16Generated = [
                                                              compileMemoryWriteDispatch2(
                                                                                          "writeUnused",
                                                                                          "writeInternalWRAM16",
                                                                                          "writeInternalWRAM16",
                                                                                          "writeIODispatch16",
                                                                                          "writePalette16",
                                                                                          "writeVRAM16",
                                                                                          "writeOBJ16",
                                                                                          "writeROM16",
                                                                                          "writeSRAM16"
                                                                                          ),
                                                              compileMemoryWriteDispatch2(
                                                                                          "writeUnused",
                                                                                          "writeExternalWRAM16",
                                                                                          "writeInternalWRAM16",
                                                                                          "writeIODispatch16",
                                                                                          "writePalette16",
                                                                                          "writeVRAM16",
                                                                                          "writeOBJ16",
                                                                                          "writeROM16",
                                                                                          "writeSRAM16"
                                                                                          ),
                                                              compileMemoryWriteDispatch2(
                                                                                          "writeUnused",
                                                                                          "writeUnused",
                                                                                          "writeUnused",
                                                                                          "writeIODispatch16",
                                                                                          "writePalette16",
                                                                                          "writeVRAM16",
                                                                                          "writeOBJ16",
                                                                                          "writeROM16",
                                                                                          "writeSRAM16"
                                                                                          )
                                                              ];
    //DMA 0-2 Optimized 16-Bit Write Dispatch:
    GameBoyAdvanceMemory.prototype.memoryWriteDMA16Generated = [
                                                             compileMemoryDMAWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeInternalWRAM16",
                                                                                         "writeInternalWRAM16",
                                                                                         "writeIODispatch16",
                                                                                         "writePalette16",
                                                                                         "writeVRAM16",
                                                                                         "writeOBJ16"
                                                                                         ),
                                                             compileMemoryDMAWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeExternalWRAM16",
                                                                                         "writeInternalWRAM16",
                                                                                         "writeIODispatch16",
                                                                                         "writePalette16",
                                                                                         "writeVRAM16",
                                                                                         "writeOBJ16"
                                                                                         ),
                                                             compileMemoryDMAWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeUnused",
                                                                                         "writeUnused",
                                                                                         "writeIODispatch16",
                                                                                         "writePalette16",
                                                                                         "writeVRAM16",
                                                                                         "writeOBJ16"
                                                                                         )
                                                             ];
    //DMA 3 Optimized 16-Bit Write Dispatch:
    GameBoyAdvanceMemory.prototype.memoryWriteDMA16FullGenerated = [
                                                                    compileMemoryDMA3WriteDispatch(
                                                                                                   "writeUnused",
                                                                                                   "writeInternalWRAM16",
                                                                                                   "writeInternalWRAM16",
                                                                                                   "writeIODispatch16",
                                                                                                   "writePalette16",
                                                                                                   "writeVRAM16",
                                                                                                   "writeOBJ16",
                                                                                                   "writeROM16DMA"
                                                                                                   ),
                                                                    compileMemoryDMA3WriteDispatch(
                                                                                                   "writeUnused",
                                                                                                   "writeExternalWRAM16",
                                                                                                   "writeInternalWRAM16",
                                                                                                   "writeIODispatch16",
                                                                                                   "writePalette16",
                                                                                                   "writeVRAM16",
                                                                                                   "writeOBJ16",
                                                                                                   "writeROM16DMA"
                                                                                                   ),
                                                                    compileMemoryDMA3WriteDispatch(
                                                                                                   "writeUnused",
                                                                                                   "writeUnused",
                                                                                                   "writeUnused",
                                                                                                   "writeIODispatch16",
                                                                                                   "writePalette16",
                                                                                                   "writeVRAM16",
                                                                                                   "writeOBJ16",
                                                                                                   "writeROM16DMA"
                                                                                                   )
                                                                    ];
    //Generic 32-Bit Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryRead32Generated = [
                                                              compileMemoryReadDispatch(
                                                                                         "readUnused32",
                                                                                         "readInternalWRAM32",
                                                                                         "readInternalWRAM32",
                                                                                         "readIODispatch32",
                                                                                         "readVRAM32Preliminary",
                                                                                         "readROM32",
                                                                                         "readROM232",
                                                                                         "readSRAM32",
                                                                                         "readBIOS32"
                                                                                         ),
                                                              compileMemoryReadDispatch(
                                                                                         "readUnused32",
                                                                                         "readExternalWRAM32",
                                                                                         "readInternalWRAM32",
                                                                                         "readIODispatch32",
                                                                                         "readVRAM32Preliminary",
                                                                                         "readROM32",
                                                                                         "readROM232",
                                                                                         "readSRAM32",
                                                                                         "readBIOS32"
                                                                                         ),
                                                              compileMemoryReadDispatch(
                                                                                         "readUnused32",
                                                                                         "readUnused32",
                                                                                         "readUnused32",
                                                                                         "readIODispatch32",
                                                                                         "readVRAM32Preliminary",
                                                                                         "readROM32",
                                                                                         "readROM232",
                                                                                         "readSRAM32",
                                                                                         "readBIOS32"
                                                                                         )
                                                              ];
    //DMA 0 Optimized 32-Bit Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryReadDMA32Generated = [
                                                               compileMemoryDMA0ReadDispatch(
                                                                                            "readUnused32DMA",
                                                                                            "readInternalWRAM32",
                                                                                            "readInternalWRAM32",
                                                                                            "readIODispatch32",
                                                                                            "readVRAM32Preliminary",
                                                                                            "readBIOS32DMA"
                                                                                            ),
                                                               compileMemoryDMA0ReadDispatch(
                                                                                            "readUnused32DMA",
                                                                                            "readExternalWRAM32",
                                                                                            "readInternalWRAM32",
                                                                                            "readIODispatch32",
                                                                                            "readVRAM32Preliminary",
                                                                                            "readBIOS32DMA"
                                                                                            ),
                                                               compileMemoryDMA0ReadDispatch(
                                                                                            "readUnused32DMA",
                                                                                            "readUnused32DMA",
                                                                                            "readUnused32DMA",
                                                                                            "readIODispatch32",
                                                                                            "readVRAM32Preliminary",
                                                                                            "readBIOS32DMA"
                                                                                            )
                                                               ];
    //DMA 1-3 Optimized 32-Bit Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryReadDMA32FullGenerated = [
                                                            compileMemoryDMAReadDispatch(
                                                                                      "readUnused32DMA",
                                                                                      "readInternalWRAM32",
                                                                                      "readInternalWRAM32",
                                                                                      "readIODispatch32",
                                                                                      "readVRAM32Preliminary",
                                                                                      "readROM32",
                                                                                      "readROM232",
                                                                                      "readBIOS32DMA"
                                                                                      ),
                                                            compileMemoryDMAReadDispatch(
                                                                                      "readUnused32DMA",
                                                                                      "readExternalWRAM32",
                                                                                      "readInternalWRAM32",
                                                                                      "readIODispatch32",
                                                                                      "readVRAM32Preliminary",
                                                                                      "readROM32",
                                                                                      "readROM232",
                                                                                      "readBIOS32DMA"
                                                                                      ),
                                                            compileMemoryDMAReadDispatch(
                                                                                      "readUnused32DMA",
                                                                                      "readUnused32DMA",
                                                                                      "readUnused32DMA",
                                                                                      "readIODispatch32",
                                                                                      "readVRAM32Preliminary",
                                                                                      "readROM32",
                                                                                      "readROM232",
                                                                                      "readBIOS32DMA"
                                                                                      )
                                                            ];
    //Generic 32-Bit Instruction Read Dispatch:
    GameBoyAdvanceMemory.prototype.memoryReadCPU32Generated = [
                                                                 compileMemoryReadDispatch(
                                                                                            "readUnused32CPU",
                                                                                            "readInternalWRAM32CPU",
                                                                                            "readInternalWRAM32CPU",
                                                                                            "readIODispatch32CPU",
                                                                                            "readVRAM32CPUPreliminary",
                                                                                            "readROM32CPU",
                                                                                            "readROM232CPU",
                                                                                            "readSRAM32CPU",
                                                                                            "readBIOS32CPU"
                                                                                            ),
                                                                 compileMemoryReadDispatch(
                                                                                            "readUnused32CPU",
                                                                                            "readExternalWRAM32CPU",
                                                                                            "readInternalWRAM32CPU",
                                                                                            "readIODispatch32CPU",
                                                                                            "readVRAM32CPUPreliminary",
                                                                                            "readROM32CPU",
                                                                                            "readROM232CPU",
                                                                                            "readSRAM32CPU",
                                                                                            "readBIOS32CPU"
                                                                                            ),
                                                                 compileMemoryReadDispatch(
                                                                                            "readUnused32CPU",
                                                                                            "readUnused32CPU",
                                                                                            "readUnused32CPU",
                                                                                            "readIODispatch32CPU",
                                                                                            "readVRAM32CPUPreliminary",
                                                                                            "readROM32CPU",
                                                                                            "readROM232CPU",
                                                                                            "readSRAM32CPU",
                                                                                            "readBIOS32CPU"
                                                                                            )
                                                                 ];
    //Generic 32-Bit Write Dispatch:
    GameBoyAdvanceMemory.prototype.memoryWrite32Generated = [
                                                              compileMemoryWriteDispatch2(
                                                                                          "writeUnused",
                                                                                          "writeInternalWRAM32",
                                                                                          "writeInternalWRAM32",
                                                                                          "writeIODispatch32",
                                                                                          "writePalette32",
                                                                                          "writeVRAM32",
                                                                                          "writeOBJ32",
                                                                                          "writeROM32",
                                                                                          "writeSRAM32"
                                                                                          ),
                                                              compileMemoryWriteDispatch2(
                                                                                          "writeUnused",
                                                                                          "writeExternalWRAM32",
                                                                                          "writeInternalWRAM32",
                                                                                          "writeIODispatch32",
                                                                                          "writePalette32",
                                                                                          "writeVRAM32",
                                                                                          "writeOBJ32",
                                                                                          "writeROM32",
                                                                                          "writeSRAM32"
                                                                                          ),
                                                              compileMemoryWriteDispatch2(
                                                                                          "writeUnused",
                                                                                          "writeUnused",
                                                                                          "writeUnused",
                                                                                          "writeIODispatch32",
                                                                                          "writePalette32",
                                                                                          "writeVRAM32",
                                                                                          "writeOBJ32",
                                                                                          "writeROM32",
                                                                                          "writeSRAM32"
                                                                                          )
                                                              ];
    //DMA 0-2 Optimized 32-Bit Write Dispatch:
    GameBoyAdvanceMemory.prototype.memoryWriteDMA32Generated = [
                                                             compileMemoryDMAWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeInternalWRAM32",
                                                                                         "writeInternalWRAM32",
                                                                                         "writeIODispatch32",
                                                                                         "writePalette32",
                                                                                         "writeVRAM32",
                                                                                         "writeOBJ32"
                                                                                         ),
                                                             compileMemoryDMAWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeExternalWRAM32",
                                                                                         "writeInternalWRAM32",
                                                                                         "writeIODispatch32",
                                                                                         "writePalette32",
                                                                                         "writeVRAM32",
                                                                                         "writeOBJ32"
                                                                                         ),
                                                             compileMemoryDMAWriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeUnused",
                                                                                         "writeUnused",
                                                                                         "writeIODispatch32",
                                                                                         "writePalette32",
                                                                                         "writeVRAM32",
                                                                                         "writeOBJ32"
                                                                                         )
                                                             ];
    //DMA 3 Optimized 32-Bit Write Dispatch:
    GameBoyAdvanceMemory.prototype.memoryWriteDMA32FullGenerated = [
                                                             compileMemoryDMA3WriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeInternalWRAM32",
                                                                                         "writeInternalWRAM32",
                                                                                         "writeIODispatch32",
                                                                                         "writePalette32",
                                                                                         "writeVRAM32",
                                                                                         "writeOBJ32",
                                                                                         "writeROM32"
                                                                                         ),
                                                             compileMemoryDMA3WriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeExternalWRAM32",
                                                                                         "writeInternalWRAM32",
                                                                                         "writeIODispatch32",
                                                                                         "writePalette32",
                                                                                         "writeVRAM32",
                                                                                         "writeOBJ32",
                                                                                         "writeROM32"
                                                                                         ),
                                                             compileMemoryDMA3WriteDispatch(
                                                                                         "writeUnused",
                                                                                         "writeUnused",
                                                                                         "writeUnused",
                                                                                         "writeIODispatch32",
                                                                                         "writePalette32",
                                                                                         "writeVRAM32",
                                                                                         "writeOBJ32",
                                                                                         "writeROM32"
                                                                                         )
                                                             ];
}
generateMemoryTopLevelDispatch();
