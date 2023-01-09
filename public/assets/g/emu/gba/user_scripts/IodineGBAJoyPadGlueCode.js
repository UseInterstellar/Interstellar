"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var keyZones = [
    //Use this to control the key mapping:
                //A:
                [88],
                //B:
                [90],
                //Select:
                [16],
                //Start:
                [13],
                //Right:
                [39],
                //Left:
                [37],
                //Up:
                [38],
                //Down:
                [40],
                //R:
                [83],
                //L:
                [65]
];
function keyDown(e) {
    var keyCode = e.keyCode | 0;
    for (var keyMapIndex = 0; (keyMapIndex | 0) < 10; keyMapIndex = ((keyMapIndex | 0) + 1) | 0) {
        var keysMapped = keyZones[keyMapIndex | 0];
        var keysTotal = keysMapped.length | 0;
        for (var matchingIndex = 0; (matchingIndex | 0) < (keysTotal | 0); matchingIndex = ((matchingIndex | 0) + 1) | 0) {
            if ((keysMapped[matchingIndex | 0] | 0) == (keyCode | 0)) {
                Iodine.keyDown(keyMapIndex | 0);
                if (e.preventDefault) {
                    e.preventDefault();
                }
            }
        }
    }
}
function keyUp(keyCode) {
    keyCode = keyCode | 0;
    for (var keyMapIndex = 0; (keyMapIndex | 0) < 10; keyMapIndex = ((keyMapIndex | 0) + 1) | 0) {
        var keysMapped = keyZones[keyMapIndex | 0];
        var keysTotal = keysMapped.length | 0;
        for (var matchingIndex = 0; (matchingIndex | 0) < (keysTotal | 0); matchingIndex = ((matchingIndex | 0) + 1) | 0) {
            if ((keysMapped[matchingIndex | 0] | 0) == (keyCode | 0)) {
                Iodine.keyUp(keyMapIndex | 0);
            }
        }
    }
}
function keyUpPreprocess(e) {
    var keyCode = e.keyCode | 0;
    switch (keyCode | 0) {
        case 68:
            lowerVolume();
            break;
        case 82:
            raiseVolume();
            break;
        case 51:
            Iodine.incrementSpeed(0.10);
            break;
        case 52:
            Iodine.incrementSpeed(-0.10);
            break;
        default:
            //Control keys / other
            keyUp(keyCode);
    }
}
