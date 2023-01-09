"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceTimer(IOCore) {
    //Build references:
    this.IOCore = IOCore;
}
GameBoyAdvanceTimer.prototype.prescalarLookup = [
    0,
    0x6,
    0x8,
    0xA
];
GameBoyAdvanceTimer.prototype.initialize = function () {
    this.timer0Counter = 0;
    this.timer0Reload = 0;
    this.timer0Control = 0;
    this.timer0Enabled = false;
    this.timer0IRQ = false;
    this.timer0Precounter = 0;
    this.timer0Prescalar = 1;
    this.timer0PrescalarShifted = 0;
    this.timer1Counter = 0;
    this.timer1Reload = 0;
    this.timer1Control = 0;
    this.timer1Enabled = false;
    this.timer1IRQ = false;
    this.timer1Precounter = 0;
    this.timer1Prescalar = 1;
    this.timer1PrescalarShifted = 0;
    this.timer1CountUp = false;
    this.timer2Counter = 0;
    this.timer2Reload = 0;
    this.timer2Control = 0;
    this.timer2Enabled = false;
    this.timer2IRQ = false;
    this.timer2Precounter = 0;
    this.timer2Prescalar = 1;
    this.timer2PrescalarShifted = 0;
    this.timer2CountUp = false;
    this.timer3Counter = 0;
    this.timer3Reload = 0;
    this.timer3Control = 0;
    this.timer3Enabled = false;
    this.timer3IRQ = false;
    this.timer3Precounter = 0;
    this.timer3Prescalar = 1;
    this.timer3PrescalarShifted = 0;
    this.timer3CountUp = false;
    this.timer1UseMainClocks = false;
    this.timer1UseChainedClocks = false;
    this.timer2UseMainClocks = false;
    this.timer2UseChainedClocks = false;
    this.timer3UseMainClocks = false;
    this.timer3UseChainedClocks = false;
}
GameBoyAdvanceTimer.prototype.addClocks = function (clocks) {
    clocks = clocks | 0;
    //See if timer channels 0 and 1 are enabled:
    this.clockSoundTimers(clocks | 0);
    //See if timer channel 2 is enabled:
    this.clockTimer2(clocks | 0);
    //See if timer channel 3 is enabled:
    this.clockTimer3(clocks | 0);
}
GameBoyAdvanceTimer.prototype.clockSoundTimers = function (audioClocks) {
    audioClocks = audioClocks | 0;
    for (var predictedClocks = 0, overflowClocks = 0; (audioClocks | 0) > 0; audioClocks = ((audioClocks | 0) - (predictedClocks | 0)) | 0) {
        overflowClocks = this.nextAudioTimerOverflow() | 0;
        predictedClocks = Math.min(audioClocks | 0, overflowClocks | 0) | 0;
        //See if timer channel 0 is enabled:
        this.clockTimer0(predictedClocks | 0);
        //See if timer channel 1 is enabled:
        this.clockTimer1(predictedClocks | 0);
        //Clock audio system up to latest timer:
        this.IOCore.sound.addClocks(predictedClocks | 0);
        //Only jit if overflow was seen:
        if ((overflowClocks | 0) == (predictedClocks | 0)) {
            this.IOCore.sound.audioJIT();
        }
    }
}
GameBoyAdvanceTimer.prototype.clockTimer0 = function (clocks) {
    clocks = clocks | 0;
    if (this.timer0Enabled) {
        this.timer0Precounter = ((this.timer0Precounter | 0) + (clocks | 0)) | 0;
        while ((this.timer0Precounter | 0) >= (this.timer0Prescalar | 0)) {
            var iterations = Math.min(this.timer0Precounter >> (this.timer0PrescalarShifted | 0), (0x10000 - (this.timer0Counter | 0)) | 0) | 0;
            this.timer0Precounter = ((this.timer0Precounter | 0) - ((iterations | 0) << (this.timer0PrescalarShifted | 0))) | 0;
            this.timer0Counter = ((this.timer0Counter | 0) + (iterations | 0)) | 0;
            if ((this.timer0Counter | 0) > 0xFFFF) {
                this.timer0Counter = this.timer0Reload | 0;
                this.timer0ExternalTriggerCheck();
                this.timer1ClockUpTickCheck();
            }
        }
    }
}
GameBoyAdvanceTimer.prototype.clockTimer1 = function (clocks) {
    clocks = clocks | 0;
    if (this.timer1UseMainClocks) {
        this.timer1Precounter = ((this.timer1Precounter | 0) + (clocks | 0)) | 0;
        while ((this.timer1Precounter | 0) >= (this.timer1Prescalar | 0)) {
            var iterations = Math.min(this.timer1Precounter >> (this.timer1PrescalarShifted | 0), (0x10000 - (this.timer1Counter | 0)) | 0) | 0;
            this.timer1Precounter = ((this.timer1Precounter | 0) - ((iterations | 0) << (this.timer1PrescalarShifted | 0))) | 0;
            this.timer1Counter = ((this.timer1Counter | 0) + (iterations | 0)) | 0;
            if ((this.timer1Counter | 0) > 0xFFFF) {
                this.timer1Counter = this.timer1Reload | 0;
                this.timer1ExternalTriggerCheck();
                this.timer2ClockUpTickCheck();
            }
        }
    }
}
GameBoyAdvanceTimer.prototype.clockTimer2 = function (clocks) {
    clocks = clocks | 0;
    if (this.timer2UseMainClocks) {
        this.timer2Precounter = ((this.timer2Precounter | 0) + (clocks | 0)) | 0;
        while ((this.timer2Precounter | 0) >= (this.timer2Prescalar | 0)) {
            var iterations = Math.min(this.timer2Precounter >> (this.timer2PrescalarShifted | 0), (0x10000 - (this.timer2Counter | 0)) | 0) | 0;
            this.timer2Precounter = ((this.timer2Precounter | 0) - ((iterations | 0) << (this.timer2PrescalarShifted | 0))) | 0;
            this.timer2Counter = ((this.timer2Counter | 0) + (iterations | 0)) | 0;
            if ((this.timer2Counter | 0) > 0xFFFF) {
                this.timer2Counter = this.timer2Reload | 0;
                this.timer2ExternalTriggerCheck();
                this.timer3ClockUpTickCheck();
            }
        }
    }
}
GameBoyAdvanceTimer.prototype.clockTimer3 = function (clocks) {
    clocks = clocks | 0;
    if (this.timer3UseMainClocks) {
        this.timer3Precounter = ((this.timer3Precounter | 0) + (clocks | 0)) | 0;
        while ((this.timer3Precounter | 0) >= (this.timer3Prescalar | 0)) {
            var iterations = Math.min(this.timer3Precounter >> (this.timer3PrescalarShifted | 0), (0x10000 - (this.timer3Counter | 0)) | 0) | 0;
            this.timer3Precounter = ((this.timer3Precounter | 0) - ((iterations | 0) << (this.timer3PrescalarShifted | 0))) | 0;
            this.timer3Counter = ((this.timer3Counter | 0) + (iterations | 0)) | 0;
            if ((this.timer3Counter | 0) > 0xFFFF) {
                this.timer3Counter = this.timer3Reload | 0;
                this.timer3ExternalTriggerCheck();
            }
        }
    }
}
GameBoyAdvanceTimer.prototype.timer1ClockUpTickCheck = function () {
    if (this.timer1UseChainedClocks) {
        this.timer1Counter = ((this.timer1Counter | 0) + 1) | 0;
        if ((this.timer1Counter | 0) > 0xFFFF) {
            this.timer1Counter = this.timer1Reload | 0;
            this.timer1ExternalTriggerCheck();
            this.timer2ClockUpTickCheck();
        }
    }
}
GameBoyAdvanceTimer.prototype.timer2ClockUpTickCheck = function () {
    if (this.timer2UseChainedClocks) {
        this.timer2Counter = ((this.timer2Counter | 0) + 1) | 0;
        if ((this.timer2Counter | 0) > 0xFFFF) {
            this.timer2Counter = this.timer2Reload | 0;
            this.timer2ExternalTriggerCheck();
            this.timer3ClockUpTickCheck();
        }
    }
}
GameBoyAdvanceTimer.prototype.timer3ClockUpTickCheck = function () {
    if (this.timer3UseChainedClocks) {
        this.timer3Counter = ((this.timer3Counter | 0) + 1) | 0;
        if ((this.timer3Counter | 0) > 0xFFFF) {
            this.timer3Counter = this.timer3Reload | 0;
            this.timer3ExternalTriggerCheck();
        }
    }
}
GameBoyAdvanceTimer.prototype.timer0ExternalTriggerCheck = function () {
    if (this.timer0IRQ) {
        this.IOCore.irq.requestIRQ(0x08);
    }
    this.IOCore.sound.AGBDirectSoundTimer0ClockTick();
}
GameBoyAdvanceTimer.prototype.timer1ExternalTriggerCheck = function () {
    if (this.timer1IRQ) {
        this.IOCore.irq.requestIRQ(0x10);
    }
    this.IOCore.sound.AGBDirectSoundTimer1ClockTick();
}
GameBoyAdvanceTimer.prototype.timer2ExternalTriggerCheck = function () {
    if (this.timer2IRQ) {
        this.IOCore.irq.requestIRQ(0x20);
    }
}
GameBoyAdvanceTimer.prototype.timer3ExternalTriggerCheck = function () {
    if (this.timer3IRQ) {
        this.IOCore.irq.requestIRQ(0x40);
    }
}
GameBoyAdvanceTimer.prototype.writeTM0CNT8_0 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer0Reload = this.timer0Reload & 0xFF00;
    data = data & 0xFF;
    this.timer0Reload = this.timer0Reload | data;
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM0CNT8_1 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer0Reload = this.timer0Reload & 0xFF;
    data = data & 0xFF;
    this.timer0Reload = this.timer0Reload | (data << 8);
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM0CNT8_2 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer0Control = data & 0xFF;
    if ((data & 0x80) != 0) {
        if (!this.timer0Enabled) {
            this.timer0Counter = this.timer0Reload | 0;
            this.timer0Enabled = true;
            this.timer0Precounter = 0;
        }
    }
    else {
        this.timer0Enabled = false;
    }
    this.timer0IRQ = ((data & 0x40) != 0);
    this.timer0PrescalarShifted = this.prescalarLookup[data & 0x03] | 0;
    this.timer0Prescalar = 1 << (this.timer0PrescalarShifted | 0);
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM0CNT16 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer0Reload = data & 0xFFFF;
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM0CNT32 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer0Reload = data & 0xFFFF;
    this.timer0Control = data >> 16;
    if ((data & 0x800000) != 0) {
        if (!this.timer0Enabled) {
            this.timer0Counter = this.timer0Reload | 0;
            this.timer0Enabled = true;
            this.timer0Precounter = 0;
        }
    }
    else {
        this.timer0Enabled = false;
    }
    this.timer0IRQ = ((data & 0x400000) != 0);
    this.timer0PrescalarShifted = this.prescalarLookup[(data >> 16) & 0x03] | 0;
    this.timer0Prescalar = 1 << (this.timer0PrescalarShifted | 0);
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.readTM0CNT8_0 = function () {
    this.IOCore.updateTimerClocking();
    return this.timer0Counter & 0xFF;
}
GameBoyAdvanceTimer.prototype.readTM0CNT8_1 = function () {
    this.IOCore.updateTimerClocking();
    return (this.timer0Counter & 0xFF00) >> 8;
}
GameBoyAdvanceTimer.prototype.readTM0CNT8_2 = function () {
    return this.timer0Control & 0xFF;
}
GameBoyAdvanceTimer.prototype.readTM0CNT16 = function () {
    this.IOCore.updateTimerClocking();
    return this.timer0Counter | 0;
}
GameBoyAdvanceTimer.prototype.readTM0CNT32 = function () {
    this.IOCore.updateTimerClocking();
    var data = (this.timer0Control & 0xFF) << 16;
    data = data | this.timer0Counter;
    return data | 0;
}
GameBoyAdvanceTimer.prototype.writeTM1CNT8_0 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer1Reload = this.timer1Reload & 0xFF00;
    data = data & 0xFF;
    this.timer1Reload = this.timer1Reload | data;
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM1CNT8_1 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer1Reload = this.timer1Reload & 0xFF;
    data = data & 0xFF;
    this.timer1Reload = this.timer1Reload | (data << 8);
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM1CNT8_2 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer1Control = data & 0xFF;
    if ((data & 0x80) != 0) {
        if (!this.timer1Enabled) {
            this.timer1Counter = this.timer1Reload | 0;
            this.timer1Enabled = true;
            this.timer1Precounter = 0;
        }
    }
    else {
        this.timer1Enabled = false;
    }
    this.timer1IRQ = ((data & 0x40) != 0);
    this.timer1CountUp = ((data & 0x4) != 0);
    this.timer1PrescalarShifted = this.prescalarLookup[data & 0x03] | 0;
    this.timer1Prescalar = 1 << (this.timer1PrescalarShifted | 0);
    this.preprocessTimer1();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM1CNT16 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer1Reload = data & 0xFFFF;
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM1CNT32 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.IOCore.sound.audioJIT();
    this.timer1Reload = data & 0xFFFF;
    this.timer1Control = data >> 16;
    if ((data & 0x800000) != 0) {
        if (!this.timer1Enabled) {
            this.timer1Counter = this.timer1Reload | 0;
            this.timer1Enabled = true;
            this.timer1Precounter = 0;
        }
    }
    else {
        this.timer1Enabled = false;
    }
    this.timer1IRQ = ((data & 0x400000) != 0);
    this.timer1CountUp = ((data & 0x40000) != 0);
    this.timer1PrescalarShifted = this.prescalarLookup[(data >> 16) & 0x03] | 0;
    this.timer1Prescalar = 1 << (this.timer1PrescalarShifted | 0);
    this.preprocessTimer1();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.readTM1CNT8_0 = function () {
    this.IOCore.updateTimerClocking();
    return this.timer1Counter & 0xFF;
}
GameBoyAdvanceTimer.prototype.readTM1CNT8_1 = function () {
    this.IOCore.updateTimerClocking();
    return (this.timer1Counter & 0xFF00) >> 8;
}
GameBoyAdvanceTimer.prototype.readTM1CNT8_2 = function () {
    return this.timer1Control & 0xFF;
}
GameBoyAdvanceTimer.prototype.readTM1CNT16 = function () {
    this.IOCore.updateTimerClocking();
    return this.timer1Counter | 0;
}
GameBoyAdvanceTimer.prototype.readTM1CNT32 = function () {
    this.IOCore.updateTimerClocking();
    var data = (this.timer1Control & 0xFF) << 16;
    data = data | this.timer1Counter;
    return data | 0;
}
GameBoyAdvanceTimer.prototype.writeTM2CNT8_0 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer2Reload = this.timer2Reload & 0xFF00;
    data = data & 0xFF;
    this.timer2Reload = this.timer2Reload | data;
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM2CNT8_1 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer2Reload = this.timer2Reload & 0xFF;
    data = data & 0xFF;
    this.timer2Reload = this.timer2Reload | (data << 8);
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM2CNT8_2 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer2Control = data & 0xFF;
    if ((data & 0x80) != 0) {
        if (!this.timer2Enabled) {
            this.timer2Counter = this.timer2Reload | 0;
            this.timer2Enabled = true;
            this.timer2Precounter = 0;
        }
    }
    else {
        this.timer2Enabled = false;
    }
    this.timer2IRQ = ((data & 0x40) != 0);
    this.timer2CountUp = ((data & 0x4) != 0);
    this.timer2PrescalarShifted = this.prescalarLookup[data & 0x03] | 0;
    this.timer2Prescalar = 1 << (this.timer2PrescalarShifted | 0);
    this.preprocessTimer2();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM2CNT16 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer2Reload = data & 0xFFFF;
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM2CNT32 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer2Reload = data & 0xFFFF;
    this.timer2Control = data >> 16;
    if ((data & 0x800000) != 0) {
        if (!this.timer2Enabled) {
            this.timer2Counter = this.timer2Reload | 0;
            this.timer2Enabled = true;
            this.timer2Precounter = 0;
        }
    }
    else {
        this.timer2Enabled = false;
    }
    this.timer2IRQ = ((data & 0x400000) != 0);
    this.timer2CountUp = ((data & 0x40000) != 0);
    this.timer2PrescalarShifted = this.prescalarLookup[(data >> 16) & 0x03] | 0;
    this.timer2Prescalar = 1 << (this.timer2PrescalarShifted | 0);
    this.preprocessTimer2();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.readTM2CNT8_0 = function () {
    this.IOCore.updateTimerClocking();
    return this.timer2Counter & 0xFF;
}
GameBoyAdvanceTimer.prototype.readTM2CNT8_1 = function () {
    this.IOCore.updateTimerClocking();
    return (this.timer2Counter & 0xFF00) >> 8;
}
GameBoyAdvanceTimer.prototype.readTM2CNT8_2 = function () {
    return this.timer2Control & 0xFF;
}
GameBoyAdvanceTimer.prototype.readTM2CNT16 = function () {
    this.IOCore.updateTimerClocking();
    return this.timer2Counter | 0;
}
GameBoyAdvanceTimer.prototype.readTM2CNT32 = function () {
    this.IOCore.updateTimerClocking();
    var data = (this.timer2Control & 0xFF) << 16;
    data = data | this.timer2Counter;
    return data | 0;
}
GameBoyAdvanceTimer.prototype.writeTM3CNT8_0 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer3Reload = this.timer3Reload & 0xFF00;
    data = data & 0xFF;
    this.timer3Reload = this.timer3Reload | data;
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM3CNT8_1 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer3Reload = this.timer3Reload & 0xFF;
    data = data & 0xFF;
    this.timer3Reload = this.timer3Reload | (data << 8);
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM3CNT8_2 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer3Control = data & 0xFF;
    if ((data & 0x80) != 0) {
        if (!this.timer3Enabled) {
            this.timer3Counter = this.timer3Reload | 0;
            this.timer3Enabled = true;
            this.timer3Precounter = 0;
        }
    }
    else {
        this.timer3Enabled = false;
    }
    this.timer3IRQ = ((data & 0x40) != 0);
    this.timer3CountUp = ((data & 0x4) != 0);
    this.timer3PrescalarShifted = this.prescalarLookup[data & 0x03] | 0;
    this.timer3Prescalar = 1 << (this.timer3PrescalarShifted | 0);
    this.preprocessTimer3();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM3CNT16 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer3Reload = data & 0xFFFF;
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.writeTM3CNT32 = function (data) {
    data = data | 0;
    this.IOCore.updateTimerClocking();
    this.timer3Reload = data & 0xFFFF;
    this.timer3Control = data >> 16;
    if ((data & 0x800000) != 0) {
        if (!this.timer3Enabled) {
            this.timer3Counter = this.timer3Reload | 0;
            this.timer3Enabled = true;
            this.timer3Precounter = 0;
        }
    }
    else {
        this.timer3Enabled = false;
    }
    this.timer3IRQ = ((data & 0x400000) != 0);
    this.timer3CountUp = ((data & 0x40000) != 0);
    this.timer3PrescalarShifted = this.prescalarLookup[(data >> 16) & 0x03] | 0;
    this.timer3Prescalar = 1 << (this.timer3PrescalarShifted | 0);
    this.preprocessTimer3();
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceTimer.prototype.readTM3CNT8_0 = function () {
    this.IOCore.updateTimerClocking();
    return this.timer3Counter & 0xFF;
}
GameBoyAdvanceTimer.prototype.readTM3CNT8_1 = function () {
    this.IOCore.updateTimerClocking();
    return (this.timer3Counter & 0xFF00) >> 8;
}
GameBoyAdvanceTimer.prototype.readTM3CNT8_2 = function () {
    return this.timer3Control & 0xFF;
}
GameBoyAdvanceTimer.prototype.readTM3CNT16 = function () {
    this.IOCore.updateTimerClocking();
    return this.timer3Counter | 0;
}
GameBoyAdvanceTimer.prototype.readTM3CNT32 = function () {
    this.IOCore.updateTimerClocking();
    var data = (this.timer3Control & 0xFF) << 16;
    data = data | this.timer3Counter;
    return data | 0;
}
GameBoyAdvanceTimer.prototype.preprocessTimer1 = function () {
    this.timer1UseMainClocks = (this.timer1Enabled && !this.timer1CountUp);
    this.timer1UseChainedClocks = (this.timer1Enabled && this.timer1CountUp);
}
GameBoyAdvanceTimer.prototype.preprocessTimer2 = function () {
    this.timer2UseMainClocks = (this.timer2Enabled && !this.timer2CountUp);
    this.timer2UseChainedClocks = (this.timer2Enabled && this.timer2CountUp);
}
GameBoyAdvanceTimer.prototype.preprocessTimer3 = function () {
    this.timer3UseMainClocks = (this.timer3Enabled && !this.timer3CountUp);
    this.timer3UseChainedClocks = (this.timer3Enabled && this.timer3CountUp);
}
if (typeof Math.imul == "function") {
    //Math.imul found, insert the optimized path in:
    GameBoyAdvanceTimer.prototype.nextTimer0OverflowBase = function () {
        var countUntilReload = (0x10000 - (this.timer0Counter | 0)) | 0;
        countUntilReload = Math.imul(countUntilReload | 0, this.timer0Prescalar | 0) | 0;
        countUntilReload = ((countUntilReload | 0) - (this.timer0Precounter | 0)) | 0;
        return countUntilReload | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer0OverflowSingle = function () {
        var eventTime = 0x7FFFFFFF;
        if (this.timer0Enabled) {
            eventTime = this.nextTimer0OverflowBase() | 0;
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer0Overflow = function (numOverflows) {
        numOverflows = numOverflows | 0;
        var eventTime = 0x7FFFFFFF;
        if (this.timer0Enabled) {
            numOverflows = ((numOverflows | 0) - 1) | 0;
            var countUntilReload = this.nextTimer0OverflowBase() | 0;
            var reloadClocks = (0x10000 - (this.timer0Reload | 0)) | 0;
            reloadClocks = Math.imul(reloadClocks | 0, this.timer0Prescalar | 0) | 0;
            reloadClocks = (reloadClocks | 0) * (numOverflows | 0);
            eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer1OverflowBase = function () {
        var countUntilReload = (0x10000 - (this.timer1Counter | 0)) | 0;
        countUntilReload = Math.imul(countUntilReload | 0, this.timer1Prescalar | 0) | 0;
        countUntilReload = ((countUntilReload | 0) - (this.timer1Precounter | 0)) | 0;
        return countUntilReload | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer1Overflow = function (numOverflows) {
        numOverflows = numOverflows | 0;
        var eventTime = 0x7FFFFFFF;
        if (this.timer1Enabled) {
            var reloadClocks = (0x10000 - (this.timer1Reload | 0)) | 0;
            if (this.timer1CountUp) {
                var countUntilReload = (0x10000 - (this.timer1Counter | 0)) | 0;
                reloadClocks = (reloadClocks | 0) * (numOverflows | 0);
                eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
                eventTime = this.nextTimer0Overflow(eventTime | 0) | 0;
            }
            else {
                numOverflows = ((numOverflows | 0) - 1) | 0;
                var countUntilReload = this.nextTimer1OverflowBase() | 0;
                reloadClocks = Math.imul(reloadClocks | 0, this.timer1Prescalar | 0) | 0;
                reloadClocks = reloadClocks * numOverflows;
                eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
            }
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer1OverflowSingle = function () {
        var eventTime = 0x7FFFFFFF;
        if (this.timer1Enabled) {
            if (this.timer1CountUp) {
                var countUntilReload = (0x10000 - (this.timer1Counter | 0)) | 0;
                eventTime = this.nextTimer0Overflow(countUntilReload | 0) | 0;
            }
            else {
                eventTime = this.nextTimer1OverflowBase() | 0;
            }
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer2OverflowBase = function () {
        var countUntilReload = (0x10000 - (this.timer2Counter | 0)) | 0;
        countUntilReload = Math.imul(countUntilReload | 0, this.timer2Prescalar | 0) | 0;
        countUntilReload = ((countUntilReload | 0) - (this.timer2Precounter | 0)) | 0;
        return countUntilReload | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer2Overflow = function (numOverflows) {
        numOverflows = numOverflows | 0;
        var eventTime = 0x7FFFFFFF;
        if (this.timer2Enabled) {
            var reloadClocks = (0x10000 - (this.timer2Reload | 0)) | 0;
            if (this.timer2CountUp) {
                var countUntilReload = (0x10000 - (this.timer2Counter | 0)) | 0;
                reloadClocks = (reloadClocks | 0) * (numOverflows | 0);
                eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
                eventTime = this.nextTimer1Overflow(eventTime | 0) | 0;
            }
            else {
                numOverflows = ((numOverflows | 0) - 1) | 0;
                var countUntilReload = this.nextTimer2OverflowBase() | 0;
                reloadClocks = Math.imul(reloadClocks | 0, this.timer2Prescalar | 0) | 0;
                reloadClocks = reloadClocks * numOverflows;
                eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
            }
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer2OverflowSingle = function () {
        var eventTime = 0x7FFFFFFF;
        if (this.timer2Enabled) {
            if (this.timer2CountUp) {
                var countUntilReload = (0x10000 - (this.timer2Counter | 0)) | 0;
                eventTime = this.nextTimer1Overflow(countUntilReload | 0) | 0;
            }
            else {
                eventTime = this.nextTimer2OverflowBase() | 0;
            }
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer3OverflowSingle = function () {
        var eventTime = 0x7FFFFFFF;
        if (this.timer3Enabled) {
            if (this.timer3CountUp) {
                var countUntilReload = (0x10000 - (this.timer3Counter | 0)) | 0;
                eventTime = this.nextTimer2Overflow(countUntilReload | 0) | 0;
            }
            else {
                eventTime = (0x10000 - (this.timer3Counter | 0)) | 0;
                eventTime = Math.imul(eventTime | 0, this.timer3Prescalar | 0) | 0;
                eventTime = ((eventTime | 0) - (this.timer3Precounter | 0)) | 0;
            }
        }
        return eventTime | 0;
    }
}
else {
    //Math.imul not found, use the compatibility method:
    GameBoyAdvanceTimer.prototype.nextTimer0OverflowBase = function () {
        var countUntilReload = (0x10000 - (this.timer0Counter | 0)) | 0;
        countUntilReload = ((countUntilReload | 0) * (this.timer0Prescalar | 0)) | 0;
        countUntilReload = ((countUntilReload | 0) - (this.timer0Precounter | 0)) | 0;
        return countUntilReload | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer0OverflowSingle = function () {
        var eventTime = 0x7FFFFFFF;
        if (this.timer0Enabled) {
            eventTime = this.nextTimer0OverflowBase() | 0;
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer0Overflow = function (numOverflows) {
        numOverflows = numOverflows | 0;
        var eventTime = 0x7FFFFFFF;
        if (this.timer0Enabled) {
            numOverflows = ((numOverflows | 0) - 1) | 0;
            var countUntilReload = this.nextTimer0OverflowBase() | 0;
            var reloadClocks = (0x10000 - (this.timer0Reload | 0)) | 0;
            reloadClocks = ((reloadClocks | 0) * (this.timer0Prescalar | 0)) | 0;
            reloadClocks = (reloadClocks | 0) * (numOverflows | 0);
            eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer1OverflowBase = function () {
        var countUntilReload = (0x10000 - (this.timer1Counter | 0)) | 0;
        countUntilReload = ((countUntilReload | 0) * (this.timer1Prescalar | 0)) | 0;
        countUntilReload = ((countUntilReload | 0) - (this.timer1Precounter | 0)) | 0;
        return countUntilReload | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer1Overflow = function (numOverflows) {
        numOverflows = numOverflows | 0;
        var eventTime = 0x7FFFFFFF;
        if (this.timer1Enabled) {
            var reloadClocks = (0x10000 - (this.timer1Reload | 0)) | 0;
            if (this.timer1CountUp) {
                var countUntilReload = (0x10000 - (this.timer1Counter | 0)) | 0;
                reloadClocks = (reloadClocks | 0) * (numOverflows | 0);
                eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
                eventTime = this.nextTimer0Overflow(eventTime | 0) | 0;
            }
            else {
                numOverflows = ((numOverflows | 0) - 1) | 0;
                var countUntilReload = this.nextTimer1OverflowBase() | 0;
                reloadClocks = ((reloadClocks | 0) * (this.timer1Prescalar | 0)) | 0;
                reloadClocks = reloadClocks * numOverflows;
                eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
            }
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer1OverflowSingle = function () {
        var eventTime = 0x7FFFFFFF;
        if (this.timer1Enabled) {
            if (this.timer1CountUp) {
                var countUntilReload = (0x10000 - (this.timer1Counter | 0)) | 0;
                eventTime = this.nextTimer0Overflow(countUntilReload | 0) | 0;
            }
            else {
                eventTime = this.nextTimer1OverflowBase() | 0;
            }
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer2OverflowBase = function () {
        var countUntilReload = (0x10000 - (this.timer2Counter | 0)) | 0;
        countUntilReload = ((countUntilReload | 0) * (this.timer2Prescalar | 0)) | 0;
        countUntilReload = ((countUntilReload | 0) - (this.timer2Precounter | 0)) | 0;
        return countUntilReload | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer2Overflow = function (numOverflows) {
        numOverflows = numOverflows | 0;
        var eventTime = 0x7FFFFFFF;
        if (this.timer2Enabled) {
            var reloadClocks = (0x10000 - (this.timer2Reload | 0)) | 0;
            if (this.timer2CountUp) {
                var countUntilReload = (0x10000 - (this.timer2Counter | 0)) | 0;
                reloadClocks = (reloadClocks | 0) * (numOverflows | 0);
                eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
                eventTime = this.nextTimer1Overflow(eventTime | 0) | 0;
            }
            else {
                numOverflows = ((numOverflows | 0) - 1) | 0;
                var countUntilReload = this.nextTimer2OverflowBase() | 0;
                reloadClocks = ((reloadClocks | 0) * (this.timer2Prescalar | 0)) | 0;
                reloadClocks = reloadClocks * numOverflows;
                eventTime = Math.min((countUntilReload | 0) + reloadClocks, 0x7FFFFFFF) | 0;
            }
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer2OverflowSingle = function () {
        var eventTime = 0x7FFFFFFF;
        if (this.timer2Enabled) {
            if (this.timer2CountUp) {
                var countUntilReload = (0x10000 - (this.timer2Counter | 0)) | 0;
                eventTime = this.nextTimer1Overflow(countUntilReload | 0) | 0;
            }
            else {
                eventTime = this.nextTimer2OverflowBase() | 0;
            }
        }
        return eventTime | 0;
    }
    GameBoyAdvanceTimer.prototype.nextTimer3OverflowSingle = function () {
        var eventTime = 0x7FFFFFFF;
        if (this.timer3Enabled) {
            if (this.timer3CountUp) {
                var countUntilReload = (0x10000 - (this.timer3Counter | 0)) | 0;
                eventTime = this.nextTimer2Overflow(countUntilReload | 0) | 0;
            }
            else {
                eventTime = (0x10000 - (this.timer3Counter | 0)) | 0;
                eventTime = ((eventTime | 0) * (this.timer3Prescalar | 0)) | 0;
                eventTime = ((eventTime | 0) - (this.timer3Precounter | 0)) | 0;
            }
        }
        return eventTime | 0;
    }
}
GameBoyAdvanceTimer.prototype.nextAudioTimerOverflow = function () {
    var timer0 = this.nextTimer0OverflowSingle() | 0;
    var timer1 = this.nextTimer1OverflowSingle() | 0;
    return Math.min(timer0 | 0, timer1 | 0) | 0;
}
GameBoyAdvanceTimer.prototype.nextTimer0IRQEventTime = function () {
    var clocks = 0x7FFFFFFF;
    if (this.timer0Enabled && this.timer0IRQ) {
        clocks = this.nextTimer0OverflowSingle() | 0;
    }
    return clocks | 0;
}
GameBoyAdvanceTimer.prototype.nextTimer1IRQEventTime = function () {
    var clocks = 0x7FFFFFFF;
    if (this.timer1Enabled && this.timer1IRQ) {
        clocks = this.nextTimer1OverflowSingle() | 0;
    }
    return clocks | 0;
}
GameBoyAdvanceTimer.prototype.nextTimer2IRQEventTime = function () {
    var clocks = 0x7FFFFFFF;
    if (this.timer2Enabled && this.timer2IRQ) {
        clocks = this.nextTimer2OverflowSingle() | 0;
    }
    return clocks | 0;
}
GameBoyAdvanceTimer.prototype.nextTimer3IRQEventTime = function () {
    var clocks = 0x7FFFFFFF;
    if (this.timer3Enabled && this.timer3IRQ) {
        clocks = this.nextTimer3OverflowSingle() | 0;
    }
    return clocks | 0;
}