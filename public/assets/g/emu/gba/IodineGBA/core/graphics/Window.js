"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceWindowRenderer(compositor) {
    //Get a layer compositor that we'll send our parameters for windowing to:
    this.compositor = compositor;
}
GameBoyAdvanceWindowRenderer.prototype.initialize = function () {
    //Initialize the compositor:
    this.compositor.initialize();
    //Right windowing coordinate:
    this.WINXCoordRight = 0;
    //Left windowing coordinate:
    this.WINXCoordLeft = 0;
    //Bottom windowing coordinate:
    this.WINYCoordBottom = 0;
    //Top windowing coordinate:
    this.WINYCoordTop = 0;
    //Layer masking & color effects control:
    this.windowDisplayControl = 0;
    //Need to update the color effects status in the compositor:
    this.preprocess();
}
GameBoyAdvanceWindowRenderer.prototype.renderScanLine = function (line, toRender) {
    line = line | 0;
    toRender = toRender | 0;
    //Windowing can disable out further layers:
    toRender = toRender & this.windowDisplayControl;
    //Check if we're doing windowing for the current line:
    if (this.checkYRange(line | 0)) {
        //Windowing is active for the current line:
        var right =  this.WINXCoordRight | 0;
        var left = this.WINXCoordLeft | 0;
        if ((left | 0) <= (right | 0)) {
            //Windowing is left to right like expected:
            left = Math.min(left | 0, 240) | 0;
            right = Math.min(right | 0, 240) | 0;
            //Render left coordinate to right coordinate:
            this.compositor.renderScanLine(left | 0, right | 0, toRender | 0);
        }
        else {
            //Invalid horizontal windowing coordinates, so invert horizontal windowing range:
            left = Math.min(left | 0, 240) | 0;
            right = Math.min(right | 0, 240) | 0;
            //Render pixel 0 to right coordinate:
            this.compositor.renderScanLine(0, right | 0, toRender | 0);
            //Render left coordinate to last pixel:
            this.compositor.renderScanLine(left | 0, 240, toRender | 0);
        }
    }
}
GameBoyAdvanceWindowRenderer.prototype.checkYRange = function (line) {
    line = line | 0;
    var bottom = this.WINYCoordBottom | 0;
    var top = this.WINYCoordTop | 0;
    if ((top | 0) <= (bottom | 0)) {
        //Windowing is top to bottom like expected:
        return ((line | 0) >= (top | 0) && (line | 0) < (bottom | 0));
    }
    else {
        //Invalid vertical windowing coordinates, so invert vertical windowing range:
        return ((line | 0) < (top | 0) || (line | 0) >= (bottom | 0));
    }
}
GameBoyAdvanceWindowRenderer.prototype.preprocess = function () {
    //Update the color effects status in the compositor:
    this.compositor.preprocess(this.windowDisplayControl & 0x20);
}
GameBoyAdvanceWindowRenderer.prototype.writeWINXCOORDRight8 = function (data) {
    data = data | 0;
    //Right windowing coordinate:
    this.WINXCoordRight = data | 0;
}
GameBoyAdvanceWindowRenderer.prototype.writeWINXCOORDLeft8 = function (data) {
    data = data | 0;
    //Left windowing coordinate:
    this.WINXCoordLeft = data | 0;
}
GameBoyAdvanceWindowRenderer.prototype.writeWINYCOORDBottom8 = function (data) {
    data = data | 0;
    //Bottom windowing coordinate:
    this.WINYCoordBottom = data | 0;
}
GameBoyAdvanceWindowRenderer.prototype.writeWINYCOORDTop8 = function (data) {
    data = data | 0;
    //Top windowing coordinate:
    this.WINYCoordTop = data | 0;
}
GameBoyAdvanceWindowRenderer.prototype.writeWINXCOORD16 = function (data) {
    data = data | 0;
    //Right windowing coordinate:
    this.WINXCoordRight = data & 0xFF;
    //Left windowing coordinate:
    this.WINXCoordLeft = data >> 8;
}
GameBoyAdvanceWindowRenderer.prototype.writeWINYCOORD16 = function (data) {
    data = data | 0;
    //Bottom windowing coordinate:
    this.WINYCoordBottom = data & 0xFF;
    //Top windowing coordinate:
    this.WINYCoordTop = data >> 8;
}
GameBoyAdvanceWindowRenderer.prototype.writeWININ8 = function (data) {
    data = data | 0;
    //Layer masking & color effects control:
    this.windowDisplayControl = data | 0;
    //Need to update the color effects status in the compositor:
    this.preprocess();
}