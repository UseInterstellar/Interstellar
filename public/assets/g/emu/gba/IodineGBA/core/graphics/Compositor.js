"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function GameBoyAdvanceCompositor(gfx) {
    this.gfx = gfx;
    this.doEffects = 0;
}
function GameBoyAdvanceWindowCompositor(gfx) {
    this.gfx = gfx;
    this.doEffects = 0;
}
function GameBoyAdvanceOBJWindowCompositor(gfx) {
    this.gfx = gfx;
    this.doEffects = 0;
}
GameBoyAdvanceCompositor.prototype.initialize = GameBoyAdvanceWindowCompositor.prototype.initialize = function () {
    this.buffer = this.gfx.buffer;
    this.colorEffectsRenderer = this.gfx.colorEffectsRenderer;
}
GameBoyAdvanceOBJWindowCompositor.prototype.initialize = function () {
    this.buffer = this.gfx.buffer;
    this.colorEffectsRenderer = this.gfx.colorEffectsRenderer;
    this.OBJWindowBuffer = this.gfx.objRenderer.scratchWindowBuffer;
}
GameBoyAdvanceCompositor.prototype.preprocess = GameBoyAdvanceWindowCompositor.prototype.preprocess = GameBoyAdvanceOBJWindowCompositor.prototype.preprocess = function (doEffects) {
    doEffects = doEffects | 0;
    this.doEffects = doEffects | 0;
}
GameBoyAdvanceOBJWindowCompositor.prototype.renderScanLine = GameBoyAdvanceCompositor.prototype.renderScanLine = function (layers) {
    layers = layers | 0;
    if ((this.doEffects | 0) == 0) {
        this.renderNormalScanLine(layers | 0);
    }
    else {
        this.renderScanLineWithEffects(layers | 0);
    }
}
GameBoyAdvanceWindowCompositor.prototype.renderScanLine = function (xStart, xEnd, layers) {
    xStart = xStart | 0;
    xEnd = xEnd | 0;
    layers = layers | 0;
    if ((this.doEffects | 0) == 0) {
        this.renderNormalScanLine(xStart | 0, xEnd | 0, layers | 0);
    }
    else {
        this.renderScanLineWithEffects(xStart | 0, xEnd | 0, layers | 0);
    }
}
GameBoyAdvanceOBJWindowCompositor.prototype.renderNormalScanLine = GameBoyAdvanceCompositor.prototype.renderNormalScanLine = function (layers) {
    layers = layers | 0;
    switch (layers | 0) {
        case 0:
            this.normal0();
            break;
        case 1:
            this.normal1();
            break;
        case 2:
            this.normal2();
            break;
        case 3:
            this.normal3();
            break;
        case 4:
            this.normal4();
            break;
        case 5:
            this.normal5();
            break;
        case 6:
            this.normal6();
            break;
        case 7:
            this.normal7();
            break;
        case 8:
            this.normal8();
            break;
        case 9:
            this.normal9();
            break;
        case 10:
            this.normal10();
            break;
        case 11:
            this.normal11();
            break;
        case 12:
            this.normal12();
            break;
        case 13:
            this.normal13();
            break;
        case 14:
            this.normal14();
            break;
        case 15:
            this.normal15();
            break;
        case 16:
            this.normal16();
            break;
        case 17:
            this.normal17();
            break;
        case 18:
            this.normal18();
            break;
        case 19:
            this.normal19();
            break;
        case 20:
            this.normal20();
            break;
        case 21:
            this.normal21();
            break;
        case 22:
            this.normal22();
            break;
        case 23:
            this.normal23();
            break;
        case 24:
            this.normal24();
            break;
        case 25:
            this.normal25();
            break;
        case 26:
            this.normal26();
            break;
        case 27:
            this.normal27();
            break;
        case 28:
            this.normal28();
            break;
        case 29:
            this.normal29();
            break;
        case 30:
            this.normal30();
            break;
        default:
            this.normal31();
    }
}
GameBoyAdvanceWindowCompositor.prototype.renderNormalScanLine = function (xStart, xEnd, layers) {
    xStart = xStart | 0;
    xEnd = xEnd | 0;
    layers = layers | 0;
    switch (layers | 0) {
        case 0:
            this.normal0(xStart | 0, xEnd | 0);
            break;
        case 1:
            this.normal1(xStart | 0, xEnd | 0);
            break;
        case 2:
            this.normal2(xStart | 0, xEnd | 0);
            break;
        case 3:
            this.normal3(xStart | 0, xEnd | 0);
            break;
        case 4:
            this.normal4(xStart | 0, xEnd | 0);
            break;
        case 5:
            this.normal5(xStart | 0, xEnd | 0);
            break;
        case 6:
            this.normal6(xStart | 0, xEnd | 0);
            break;
        case 7:
            this.normal7(xStart | 0, xEnd | 0);
            break;
        case 8:
            this.normal8(xStart | 0, xEnd | 0);
            break;
        case 9:
            this.normal9(xStart | 0, xEnd | 0);
            break;
        case 10:
            this.normal10(xStart | 0, xEnd | 0);
            break;
        case 11:
            this.normal11(xStart | 0, xEnd | 0);
            break;
        case 12:
            this.normal12(xStart | 0, xEnd | 0);
            break;
        case 13:
            this.normal13(xStart | 0, xEnd | 0);
            break;
        case 14:
            this.normal14(xStart | 0, xEnd | 0);
            break;
        case 15:
            this.normal15(xStart | 0, xEnd | 0);
            break;
        case 16:
            this.normal16(xStart | 0, xEnd | 0);
            break;
        case 17:
            this.normal17(xStart | 0, xEnd | 0);
            break;
        case 18:
            this.normal18(xStart | 0, xEnd | 0);
            break;
        case 19:
            this.normal19(xStart | 0, xEnd | 0);
            break;
        case 20:
            this.normal20(xStart | 0, xEnd | 0);
            break;
        case 21:
            this.normal21(xStart | 0, xEnd | 0);
            break;
        case 22:
            this.normal22(xStart | 0, xEnd | 0);
            break;
        case 23:
            this.normal23(xStart | 0, xEnd | 0);
            break;
        case 24:
            this.normal24(xStart | 0, xEnd | 0);
            break;
        case 25:
            this.normal25(xStart | 0, xEnd | 0);
            break;
        case 26:
            this.normal26(xStart | 0, xEnd | 0);
            break;
        case 27:
            this.normal27(xStart | 0, xEnd | 0);
            break;
        case 28:
            this.normal28(xStart | 0, xEnd | 0);
            break;
        case 29:
            this.normal29(xStart | 0, xEnd | 0);
            break;
        case 30:
            this.normal30(xStart | 0, xEnd | 0);
            break;
        default:
            this.normal31(xStart | 0, xEnd | 0);
    }
}
GameBoyAdvanceOBJWindowCompositor.prototype.renderScanLineWithEffects = GameBoyAdvanceCompositor.prototype.renderScanLineWithEffects = function (layers) {
    layers = layers | 0;
    switch (layers | 0) {
        case 0:
            this.special0();
            break;
        case 1:
            this.special1();
            break;
        case 2:
            this.special2();
            break;
        case 3:
            this.special3();
            break;
        case 4:
            this.special4();
            break;
        case 5:
            this.special5();
            break;
        case 6:
            this.special6();
            break;
        case 7:
            this.special7();
            break;
        case 8:
            this.special8();
            break;
        case 9:
            this.special9();
            break;
        case 10:
            this.special10();
            break;
        case 11:
            this.special11();
            break;
        case 12:
            this.special12();
            break;
        case 13:
            this.special13();
            break;
        case 14:
            this.special14();
            break;
        case 15:
            this.special15();
            break;
        case 16:
            this.special16();
            break;
        case 17:
            this.special17();
            break;
        case 18:
            this.special18();
            break;
        case 19:
            this.special19();
            break;
        case 20:
            this.special20();
            break;
        case 21:
            this.special21();
            break;
        case 22:
            this.special22();
            break;
        case 23:
            this.special23();
            break;
        case 24:
            this.special24();
            break;
        case 25:
            this.special25();
            break;
        case 26:
            this.special26();
            break;
        case 27:
            this.special27();
            break;
        case 28:
            this.special28();
            break;
        case 29:
            this.special29();
            break;
        case 30:
            this.special30();
            break;
        default:
            this.special31();
    }
}
GameBoyAdvanceWindowCompositor.prototype.renderScanLineWithEffects = function (xStart, xEnd, layers) {
    xStart = xStart | 0;
    xEnd = xEnd | 0;
    layers = layers | 0;
    switch (layers | 0) {
        case 0:
            this.special0(xStart | 0, xEnd | 0);
            break;
        case 1:
            this.special1(xStart | 0, xEnd | 0);
            break;
        case 2:
            this.special2(xStart | 0, xEnd | 0);
            break;
        case 3:
            this.special3(xStart | 0, xEnd | 0);
            break;
        case 4:
            this.special4(xStart | 0, xEnd | 0);
            break;
        case 5:
            this.special5(xStart | 0, xEnd | 0);
            break;
        case 6:
            this.special6(xStart | 0, xEnd | 0);
            break;
        case 7:
            this.special7(xStart | 0, xEnd | 0);
            break;
        case 8:
            this.special8(xStart | 0, xEnd | 0);
            break;
        case 9:
            this.special9(xStart | 0, xEnd | 0);
            break;
        case 10:
            this.special10(xStart | 0, xEnd | 0);
            break;
        case 11:
            this.special11(xStart | 0, xEnd | 0);
            break;
        case 12:
            this.special12(xStart | 0, xEnd | 0);
            break;
        case 13:
            this.special13(xStart | 0, xEnd | 0);
            break;
        case 14:
            this.special14(xStart | 0, xEnd | 0);
            break;
        case 15:
            this.special15(xStart | 0, xEnd | 0);
            break;
        case 16:
            this.special16(xStart | 0, xEnd | 0);
            break;
        case 17:
            this.special17(xStart | 0, xEnd | 0);
            break;
        case 18:
            this.special18(xStart | 0, xEnd | 0);
            break;
        case 19:
            this.special19(xStart | 0, xEnd | 0);
            break;
        case 20:
            this.special20(xStart | 0, xEnd | 0);
            break;
        case 21:
            this.special21(xStart | 0, xEnd | 0);
            break;
        case 22:
            this.special22(xStart | 0, xEnd | 0);
            break;
        case 23:
            this.special23(xStart | 0, xEnd | 0);
            break;
        case 24:
            this.special24(xStart | 0, xEnd | 0);
            break;
        case 25:
            this.special25(xStart | 0, xEnd | 0);
            break;
        case 26:
            this.special26(xStart | 0, xEnd | 0);
            break;
        case 27:
            this.special27(xStart | 0, xEnd | 0);
            break;
        case 28:
            this.special28(xStart | 0, xEnd | 0);
            break;
        case 29:
            this.special29(xStart | 0, xEnd | 0);
            break;
        case 30:
            this.special30(xStart | 0, xEnd | 0);
            break;
        default:
            this.special31(xStart | 0, xEnd | 0);
    }
}
function generateCompositor() {
    function generateLocalScopeInit(count) {
        var code = "";
        switch (count | 0) {
            case 0:
                break;
            default:
                code = "var workingPixel = 0;";
            case 1:
                code += "var currentPixel = 0;";
                code += "var lowerPixel = 0;";
        }
        return code;
    }
    function generateLoopHead(compositeType, count, bodyCode) {
        var code = generateLocalScopeInit(count);
        switch (compositeType) {
            case 0:
                code += "for (var xStart = 0; (xStart | 0) < 240; xStart = ((xStart | 0) + 1) | 0) {" + bodyCode + "}";
                break;
            case 1:
                code = "xStart = xStart | 0; xEnd = xEnd | 0;" + code;
                code += "while ((xStart | 0) < (xEnd | 0)) {" + bodyCode + "xStart = ((xStart | 0) + 1) | 0;}";
                break;
            case 2:
                code += "for (var xStart = 0; (xStart | 0) < 240; xStart = ((xStart | 0) + 1) | 0) {" +
                "if ((this.OBJWindowBuffer[xStart | 0] | 0) < 0x3800000) {" +
                bodyCode +
                "}"+
                "}";
        }
        return code;
    }
    function generateLayerCompare(layerOffset) {
        var code = "workingPixel = this.buffer[xStart | " + layerOffset + "] | 0;" +
        "if ((workingPixel & 0x3800000) <= (currentPixel & 0x1800000)) {" +
            "lowerPixel = currentPixel | 0;" +
            "currentPixel = workingPixel | 0;" +
        "}" +
        "else if ((workingPixel & 0x3800000) <= (lowerPixel & 0x1800000)) {" +
            "lowerPixel = workingPixel | 0;" +
        "}";
        return code;
    }
    function generateLayerCompareSingle(layerOffset) {
        var code = "currentPixel = this.buffer[xStart | " + layerOffset + "] | 0;";
        code += "if ((currentPixel & 0x2000000) != 0) {";
        code += "currentPixel = lowerPixel | 0;";
        code += "}";
        return code;
    }
    function generateColorEffects(doEffects, layerCount) {
        if (layerCount > 0) {
            var code = "if ((currentPixel & 0x400000) == 0) {";
            if (doEffects) {
                code += "this.buffer[xStart | 0] = this.colorEffectsRenderer.process(lowerPixel | 0, currentPixel | 0) | 0;";
            }
            else {
                code += "this.buffer[xStart | 0] = currentPixel | 0;";
            }
            code += "}"
            code += "else {"
            code += "this.buffer[xStart | 0] = this.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;"
            code += "}";
            return code;
        }
        else {
            if (doEffects) {
                return "this.buffer[xStart | 0] = this.colorEffectsRenderer.process(0, this.gfx.backdrop | 0) | 0;";
            }
            else {
                return "this.buffer[xStart | 0] = this.gfx.backdrop | 0;"
            }
        }
    }
    function generateLoopBody(compositeType, doEffects, layers) {
        var code = "";
        var count = 0;
        if ((layers & 0x1F) == 0x8) {
            count++;
            code += generateLayerCompareSingle(0x400);
        }
        else if ((layers & 0x8) != 0) {
            count++;
            code += generateLayerCompare(0x400);
        }
        if ((layers & 0x1F) == 0x4) {
            count++;
            code += generateLayerCompareSingle(0x300);
        }
        else if ((layers & 0x4) != 0) {
            count++;
            code += generateLayerCompare(0x300);
        }
        if ((layers & 0x1F) == 0x2) {
            count++;
            code += generateLayerCompareSingle(0x200);
        }
        else if ((layers & 0x2) != 0) {
            count++;
            code += generateLayerCompare(0x200);
        }
        if ((layers & 0x1F) == 0x1) {
            count++;
            code += generateLayerCompareSingle(0x100);
        }
        else if ((layers & 0x1) != 0) {
            count++;
            code += generateLayerCompare(0x100);
        }
        if ((layers & 0x1F) == 0x10) {
            count++;
            code += generateLayerCompareSingle(0x500);
        }
        else if ((layers & 0x10) != 0) {
            count++;
            code += generateLayerCompare(0x500);
        }
        switch (count) {
            case 0:
                break;
            case 1:
                code = "lowerPixel = this.gfx.backdrop | 0;" + code;
                break;
            default:
                code = "lowerPixel = this.gfx.backdrop | 0; currentPixel = lowerPixel | 0;" + code;
        }
        code += generateColorEffects(doEffects, count);
        return generateLoopHead(compositeType, count, code);
    }
    function generateBlock(compositeType, doEffects) {
        var effectsPrefix = (doEffects) ? "special" : "normal";
        for (var layers = 0; layers < 0x20; layers++) {
            var code = generateLoopBody(compositeType, doEffects, layers);
            switch (compositeType) {
                case 0:
                    GameBoyAdvanceCompositor.prototype[effectsPrefix + layers] = Function(code);
                    break;
                case 1:
                    GameBoyAdvanceWindowCompositor.prototype[effectsPrefix + layers] = Function("xStart", "xEnd", code);
                    break;
                default:
                    GameBoyAdvanceOBJWindowCompositor.prototype[effectsPrefix + layers] = Function(code);
            }
        }
    }
    function generateAll() {
        for (var compositeType = 0; compositeType < 3; compositeType++) {
            generateBlock(compositeType, false);
            generateBlock(compositeType, true);
        }
    }
    generateAll();
}
generateCompositor();
