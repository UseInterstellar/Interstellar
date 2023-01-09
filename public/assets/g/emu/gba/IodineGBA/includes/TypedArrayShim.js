"use strict";
/*
 Copyright (C) 2012-2014 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function getInt8Array(size_t) {
    try {
        return new Int8Array(size_t);
    }
    catch (error) {
        return getArray(size_t);
    }
}
function getUint8Array(size_t) {
    try {
        return new Uint8Array(size_t);
    }
    catch (error) {
        return getArray(size_t);
    }
}
function getInt16Array(size_t) {
    try {
        return new Int16Array(size_t);
    }
    catch (error) {
        return getArray(size_t);
    }
}
function getUint16Array(size_t) {
    try {
        return new Uint16Array(size_t);
    }
    catch (error) {
        return getArray(size_t);
    }
}
function getUint16View(typed_array) {
    try {
        return new Uint16Array(typed_array.buffer);
    }
    catch (error) {
        return null;
    }
}
function getInt32Array(size_t) {
    try {
        return new Int32Array(size_t);
    }
    catch (error) {
        return getArray(size_t);
    }
}
function getInt32View(typed_array) {
    try {
        return new Int32Array(typed_array.buffer);
    }
    catch (error) {
        return null;
    }
}
function getInt32ViewCustom(typed_array, start, end) {
    try {
        return typed_array.subarray(start, end);
    }
    catch (error) {
        try {
            //Nightly Firefox 4 used to have the subarray function named as slice:
            return typed_array.slice(start, end);
        }
        catch (error) {
            return null;
        }
    }
}
function getUint32Array(size_t) {
    try {
        return new Uint32Array(size_t);
    }
    catch (error) {
        return getArray(size_t);
    }
}
function getFloat32Array(size_t) {
    try {
        return new Float32Array(size_t);
    }
    catch (error) {
        return getArray(size_t);
    }
}
function getArray(size_t) {
    var genericArray = [];
    for (var size_index = 0; size_index < size_t; ++size_index) {
        genericArray[size_index] = 0;
    }
    return genericArray;
}
var __VIEWS_SUPPORTED__ = getUint16View(getInt32Array(1)) !== null;
var __LITTLE_ENDIAN__ = (function () {
    if (__VIEWS_SUPPORTED__) {
        var test = getInt32Array(1);
        test[0] = 1;
        var test2 = getUint16View(test);
        if (test2[0] == 1) {
            return true;
        }
    }
    return false;
})();
