"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceDMA3(IOCore) {
    this.IOCore = IOCore;
}
GameBoyAdvanceDMA3.prototype.DMA_ENABLE_TYPE = [            //DMA Channel 3 Mapping:
    0x1,
    0x2,
    0x4,
    0x20
];
GameBoyAdvanceDMA3.prototype.initialize = function () {
    this.enabled = 0;
    this.pending = 0;
    this.source = 0;
    this.sourceShadow = 0;
    this.destination = 0;
    this.destinationShadow = 0;
    this.wordCount = 0;
    this.wordCountShadow = 0;
    this.irqFlagging = 0;
    this.dmaType = 0;
    this.is32Bit = 0;
    this.repeat = 0;
    this.sourceControl = 0;
    this.destinationControl = 0;
    this.gamePakDMA = 0;
	this.displaySyncEnableDelay = 0;
    this.DMACore = this.IOCore.dma;
    this.memory = this.IOCore.memory;
    this.gfxState = this.IOCore.gfxState;
    this.irq = this.IOCore.irq;
}
GameBoyAdvanceDMA3.prototype.writeDMASource8_0 = function (data) {
    data = data | 0;
    this.source = this.source & 0xFFFFF00;
    data = data & 0xFF;
    this.source = this.source | data;
}
GameBoyAdvanceDMA3.prototype.writeDMASource8_1 = function (data) {
    data = data | 0;
    this.source = this.source & 0xFFF00FF;
    data = data & 0xFF;
    this.source = this.source | (data << 8);
}
GameBoyAdvanceDMA3.prototype.writeDMASource8_2 = function (data) {
    data = data | 0;
    this.source = this.source & 0xF00FFFF;
    data = data & 0xFF;
    this.source = this.source | (data << 16);
}
GameBoyAdvanceDMA3.prototype.writeDMASource8_3 = function (data) {
    data = data | 0;
    this.source = this.source & 0xFFFFFF;
    data = data & 0xF;
    this.source = this.source | (data << 24);
}
GameBoyAdvanceDMA3.prototype.writeDMASource16_0 = function (data) {
    data = data | 0;
    this.source = this.source & 0xFFF0000;
    data = data & 0xFFFF;
    this.source = this.source | data;
}
GameBoyAdvanceDMA3.prototype.writeDMASource16_1 = function (data) {
    data = data | 0;
    this.source = this.source & 0xFFFF;
    data = data & 0xFFF;
    this.source = this.source | (data << 16);
}
GameBoyAdvanceDMA3.prototype.writeDMASource32 = function (data) {
    data = data | 0;
    this.source = data & 0xFFFFFFF;
}
GameBoyAdvanceDMA3.prototype.writeDMADestination8_0 = function (data) {
    data = data | 0;
    this.destination = this.destination & 0xFFFFF00;
    data = data & 0xFF;
    this.destination = this.destination | data;
}
GameBoyAdvanceDMA3.prototype.writeDMADestination8_1 = function (data) {
    data = data | 0;
    this.destination = this.destination & 0xFFF00FF;
    data = data & 0xFF;
    this.destination = this.destination | (data << 8);
}
GameBoyAdvanceDMA3.prototype.writeDMADestination8_2 = function (data) {
    data = data | 0;
    this.destination = this.destination & 0xF00FFFF;
    data = data & 0xFF;
    this.destination = this.destination | (data << 16);
}
GameBoyAdvanceDMA3.prototype.writeDMADestination8_3 = function (data) {
    data = data | 0;
    this.destination = this.destination & 0xFFFFFF;
    data = data & 0xF;
    this.destination = this.destination | (data << 24);
}
GameBoyAdvanceDMA3.prototype.writeDMADestination16_0 = function (data) {
    data = data | 0;
    this.destination = this.destination & 0xFFF0000;
    data = data & 0xFFFF;
    this.destination = this.destination | data;
}
GameBoyAdvanceDMA3.prototype.writeDMADestination16_1 = function (data) {
    data = data | 0;
    this.destination = this.destination & 0xFFFF;
    data = data & 0xFFF;
    this.destination = this.destination | (data << 16);
}
GameBoyAdvanceDMA3.prototype.writeDMADestination32 = function (data) {
    data = data | 0;
    this.destination = data & 0xFFFFFFF;
}
GameBoyAdvanceDMA3.prototype.writeDMAWordCount8_0 = function (data) {
    data = data | 0;
    this.wordCount = this.wordCount & 0xFF00;
    data = data & 0xFF;
    this.wordCount = this.wordCount | data;
}
GameBoyAdvanceDMA3.prototype.writeDMAWordCount8_1 = function (data) {
    data = data | 0;
    this.wordCount = this.wordCount & 0xFF;
    data = data & 0xFF;
    this.wordCount = this.wordCount | (data << 8);
}
GameBoyAdvanceDMA3.prototype.writeDMAWordCount16 = function (data) {
    data = data | 0;
    this.wordCount = data & 0xFFFF;
}
GameBoyAdvanceDMA3.prototype.writeDMAControl8_0 = function (data) {
    data = data | 0;
    this.destinationControl = (data >> 5) & 0x3;
    this.sourceControl = this.sourceControl & 0x2;
    this.sourceControl = this.sourceControl | ((data >> 7) & 0x1);
}
GameBoyAdvanceDMA3.prototype.writeDMAControl8_1 = function (data) {
    data = data | 0;
    //Spill state machine clocks:
    this.IOCore.updateCoreClocking();
    this.sourceControl = (this.sourceControl & 0x1) | ((data & 0x1) << 1);
    this.repeat = data & 0x2;
    this.is32Bit = data & 0x4;
    this.gamePakDMA = data & 0x8;
    this.dmaType = (data >> 4) & 0x3;
    this.irqFlagging = data & 0x40;
    this.enableDMAChannel(data & 0x80);
    //Calculate next event:
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceDMA3.prototype.writeDMAControl16 = function (data) {
    data = data | 0;
    //Spill state machine clocks:
    this.IOCore.updateCoreClocking();
    this.destinationControl = (data >> 5) & 0x3;
    this.sourceControl = (data >> 7) & 0x3;
    this.repeat = (data >> 8) & 0x2;
    this.is32Bit = (data >> 8) & 0x4;
    this.gamePakDMA = (data >> 8) & 0x8;
    this.dmaType = (data >> 12) & 0x3;
    this.irqFlagging = (data >> 8) & 0x40;
    this.enableDMAChannel(data & 0x8000);
    //Calculate next event:
    this.IOCore.updateCoreEventTime();
}
GameBoyAdvanceDMA3.prototype.writeDMAControl32 = function (data) {
    data = data | 0;
    this.writeDMAWordCount16(data | 0);
    this.writeDMAControl16(data >> 16);
}
GameBoyAdvanceDMA3.prototype.readDMAControl8_0 = function () {
    var data = this.destinationControl << 5;
    data = data | ((this.sourceControl & 0x1) << 7);
    return data | 0;
}
GameBoyAdvanceDMA3.prototype.readDMAControl8_1 = function () {
    var data = this.sourceControl >> 1;
    data = data | this.repeat;
    data = data | this.is32Bit;
    data = data | this.gamePakDMA;
    data = data | (this.dmaType << 4);
    data = data | this.irqFlagging;
    if ((this.enabled | 0) != 0) {
        data = data | 0x80;
    }
    return data | 0;
}
GameBoyAdvanceDMA3.prototype.readDMAControl16 = function () {
    var data = this.destinationControl << 5;
    data = data | (this.sourceControl << 7);
    data = data | (this.repeat << 8);
    data = data | (this.is32Bit << 8);
    data = data | (this.gamePakDMA << 8);
    data = data | (this.dmaType << 12);
    data = data | (this.irqFlagging << 8);
    if ((this.enabled | 0) != 0) {
        data = data | 0x8000;
    }
    return data | 0;
}
GameBoyAdvanceDMA3.prototype.getMatchStatus = function () {
    return this.enabled & this.pending;
}
GameBoyAdvanceDMA3.prototype.gfxDisplaySyncRequest = function () {
    this.requestDMA(0x20 ^ this.displaySyncEnableDelay);
}
GameBoyAdvanceDMA3.prototype.gfxDisplaySyncEnableCheck = function () {
	//Reset the display sync & reassert DMA enable line:
    if ((this.enabled | 0) == 0x20) {
        if ((this.displaySyncEnableDelay | 0) == 0x20) {
            this.displaySyncEnableDelay = 0;
        }
        else {
            this.enabled = 0;
            this.DMACore.update();
        }
    }
}
GameBoyAdvanceDMA3.prototype.requestDMA = function (DMAType) {
    DMAType = DMAType | 0;
    if ((this.enabled & DMAType) != 0) {
        this.pending = DMAType | 0;
        this.DMACore.update();
    }
}
GameBoyAdvanceDMA3.prototype.enableDMAChannel = function (enabled) {
    enabled = enabled | 0;
    if ((enabled | 0) != 0) {
        //If DMA was previously disabled, reload control registers:
        if ((this.enabled | 0) == 0) {
            switch (this.dmaType | 0) {
                case 0:
                    //Flag immediate DMA transfers for processing now:
                    this.pending = 0x1;
                    break;
                case 0x3:
                    //Trigger display sync DMA shadow enable and auto-check on line 162:
                    this.displaySyncEnableDelay = 0x20;
            }
            //Shadow copy the word count:
            this.wordCountShadow = this.wordCount | 0;
            //Shadow copy the source address:
            this.sourceShadow = this.source | 0;
            //Shadow copy the destination address:
            this.destinationShadow = this.destination | 0;
        }
        //DMA type changed:
        this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
        this.pending = this.pending & this.enabled;
    }
    else {
        //DMA Disabled:
        this.enabled = 0;
    }
    //Run some DMA channel activity checks:
    this.DMACore.update();
}
GameBoyAdvanceDMA3.prototype.handleDMACopy = function () {
    //Get the addesses:
    var source = this.sourceShadow | 0;
    var destination = this.destinationShadow | 0;
    //Transfer Data:
    if ((this.is32Bit | 0) == 4) {
        //32-bit Transfer:
        this.copy32(source | 0, destination | 0);
    }
    else {
        //16-bit Transfer:
        this.copy16(source | 0, destination | 0);
    }
}
GameBoyAdvanceDMA3.prototype.copy16 = function (source, destination) {
    source = source | 0;
    destination = destination | 0;
    var data = this.memory.memoryReadDMAFull16(source | 0) | 0;
    this.memory.memoryWriteDMAFull16(destination | 0, data | 0);
    this.decrementWordCount(source | 0, destination | 0, 2);
    this.DMACore.updateFetch(data | (data << 16));
}
GameBoyAdvanceDMA3.prototype.copy32 = function (source, destination) {
    source = source | 0;
    destination = destination | 0;
    var data = this.memory.memoryReadDMAFull32(source | 0) | 0;
    this.memory.memoryWriteDMAFull32(destination | 0, data | 0);
    this.decrementWordCount(source | 0, destination | 0, 4);
    this.DMACore.updateFetch(data | 0);
}
GameBoyAdvanceDMA3.prototype.decrementWordCount = function (source, destination, transferred) {
    source = source | 0;
    destination = destination | 0;
    transferred = transferred | 0;
    //Decrement the word count:
    var wordCountShadow = ((this.wordCountShadow | 0) - 1) & 0xFFFF;
    if ((wordCountShadow | 0) == 0) {
        //DMA transfer ended, handle accordingly:
        wordCountShadow = this.finalizeDMA(source | 0, destination | 0, transferred | 0) | 0;
    }
    else {
        //Update addresses:
        this.incrementDMAAddresses(source | 0, destination | 0, transferred | 0);
    }
    //Save the new word count:
    this.wordCountShadow = wordCountShadow | 0;
}
GameBoyAdvanceDMA3.prototype.finalizeDMA = function (source, destination, transferred) {
    source = source | 0;
    destination = destination | 0;
    transferred = transferred | 0;
    var wordCountShadow = 0;
    //Reset pending requests:
    this.pending = 0;
    //Check Repeat Status:
    if ((this.repeat | 0) == 0 || (this.enabled | 0) == 0x1) {
        //Disable the enable bit:
        this.enabled = 0;
    }
    else {
        //Reload word count:
        wordCountShadow = this.wordCount | 0;
    }
    //Run the DMA channel checks:
    this.DMACore.update();
    //Check to see if we should flag for IRQ:
    this.checkIRQTrigger();
    //Update addresses:
    this.finalDMAAddresses(source | 0, destination | 0, transferred | 0);
    return wordCountShadow | 0;
}
GameBoyAdvanceDMA3.prototype.checkIRQTrigger = function () {
    if ((this.irqFlagging | 0) != 0) {
        this.irq.requestIRQ(0x800);
    }
}
GameBoyAdvanceDMA3.prototype.finalDMAAddresses = function (source, destination, transferred) {
    source = source | 0;
    destination = destination | 0;
    transferred = transferred | 0;
    //Update source address:
    switch (this.sourceControl | 0) {
        case 0:    //Increment
        case 3:    //Forbidden (VBA has it increment)
            this.sourceShadow = ((source | 0) + (transferred | 0)) | 0;
            break;
        case 1:    //Decrement
            this.sourceShadow = ((source | 0) - (transferred | 0)) | 0;
    }
    //Update destination address:
    switch (this.destinationControl | 0) {
        case 0:    //Increment
            this.destinationShadow = ((destination | 0) + (transferred | 0)) | 0;
            break;
        case 1:    //Decrement
            this.destinationShadow = ((destination | 0) - (transferred | 0)) | 0;
            break;
        case 3:    //Reload
            this.destinationShadow = this.destination | 0;
    }
}
GameBoyAdvanceDMA3.prototype.incrementDMAAddresses = function (source, destination, transferred) {
    source = source | 0;
    destination = destination | 0;
    transferred = transferred | 0;
    //Update source address:
    switch (this.sourceControl | 0) {
        case 0:    //Increment
        case 3:    //Forbidden (VBA has it increment)
            this.sourceShadow = ((source | 0) + (transferred | 0)) | 0;
            break;
        case 1:
            this.sourceShadow = ((source | 0) - (transferred | 0)) | 0;
    }
    //Update destination address:
    switch (this.destinationControl | 0) {
        case 0:    //Increment
        case 3:    //Increment
            this.destinationShadow = ((destination | 0) + (transferred | 0)) | 0;
            break;
        case 1:    //Decrement
            this.destinationShadow = ((destination | 0) - (transferred | 0)) | 0;
    }
}
GameBoyAdvanceDMA3.prototype.nextEventTime = function () {
    var clocks = 0x7FFFFFFF;
    switch (this.enabled | 0) {
            //V_BLANK
        case 0x2:
            clocks = this.gfxState.nextVBlankEventTime() | 0;
            break;
            //H_BLANK:
        case 0x4:
            clocks = this.gfxState.nextHBlankDMAEventTime() | 0;
            break;
            //DISPLAY_SYNC:
        case 0x20:
            clocks = this.gfxState.nextDisplaySyncEventTime(this.displaySyncEnableDelay | 0) | 0;
    }
    return clocks | 0;
}
