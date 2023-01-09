"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceOBJWindowRenderer(compositor) {
    //Get a layer compositor that we'll send our parameters for windowing to:
    this.compositor = compositor;
}
GameBoyAdvanceOBJWindowRenderer.prototype.initialize = function () {
    //Initialize the compositor:
    this.compositor.initialize();
    //Layer masking & color effects control:
    this.WINOBJOutside = 0;
    //Need to update the color effects status in the compositor:
    this.preprocess();
}
GameBoyAdvanceOBJWindowRenderer.prototype.renderScanLine = function (line, toRender) {
    line = line | 0;
    toRender = toRender | 0;
    //Windowing can disable out further layers:
    toRender = toRender & this.WINOBJOutside;
    //Windowing occurs where there is a non-transparent "obj-win" sprite:
    this.compositor.renderScanLine(toRender | 0);
}
GameBoyAdvanceOBJWindowRenderer.prototype.writeWINOBJIN8 = function (data) {
    data = data | 0;
    //Layer masking & color effects control:
    this.WINOBJOutside = data | 0;
    //Need to update the color effects status in the compositor:
    this.preprocess();
}
GameBoyAdvanceOBJWindowRenderer.prototype.preprocess = function () {
    //Update the color effects status in the compositor:
    this.compositor.preprocess(this.WINOBJOutside & 0x20);
}