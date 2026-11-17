/*
   Hyllian's CRT Shader - pass0
  
   Copyright (C) 2011-2016 Hyllian - sergiogdb@gmail.com

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.

*/

#pragma parameter SHARPNESS "CRT - Sharpness Hack" 1.0 1.0 5.0 1.0
#pragma parameter CRT_ANTI_RINGING "CRT - Anti-Ringing" 0.8 0.0 1.0 0.1
#pragma parameter InputGamma "CRT - Input gamma" 2.5 0.0 5.0 0.1

#define GAMMA_IN(color)     pow(color, vec4(InputGamma, InputGamma, InputGamma, InputGamma))

// Horizontal cubic filter.

// Some known filters use these values:

//    B = 0.0, C = 0.0  =>  Hermite cubic filter.
//    B = 1.0, C = 0.0  =>  Cubic B-Spline filter.
//    B = 0.0, C = 0.5  =>  Catmull-Rom Spline filter. This is the default used in this shader.
//    B = C = 1.0/3.0   =>  Mitchell-Netravali cubic filter.
//    B = 0.3782, C = 0.3109  =>  Robidoux filter.
//    B = 0.2620, C = 0.3690  =>  Robidoux Sharp filter.
//    B = 0.36, C = 0.28  =>  My best config for ringing elimination in pixel art (Hyllian).

// For more info, see: http://www.imagemagick.org/Usage/img_diagrams/cubic_survey.gif

#define texCoord TEX0

#if defined(VERTEX)

#if __VERSION__ >= 130
#define OUT out
#define IN  in
#define tex2D texture
#else
#define OUT varying 
#define IN attribute 
#define tex2D texture2D
#endif

#ifdef GL_ES
#define PRECISION mediump
#else
#define PRECISION
#endif


IN  vec4 VertexCoord;
IN  vec4 Color;
IN  vec2 TexCoord;
OUT vec4 color;
OUT vec2 texCoord;

uniform mat4 MVPMatrix;
uniform PRECISION int FrameDirection;
uniform PRECISION int FrameCount;
uniform PRECISION vec2 OutputSize;
uniform PRECISION vec2 TextureSize;
uniform PRECISION vec2 InputSize;

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    color = Color;
    texCoord = TexCoord;
}


#elif defined(FRAGMENT)

#if __VERSION__ >= 130
#define IN in
#define tex2D texture
out vec4 FragColor;
#else
#define IN varying
#define FragColor gl_FragColor
#define tex2D texture2D
#endif

#ifdef GL_ES
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#define PRECISION mediump
#else
#define PRECISION
#endif

uniform PRECISION int FrameDirection;
uniform PRECISION int FrameCount;
uniform PRECISION vec2 OutputSize;
uniform PRECISION vec2 TextureSize;
uniform PRECISION vec2 InputSize;
uniform sampler2D s_p;
IN vec2 texCoord;

#ifdef PARAMETER_UNIFORM
uniform PRECISION float SHARPNESS;
uniform PRECISION float CRT_ANTI_RINGING;
uniform PRECISION float InputGamma;
#else
#define SHARPNESS 1.0
#define CRT_ANTI_RINGING 0.8 
#define InputGamma 2.5
#endif
// END PARAMETERS //

// Change these params to configure the horizontal filter.
const  float  B =  0.0; 
const  float  C =  0.5;  

const  mat4 invX = mat4(                          (-B - 6.0*C)/6.0,   (12.0 - 9.0*B - 6.0*C)/6.0,  -(12.0 - 9.0*B - 6.0*C)/6.0,   (B + 6.0*C)/6.0,
                                              (3.0*B + 12.0*C)/6.0, (-18.0 + 12.0*B + 6.0*C)/6.0, (18.0 - 15.0*B - 12.0*C)/6.0,                -C,
                                              (-3.0*B - 6.0*C)/6.0,                          0.0,          (3.0*B + 6.0*C)/6.0,               0.0,
                                                             B/6.0,            (6.0 - 2.0*B)/6.0,                        B/6.0,               0.0);

void main()
{
    vec2 texture_size = vec2(SHARPNESS*TextureSize.x, TextureSize.y);

    vec4 color;
    vec2 dx = vec2(1.0/texture_size.x, 0.0);
    vec2 dy = vec2(0.0, 1.0/texture_size.y);
    vec2 pix_coord = texCoord*texture_size+vec2(-0.5,0.0);

    vec2 tc = (floor(pix_coord)+vec2(0.5,0.0))/texture_size;

    vec2 fp = fract(pix_coord);

    vec4 c10 = GAMMA_IN(tex2D(s_p, tc     - dx).xyzw);
    vec4 c11 = GAMMA_IN(tex2D(s_p, tc         ).xyzw);
    vec4 c12 = GAMMA_IN(tex2D(s_p, tc     + dx).xyzw);
    vec4 c13 = GAMMA_IN(tex2D(s_p, tc + 2.0*dx).xyzw);

    //  Get min/max samples
    vec4 min_sample = min(c11,c12);
    vec4 max_sample = max(c11,c12);

    mat4 color_matrix = mat4(c10, c11, c12, c13);

    vec4 lobes = vec4(fp.x*fp.x*fp.x, fp.x*fp.x, fp.x, 1.0);

    vec4 invX_Px  = invX * lobes;
    color         = color_matrix * invX_Px;

    // Anti-ringing
    vec4 aux = color;
    color = clamp(color, min_sample, max_sample);
    color = mix(aux, color, CRT_ANTI_RINGING);

    FragColor =  vec4(color);
}
#endif
