"use strict";
/*
 Copyright (C) 2012-2014 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function THUMBInstructionSet(CPUCore) {
    this.CPUCore = CPUCore;
    this.initialize();
}
THUMBInstructionSet.prototype.initialize = function () {
    this.wait = this.CPUCore.wait;
    this.registers = this.CPUCore.registers;
    this.branchFlags = this.CPUCore.branchFlags;
    this.fetch = 0;
    this.decode = 0;
    this.execute = 0;
    this.memory = this.CPUCore.memory;
}
THUMBInstructionSet.prototype.executeIteration = function () {
    //Push the new fetch access:
    this.fetch = this.memory.memoryReadCPU16(this.readPC() | 0) | 0;
    //Execute Instruction:
    this.executeDecoded();
    //Update the pipelining state:
    this.execute = this.decode | 0;
    this.decode = this.fetch | 0;
}
THUMBInstructionSet.prototype.executeDecoded = function () {
    /*
     Instruction Decode Pattern:
      X = Possible opcode bit; N = Data Bit, definitely not an opcode bit
     OPCODE: XXXXXXXXXXNNNNNN
     
     Since many of those "X"s are redundant and possibly data, we can "process"
     it and use a table to further decide what unique opcode it is, leaving us with
     a dense switch statement. Not "processing" the opcode beforehand would leave us
     with a 10 bit wide switch, which is slow in JS, and using a function in array computed
     goto trick is not optimal in JavaScript.
     */
    switch (this.instructionMap[this.execute >> 6] & 0xFF) {    //Leave the "& 0xFF" there, it's a uint8 type guard.
        case 0:
            this.CMPimm8();
            break;
        case 1:
            this.BEQ();
            break;
        case 2:
            this.MOVH_LH();
            break;
        case 3:
            this.LDRimm5();
            break;
        case 4:
            this.AND();
            break;
        case 5:
            this.LDRBimm5();
            break;
        case 6:
            this.LSLimm();
            break;
        case 7:
            this.LSRimm();
            break;
        case 8:
            this.MOVimm8();
            break;
        case 9:
            this.CMP();
            break;
        case 10:
            this.LDRSP();
            break;
        case 11:
            this.ADDimm3();
            break;
        case 12:
            this.ADDreg();
            break;
        case 13:
            this.STRSP();
            break;
        case 14:
            this.B();
            break;
        case 15:
            this.LDRPC();
            break;
        case 16:
            this.MOVH_HL();
            break;
        case 17:
            this.ADDimm8();
            break;
        case 18:
            this.SUBreg();
            break;
        case 19:
            this.BCC();
            break;
        case 20:
            this.STRimm5();
            break;
        case 21:
            this.ORR();
            break;
        case 22:
            this.LDRHimm5();
            break;
        case 23:
            this.BCS();
            break;
        case 24:
            this.BNE();
            break;
        case 25:
            this.BGE();
            break;
        case 26:
            this.POP();
            break;
        case 27:
            this.ADDH_HL();
            break;
        case 28:
            this.STRHimm5();
            break;
        case 29:
            this.BLE();
            break;
        case 30:
            this.ASRimm();
            break;
        case 31:
            this.MUL();
            break;
        case 32:
            this.BLsetup();
            break;
        case 33:
            this.BLoff();
            break;
        case 34:
            this.BGT();
            break;
        case 35:
            this.STRHreg();
            break;
        case 36:
            this.LDRHreg();
            break;
        case 37:
            this.BX_L();
            break;
        case 38:
            this.BLT();
            break;
        case 39:
            this.ADDSPimm7();
            break;
        case 40:
            this.PUSHlr();
            break;
        case 41:
            this.PUSH();
            break;
        case 42:
            this.SUBimm8();
            break;
        case 43:
            this.ROR();
            break;
        case 44:
            this.LDRSHreg();
            break;
        case 45:
            this.STRBimm5();
            break;
        case 46:
            this.NEG();
            break;
        case 47:
            this.BHI();
            break;
        case 48:
            this.TST();
            break;
        case 49:
            this.BX_H();
            break;
        case 50:
            this.STMIA();
            break;
        case 51:
            this.BLS();
            break;
        case 52:
            this.SWI();
            break;
        case 53:
            this.LDMIA();
            break;
        case 54:
            this.MOVH_HH();
            break;
        case 55:
            this.LSL();
            break;
        case 56:
            this.POPpc();
            break;
        case 57:
            this.LSR();
            break;
        case 58:
            this.CMPH_LH();
            break;
        case 59:
            this.EOR();
            break;
        case 60:
            this.SUBimm3();
            break;
        case 61:
            this.ADDH_LH();
            break;
        case 62:
            this.BPL();
            break;
        case 63:
            this.CMPH_HL();
            break;
        case 64:
            this.ADDPC();
            break;
        case 65:
            this.LDRSBreg();
            break;
        case 66:
            this.BIC();
            break;
        case 67:
            this.ADDSP();
            break;
        case 68:
            this.MVN();
            break;
        case 69:
            this.ASR();
            break;
        case 70:
            this.LDRreg();
            break;
        case 71:
            this.ADC();
            break;
        case 72:
            this.SBC();
            break;
        case 73:
            this.BMI();
            break;
        case 74:
            this.STRreg();
            break;
        case 75:
            this.CMN();
            break;
        case 76:
            this.LDRBreg();
            break;
        case 77:
            this.ADDH_HH();
            break;
        case 78:
            this.CMPH_HH();
            break;
        case 79:
            this.STRBreg();
            break;
        case 80:
            this.BVS();
            break;
        case 81:
            this.BVC();
            break;
        default:
            this.UNDEFINED();
    }
}
THUMBInstructionSet.prototype.executeBubble = function () {
    //Push the new fetch access:
    this.fetch = this.memory.memoryReadCPU16(this.readPC() | 0) | 0;
    //Update the Program Counter:
    this.incrementProgramCounter();
    //Update the pipelining state:
    this.execute = this.decode | 0;
    this.decode = this.fetch | 0;
}
THUMBInstructionSet.prototype.incrementProgramCounter = function () {
    //Increment The Program Counter:
    this.registers[15] = ((this.registers[15] | 0) + 2) | 0;
}
THUMBInstructionSet.prototype.readLowRegister = function (address) {
    //Low register read:
    address = address | 0;
    return this.registers[address & 0x7] | 0;
}
THUMBInstructionSet.prototype.read0OffsetLowRegister = function () {
    //Low register read at 0 bit offset:
    return this.readLowRegister(this.execute | 0) | 0;
}
THUMBInstructionSet.prototype.read3OffsetLowRegister = function () {
    //Low register read at 3 bit offset:
    return this.readLowRegister(this.execute >> 3) | 0;
}
THUMBInstructionSet.prototype.read6OffsetLowRegister = function () {
    //Low register read at 6 bit offset:
    return this.readLowRegister(this.execute >> 6) | 0;
}
THUMBInstructionSet.prototype.read8OffsetLowRegister = function () {
    //Low register read at 8 bit offset:
    return this.readLowRegister(this.execute >> 8) | 0;
}
THUMBInstructionSet.prototype.readHighRegister = function (address) {
    //High register read:
    address = address | 0x8;
    return this.registers[address & 0xF] | 0;
}
THUMBInstructionSet.prototype.writeLowRegister = function (address, data) {
    //Low register write:
    address = address | 0;
    data = data | 0;
    this.registers[address & 0x7] = data | 0;
}
THUMBInstructionSet.prototype.write0OffsetLowRegister = function (data) {
    //Low register write at 0 bit offset:
    data = data | 0;
    this.writeLowRegister(this.execute | 0, data | 0);
}
THUMBInstructionSet.prototype.write8OffsetLowRegister = function (data) {
    //Low register write at 8 bit offset:
    data = data | 0;
    this.writeLowRegister(this.execute >> 8, data | 0);
}
THUMBInstructionSet.prototype.guardHighRegisterWrite = function (data) {
    data = data | 0;
    var address = 0x8 | (this.execute & 0x7);
    if ((address | 0) == 0xF) {
        //We performed a branch:
        this.CPUCore.branch(data & -2);
    }
    else {
        //Regular Data Write:
        this.registers[address & 0xF] = data | 0;
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.writeSP = function (data) {
    //Update the stack pointer:
    data = data | 0;
    this.registers[0xD] = data | 0;
}
THUMBInstructionSet.prototype.SPDecrementWord = function () {
    //Decrement the stack pointer by one word:
    this.registers[0xD] = ((this.registers[0xD] | 0) - 4) | 0;
}
THUMBInstructionSet.prototype.SPIncrementWord = function () {
    //Increment the stack pointer by one word:
    this.registers[0xD] = ((this.registers[0xD] | 0) + 4) | 0;
}
THUMBInstructionSet.prototype.writeLR = function (data) {
    //Update the link register:
    data = data | 0;
    this.registers[0xE] = data | 0;
}
THUMBInstructionSet.prototype.writePC = function (data) {
    data = data | 0;
    //We performed a branch:
    //Update the program counter to branch address:
    this.CPUCore.branch(data & -2);
}
THUMBInstructionSet.prototype.offsetPC = function () {
    //We performed a branch:
    //Update the program counter to branch address:
    this.CPUCore.branch(((this.readPC() | 0) + ((this.execute << 24) >> 23)) | 0);
}
THUMBInstructionSet.prototype.getLR = function () {
    //Read back the value for the LR register upon Exception:
    return ((this.readPC() | 0) - 2) | 0;
}
THUMBInstructionSet.prototype.getIRQLR = function () {
    //Read back the value for the LR register upon IRQ:
    return this.readPC() | 0;
}
THUMBInstructionSet.prototype.readSP = function () {
    //Read back the current SP:
    return this.registers[0xD] | 0;
}
THUMBInstructionSet.prototype.readLR = function () {
    //Read back the current LR:
    return this.registers[0xE] | 0;
}
THUMBInstructionSet.prototype.readPC = function () {
    //Read back the current PC:
    return this.registers[0xF] | 0;
}
THUMBInstructionSet.prototype.getCurrentFetchValue = function () {
    return this.fetch | (this.fetch << 16);
}
THUMBInstructionSet.prototype.getSWICode = function () {
    return this.execute & 0xFF;
}
THUMBInstructionSet.prototype.LSLimm = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var offset = (this.execute >> 6) & 0x1F;
    if ((offset | 0) > 0) {
        //CPSR Carry is set by the last bit shifted out:
        this.branchFlags.setCarry((source << (((offset | 0) - 1) | 0)) | 0);
        //Perform shift:
        source = source << (offset | 0);
    }
    //Perform CPSR updates for N and Z (But not V):
    this.branchFlags.setNZInt(source | 0);
    //Update destination register:
    this.write0OffsetLowRegister(source | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LSRimm = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var offset = (this.execute >> 6) & 0x1F;
    if ((offset | 0) > 0) {
        //CPSR Carry is set by the last bit shifted out:
        this.branchFlags.setCarry((source >> (((offset | 0) - 1) | 0)) << 31);
        //Perform shift:
        source = (source >>> (offset | 0)) | 0;
    }
    else {
        this.branchFlags.setCarry(source | 0);
        source = 0;
    }
    //Perform CPSR updates for N and Z (But not V):
    this.branchFlags.setNZInt(source | 0);
    //Update destination register:
    this.write0OffsetLowRegister(source | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ASRimm = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var offset = (this.execute >> 6) & 0x1F;
    if ((offset | 0) > 0) {
        //CPSR Carry is set by the last bit shifted out:
        this.branchFlags.setCarry((source >> (((offset | 0) - 1) | 0)) << 31);
        //Perform shift:
        source = source >> (offset | 0);
    }
    else {
        this.branchFlags.setCarry(source | 0);
        source = source >> 0x1F;
    }
    //Perform CPSR updates for N and Z (But not V):
    this.branchFlags.setNZInt(source | 0);
    //Update destination register:
    this.write0OffsetLowRegister(source | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ADDreg = function () {
    var operand1 = this.read3OffsetLowRegister() | 0;
    var operand2 = this.read6OffsetLowRegister() | 0;
    //Update destination register:
    this.write0OffsetLowRegister(this.branchFlags.setADDFlags(operand1 | 0, operand2 | 0) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.SUBreg = function () {
    var operand1 = this.read3OffsetLowRegister() | 0;
    var operand2 = this.read6OffsetLowRegister() | 0;
    //Update destination register:
    this.write0OffsetLowRegister(this.branchFlags.setSUBFlags(operand1 | 0, operand2 | 0) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ADDimm3 = function () {
    var operand1 = this.read3OffsetLowRegister() | 0;
    var operand2 = (this.execute >> 6) & 0x7;
    //Update destination register:
    this.write0OffsetLowRegister(this.branchFlags.setADDFlags(operand1 | 0, operand2 | 0) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.SUBimm3 = function () {
    var operand1 = this.read3OffsetLowRegister() | 0;
    var operand2 = (this.execute >> 6) & 0x7;
    //Update destination register:
    this.write0OffsetLowRegister(this.branchFlags.setSUBFlags(operand1 | 0, operand2 | 0) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.MOVimm8 = function () {
    //Get the 8-bit value to move into the register:
    var result = this.execute & 0xFF;
    this.branchFlags.setNegativeFalse();
    this.branchFlags.setZero(result | 0);
    //Update destination register:
    this.write8OffsetLowRegister(result | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.CMPimm8 = function () {
    //Compare an 8-bit immediate value with a register:
    var operand1 = this.read8OffsetLowRegister() | 0;
    var operand2 = this.execute & 0xFF;
    this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ADDimm8 = function () {
    //Add an 8-bit immediate value with a register:
    var operand1 = this.read8OffsetLowRegister() | 0;
    var operand2 = this.execute & 0xFF;
    this.write8OffsetLowRegister(this.branchFlags.setADDFlags(operand1 | 0, operand2 | 0) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.SUBimm8 = function () {
    //Subtract an 8-bit immediate value from a register:
    var operand1 = this.read8OffsetLowRegister() | 0;
    var operand2 = this.execute & 0xFF;
    this.write8OffsetLowRegister(this.branchFlags.setSUBFlags(operand1 | 0, operand2 | 0) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.AND = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var destination = this.read0OffsetLowRegister() | 0;
    //Perform bitwise AND:
    var result = source & destination;
    this.branchFlags.setNZInt(result | 0);
    //Update destination register:
    this.write0OffsetLowRegister(result | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.EOR = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var destination = this.read0OffsetLowRegister() | 0;
    //Perform bitwise EOR:
    var result = source ^ destination;
    this.branchFlags.setNZInt(result | 0);
    //Update destination register:
    this.write0OffsetLowRegister(result | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LSL = function () {
    var source = this.read3OffsetLowRegister() & 0xFF;
    var destination = this.read0OffsetLowRegister() | 0;
    //Check to see if we need to update CPSR:
    if ((source | 0) > 0) {
        if ((source | 0) < 0x20) {
            //Shift the register data left:
            this.branchFlags.setCarry(destination << (((source | 0) - 1) | 0));
            destination = destination << (source | 0);
        }
        else if ((source | 0) == 0x20) {
            //Shift bit 0 into carry:
            this.branchFlags.setCarry(destination << 31);
            destination = 0;
        }
        else {
            //Everything Zero'd:
            this.branchFlags.setCarryFalse();
            destination = 0;
        }
    }
    //Perform CPSR updates for N and Z (But not V):
    this.branchFlags.setNZInt(destination | 0);
    //Update destination register:
    this.write0OffsetLowRegister(destination | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LSR = function () {
    var source = this.read3OffsetLowRegister() & 0xFF;
    var destination = this.read0OffsetLowRegister() | 0;
    //Check to see if we need to update CPSR:
    if ((source | 0) > 0) {
        if ((source | 0) < 0x20) {
            //Shift the register data right logically:
            this.branchFlags.setCarry((destination >> (((source | 0) - 1) | 0)) << 31);
            destination = (destination >>> (source | 0)) | 0;
        }
        else if (source == 0x20) {
            //Shift bit 31 into carry:
            this.branchFlags.setCarry(destination | 0);
            destination = 0;
        }
        else {
            //Everything Zero'd:
            this.branchFlags.setCarryFalse();
            destination = 0;
        }
    }
    //Perform CPSR updates for N and Z (But not V):
    this.branchFlags.setNZInt(destination | 0);
    //Update destination register:
    this.write0OffsetLowRegister(destination | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ASR = function () {
    var source = this.read3OffsetLowRegister() & 0xFF;
    var destination = this.read0OffsetLowRegister() | 0;
    //Check to see if we need to update CPSR:
    if ((source | 0) > 0) {
        if ((source | 0) < 0x20) {
            //Shift the register data right arithmetically:
            this.branchFlags.setCarry((destination >> (((source | 0) - 1) | 0)) << 31);
            destination = destination >> (source | 0);
        }
        else {
            //Set all bits with bit 31:
            this.branchFlags.setCarry(destination | 0);
            destination = destination >> 0x1F;
        }
    }
    //Perform CPSR updates for N and Z (But not V):
    this.branchFlags.setNZInt(destination | 0);
    //Update destination register:
    this.write0OffsetLowRegister(destination | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ADC = function () {
    var operand1 = this.read0OffsetLowRegister() | 0;
    var operand2 = this.read3OffsetLowRegister() | 0;
    //Update destination register:
    this.write0OffsetLowRegister(this.branchFlags.setADCFlags(operand1 | 0, operand2 | 0) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.SBC = function () {
    var operand1 = this.read0OffsetLowRegister() | 0;
    var operand2 = this.read3OffsetLowRegister() | 0;
    //Update destination register:
    this.write0OffsetLowRegister(this.branchFlags.setSBCFlags(operand1 | 0, operand2 | 0) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ROR = function () {
    var source = this.read3OffsetLowRegister() & 0xFF;
    var destination = this.read0OffsetLowRegister() | 0;
    if ((source | 0) > 0) {
        source = source & 0x1F;
        if ((source | 0) > 0) {
            //CPSR Carry is set by the last bit shifted out:
            this.branchFlags.setCarry((destination >> ((source - 1) | 0)) << 31);
            //Perform rotate:
            destination = (destination << ((0x20 - (source | 0)) | 0)) | (destination >>> (source | 0));
        }
        else {
            this.branchFlags.setCarry(destination | 0);
        }
    }
    //Perform CPSR updates for N and Z (But not V):
    this.branchFlags.setNZInt(destination | 0);
    //Update destination register:
    this.write0OffsetLowRegister(destination | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.TST = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var destination = this.read0OffsetLowRegister() | 0;
    //Perform bitwise AND:
    var result = source & destination;
    this.branchFlags.setNZInt(result | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.NEG = function () {
    var source = this.read3OffsetLowRegister() | 0;
    if ((source | 0) != -0x80000000) {
        //Perform Subtraction:
        source = (-(source | 0)) | 0;
        this.branchFlags.setOverflowFalse();
    }
    else {
        //Negation of MIN_INT overflows!
        this.branchFlags.setOverflowTrue();
    }
    this.branchFlags.setNZInt(source | 0);
    //Update destination register:
    this.write0OffsetLowRegister(source | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.CMP = function () {
    //Compare two registers:
    var operand1 = this.read0OffsetLowRegister() | 0;
    var operand2 = this.read3OffsetLowRegister() | 0;
    this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.CMN = function () {
    //Compare two registers:
    var operand1 = this.read0OffsetLowRegister() | 0;
    var operand2 = this.read3OffsetLowRegister() | 0;
    this.branchFlags.setCMNFlags(operand1 | 0, operand2 | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ORR = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var destination = this.read0OffsetLowRegister() | 0;
    //Perform bitwise OR:
    var result = source | destination;
    this.branchFlags.setNZInt(result | 0);
    //Update destination register:
    this.write0OffsetLowRegister(result | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.MUL = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var destination = this.read0OffsetLowRegister() | 0;
    //Perform MUL32:
    var result = this.CPUCore.performMUL32(source | 0, destination | 0, 0) | 0;
    this.branchFlags.setCarryFalse();
    this.branchFlags.setNZInt(result | 0);
    //Update destination register:
    this.write0OffsetLowRegister(result | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.BIC = function () {
    var source = this.read3OffsetLowRegister() | 0;
    var destination = this.read0OffsetLowRegister() | 0;
    //Perform bitwise AND with a bitwise NOT on source:
    var result = (~source) & destination;
    this.branchFlags.setNZInt(result | 0);
    //Update destination register:
    this.write0OffsetLowRegister(result | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.MVN = function () {
    //Perform bitwise NOT on source:
    var source = ~this.read3OffsetLowRegister();
    this.branchFlags.setNZInt(source | 0);
    //Update destination register:
    this.write0OffsetLowRegister(source | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ADDH_LH = function () {
    var operand1 = this.read0OffsetLowRegister() | 0;
    var operand2 = this.readHighRegister(this.execute >> 3) | 0;
    //Perform Addition:
    //Update destination register:
    this.write0OffsetLowRegister(((operand1 | 0) + (operand2 | 0)) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ADDH_HL = function () {
    var operand1 = this.readHighRegister(this.execute | 0) | 0;
    var operand2 = this.read3OffsetLowRegister() | 0;
    //Perform Addition:
    //Update destination register:
    this.guardHighRegisterWrite(((operand1 | 0) + (operand2 | 0)) | 0);
}
THUMBInstructionSet.prototype.ADDH_HH = function () {
    var operand1 = this.readHighRegister(this.execute | 0) | 0;
    var operand2 = this.readHighRegister(this.execute >> 3) | 0;
    //Perform Addition:
    //Update destination register:
    this.guardHighRegisterWrite(((operand1 | 0) + (operand2 | 0)) | 0);
}
THUMBInstructionSet.prototype.CMPH_LH = function () {
    //Compare two registers:
    var operand1 = this.read0OffsetLowRegister() | 0;
    var operand2 = this.readHighRegister(this.execute >> 3) | 0;
    this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.CMPH_HL = function () {
    //Compare two registers:
    var operand1 = this.readHighRegister(this.execute | 0) | 0;
    var operand2 = this.read3OffsetLowRegister() | 0;
    this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.CMPH_HH = function () {
    //Compare two registers:
    var operand1 = this.readHighRegister(this.execute | 0) | 0;
    var operand2 = this.readHighRegister(this.execute >> 3) | 0;
    this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.MOVH_LH = function () {
    //Move a register to another register:
    this.write0OffsetLowRegister(this.readHighRegister(this.execute >> 3) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.MOVH_HL = function () {
    //Move a register to another register:
    this.guardHighRegisterWrite(this.read3OffsetLowRegister() | 0);
}
THUMBInstructionSet.prototype.MOVH_HH = function () {
    //Move a register to another register:
    this.guardHighRegisterWrite(this.readHighRegister(this.execute >> 3) | 0);
}
THUMBInstructionSet.prototype.BX_L = function () {
    //Branch & eXchange:
    var address = this.read3OffsetLowRegister() | 0;
    if ((address & 0x1) == 0) {
        //Enter ARM mode:
        this.CPUCore.enterARM();
        this.CPUCore.branch(address & -0x4);
    }
    else {
        //Stay in THUMB mode:
        this.CPUCore.branch(address & -0x2);
    }
}
THUMBInstructionSet.prototype.BX_H = function () {
    //Branch & eXchange:
    var address = this.readHighRegister(this.execute >> 3) | 0;
    if ((address & 0x1) == 0) {
        //Enter ARM mode:
        this.CPUCore.enterARM();
        this.CPUCore.branch(address & -0x4);
    }
    else {
        //Stay in THUMB mode:
        this.CPUCore.branch(address & -0x2);
    }
}
THUMBInstructionSet.prototype.LDRPC = function () {
    //PC-Relative Load
    var data = this.CPUCore.read32(((this.readPC() & -3) + ((this.execute & 0xFF) << 2)) | 0) | 0;
    this.write8OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.STRreg = function () {
    //Store Word From Register
    var address = ((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0)) | 0;
    this.CPUCore.write32(address | 0, this.read0OffsetLowRegister() | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.STRHreg = function () {
    //Store Half-Word From Register
    var address = ((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0)) | 0;
    this.CPUCore.write16(address | 0, this.read0OffsetLowRegister() | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.STRBreg = function () {
    //Store Byte From Register
    var address = ((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0)) | 0;
    this.CPUCore.write8(address | 0, this.read0OffsetLowRegister() | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LDRSBreg = function () {
    //Load Signed Byte Into Register
    var data = (this.CPUCore.read8(((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0)) | 0) << 24) >> 24;
    this.write0OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.LDRreg = function () {
    //Load Word Into Register
    var data = this.CPUCore.read32(((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0)) | 0) | 0;
    this.write0OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.LDRHreg = function () {
    //Load Half-Word Into Register
    var data = this.CPUCore.read16(((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0)) | 0) | 0;
    this.write0OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.LDRBreg = function () {
    //Load Byte Into Register
    var data = this.CPUCore.read8(((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0)) | 0) | 0;
    this.write0OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.LDRSHreg = function () {
    //Load Signed Half-Word Into Register
    var data = (this.CPUCore.read16(((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0)) | 0) << 16) >> 16;
    this.write0OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.STRimm5 = function () {
    //Store Word From Register
    var address = (((this.execute >> 4) & 0x7C) + (this.read3OffsetLowRegister() | 0)) | 0;
    this.CPUCore.write32(address | 0, this.read0OffsetLowRegister() | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LDRimm5 = function () {
    //Load Word Into Register
    var data = this.CPUCore.read32((((this.execute >> 4) & 0x7C) + (this.read3OffsetLowRegister() | 0)) | 0) | 0;
    this.write0OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.STRBimm5 = function () {
    //Store Byte From Register
    var address = (((this.execute >> 6) & 0x1F) + (this.read3OffsetLowRegister() | 0)) | 0;
    this.CPUCore.write8(address | 0, this.read0OffsetLowRegister() | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LDRBimm5 = function () {
    //Load Byte Into Register
    var data = this.CPUCore.read8((((this.execute >> 6) & 0x1F) + (this.read3OffsetLowRegister() | 0)) | 0) | 0;
    this.write0OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.STRHimm5 = function () {
    //Store Half-Word From Register
    var address = (((this.execute >> 5) & 0x3E) + (this.read3OffsetLowRegister() | 0)) | 0;
    this.CPUCore.write16(address | 0, this.read0OffsetLowRegister() | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LDRHimm5 = function () {
    //Load Half-Word Into Register
    var data = this.CPUCore.read16((((this.execute >> 5) & 0x3E) + (this.read3OffsetLowRegister() | 0)) | 0) | 0;
    this.write0OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.STRSP = function () {
    //Store Word From Register
    var address = (((this.execute & 0xFF) << 2) + (this.readSP() | 0)) | 0;
    this.CPUCore.write32(address | 0, this.read8OffsetLowRegister() | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LDRSP = function () {
    //Load Word Into Register
    var data = this.CPUCore.read32((((this.execute & 0xFF) << 2) + (this.readSP() | 0)) | 0) | 0;
    this.write8OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.ADDPC = function () {
    //Add PC With Offset Into Register
    var data = ((this.readPC() & -3) + ((this.execute & 0xFF) << 2)) | 0;
    this.write8OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ADDSP = function () {
    //Add SP With Offset Into Register
    var data = (((this.execute & 0xFF) << 2) + (this.readSP() | 0)) | 0;
    this.write8OffsetLowRegister(data | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.ADDSPimm7 = function () {
    //Add Signed Offset Into SP
    if ((this.execute & 0x80) != 0) {
        this.writeSP(((this.readSP() | 0) - ((this.execute & 0x7F) << 2)) | 0);
    }
    else {
        this.writeSP(((this.readSP() | 0) + ((this.execute & 0x7F) << 2)) | 0);
    }
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.PUSH = function () {
    //Only initialize the PUSH sequence if the register list is non-empty:
    if ((this.execute & 0xFF) > 0) {
        //Updating the address bus away from PC fetch:
        this.wait.NonSequentialBroadcast();
        //Push register(s) onto the stack:
        for (var rListPosition = 7; (rListPosition | 0) > -1; rListPosition = ((rListPosition | 0) - 1) | 0) {
            if ((this.execute & (1 << rListPosition)) != 0) {
                //Push register onto the stack:
                this.SPDecrementWord();
                this.memory.memoryWrite32(this.readSP() | 0, this.readLowRegister(rListPosition | 0) | 0);
            }
        }
        //Updating the address bus back to PC fetch:
        this.wait.NonSequentialBroadcast();
    }
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.PUSHlr = function () {
    //Updating the address bus away from PC fetch:
    this.wait.NonSequentialBroadcast();
    //Push link register onto the stack:
    this.SPDecrementWord();
    this.memory.memoryWrite32(this.readSP() | 0, this.readLR() | 0);
    //Push register(s) onto the stack:
    for (var rListPosition = 7; (rListPosition | 0) > -1; rListPosition = ((rListPosition | 0) - 1) | 0) {
        if ((this.execute & (1 << rListPosition)) != 0) {
            //Push register onto the stack:
            this.SPDecrementWord();
            this.memory.memoryWrite32(this.readSP() | 0, this.readLowRegister(rListPosition | 0) | 0);
        }
    }
    //Updating the address bus back to PC fetch:
    this.wait.NonSequentialBroadcast();
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.POP = function () {
    //Only initialize the POP sequence if the register list is non-empty:
    if ((this.execute & 0xFF) > 0) {
        //Updating the address bus away from PC fetch:
        this.wait.NonSequentialBroadcast();
        //POP stack into register(s):
        for (var rListPosition = 0; (rListPosition | 0) < 8; rListPosition = ((rListPosition | 0) + 1) | 0) {
            if ((this.execute & (1 << rListPosition)) != 0) {
                //POP stack into a register:
                this.writeLowRegister(rListPosition | 0, this.memory.memoryRead32(this.readSP() | 0) | 0);
                this.SPIncrementWord();
            }
        }
        //Updating the address bus back to PC fetch:
        this.wait.NonSequentialBroadcast();
    }
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.POPpc = function () {
    //Updating the address bus away from PC fetch:
    this.wait.NonSequentialBroadcast();
    //POP stack into register(s):
    for (var rListPosition = 0; (rListPosition | 0) < 8; rListPosition = ((rListPosition | 0) + 1) | 0) {
        if ((this.execute & (1 << rListPosition)) != 0) {
            //POP stack into a register:
            this.writeLowRegister(rListPosition | 0, this.memory.memoryRead32(this.readSP() | 0) | 0);
            this.SPIncrementWord();
        }
    }
    //POP stack into the program counter (r15):
    this.writePC(this.memory.memoryRead32(this.readSP() | 0) | 0);
    this.SPIncrementWord();
    //Updating the address bus back to PC fetch:
    this.wait.NonSequentialBroadcast();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.STMIA = function () {
    //Only initialize the STMIA sequence if the register list is non-empty:
    if ((this.execute & 0xFF) > 0) {
        //Get the base address:
        var currentAddress = this.read8OffsetLowRegister() | 0;
        //Updating the address bus away from PC fetch:
        this.wait.NonSequentialBroadcast();
        //Push register(s) into memory:
        for (var rListPosition = 0; (rListPosition | 0) < 8; rListPosition = ((rListPosition | 0) + 1) | 0) {
            if ((this.execute & (1 << rListPosition)) != 0) {
                //Push a register into memory:
                this.memory.memoryWrite32(currentAddress | 0, this.readLowRegister(rListPosition | 0) | 0);
                currentAddress = ((currentAddress | 0) + 4) | 0;
            }
        }
        //Store the updated base address back into register:
        this.write8OffsetLowRegister(currentAddress | 0);
        //Updating the address bus back to PC fetch:
        this.wait.NonSequentialBroadcast();
    }
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.LDMIA = function () {
    //Only initialize the LDMIA sequence if the register list is non-empty:
    if ((this.execute & 0xFF) > 0) {
        //Get the base address:
        var currentAddress = this.read8OffsetLowRegister() | 0;
        //Updating the address bus away from PC fetch:
        this.wait.NonSequentialBroadcast();
        //Load  register(s) from memory:
        for (var rListPosition = 0; (rListPosition | 0) < 8; rListPosition = ((rListPosition | 0) + 1) | 0) {
            if ((this.execute & (1 << rListPosition)) != 0) {
                //Load a register from memory:
                this.writeLowRegister(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
                currentAddress = ((currentAddress | 0) + 4) | 0;
            }
        }
        //Store the updated base address back into register:
        this.write8OffsetLowRegister(currentAddress | 0);
        //Updating the address bus back to PC fetch:
        this.wait.NonSequentialBroadcast();
    }
    //Update PC:
    this.incrementProgramCounter();
    //Internal Cycle:
    this.wait.CPUInternalSingleCyclePrefetch();
}
THUMBInstructionSet.prototype.BEQ = function () {
    //Branch if EQual:
    if ((this.branchFlags.getZero() | 0) == 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BNE = function () {
    //Branch if Not Equal:
    if ((this.branchFlags.getZero() | 0) != 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BCS = function () {
    //Branch if Carry Set:
    if ((this.branchFlags.getCarry() | 0) < 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BCC = function () {
    //Branch if Carry Clear:
    if ((this.branchFlags.getCarry() | 0) >= 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BMI = function () {
    //Branch if Negative Set:
    if ((this.branchFlags.getNegative() | 0) < 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BPL = function () {
    //Branch if Negative Clear:
    if ((this.branchFlags.getNegative() | 0) >= 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BVS = function () {
    //Branch if Overflow Set:
    if ((this.branchFlags.getOverflow() | 0) < 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BVC = function () {
    //Branch if Overflow Clear:
    if ((this.branchFlags.getOverflow() | 0) >= 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BHI = function () {
    //Branch if Carry & Non-Zero:
    if ((this.branchFlags.getCarry() | 0) < 0 && (this.branchFlags.getZero() | 0) != 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BLS = function () {
    //Branch if Carry Clear or is Zero Set:
    if ((this.branchFlags.getCarry() | 0) < 0 && (this.branchFlags.getZero() | 0) != 0) {
        //Update PC:
        this.incrementProgramCounter();
    }
    else {
        this.offsetPC();
    }
}
THUMBInstructionSet.prototype.BGE = function () {
    //Branch if Negative equal to Overflow
    if ((this.branchFlags.BGE() | 0) >= 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BLT = function () {
    //Branch if Negative NOT equal to Overflow
    if ((this.branchFlags.BGE() | 0) < 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BGT = function () {
    //Branch if Zero Clear and Negative equal to Overflow
    if ((this.branchFlags.getZero() | 0) != 0 && (this.branchFlags.BGE() | 0) >= 0) {
        this.offsetPC();
    }
    else {
        //Update PC:
        this.incrementProgramCounter();
    }
}
THUMBInstructionSet.prototype.BLE = function () {
    //Branch if Zero Set or Negative NOT equal to Overflow
    if ((this.branchFlags.getZero() | 0) != 0 && (this.branchFlags.BGE() | 0) >= 0) {
        //Update PC:
        this.incrementProgramCounter();
    }
    else {
        this.offsetPC();
    }
}
THUMBInstructionSet.prototype.SWI = function () {
    //Software Interrupt:
    this.CPUCore.SWI();
}
THUMBInstructionSet.prototype.B = function () {
    //Unconditional Branch:
    //Update the program counter to branch address:
    this.CPUCore.branch(((this.readPC() | 0) + ((this.execute << 21) >> 20)) | 0);
}
THUMBInstructionSet.prototype.BLsetup = function () {
    //Brank with Link (High offset)
    //Update the link register to branch address:
    this.writeLR(((this.readPC() | 0) + ((this.execute << 21) >> 9)) | 0);
    //Update PC:
    this.incrementProgramCounter();
}
THUMBInstructionSet.prototype.BLoff = function () {
    //Brank with Link (Low offset)
    //Update the link register to branch address:
    this.writeLR(((this.readLR() | 0) + ((this.execute & 0x7FF) << 1)) | 0);
    //Copy LR to PC:
    var oldPC = this.readPC() | 0;
    //Flush Pipeline & Block PC Increment:
    this.CPUCore.branch(this.readLR() & -0x2);
    //Set bit 0 of LR high:
    this.writeLR(((oldPC | 0) - 0x2) | 0x1);
}
THUMBInstructionSet.prototype.UNDEFINED = function () {
    //Undefined Exception:
    this.CPUCore.UNDEFINED();
}
function compileTHUMBInstructionDecodeMap() {
    var opcodeIndice = 0;
    var instructionMap = getUint8Array(1024);
    function generateLowMap(instruction) {
        for (var index = 0; index < 0x20; ++index) {
            instructionMap[opcodeIndice++] = instruction;
        }
    }
    function generateLowMap2(instruction) {
        for (var index = 0; index < 0x8; ++index) {
            instructionMap[opcodeIndice++] = instruction;
        }
    }
    function generateLowMap3(instruction) {
        for (var index = 0; index < 0x4; ++index) {
            instructionMap[opcodeIndice++] = instruction;
        }
    }
    function generateLowMap4(instruction1, instruction2, instruction3, instruction4) {
        instructionMap[opcodeIndice++] = instruction1;
        instructionMap[opcodeIndice++] = instruction2;
        instructionMap[opcodeIndice++] = instruction3;
        instructionMap[opcodeIndice++] = instruction4;
    }
    //0-7
    generateLowMap(6);
    //8-F
    generateLowMap(7);
    //10-17
    generateLowMap(30);
    //18-19
    generateLowMap2(12);
    //1A-1B
    generateLowMap2(18);
    //1C-1D
    generateLowMap2(11);
    //1E-1F
    generateLowMap2(60);
    //20-27
    generateLowMap(8);
    //28-2F
    generateLowMap(0);
    //30-37
    generateLowMap(17);
    //38-3F
    generateLowMap(42);
    //40
    generateLowMap4(4, 59, 55, 57);
    //41
    generateLowMap4(69, 71, 72, 43);
    //42
    generateLowMap4(48, 46, 9, 75);
    //43
    generateLowMap4(21, 31, 66, 68);
    //44
    generateLowMap4(82, 61, 27, 77);
    //45
    generateLowMap4(82, 58, 63, 78);
    //46
    generateLowMap4(82, 2, 16, 54);
    //47
    generateLowMap4(37, 49, 82, 82);
    //48-4F
    generateLowMap(15);
    //50-51
    generateLowMap2(74);
    //52-53
    generateLowMap2(35);
    //54-55
    generateLowMap2(79);
    //56-57
    generateLowMap2(65);
    //58-59
    generateLowMap2(70);
    //5A-5B
    generateLowMap2(36);
    //5C-5D
    generateLowMap2(76);
    //5E-5F
    generateLowMap2(44);
    //60-67
    generateLowMap(20);
    //68-6F
    generateLowMap(3);
    //70-77
    generateLowMap(45);
    //78-7F
    generateLowMap(5);
    //80-87
    generateLowMap(28);
    //88-8F
    generateLowMap(22);
    //90-97
    generateLowMap(13);
    //98-9F
    generateLowMap(10);
    //A0-A7
    generateLowMap(64);
    //A8-AF
    generateLowMap(67);
    //B0
    generateLowMap3(39);
    //B1
    generateLowMap3(82);
    //B2
    generateLowMap3(82);
    //B3
    generateLowMap3(82);
    //B4
    generateLowMap3(41);
    //B5
    generateLowMap3(40);
    //B6
    generateLowMap3(82);
    //B7
    generateLowMap3(82);
    //B8
    generateLowMap3(82);
    //B9
    generateLowMap3(82);
    //BA
    generateLowMap3(82);
    //BB
    generateLowMap3(82);
    //BC
    generateLowMap3(26);
    //BD
    generateLowMap3(56);
    //BE
    generateLowMap3(82);
    //BF
    generateLowMap3(82);
    //C0-C7
    generateLowMap(50);
    //C8-CF
    generateLowMap(53);
    //D0
    generateLowMap3(1);
    //D1
    generateLowMap3(24);
    //D2
    generateLowMap3(23);
    //D3
    generateLowMap3(19);
    //D4
    generateLowMap3(73);
    //D5
    generateLowMap3(62);
    //D6
    generateLowMap3(80);
    //D7
    generateLowMap3(81);
    //D8
    generateLowMap3(47);
    //D9
    generateLowMap3(51);
    //DA
    generateLowMap3(25);
    //DB
    generateLowMap3(38);
    //DC
    generateLowMap3(34);
    //DD
    generateLowMap3(29);
    //DE
    generateLowMap3(82);
    //DF
    generateLowMap3(52);
    //E0-E7
    generateLowMap(14);
    //E8-EF
    generateLowMap(82);
    //F0-F7
    generateLowMap(32);
    //F8-FF
    generateLowMap(33);
    //Set to prototype:
    THUMBInstructionSet.prototype.instructionMap = instructionMap;
}
compileTHUMBInstructionDecodeMap();