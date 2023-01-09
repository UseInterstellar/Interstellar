"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceEmulator() {
    this.settings = {
        "SKIPBoot":false,                   //Skip the BIOS boot screen.
        "audioVolume":1,                    //Starting audio volume.
        "audioBufferUnderrunLimit":8,       //Audio buffer minimum span amount over x interpreter iterations.
        "audioBufferDynamicLimit":2,        //Audio buffer dynamic minimum span amount over x interpreter iterations.
        "audioBufferSize":20,               //Audio buffer maximum span amount over x interpreter iterations.
        "timerIntervalRate":16,             //How often the emulator core is called into (in milliseconds).
        "emulatorSpeed":1,                  //Speed multiplier of the emulator.
        "metricCollectionMinimum":30,       //How many cycles to collect before determining speed.
        "dynamicSpeed":true                 //Whether to actively change the target speed for best user experience.
    }
    this.audioFound = false;                  //Do we have audio output sink found yet?
    this.loaded = false;                      //Did we initialize IodineGBA?
    this.faultFound = false;                  //Did we run into a fatal error?
    this.paused = true;                       //Are we paused?
    this.offscreenWidth = 240;                //Width of the GBA screen.
    this.offscreenHeight = 160;               //Height of the GBA screen.
    this.BIOS = [];                           //Initialize BIOS as not existing.
    this.ROM = [];                            //Initialize BIOS as not existing.
    //Cache some frame buffer lengths:
    this.offscreenRGBCount = ((this.offscreenWidth | 0) * (this.offscreenHeight | 0) * 3) | 0;
    //Graphics buffers to generate in advance:
    this.frameBuffer = getInt32Array(this.offscreenRGBCount | 0);        //The internal buffer to composite to.
    this.swizzledFrame = getUint8Array(this.offscreenRGBCount | 0);      //The swizzled output buffer that syncs to the internal framebuffer on v-blank.
    this.audioUpdateState = false;            //Do we need to update the sound core with new info?
    this.saveExportHandler = null;            //Save export handler attached by GUI.
    this.saveImportHandler = null;            //Save import handler attached by GUI.
    this.speedCallback = null;                //Speed report handler attached by GUI.
    this.graphicsFrameCallback = null;        //Graphics blitter handler attached by GUI.
    this.clockCyclesSinceStart = 0;           //Clocking hueristics reference
    this.metricCollectionCounted = 0;         //Clocking hueristics reference
    this.metricStart = null;                  //Date object reference.
    this.dynamicSpeedCounter = 0;             //Rate limiter counter for dynamic speed.
    this.audioNumSamplesTotal = 0;            //Buffer size.
    this.calculateTimings();                  //Calculate some multipliers against the core emulator timer.
    this.generateCoreExposed();               //Generate a limit API for the core to call this shell object.
}
GameBoyAdvanceEmulator.prototype.generateCoreExposed = function () {
    var parentObj = this;
    this.coreExposed = {
        "outputAudio":function (l, r) {
            parentObj.outputAudio(l, r);
        },
        "frameBuffer":parentObj.frameBuffer,
        "prepareFrame":function () {
            parentObj.prepareFrame();
        }
    }
}
GameBoyAdvanceEmulator.prototype.play = function () {
    if (this.paused) {
        this.startTimer();
        this.paused = false;
        if (!this.loaded && this.BIOS && this.ROM) {
            this.initializeCore();
            this.loaded = true;
            this.importSave();
        }
    }
}
GameBoyAdvanceEmulator.prototype.pause = function () {
    if (!this.paused) {
        this.clearTimer();
        this.exportSave();
        this.paused = true;
    }
}
GameBoyAdvanceEmulator.prototype.stop = function () {
    this.faultFound = false;
    this.loaded = false;
    this.audioUpdateState = this.audioFound;
    this.pause();
}
GameBoyAdvanceEmulator.prototype.restart = function () {
    if (this.loaded) {
        this.faultFound = false;
        this.exportSave();
        this.initializeCore();
        this.importSave();
        this.audioUpdateState = this.audioFound;
        this.setSpeed(1);
    }
}
GameBoyAdvanceEmulator.prototype.clearTimer = function () {
    clearInterval(this.timer);
    this.resetMetrics();
}
GameBoyAdvanceEmulator.prototype.startTimer = function () {
    this.clearTimer();
    var parentObj = this;
    this.timer = setInterval(function (){parentObj.timerCallback()}, this.settings.timerIntervalRate);
}
GameBoyAdvanceEmulator.prototype.timerCallback = function () {
    //Check to see if web view is not hidden, if hidden don't run due to JS timers being inaccurate on page hide:
    if (!document.hidden && !document.msHidden && !document.mozHidden && !document.webkitHidden) {
        if (!this.faultFound && this.loaded) {                          //Any error pending or no ROM loaded is a show-stopper!
            this.iterationStartSequence();                              //Run start of iteration stuff.
            this.IOCore.enter(this.CPUCyclesTotal | 0);               //Step through the emulation core loop.
            this.iterationEndSequence();                                //Run end of iteration stuff.
        }
        else {
            this.pause();                                                //Some pending error is preventing execution, so pause.
        }
    }
}
GameBoyAdvanceEmulator.prototype.iterationStartSequence = function () {
    this.calculateSpeedPercentage();                                    //Calculate the emulator realtime run speed heuristics.
    this.faultFound = true;                                             //If the end routine doesn't unset this, then we are marked as having crashed.
    this.audioUnderrunAdjustment();                                     //If audio is enabled, look to see how much we should overclock by to maintain the audio buffer.
    this.audioPushNewState();                                           //Check to see if we need to update the audio core for any output changes.
}
GameBoyAdvanceEmulator.prototype.iterationEndSequence = function () {
    this.faultFound = false;                                            //If core did not throw while running, unset the fatal error flag.
    this.clockCyclesSinceStart = ((this.clockCyclesSinceStart | 0) + (this.CPUCyclesTotal | 0)) | 0;    //Accumulate tracking.
}
GameBoyAdvanceEmulator.prototype.attachROM = function (ROM) {
    this.stop();
    this.ROM = ROM;
}
GameBoyAdvanceEmulator.prototype.attachBIOS = function (BIOS) {
    this.stop();
    this.BIOS = BIOS;
}
GameBoyAdvanceEmulator.prototype.getGameName = function () {
    if (!this.faultFound && this.loaded) {
        return this.IOCore.cartridge.name;
    }
    else {
        return "";
    }
}
GameBoyAdvanceEmulator.prototype.attachSaveExportHandler = function (handler) {
    if (typeof handler == "function") {
        this.saveExportHandler = handler;
    }
}
GameBoyAdvanceEmulator.prototype.attachSaveImportHandler = function (handler) {
    if (typeof handler == "function") {
        this.saveImportHandler = handler;
    }
}
GameBoyAdvanceEmulator.prototype.attachSpeedHandler = function (handler) {
    if (typeof handler == "function") {
        this.speedCallback = handler;
    }
}
GameBoyAdvanceEmulator.prototype.importSave = function () {
    if (this.saveImportHandler) {
        var name = this.getGameName();
        if (name != "") {
            var save = this.saveImportHandler(name);
            var saveType = this.saveImportHandler("TYPE_" + name);
            if (save && saveType && !this.faultFound && this.loaded) {
                var length = save.length | 0;
                var convertedSave = getUint8Array(length | 0);
                if ((length | 0) > 0) {
                    for (var index = 0; (index | 0) < (length | 0); index = ((index | 0) + 1) | 0) {
                        convertedSave[index | 0] = save[index | 0] & 0xFF;
                    }
                    this.IOCore.saves.importSave(convertedSave, saveType | 0);
                }
            }
        }
    }
}
GameBoyAdvanceEmulator.prototype.exportSave = function () {
    if (this.saveExportHandler && !this.faultFound && this.loaded) {
        var save = this.IOCore.saves.exportSave();
        var saveType = this.IOCore.saves.exportSaveType();
        if (save != null && saveType != null) {
            this.saveExportHandler(this.IOCore.cartridge.name, save);
            this.saveExportHandler("TYPE_" + this.IOCore.cartridge.name, saveType | 0);
        }
    }
}
GameBoyAdvanceEmulator.prototype.setSpeed = function (speed) {
    var speed = Math.min(Math.max(parseFloat(speed), 0.01), 10);
    this.resetMetrics();
    if (speed != this.settings.emulatorSpeed) {
        this.settings.emulatorSpeed = speed;
        this.calculateTimings();
        this.reinitializeAudio();
    }
}
GameBoyAdvanceEmulator.prototype.incrementSpeed = function (delta) {
    this.setSpeed(parseFloat(delta) + this.settings.emulatorSpeed);
}
GameBoyAdvanceEmulator.prototype.getSpeed = function (speed) {
    return this.settings.emulatorSpeed;
}
GameBoyAdvanceEmulator.prototype.changeCoreTimer = function (newTimerIntervalRate) {
    this.settings.timerIntervalRate = Math.max(parseInt(newTimerIntervalRate, 10), 1);
    if (!this.paused) {                        //Set up the timer again if running.
        this.clearTimer();
        this.startTimer();
    }
    this.calculateTimings();
    this.reinitializeAudio();
}
GameBoyAdvanceEmulator.prototype.resetMetrics = function () {
    this.clockCyclesSinceStart = 0;
    this.metricCollectionCounted = 0;
    this.metricStart = new Date();
}
GameBoyAdvanceEmulator.prototype.calculateTimings = function () {
    this.clocksPerSecond = this.settings.emulatorSpeed * 0x1000000;
    this.CPUCyclesTotal = this.CPUCyclesPerIteration = (this.clocksPerSecond / 1000 * this.settings.timerIntervalRate) | 0;
    this.dynamicSpeedCounter = 0;
}
GameBoyAdvanceEmulator.prototype.calculateSpeedPercentage = function () {
    if (this.metricStart) {
        if ((this.metricCollectionCounted | 0) >= (this.settings.metricCollectionMinimum | 0)) {
            if (this.speedCallback) {
                var metricEnd = new Date();
                var timeDiff = Math.max(metricEnd.getTime() - this.metricStart.getTime(), 1);
                var result = ((this.settings.timerIntervalRate * (this.clockCyclesSinceStart | 0) / timeDiff) / (this.CPUCyclesPerIteration | 0)) * 100;
                this.speedCallback(result.toFixed(2) + "%");
            }
            this.resetMetrics();
        }
    }
    else {
        this.resetMetrics();
    }
    this.metricCollectionCounted = ((this.metricCollectionCounted | 0) + 1) | 0;
}
GameBoyAdvanceEmulator.prototype.initializeCore = function () {
    //Setup a new instance of the i/o core:
    this.IOCore = new GameBoyAdvanceIO(this.settings, this.coreExposed, this.BIOS, this.ROM);
}
GameBoyAdvanceEmulator.prototype.keyDown = function (keyPressed) {
    keyPressed = keyPressed | 0;
    if (!this.paused && (keyPressed | 0) >= 0 && (keyPressed | 0) <= 9) {
        this.IOCore.joypad.keyPress(keyPressed | 0);
    }
}
GameBoyAdvanceEmulator.prototype.keyUp = function (keyReleased) {
    keyReleased = keyReleased | 0;
    if (!this.paused && (keyReleased | 0) >= 0 && (keyReleased | 0) <= 9) {
        this.IOCore.joypad.keyRelease(keyReleased | 0);
    }
}
GameBoyAdvanceEmulator.prototype.attachGraphicsFrameHandler = function (handler) {
    if (typeof handler == "function") {
        this.graphicsFrameCallback = handler;
    }
}
GameBoyAdvanceEmulator.prototype.attachAudioHandler = function (mixerInputHandler) {
    if (mixerInputHandler) {
        this.audio = mixerInputHandler;
    }
}
GameBoyAdvanceEmulator.prototype.swizzleFrameBuffer = function () {
    //Convert our dirty 15-bit (15-bit, with internal render flags above it) framebuffer to an 8-bit buffer with separate indices for the RGB channels:
    var bufferIndex = 0;
    for (var canvasIndex = 0; (canvasIndex | 0) < (this.offscreenRGBCount | 0); bufferIndex = ((bufferIndex | 0) + 1) | 0) {
        this.swizzledFrame[canvasIndex | 0] = (this.frameBuffer[bufferIndex | 0] & 0x1F) << 3;      //Red
        canvasIndex = ((canvasIndex | 0) + 1) | 0;
        this.swizzledFrame[canvasIndex | 0] = (this.frameBuffer[bufferIndex | 0] & 0x3E0) >> 2;     //Green
        canvasIndex = ((canvasIndex | 0) + 1) | 0;
        this.swizzledFrame[canvasIndex | 0] = (this.frameBuffer[bufferIndex | 0] & 0x7C00) >> 7;    //Blue
        canvasIndex = ((canvasIndex | 0) + 1) | 0;
    }
}
GameBoyAdvanceEmulator.prototype.prepareFrame = function () {
    //Copy the internal frame buffer to the output buffer:
    this.swizzleFrameBuffer();
    this.requestDraw();
}
GameBoyAdvanceEmulator.prototype.requestDraw = function () {
    if (this.graphicsFrameCallback) {
        //We actually updated the graphics internally, so copy out:
        this.graphicsFrameCallback(this.swizzledFrame);
    }
}
GameBoyAdvanceEmulator.prototype.enableAudio = function () {
    if (!this.audioFound && this.audio) {
        //Calculate the variables for the preliminary downsampler first:
        this.audioResamplerFirstPassFactor = Math.max(Math.min(Math.floor(this.clocksPerSecond / 44100), Math.floor(0x7FFFFFFF / 0x3FF)), 1);
        this.audioDownSampleInputDivider = (2 / 0x3FF) / this.audioResamplerFirstPassFactor;
        this.audioSetState(true);    //Set audio to 'found' by default.
        //Attempt to enable audio:
        var parentObj = this;
        this.audio.initialize(2, this.clocksPerSecond / this.audioResamplerFirstPassFactor, Math.max((this.CPUCyclesPerIteration | 0) * this.settings.audioBufferSize / this.audioResamplerFirstPassFactor, 8192) << 1, this.settings.audioVolume, function () {
                                     //Disable audio in the callback here:
                                     parentObj.disableAudio();
        });
        this.audio.register();
        if (this.audioFound) {
            //Only run this if audio was found to save memory on disabled output:
            this.initializeAudioBuffering();
        }
    }
}
GameBoyAdvanceEmulator.prototype.disableAudio = function () {
    if (this.audioFound) {
        this.audio.unregister();
        this.audioSetState(false);
        this.calculateTimings();    //Re-Fix timing if it was adjusted by our audio code.
    }
}
GameBoyAdvanceEmulator.prototype.initializeAudioBuffering = function () {
    this.audioDestinationPosition = 0;
    this.audioBufferContainAmount = Math.max((this.CPUCyclesPerIteration | 0) * (this.settings.audioBufferUnderrunLimit | 0) / this.audioResamplerFirstPassFactor, 4096) << 1;
    this.audioBufferDynamicContainAmount = Math.max((this.CPUCyclesPerIteration | 0) * (this.settings.audioBufferDynamicLimit | 0) / this.audioResamplerFirstPassFactor, 2048) << 1;
    var audioNumSamplesTotal = Math.max((this.CPUCyclesPerIteration | 0) / this.audioResamplerFirstPassFactor, 1) << 1;
    if ((audioNumSamplesTotal | 0) != (this.audioNumSamplesTotal | 0)) {
        this.audioNumSamplesTotal = audioNumSamplesTotal | 0;
        this.audioBuffer = getFloat32Array(this.audioNumSamplesTotal | 0);
    }
}
GameBoyAdvanceEmulator.prototype.changeVolume = function (newVolume) {
    this.settings.audioVolume = Math.min(Math.max(parseFloat(newVolume), 0), 1);
    if (this.audioFound) {
        this.audio.changeVolume(this.settings.audioVolume);
    }
}
GameBoyAdvanceEmulator.prototype.incrementVolume = function (delta) {
    this.changeVolume(parseFloat(delta) + this.settings.audioVolume);
}
GameBoyAdvanceEmulator.prototype.outputAudio = function (downsampleInputLeft, downsampleInputRight) {
    downsampleInputLeft = downsampleInputLeft | 0;
    downsampleInputRight = downsampleInputRight | 0;
    this.audioBuffer[this.audioDestinationPosition | 0] = (downsampleInputLeft * this.audioDownSampleInputDivider) - 1;
    this.audioDestinationPosition = ((this.audioDestinationPosition | 0) + 1) | 0;
    this.audioBuffer[this.audioDestinationPosition | 0] = (downsampleInputRight * this.audioDownSampleInputDivider) - 1;
    this.audioDestinationPosition = ((this.audioDestinationPosition | 0) + 1) | 0;
    if ((this.audioDestinationPosition | 0) == (this.audioNumSamplesTotal | 0)) {
        this.audio.push(this.audioBuffer);
        this.audioDestinationPosition = 0;
    }
}
GameBoyAdvanceEmulator.prototype.audioUnderrunAdjustment = function () {
    this.CPUCyclesTotal = this.CPUCyclesPerIteration | 0;
    if (this.audioFound) {
        var remainingAmount = this.audio.remainingBuffer();
        if (typeof remainingAmount == "number") {
            remainingAmount = Math.max(remainingAmount | 0, 0) | 0;
            var underrunAmount = ((this.audioBufferContainAmount | 0) - (remainingAmount | 0)) | 0;
            if ((underrunAmount | 0) > 0) {
                if (this.settings.dynamicSpeed) {
                    if ((this.dynamicSpeedCounter | 0) > (this.settings.metricCollectionMinimum | 0)) {
                        if (((this.audioBufferDynamicContainAmount | 0) - (remainingAmount | 0)) > 0) {
                            var speed = this.getSpeed();
                            speed = Math.max(speed - 0.1, 0.1);
                            this.setSpeed(speed);
                        }
                        else {
                            this.dynamicSpeedCounter = this.settings.metricCollectionMinimum | 0;
                        }
                    }
                    this.dynamicSpeedCounter = ((this.dynamicSpeedCounter | 0) + 1) | 0;
                }
                this.CPUCyclesTotal = Math.min(((this.CPUCyclesTotal | 0) + ((underrunAmount >> 1) * this.audioResamplerFirstPassFactor)) | 0, this.CPUCyclesTotal << 1, 0x7FFFFFFF) | 0;
            }
            else if (this.settings.dynamicSpeed) {
                if ((this.dynamicSpeedCounter | 0) > (this.settings.metricCollectionMinimum | 0)) {
                    var speed = this.getSpeed();
                    if (speed < 1) {
                        speed = Math.min(speed + 0.05, 1);
                        this.setSpeed(speed);
                    }
                    else {
                        this.dynamicSpeedCounter = this.settings.metricCollectionMinimum | 0;
                    }
                }
                this.dynamicSpeedCounter = ((this.dynamicSpeedCounter | 0) + 1) | 0;
            }
        }
    }
}
GameBoyAdvanceEmulator.prototype.audioPushNewState = function () {
    if (this.audioUpdateState) {
        this.IOCore.sound.initializeOutput(this.audioFound, this.audioResamplerFirstPassFactor);
        this.audioUpdateState = false;
    }
}
GameBoyAdvanceEmulator.prototype.audioSetState = function (audioFound) {
    if (this.audioFound != audioFound) {
        this.audioFound = audioFound;
        this.audioUpdateState = true;
    }
}
GameBoyAdvanceEmulator.prototype.reinitializeAudio = function () {
    if (this.audioFound) {                    //Set up the audio again if enabled.
        this.disableAudio();
        this.enableAudio();
    }
}
GameBoyAdvanceEmulator.prototype.enableSkipBootROM = function () {
    this.settings.SKIPBoot = true;
}
GameBoyAdvanceEmulator.prototype.disableSkipBootROM = function () {
    this.settings.SKIPBoot = false;
}
GameBoyAdvanceEmulator.prototype.enableDynamicSpeed = function () {
    this.settings.dynamicSpeed = true;
}
GameBoyAdvanceEmulator.prototype.disableDynamicSpeed = function () {
    this.settings.dynamicSpeed = false;
    this.setSpeed(1);
}
