"use strict";
/*
 Copyright (C) 2012-2014 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function ARMCPSRAttributeTable() {
    //"use asm";
    var negative = 0;
    var zero = 1;
    var carry = 0;
    var overflow = 0;
    function setNegative(toSet) {
        toSet = toSet | 0;
        negative = toSet | 0;
    };
    function setNegativeFalse() {
        negative = 0;
    };
    function getNegative() {
        return negative | 0;
    };
    function setZero(toSet) {
        toSet = toSet | 0;
        zero = toSet | 0;
    };
    function setZeroTrue() {
        zero = 0;
    };
    function setZeroFalse() {
        zero = 1;
    };
    function getZero() {
        return zero | 0;
    };
    function setOverflowTrue() {
        overflow = -1;
    };
    function setOverflowFalse() {
        overflow = 0;
    };
    function getOverflow() {
        return overflow | 0;
    };
    function setCarry(toSet) {
        toSet = toSet | 0;
        carry = toSet | 0;
    };
    function setCarryFalse() {
        carry = 0;
    };
    function getCarry() {
        return carry | 0;
    };
    function getCarryReverse() {
        return (~carry) | 0;
    };
    function checkConditionalCode(execute) {
        execute = execute | 0;
        /*
         Instruction Decode Pattern:
         C = Conditional Code Bit;
         X = Possible opcode bit;
         N = Data Bit, definitely not an opcode bit
         OPCODE: CCCCXXXXXXXXXXXXNNNNNNNNXXXXNNNN
         
         For this function, we decode the top 3 bits for the conditional code test:
         */
        switch ((execute >>> 29) | 0) {
            case 0x4:
                if ((zero | 0) == 0) {
                    execute = -1;
                    break;
                }
            case 0x1:
                execute = ~carry;
                break;
            case 0x2:
                execute = ~negative;
                break;
            case 0x3:
                execute = ~overflow;
                break;
            case 0x6:
                if ((zero | 0) == 0) {
                    execute = -1;
                    break;
                }
            case 0x5:
                execute = negative ^ overflow;
                break;
            case 0x0:
                if ((zero | 0) != 0) {
                    execute = -1;
                    break;
                }
            default:
                execute = 0;
        }
        return execute | 0;
    };
    function setNZInt(toSet) {
        toSet = toSet | 0;
        negative = toSet | 0;
        zero = toSet | 0;
    };
    function setNZCV(toSet) {
        toSet = toSet | 0;
        negative = toSet | 0;
        zero = (~toSet) & 0x40000000;
        carry = toSet << 2;
        overflow = toSet << 3;
    };
    function getNZCV() {
        var toSet = 0;
        toSet = negative & 0x80000000;
        if ((zero | 0) == 0) {
            toSet = toSet | 0x40000000;
        }
        toSet = toSet | ((carry >>> 31) << 29);
        toSet = toSet | ((overflow >>> 31) << 28);
        return toSet | 0;
    };
    function setADDFlags(operand1, operand2) {
        //Update flags for an addition operation:
        operand1 = operand1 | 0;
        operand2 = operand2 | 0;
        negative = ((operand1 | 0) + (operand2 | 0)) | 0;
        zero = negative | 0;
        if ((negative >>> 0) < (operand1 >>> 0)) {
            carry = -1;
        }
        else {
            carry = 0;
        }
        overflow = (~(operand1 ^ operand2)) & (operand1 ^ negative);
        return negative | 0;
    };
    function setADCFlags(operand1, operand2) {
        //Update flags for an addition operation:
        operand1 = operand1 | 0;
        operand2 = operand2 | 0;
        negative = ((operand1 | 0) + (operand2 | 0)) | 0;
        negative = ((negative | 0) + (carry >>> 31)) | 0;
        zero = negative | 0;
        if ((negative >>> 0) < (operand1 >>> 0)) {
            carry = -1;
        }
        else if ((negative >>> 0) > (operand1 >>> 0)) {
            carry = 0;
        }
        overflow = (~(operand1 ^ operand2)) & (operand1 ^ negative);
        return negative | 0;
    };
    function setSUBFlags(operand1, operand2) {
        //Update flags for a subtraction operation:
        operand1 = operand1 | 0;
        operand2 = operand2 | 0;
        negative = ((operand1 | 0) - (operand2 | 0)) | 0;
        zero = negative | 0;
        if ((operand1 >>> 0) >= (operand2 >>> 0)) {
            carry = -1;
        }
        else {
            carry = 0;
        }
        overflow = (operand1 ^ operand2) & (operand1 ^ negative);
        return negative | 0;
    };
    function setSBCFlags(operand1, operand2) {
        //Update flags for a subtraction operation:
        operand1 = operand1 | 0;
        operand2 = operand2 | 0;
        negative = ((operand1 | 0) - (operand2 | 0)) | 0;
        negative = ((negative | 0) - ((~carry) >>> 31)) | 0
        zero = negative | 0;
        if ((negative >>> 0) < (operand1 >>> 0)) {
            carry = -1;
        }
        else if ((negative >>> 0) > (operand1 >>> 0)) {
            carry = 0;
        }
        overflow = (operand1 ^ operand2) & (operand1 ^ negative);
        return negative | 0;
    };
    function setCMPFlags(operand1, operand2) {
        //Update flags for a subtraction operation:
        operand1 = operand1 | 0;
        operand2 = operand2 | 0;
        negative = ((operand1 | 0) - (operand2 | 0)) | 0;
        zero = negative | 0;
        if ((operand1 >>> 0) >= (operand2 >>> 0)) {
            carry = -1;
        }
        else {
            carry = 0;
        }
        overflow = (operand1 ^ operand2) & (operand1 ^ negative);
    };
    function setCMNFlags(operand1, operand2) {
        //Update flags for an addition operation:
        operand1 = operand1 | 0;
        operand2 = operand2 | 0;
        negative = ((operand1 | 0) + (operand2 | 0)) | 0;
        zero = negative | 0;
        if ((negative >>> 0) < (operand1 >>> 0)) {
            carry = -1;
        }
        else {
            carry = 0;
        }
        overflow = (~(operand1 ^ operand2)) & (operand1 ^ negative);
    };
    function BGE() {
        //Branch if Negative equal to Overflow
        return (negative ^ overflow) | 0;
    };
    return {
        setNegative:setNegative,
        setNegativeFalse:setNegativeFalse,
        getNegative:getNegative,
        setZero:setZero,
        setZeroTrue:setZeroTrue,
        setZeroFalse:setZeroFalse,
        getZero:getZero,
        setOverflowTrue:setOverflowTrue,
        setOverflowFalse:setOverflowFalse,
        getOverflow:getOverflow,
        setCarry:setCarry,
        setCarryFalse:setCarryFalse,
        getCarry:getCarry,
        getCarryReverse:getCarryReverse,
        checkConditionalCode:checkConditionalCode,
        setNZInt:setNZInt,
        setNZCV:setNZCV,
        getNZCV:getNZCV,
        setADDFlags:setADDFlags,
        setADCFlags:setADCFlags,
        setSUBFlags:setSUBFlags,
        setSBCFlags:setSBCFlags,
        setCMPFlags:setCMPFlags,
        setCMNFlags:setCMNFlags,
        BGE:BGE
    };
}