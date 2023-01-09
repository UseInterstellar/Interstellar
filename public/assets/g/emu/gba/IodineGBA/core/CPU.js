"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceCPU(IOCore) {
    this.IOCore = IOCore;
}
GameBoyAdvanceCPU.prototype.initialize = function () {
    this.memory = this.IOCore.memory;
    this.wait = this.IOCore.wait;
    this.mul64ResultHigh = 0;    //Scratch MUL64.
    this.mul64ResultLow = 0;    //Scratch MUL64.
    this.initializeRegisters();
    this.ARM = new ARMInstructionSet(this);
    this.THUMB = new THUMBInstructionSet(this);
    //this.swi = new GameBoyAdvanceSWI(this);
    this.IOCore.assignInstructionCoreReferences(this.ARM, this.THUMB);
}
GameBoyAdvanceCPU.prototype.initializeRegisters = function () {
    /*
        R0-R7 Are known as the low registers.
        R8-R12 Are the high registers.
        R13 is the stack pointer.
        R14 is the link register.
        R15 is the program counter.
        CPSR is the program status register.
        SPSR is the saved program status register.
    */
    //Normal R0-R15 Registers:
    this.registers = getInt32Array(16);
    //Used to copy back the R8-R14 state for normal operations:
    this.registersUSR = getInt32Array(7);
    //Fast IRQ mode registers (R8-R14):
    this.registersFIQ = getInt32Array(7);
    //Supervisor mode registers (R13-R14):
    this.registersSVC = getInt32Array(2);
    //Abort mode registers (R13-R14):
    this.registersABT = getInt32Array(2);
    //IRQ mode registers (R13-R14):
    this.registersIRQ = getInt32Array(2);
    //Undefined mode registers (R13-R14):
    this.registersUND = getInt32Array(2);
    //CPSR Register:
    this.branchFlags = ARMCPSRAttributeTable();
    this.modeFlags = 0xD3;
    //Banked SPSR Registers:
    this.SPSR = getUint16Array(5);
    this.SPSR[0] = 0xD3; //FIQ
    this.SPSR[1] = 0xD3; //IRQ
    this.SPSR[2] = 0xD3; //Supervisor
    this.SPSR[3] = 0xD3; //Abort
    this.SPSR[4] = 0xD3; //Undefined
    this.triggeredIRQ = 0;        //Pending IRQ found.
    //Pre-initialize stack pointers if no BIOS loaded:
    if (!this.IOCore.BIOSFound || this.IOCore.settings.SKIPBoot) {
        this.HLEReset();
    }
    //Start in fully bubbled pipeline mode:
    this.IOCore.flagBubble();
}
GameBoyAdvanceCPU.prototype.HLEReset = function () {
    this.registersSVC[0] = 0x3007FE0;
    this.registersIRQ[0] = 0x3007FA0;
    this.registers[13] = 0x3007F00;
    this.registers[15] = 0x8000000;
    this.modeFlags = this.modeFlags | 0x1f;
}
GameBoyAdvanceCPU.prototype.branch = function (branchTo) {
    branchTo = branchTo | 0;
    //if ((branchTo | 0) > 0x3FFF || this.IOCore.BIOSFound) {
        //Branch to new address:
        this.registers[15] = branchTo | 0;
        //Mark pipeline as invalid:
        this.IOCore.flagBubble();
        //Next PC fetch has to update the address bus:
        this.wait.NonSequentialBroadcastClear();
    /*}
    else {
        //We're branching into BIOS, handle specially:
        if ((branchTo | 0) == 0x130) {
            //IRQ mode exit handling:
            //ROM IRQ handling returns back from its own subroutine back to BIOS at this address.
            this.HLEIRQExit();
        }
        else {
            //Reset to start of ROM if no BIOS ROM found:
            this.HLEReset();
        }
    }*/
}
GameBoyAdvanceCPU.prototype.triggerIRQ = function (didFire) {
    this.triggeredIRQ = didFire | 0;
    this.assertIRQ();
}
GameBoyAdvanceCPU.prototype.assertIRQ = function () {
    if ((this.triggeredIRQ | 0) != 0 && (this.modeFlags & 0x80) == 0) {
        this.IOCore.flagIRQ();
    }
}
GameBoyAdvanceCPU.prototype.getCurrentFetchValue = function () {
    if ((this.modeFlags & 0x20) != 0) {
        return this.THUMB.getCurrentFetchValue() | 0;
    }
    else {
        return this.ARM.getCurrentFetchValue() | 0;
    }
}
GameBoyAdvanceCPU.prototype.enterARM = function () {
    this.modeFlags = this.modeFlags & 0xdf;
    this.THUMBBitModify(false);
}
GameBoyAdvanceCPU.prototype.enterTHUMB = function () {
    this.modeFlags = this.modeFlags | 0x20;
    this.THUMBBitModify(true);
}
GameBoyAdvanceCPU.prototype.getLR = function () {
    //Get the previous instruction address:
    if ((this.modeFlags & 0x20) != 0) {
        return this.THUMB.getLR() | 0;
    }
    else {
        return this.ARM.getLR() | 0;
    }
}
GameBoyAdvanceCPU.prototype.THUMBBitModify = function (isThumb) {
    if (isThumb) {
        this.IOCore.flagTHUMB();
    }
    else {
        this.IOCore.deflagTHUMB();
    }
}
GameBoyAdvanceCPU.prototype.IRQinARM = function () {
    //Mode bits are set to IRQ:
    this.switchMode(0x12);
    //Save link register:
    this.registers[14] = this.ARM.getIRQLR() | 0;
    //Disable IRQ:
    this.modeFlags = this.modeFlags | 0x80;
    //if (this.IOCore.BIOSFound) {
        //IRQ exception vector:
        this.branch(0x18);
    /*}
    else {
        //HLE the IRQ entrance:
        this.HLEIRQEnter();
    }*/
    //Deflag IRQ from state:
    this.IOCore.deflagIRQ();
}
GameBoyAdvanceCPU.prototype.IRQinTHUMB = function () {
    //Mode bits are set to IRQ:
    this.switchMode(0x12);
    //Save link register:
    this.registers[14] = this.THUMB.getIRQLR() | 0;
    //Disable IRQ:
    this.modeFlags = this.modeFlags | 0x80;
    //Exception always enter ARM mode:
    this.enterARM();
    //if (this.IOCore.BIOSFound) {
        //IRQ exception vector:
        this.branch(0x18);
    /*}
    else {
        //HLE the IRQ entrance:
        this.HLEIRQEnter();
    }*/
    //Deflag IRQ from state:
    this.IOCore.deflagIRQ();
}
GameBoyAdvanceCPU.prototype.HLEIRQEnter = function () {
    //Get the base address:
    var currentAddress = this.registers[0xD] | 0;
    //Updating the address bus away from PC fetch:
    this.wait.NonSequentialBroadcast();
    //Push register(s) into memory:
    for (var rListPosition = 0xF; (rListPosition | 0) > -1; rListPosition = ((rListPosition | 0) - 1) | 0) {
            if ((0x500F & (1 << (rListPosition | 0))) != 0) {
                //Push a register into memory:
                currentAddress = ((currentAddress | 0) - 4) | 0;
                this.memory.memoryWrite32(currentAddress | 0, this.registers[rListPosition | 0] | 0);
            }
    }
    //Store the updated base address back into register:
    this.registers[0xD] = currentAddress | 0;
    //Updating the address bus back to PC fetch:
    this.wait.NonSequentialBroadcast();
    this.registers[0] = 0x4000000;
    //Save link register:
    this.registers[14] = 0x130;
    //Skip BIOS ROM processing:
    this.branch(this.read32(0x3FFFFFC) & -0x4);
}
GameBoyAdvanceCPU.prototype.HLEIRQExit = function () {
    //Get the base address:
    var currentAddress = this.registers[0xD] | 0;
    //Updating the address bus away from PC fetch:
    this.wait.NonSequentialBroadcast();
    //Load register(s) from memory:
    for (var rListPosition = 0; (rListPosition | 0) < 0x10;  rListPosition = ((rListPosition | 0) + 1) | 0) {
        if ((0x500F & (1 << (rListPosition | 0))) != 0) {
            //Load a register from memory:
            this.registers[rListPosition & 0xF] = this.memory.memoryRead32(currentAddress | 0) | 0;
            currentAddress = ((currentAddress | 0) + 4) | 0;
        }
    }
    //Store the updated base address back into register:
    this.registers[0xD] = currentAddress | 0;
    //Updating the address bus back to PC fetch:
    this.wait.NonSequentialBroadcast();
    //Return from an exception mode:
    var data = this.branchFlags.setSUBFlags(this.registers[0xE] | 0, 4) | 0;
    //Restore SPSR to CPSR:
    data = data & (-4 >> (this.SPSRtoCPSR() >> 5));
    //We performed a branch:
    this.branch(data | 0);
}
GameBoyAdvanceCPU.prototype.SWI = function () {
    //if (this.IOCore.BIOSFound) {
        //Mode bits are set to SWI:
        this.switchMode(0x13);
        //Save link register:
        this.registers[14] = this.getLR() | 0;
        //Disable IRQ:
        this.modeFlags = this.modeFlags | 0x80;
        //Exception always enter ARM mode:
        this.enterARM();
        //SWI exception vector:
        this.branch(0x8);
    /*}
    else {
        if ((this.modeFlags & 0x20) != 0) {
            this.THUMB.incrementProgramCounter();
            //HLE the SWI command:
            this.swi.execute(this.THUMB.getSWICode() | 0);
        }
        else {
            this.ARM.incrementProgramCounter();
            //HLE the SWI command:
            this.swi.execute(this.ARM.getSWICode() | 0);
        }
    }*/
}
GameBoyAdvanceCPU.prototype.UNDEFINED = function () {
    //Only process undefined instruction if BIOS loaded:
    //if (this.IOCore.BIOSFound) {
        //Mode bits are set to SWI:
        this.switchMode(0x1B);
        //Save link register:
        this.registers[14] = this.getLR() | 0;
        //Disable IRQ:
        this.modeFlags = this.modeFlags | 0x80;
        //Exception always enter ARM mode:
        this.enterARM();
        //Undefined exception vector:
        this.branch(0x4);
    /*}
    else {
        //Pretend we didn't execute the bad instruction then:
        if ((this.modeFlags & 0x20) != 0) {
            this.THUMB.incrementProgramCounter();
        }
        else {
            this.ARM.incrementProgramCounter();
        }
    }*/
}
GameBoyAdvanceCPU.prototype.SPSRtoCPSR = function () {
    //Used for leaving an exception and returning to the previous state:
    var bank = 1;
    switch (this.modeFlags & 0x1f) {
        case 0x12:    //IRQ
            break;
        case 0x13:    //Supervisor
            bank = 2;
            break;
        case 0x11:    //FIQ
            bank = 0;
            break;
        case 0x17:    //Abort
            bank = 3;
            break;
        case 0x1B:    //Undefined
            bank = 4;
            break;
        default:      //User & system lacks SPSR
            return this.modeFlags & 0x20;
    }
    var spsr = this.SPSR[bank | 0] | 0;
    this.branchFlags.setNZCV(spsr << 20);
    this.switchRegisterBank(spsr & 0x1F);
    this.modeFlags = spsr & 0xFF;
    this.assertIRQ();
    this.THUMBBitModify((spsr & 0x20) != 0);
    return spsr & 0x20;
}
GameBoyAdvanceCPU.prototype.switchMode = function (newMode) {
    newMode = newMode | 0;
    this.CPSRtoSPSR(newMode | 0);
    this.switchRegisterBank(newMode | 0);
    this.modeFlags = (this.modeFlags & 0xe0) | (newMode | 0);
}
GameBoyAdvanceCPU.prototype.CPSRtoSPSR = function (newMode) {
    //Used for entering an exception and saving the previous state:
    var spsr = this.modeFlags & 0xFF;
    spsr = spsr | (this.branchFlags.getNZCV() >> 20);
    switch (newMode | 0) {
        case 0x12:    //IRQ
            this.SPSR[1] = spsr | 0;
            break;
        case 0x13:    //Supervisor
            this.SPSR[2] = spsr | 0;
            break;
        case 0x11:    //FIQ
            this.SPSR[0] = spsr | 0;
            break;
        case 0x17:    //Abort
            this.SPSR[3] = spsr | 0;
            break;
        case 0x1B:    //Undefined
            this.SPSR[4] = spsr | 0;
    }
}
GameBoyAdvanceCPU.prototype.switchRegisterBank = function (newMode) {
    newMode = newMode | 0;
    switch (this.modeFlags & 0x1F) {
        case 0x10:
        case 0x1F:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersUSR[5] = this.registers[13] | 0;
            this.registersUSR[6] = this.registers[14] | 0;
            break;
        case 0x11:
            this.registersFIQ[0] = this.registers[8] | 0;
            this.registersFIQ[1] = this.registers[9] | 0;
            this.registersFIQ[2] = this.registers[10] | 0;
            this.registersFIQ[3] = this.registers[11] | 0;
            this.registersFIQ[4] = this.registers[12] | 0;
            this.registersFIQ[5] = this.registers[13] | 0;
            this.registersFIQ[6] = this.registers[14] | 0;
            break;
        case 0x12:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersIRQ[0] = this.registers[13] | 0;
            this.registersIRQ[1] = this.registers[14] | 0;
            break;
        case 0x13:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersSVC[0] = this.registers[13] | 0;
            this.registersSVC[1] = this.registers[14] | 0;
            break;
        case 0x17:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersABT[0] = this.registers[13] | 0;
            this.registersABT[1] = this.registers[14] | 0;
            break;
        case 0x1B:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersUND[0] = this.registers[13] | 0;
            this.registersUND[1] = this.registers[14] | 0;
    }
    switch (newMode | 0) {
        case 0x10:
        case 0x1F:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersUSR[5] | 0;
            this.registers[14] = this.registersUSR[6] | 0;
            break;
        case 0x11:
            this.registers[8] = this.registersFIQ[0] | 0;
            this.registers[9] = this.registersFIQ[1] | 0;
            this.registers[10] = this.registersFIQ[2] | 0;
            this.registers[11] = this.registersFIQ[3] | 0;
            this.registers[12] = this.registersFIQ[4] | 0;
            this.registers[13] = this.registersFIQ[5] | 0;
            this.registers[14] = this.registersFIQ[6] | 0;
            break;
        case 0x12:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersIRQ[0] | 0;
            this.registers[14] = this.registersIRQ[1] | 0;
            break;
        case 0x13:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersSVC[0] | 0;
            this.registers[14] = this.registersSVC[1] | 0;
            break;
        case 0x17:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersABT[0] | 0;
            this.registers[14] = this.registersABT[1] | 0;
            break;
        case 0x1B:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersUND[0] | 0;
            this.registers[14] = this.registersUND[1] | 0;
    }
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceCPU.prototype.calculateMUL32 = Math.imul;
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceCPU.prototype.calculateMUL32 = function (rs, rd) {
        rs = rs | 0;
        rd = rd | 0;
        /*
         We have to split up the 32 bit multiplication,
         as JavaScript does multiplication on the FPU
         as double floats, which drops the low bits
         rather than the high bits.
         */
        var lowMul = (rs & 0xFFFF) * rd;
        var highMul = (rs >> 16) * rd;
        //Cut off bits above bit 31 and return with proper sign:
        return ((highMul << 16) + lowMul) | 0;
    }
}
GameBoyAdvanceCPU.prototype.performMUL32 = function (rs, rd) {
    rs = rs | 0;
    rd = rd | 0;
    //Predict the internal cycle time:
    if ((rd >>> 8) == 0 || (rd >>> 8) == 0xFFFFFF) {
        this.IOCore.wait.CPUInternalSingleCyclePrefetch();
    }
    else if ((rd >>> 16) == 0 || (rd >>> 16) == 0xFFFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(2);
    }
    else if ((rd >>> 24) == 0 || (rd >>> 24) == 0xFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(3);
    }
    else {
        this.IOCore.wait.CPUInternalCyclePrefetch(4);
    }
    return this.calculateMUL32(rs | 0, rd | 0) | 0;
}
GameBoyAdvanceCPU.prototype.performMUL32MLA = function (rs, rd) {
    rs = rs | 0;
    rd = rd | 0;
    //Predict the internal cycle time:
    if ((rd >>> 8) == 0 || (rd >>> 8) == 0xFFFFFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(2);
    }
    else if ((rd >>> 16) == 0 || (rd >>> 16) == 0xFFFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(3);
    }
    else if ((rd >>> 24) == 0 || (rd >>> 24) == 0xFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(4);
    }
    else {
        this.IOCore.wait.CPUInternalCyclePrefetch(5);
    }
    return this.calculateMUL32(rs | 0, rd | 0) | 0;
}
GameBoyAdvanceCPU.prototype.performMUL64 = function (rs, rd) {
    rs = rs | 0;
    rd = rd | 0;
    //Predict the internal cycle time:
    if ((rd >>> 8) == 0 || (rd >>> 8) == 0xFFFFFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(2);
    }
    else if ((rd >>> 16) == 0 || (rd >>> 16) == 0xFFFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(3);
    }
    else if ((rd >>> 24) == 0 || (rd >>> 24) == 0xFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(4);
    }
    else {
        this.IOCore.wait.CPUInternalCyclePrefetch(5);
    }
    //Solve for the high word (Do FPU double divide to bring down high word into the low word):
    this.mul64ResultHigh = Math.floor((rs * rd) / 0x100000000) | 0;
    this.mul64ResultLow = this.calculateMUL32(rs | 0, rd | 0) | 0;
}
GameBoyAdvanceCPU.prototype.performMLA64 = function (rs, rd, mlaHigh, mlaLow) {
    rs = rs | 0;
    rd = rd | 0;
    mlaHigh = mlaHigh | 0;
    mlaLow = mlaLow | 0;
    //Predict the internal cycle time:
    if ((rd >>> 8) == 0 || (rd >>> 8) == 0xFFFFFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(3);
    }
    else if ((rd >>> 16) == 0 || (rd >>> 16) == 0xFFFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(4);
    }
    else if ((rd >>> 24) == 0 || (rd >>> 24) == 0xFF) {
        this.IOCore.wait.CPUInternalCyclePrefetch(5);
    }
    else {
        this.IOCore.wait.CPUInternalCyclePrefetch(6);
    }
    //Solve for the high word (Do FPU double divide to bring down high word into the low word):
    var mulTop = Math.floor((rs * rd) / 0x100000000) | 0;
    var dirty = (this.calculateMUL32(rs | 0, rd | 0) >>> 0) + (mlaLow >>> 0);
    this.mul64ResultHigh = ((mulTop | 0) + (mlaHigh | 0) + Math.floor(dirty / 0x100000000)) | 0;
    this.mul64ResultLow = dirty | 0;
}
GameBoyAdvanceCPU.prototype.performUMUL64 = function (rs, rd) {
    rs = rs | 0;
    rd = rd | 0;
    //Predict the internal cycle time:
    if ((rd >>> 8) == 0) {
        this.IOCore.wait.CPUInternalCyclePrefetch(2);
    }
    else if ((rd >>> 16) == 0) {
        this.IOCore.wait.CPUInternalCyclePrefetch(3);
    }
    else if ((rd >>> 24) == 0) {
        this.IOCore.wait.CPUInternalCyclePrefetch(4);
    }
    else {
        this.IOCore.wait.CPUInternalCyclePrefetch(5);
    }
    //Solve for the high word (Do FPU double divide to bring down high word into the low word):
    this.mul64ResultHigh = (((rs >>> 0) * (rd >>> 0)) / 0x100000000) | 0;
    this.mul64ResultLow = this.calculateMUL32(rs | 0, rd | 0) | 0;
}
GameBoyAdvanceCPU.prototype.performUMLA64 = function (rs, rd, mlaHigh, mlaLow) {
    rs = rs | 0;
    rd = rd | 0;
    mlaHigh = mlaHigh | 0;
    mlaLow = mlaLow | 0;
    //Predict the internal cycle time:
    if ((rd >>> 8) == 0) {
        this.IOCore.wait.CPUInternalCyclePrefetch(3);
    }
    else if ((rd >>> 16) == 0) {
        this.IOCore.wait.CPUInternalCyclePrefetch(4);
    }
    else if ((rd >>> 24) == 0) {
        this.IOCore.wait.CPUInternalCyclePrefetch(5);
    }
    else {
        this.IOCore.wait.CPUInternalCyclePrefetch(6);
    }
    //Solve for the high word (Do FPU double divide to bring down high word into the low word):
    var mulTop = Math.floor(((rs >>> 0) * (rd >>> 0)) / 0x100000000) | 0;
    var dirty = (this.calculateMUL32(rs | 0, rd | 0) >>> 0) + (mlaLow >>> 0);
    this.mul64ResultHigh = ((mulTop | 0) + (mlaHigh | 0) + Math.floor(dirty / 0x100000000)) | 0;
    this.mul64ResultLow = dirty | 0;
}
GameBoyAdvanceCPU.prototype.write32 = function (address, data) {
    address = address | 0;
    data = data | 0;
    //Updating the address bus away from PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    this.memory.memoryWrite32(address | 0, data | 0);
    //Updating the address bus back to PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
}
GameBoyAdvanceCPU.prototype.write16 = function (address, data) {
    address = address | 0;
    data = data | 0;
    //Updating the address bus away from PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    this.memory.memoryWrite16(address | 0, data | 0);
    //Updating the address bus back to PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
}
GameBoyAdvanceCPU.prototype.write8 = function (address, data) {
    address = address | 0;
    data = data | 0;
    //Updating the address bus away from PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    this.memory.memoryWrite8(address | 0, data | 0);
    //Updating the address bus back to PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
}
GameBoyAdvanceCPU.prototype.read32 = function (address) {
    address = address | 0;
    //Updating the address bus away from PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    var data = this.memory.memoryRead32(address | 0) | 0;
    //Unaligned access gets data rotated right:
    if ((address & 0x3) != 0) {
        //Rotate word right:
        data = (data << ((4 - (address & 0x3)) << 3)) | (data >>> ((address & 0x3) << 3));
    }
    //Updating the address bus back to PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    return data | 0;
}
GameBoyAdvanceCPU.prototype.read16 = function (address) {
    address = address | 0;
    //Updating the address bus away from PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    var data = this.memory.memoryRead16(address | 0) | 0;
    //Unaligned access gets data rotated right:
    if ((address & 0x1) != 0) {
        //Rotate word right:
        data = (data << 24) | (data >>> 8);
    }
    //Updating the address bus back to PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    return data | 0;
}
GameBoyAdvanceCPU.prototype.read8 = function (address) {
    address = address | 0;
    //Updating the address bus away from PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    var data = this.memory.memoryRead8(address | 0) | 0;
    //Updating the address bus back to PC fetch:
    this.IOCore.wait.NonSequentialBroadcast();
    return data | 0;
}