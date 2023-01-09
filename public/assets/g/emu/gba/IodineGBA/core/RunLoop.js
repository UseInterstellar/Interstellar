"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceIO(settings, coreExposed, BIOS, ROM) {
    //State Machine Tracking:
    this.systemStatus = 0;
    this.cyclesToIterate = 0;
    this.cyclesOveriteratedPreviously = 0;
    this.accumulatedClocks = 0;
    this.graphicsClocks = 0;
    this.timerClocks = 0;
    this.serialClocks = 0;
    this.nextEventClocks = 0;
    this.BIOSFound = false;
    //References passed to us:
    this.settings = settings;
    this.coreExposed = coreExposed;
    this.BIOS = BIOS;
    this.ROM = ROM;
    //Build the core object layout:
    this.memory = new GameBoyAdvanceMemory(this);
    this.dma = new GameBoyAdvanceDMA(this);
    this.dmaChannel0 = new GameBoyAdvanceDMA0(this);
    this.dmaChannel1 = new GameBoyAdvanceDMA1(this);
    this.dmaChannel2 = new GameBoyAdvanceDMA2(this);
    this.dmaChannel3 = new GameBoyAdvanceDMA3(this);
    this.gfxState = new GameBoyAdvanceGraphics(this);
    this.gfxRenderer = new GameBoyAdvanceRendererProxy(this);
    this.sound = new GameBoyAdvanceSound(this);
    this.timer = new GameBoyAdvanceTimer(this);
    this.irq = new GameBoyAdvanceIRQ(this);
    this.serial = new GameBoyAdvanceSerial(this);
    this.joypad = new GameBoyAdvanceJoyPad(this);
    this.cartridge = new GameBoyAdvanceCartridge(this);
    this.saves = new GameBoyAdvanceSaves(this);
    this.wait = new GameBoyAdvanceWait(this);
    this.cpu = new GameBoyAdvanceCPU(this);
    //Now initialize each component:
    this.memory.initialize();
    this.dma.initialize();
    this.dmaChannel0.initialize();
    this.dmaChannel1.initialize();
    this.dmaChannel2.initialize();
    this.dmaChannel3.initialize();
    this.gfxState.initialize();
    this.gfxRenderer.initialize();
    this.sound.initialize();
    this.timer.initialize();
    this.irq.initialize();
    this.serial.initialize();
    this.joypad.initialize();
    this.cartridge.initialize();
    this.saves.initialize();
    this.wait.initialize();
    this.cpu.initialize();
}
GameBoyAdvanceIO.prototype.assignInstructionCoreReferences = function (ARM, THUMB) {
    //Passed here once the CPU component is initialized:
    this.ARM = ARM;
    this.THUMB = THUMB;
}
GameBoyAdvanceIO.prototype.enter = function (CPUCyclesTotal) {
    //Find out how many clocks to iterate through this run:
    this.cyclesToIterate = ((CPUCyclesTotal | 0) + (this.cyclesOveriteratedPreviously | 0)) | 0;
    //An extra check to make sure we don't do stuff if we did too much last run:
    if ((this.cyclesToIterate | 0) > 0) {
        //Update our core event prediction:
        this.updateCoreEventTime();
        //If clocks remaining, run iterator:
        this.run();
        //Spill our core event clocking:
        this.updateCoreClocking();
        //Ensure audio buffers at least once per iteration:
        this.sound.audioJIT();
    }
    //If we clocked just a little too much, subtract the extra from the next run:
    this.cyclesOveriteratedPreviously = this.cyclesToIterate | 0;
}
GameBoyAdvanceIO.prototype.run = function () {
    //Clock through the state machine:
    while (true) {
        //Dispatch to optimized run loops:
        switch (this.systemStatus & 0x84) {
            case 0:
                //ARM instruction set:
                this.runARM();
                break;
            case 0x4:
                //THUMB instruction set:
                this.runTHUMB();
                break;
            default:
                //End of stepping:
                this.deflagIterationEnd();
                return;
        }
    }
}
GameBoyAdvanceIO.prototype.runARM = function () {
    //Clock through the state machine:
    while (true) {
        //Handle the current system state selected:
        switch (this.systemStatus | 0) {
            case 0: //CPU Handle State (Normal ARM)
                this.ARM.executeIteration();
                break;
            case 1:
            case 2: //CPU Handle State (Bubble ARM)
                this.ARM.executeBubble();
                this.tickBubble();
                break;
            default: //Handle lesser called / End of stepping
                //Dispatch on IRQ/DMA/HALT/STOP/END bit flags
                switch (this.systemStatus >> 2) {
                    case 0x2:
                        //IRQ Handle State:
                        this.handleIRQARM();
                        break;
                    case 0x4:
                    case 0x6:
                        //DMA Handle State
                    case 0xC:
                    case 0xE:
                        //DMA Inside Halt State
                        this.handleDMA();
                        break;
                    case 0x8:
                    case 0xA:
                        //Handle Halt State
                        this.handleHalt();
                        break;
                    default: //Handle Stop State
                        //THUMB flagged stuff falls to here intentionally:
                        //End of Stepping and/or CPU run loop switch:
                        if ((this.systemStatus & 0x84) != 0) {
                            return;
                        }
                        this.handleStop();
                }
        }
    }
}
GameBoyAdvanceIO.prototype.runTHUMB = function () {
    //Clock through the state machine:
    while (true) {
        //Handle the current system state selected:
        switch (this.systemStatus | 0) {
            case 4: //CPU Handle State (Normal THUMB)
                this.THUMB.executeIteration();
                break;
            case 5:
            case 6: //CPU Handle State (Bubble THUMB)
                this.THUMB.executeBubble();
                this.tickBubble();
                break;
            default: //Handle lesser called / End of stepping
                //Dispatch on IRQ/DMA/HALT/STOP/END bit flags
                switch (this.systemStatus >> 2) {
                    case 0x3:
                        //IRQ Handle State:
                        this.handleIRQThumb();
                        break;
                    case 0x5:
                    case 0x7:
                        //DMA Handle State
                    case 0xD:
                    case 0xF:
                        //DMA Inside Halt State
                        this.handleDMA();
                        break;
                    case 0x9:
                    case 0x11:
                        //Handle Halt State
                        this.handleHalt();
                        break;
                    default: //Handle Stop State
                        //ARM flagged stuff falls to here intentionally:
                        //End of Stepping and/or CPU run loop switch:
                        if ((this.systemStatus & 0x84) != 0x4) {
                            return;
                        }
                        this.handleStop();
                }
        }
    }
}
GameBoyAdvanceIO.prototype.updateCore = function (clocks) {
    clocks = clocks | 0;
    //This is used during normal/dma modes of operation:
    this.accumulatedClocks = ((this.accumulatedClocks | 0) + (clocks | 0)) | 0;
    if ((this.accumulatedClocks | 0) >= (this.nextEventClocks | 0)) {
        this.updateCoreSpill();
    }
}
GameBoyAdvanceIO.prototype.updateCoreForce = function (clocks) {
    clocks = clocks | 0;
    //This is used during halt mode of operation:
    this.accumulatedClocks = ((this.accumulatedClocks | 0) + (clocks | 0)) | 0;
    this.updateCoreSpill();
}
GameBoyAdvanceIO.prototype.updateCoreNegative = function (clocks) {
    clocks = clocks | 0;
    //This is used during normal/dma modes of operation:
    this.accumulatedClocks = ((this.accumulatedClocks | 0) - (clocks | 0)) | 0;
    if ((this.accumulatedClocks | 0) >= (this.nextEventClocks | 0)) {
        this.updateCoreSpill();
    }
}
GameBoyAdvanceIO.prototype.updateCoreSingle = function () {
    //This is used during normal/dma modes of operation:
    this.accumulatedClocks = ((this.accumulatedClocks | 0) + 1) | 0;
    if ((this.accumulatedClocks | 0) >= (this.nextEventClocks | 0)) {
        this.updateCoreSpill();
    }
}
GameBoyAdvanceIO.prototype.updateCoreSpill = function () {
    //Invalidate & recompute new event times:
    this.updateCoreClocking();
    this.updateCoreEventTime();
}
GameBoyAdvanceIO.prototype.updateCoreSpillRetain = function () {
    //Keep the last prediction, just decrement it out, as it's still valid:
    this.nextEventClocks = ((this.nextEventClocks | 0) - (this.accumulatedClocks | 0)) | 0;
    this.updateCoreClocking();
}
GameBoyAdvanceIO.prototype.updateCoreClocking = function () {
    var clocks = this.accumulatedClocks | 0;
    //Decrement the clocks per iteration counter:
    this.cyclesToIterate = ((this.cyclesToIterate | 0) - (clocks | 0)) | 0;
    //Clock all components:
    this.gfxState.addClocks(((clocks | 0) - (this.graphicsClocks | 0)) | 0);
    this.timer.addClocks(((clocks | 0) - (this.timerClocks | 0)) | 0);
    this.serial.addClocks(((clocks | 0) - (this.serialClocks | 0)) | 0);
    this.accumulatedClocks = 0;
    this.graphicsClocks = 0;
    this.timerClocks = 0;
    this.serialClocks = 0;
}
GameBoyAdvanceIO.prototype.updateGraphicsClocking = function () {
    //Clock gfx component:
    this.gfxState.addClocks(((this.accumulatedClocks | 0) - (this.graphicsClocks | 0)) | 0);
    this.graphicsClocks = this.accumulatedClocks | 0;
}
GameBoyAdvanceIO.prototype.updateTimerClocking = function () {
    //Clock timer component:
    this.timer.addClocks(((this.accumulatedClocks | 0) - (this.timerClocks | 0)) | 0);
    this.timerClocks = this.accumulatedClocks | 0;
}
GameBoyAdvanceIO.prototype.updateSerialClocking = function () {
    //Clock serial component:
    this.serial.addClocks(((this.accumulatedClocks | 0) - (this.serialClocks | 0)) | 0);
    this.serialClocks = this.accumulatedClocks | 0;
}
GameBoyAdvanceIO.prototype.updateCoreEventTime = function () {
    //Predict how many clocks until the next DMA or IRQ event:
    this.nextEventClocks = this.cyclesUntilNextEvent() | 0;
}
GameBoyAdvanceIO.prototype.getRemainingCycles = function () {
    //Return the number of cycles left until iteration end:
    if ((this.cyclesToIterate | 0) < 1) {
        //Change our stepper to our end sequence:
        this.flagIterationEnd();
        return 0;
    }
    return this.cyclesToIterate | 0;
}
GameBoyAdvanceIO.prototype.handleIRQARM = function () {
    if ((this.systemStatus | 0) > 0x8) {
        //CPU Handle State (Bubble ARM)
        this.ARM.executeBubble();
        this.tickBubble();
    }
    else {
        //CPU Handle State (IRQ)
        this.cpu.IRQinARM();
    }
}
GameBoyAdvanceIO.prototype.handleIRQThumb = function () {
    if ((this.systemStatus | 0) > 0xC) {
        //CPU Handle State (Bubble THUMB)
        this.THUMB.executeBubble();
        this.tickBubble();
    }
    else {
        //CPU Handle State (IRQ)
        this.cpu.IRQinTHUMB();
    }
}
GameBoyAdvanceIO.prototype.handleDMA = function () {
    /*
     Loop our state status in here as
     an optimized iteration, as DMA stepping instances
     happen in quick succession of each other, and
     aren't often done for one memory word only.
     */
    do {
        //Perform a DMA read and write:
        this.dma.perform();
    } while ((this.systemStatus & 0x90) == 0x10);
}
GameBoyAdvanceIO.prototype.handleHalt = function () {
    if ((this.irq.IRQMatch() | 0) == 0) {
        //Clock up to next IRQ match or DMA:
        this.updateCoreForce(this.cyclesUntilNextHALTEvent() | 0);
    }
    else {
        //Exit HALT promptly:
        this.deflagHalt();
    }
}
GameBoyAdvanceIO.prototype.handleStop = function () {
    //Update sound system to add silence to buffer:
    this.sound.addClocks(this.getRemainingCycles() | 0);
    this.cyclesToIterate = 0;
    //Exits when user presses joypad or from an external irq outside of GBA internal.
}
GameBoyAdvanceIO.prototype.cyclesUntilNextHALTEvent = function () {
    //Find the clocks to the next HALT leave or DMA event:
    var haltClocks = this.irq.nextEventTime() | 0;
    var dmaClocks = this.dma.nextEventTime() | 0;
    return this.solveClosestTime(haltClocks | 0, dmaClocks | 0) | 0;
}
GameBoyAdvanceIO.prototype.cyclesUntilNextEvent = function () {
    //Find the clocks to the next IRQ or DMA event:
    var irqClocks = this.irq.nextIRQEventTime() | 0;
    var dmaClocks = this.dma.nextEventTime() | 0;
    return this.solveClosestTime(irqClocks | 0, dmaClocks | 0) | 0;
}
GameBoyAdvanceIO.prototype.solveClosestTime = function (clocks1, clocks2) {
    clocks1 = clocks1 | 0;
    clocks2 = clocks2 | 0;
    //Find the clocks closest to the next event:
    var clocks = this.getRemainingCycles() | 0;
    clocks = Math.min(clocks | 0, clocks1 | 0, clocks2 | 0);
    return clocks | 0;
}
GameBoyAdvanceIO.prototype.flagBubble = function () {
    //Flag a CPU pipeline bubble to step through:
    this.systemStatus = this.systemStatus | 0x2;
}
GameBoyAdvanceIO.prototype.tickBubble = function () {
    //Tick down a CPU pipeline bubble to step through:
    this.systemStatus = ((this.systemStatus | 0) - 1) | 0;
}
GameBoyAdvanceIO.prototype.flagTHUMB = function () {
    //Flag a CPU IRQ to step through:
    this.systemStatus = this.systemStatus | 0x4;
}
GameBoyAdvanceIO.prototype.deflagTHUMB = function () {
    //Deflag a CPU IRQ to step through:
    this.systemStatus = this.systemStatus & 0xFB;
}
GameBoyAdvanceIO.prototype.flagIRQ = function () {
    //Flag THUMB CPU mode to step through:
    this.systemStatus = this.systemStatus | 0x8;
}
GameBoyAdvanceIO.prototype.deflagIRQ = function () {
    //Deflag THUMB CPU mode to step through:
    this.systemStatus = this.systemStatus & 0xF7;
}
GameBoyAdvanceIO.prototype.flagDMA = function () {
    //Flag a DMA event to step through:
    this.systemStatus = this.systemStatus | 0x10;
}
GameBoyAdvanceIO.prototype.deflagDMA = function () {
    //Deflag a DMA event to step through:
    this.systemStatus = this.systemStatus & 0xEF;
}
GameBoyAdvanceIO.prototype.flagHalt = function () {
    //Flag a halt event to step through:
    this.systemStatus = this.systemStatus | 0x20;
}
GameBoyAdvanceIO.prototype.deflagHalt = function () {
    //Deflag a halt event to step through:
    this.systemStatus = this.systemStatus & 0xDF;
}
GameBoyAdvanceIO.prototype.flagStop = function () {
    //Flag a halt event to step through:
    this.systemStatus = this.systemStatus | 0x40;
}
GameBoyAdvanceIO.prototype.deflagStop = function () {
    //Deflag a halt event to step through:
    this.systemStatus = this.systemStatus & 0xBF;
}
GameBoyAdvanceIO.prototype.flagIterationEnd = function () {
    //Flag a run loop kill event to step through:
    this.systemStatus = this.systemStatus | 0x80;
}
GameBoyAdvanceIO.prototype.deflagIterationEnd = function () {
    //Deflag a run loop kill event to step through:
    this.systemStatus = this.systemStatus & 0x7F;
}
GameBoyAdvanceIO.prototype.isStopped = function () {
    //Sound system uses this to emulate a unpowered audio output:
    return ((this.systemStatus & 0x40) != 0);
}
GameBoyAdvanceIO.prototype.inDMA = function () {
    //Save system uses this to detect dma:
    return ((this.systemStatus & 0x10) != 0);
}
GameBoyAdvanceIO.prototype.getCurrentFetchValue = function () {
    //Last valid value output for bad reads:
    var fetch = 0;
    if ((this.systemStatus & 0x10) == 0) {
        fetch = this.cpu.getCurrentFetchValue() | 0;
    }
    else {
        fetch = this.dma.getCurrentFetchValue() | 0;
    }
    return fetch | 0;
}
