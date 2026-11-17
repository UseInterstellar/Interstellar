/*
   Hyllian's CRT Shader
  
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

#pragma parameter CRT_MULRES_X "CRT - Internal X Res Multiplier" 2.0 1.0 8.0 1.0
#pragma parameter CRT_MULRES_Y "CRT - Internal Y Res Multiplier" 2.0 1.0 8.0 1.0
#pragma parameter PHOSPHOR "CRT - Phosphor ON/OFF" 1.0 0.0 1.0 1.0
#pragma parameter InputGamma "CRT - Input gamma" 2.4 0.0 5.0 0.1
#pragma parameter OutputGamma "CRT - Output Gamma" 2.2 0.0 5.0 0.1
#pragma parameter SHARPNESS "CRT - Sharpness Hack" 1.0 1.0 5.0 1.0
#pragma parameter COLOR_BOOST "CRT - Color Boost" 1.5 1.0 2.0 0.05
#pragma parameter RED_BOOST "CRT - Red Boost" 1.0 1.0 2.0 0.01
#pragma parameter GREEN_BOOST "CRT - Green Boost" 1.0 1.0 2.0 0.01
#pragma parameter BLUE_BOOST "CRT - Blue Boost" 1.0 1.0 2.0 0.01
#pragma parameter SCANLINES_STRENGTH "CRT - Scanline Strength" 0.72 0.0 1.0 0.02
#pragma parameter BEAM_MIN_WIDTH "CRT - Min Beam Width" 0.86 0.0 1.0 0.02
#pragma parameter BEAM_MAX_WIDTH "CRT - Max Beam Width" 1.0 0.0 1.0 0.02
#pragma parameter CRT_ANTI_RINGING "CRT - Anti-Ringing" 0.8 0.0 1.0 0.1

#if defined(VERTEX)

#if __VERSION__ >= 130
#define COMPAT_VARYING out
#define COMPAT_ATTRIBUTE in
#define COMPAT_TEXTURE texture
#else
#define COMPAT_VARYING varying 
#define COMPAT_ATTRIBUTE attribute 
#define COMPAT_TEXTURE texture2D
#endif

#ifdef GL_ES
#define COMPAT_PRECISION mediump
#else
#define COMPAT_PRECISION
#endif

COMPAT_ATTRIBUTE vec4 VertexCoord;
COMPAT_ATTRIBUTE vec4 COLOR;
COMPAT_ATTRIBUTE vec4 TexCoord;
COMPAT_VARYING vec4 COL0;
COMPAT_VARYING vec4 TEX0;

vec4 _oPosition1; 
uniform mat4 MVPMatrix;
uniform COMPAT_PRECISION int FrameDirection;
uniform COMPAT_PRECISION int FrameCount;
uniform COMPAT_PRECISION vec2 OutputSize;
uniform COMPAT_PRECISION vec2 TextureSize;
uniform COMPAT_PRECISION vec2 InputSize;

// compatibility #defines
#define vTexCoord TEX0.xy
#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define OutSize vec4(OutputSize, 1.0 / OutputSize)

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    TEX0.xy = TexCoord.xy;
}

#elif defined(FRAGMENT)

#ifdef GL_ES
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#define COMPAT_PRECISION mediump
#else
#define COMPAT_PRECISION
#endif

#if __VERSION__ >= 130
#define COMPAT_VARYING in
#define COMPAT_TEXTURE texture
out COMPAT_PRECISION vec4 FragColor;
#else
#define COMPAT_VARYING varying
#define FragColor gl_FragColor
#define COMPAT_TEXTURE texture2D
#endif

uniform COMPAT_PRECISION int FrameDirection;
uniform COMPAT_PRECISION int FrameCount;
uniform COMPAT_PRECISION vec2 OutputSize;
uniform COMPAT_PRECISION vec2 TextureSize;
uniform COMPAT_PRECISION vec2 InputSize;
uniform sampler2D Texture;
COMPAT_VARYING vec4 TEX0;

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define OutSize vec4(OutputSize, 1.0 / OutputSize)

#ifdef PARAMETER_UNIFORM
uniform COMPAT_PRECISION float CRT_MULRES_X;
uniform COMPAT_PRECISION float CRT_MULRES_Y;
uniform COMPAT_PRECISION float PHOSPHOR;
uniform COMPAT_PRECISION float InputGamma;
uniform COMPAT_PRECISION float OutputGamma;
uniform COMPAT_PRECISION float SHARPNESS;
uniform COMPAT_PRECISION float COLOR_BOOST;
uniform COMPAT_PRECISION float RED_BOOST;
uniform COMPAT_PRECISION float GREEN_BOOST;
uniform COMPAT_PRECISION float BLUE_BOOST;
uniform COMPAT_PRECISION float SCANLINES_STRENGTH;
uniform COMPAT_PRECISION float BEAM_MIN_WIDTH;
uniform COMPAT_PRECISION float BEAM_MAX_WIDTH;
uniform COMPAT_PRECISION float CRT_ANTI_RINGING;
#else
#define CRT_MULRES_X 2.0
#define CRT_MULRES_Y 2.0
#define PHOSPHOR 1.0
#define InputGamma 2.4
#define OutputGamma 2.2
#define SHARPNESS 1.0
#define COLOR_BOOST 1.5
#define RED_BOOST 1.0
#define GREEN_BOOST 1.0
#define BLUE_BOOST 1.0
#define SCANLINES_STRENGTH 0.72
#define BEAM_MIN_WIDTH 0.86
#define BEAM_MAX_WIDTH 1.0
#define CRT_ANTI_RINGING 0.8 
#endif

#define mul(a,b) (b*a)
#define GAMMA_IN(color)     pow(color, vec4(InputGamma, InputGamma, InputGamma, InputGamma))
#define GAMMA_OUT(color)    pow(color, vec3(1.0 / OutputGamma, 1.0 / OutputGamma, 1.0 / OutputGamma))

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

// Change these params to configure the horizontal filter.
const float  B =  0.0; 
const float  C =  0.5;

mat4 invX = mat4(            (-B - 6.0*C)/6.0,         (3.0*B + 12.0*C)/6.0,     (-3.0*B - 6.0*C)/6.0,             B/6.0,
                                        (12.0 - 9.0*B - 6.0*C)/6.0, (-18.0 + 12.0*B + 6.0*C)/6.0,                      0.0, (6.0 - 2.0*B)/6.0,
                                       -(12.0 - 9.0*B - 6.0*C)/6.0, (18.0 - 15.0*B - 12.0*C)/6.0,      (3.0*B + 6.0*C)/6.0,             B/6.0,
                                                   (B + 6.0*C)/6.0,                           -C,                      0.0,               0.0);

const vec3 dtt = vec3(65536,255,1);

float reduce(vec3 A)
{
  return dot(A, dtt);
}

vec4 crt_hyllian_3d(vec2 texture_size, vec2 video_size, vec2 output_size, vec2 texCoord, sampler2D s_p)
{
    vec2 TexSize = vec2(SHARPNESS*texture_size.x, texture_size.y)/vec2(CRT_MULRES_X, CRT_MULRES_Y);

    vec3 color;
    vec2 dx = vec2(1.0/TexSize.x, 0.0);
    vec2 dy = vec2(0.0, 1.0/TexSize.y);
    vec2 pix_coord = texCoord*TexSize+vec2(-0.5,0.5);

    vec2 tc = (floor(pix_coord)+vec2(0.5,0.5))/TexSize;

    vec2 fp = fract(pix_coord);

    vec4 c00 = GAMMA_IN(COMPAT_TEXTURE(s_p, tc     - dx - dy));
    vec4 c01 = GAMMA_IN(COMPAT_TEXTURE(s_p, tc          - dy));
    vec4 c02 = GAMMA_IN(COMPAT_TEXTURE(s_p, tc     + dx - dy));
    vec4 c03 = GAMMA_IN(COMPAT_TEXTURE(s_p, tc + 2.0*dx - dy));
    vec4 c10 = GAMMA_IN(COMPAT_TEXTURE(s_p, tc     - dx));
    vec4 c11 = GAMMA_IN(COMPAT_TEXTURE(s_p, tc         ));
    vec4 c12 = GAMMA_IN(COMPAT_TEXTURE(s_p, tc     + dx));
    vec4 c13 = GAMMA_IN(COMPAT_TEXTURE(s_p, tc + 2.0*dx));

    //  Get min/max samples
    vec4 min_sample = min(min(c01,c11), min(c02,c12));
    vec4 max_sample = max(max(c01,c11), max(c02,c12));

    mat4 color_matrix0 = mat4(c00, c01, c02, c03);
    mat4 color_matrix1 = mat4(c10, c11, c12, c13);

    vec4 invX_Px  = mul(invX, vec4(fp.x*fp.x*fp.x, fp.x*fp.x, fp.x, 1.0));
    vec4 color0   = mul(invX_Px, color_matrix0);
    vec4 color1   = mul(invX_Px, color_matrix1);

    // Anti-ringing
    vec4 aux = color0;
    color0 = clamp(color0, min_sample, max_sample);
    color0 = mix(aux, color0, CRT_ANTI_RINGING);
    aux = color1;
    color1 = clamp(color1, min_sample, max_sample);
    color1 = mix(aux, color1, CRT_ANTI_RINGING);

    float pos0 = fp.y;
    float pos1 = 1.0 - fp.y;

    vec3 lum0 = mix(vec3(BEAM_MIN_WIDTH, BEAM_MIN_WIDTH, BEAM_MIN_WIDTH), vec3(BEAM_MAX_WIDTH, BEAM_MAX_WIDTH, BEAM_MAX_WIDTH), color0.xyz);
    vec3 lum1 = mix(vec3(BEAM_MIN_WIDTH, BEAM_MIN_WIDTH, BEAM_MIN_WIDTH), vec3(BEAM_MAX_WIDTH, BEAM_MAX_WIDTH, BEAM_MAX_WIDTH), color1.xyz);

    vec3 d0 = clamp(pos0/(lum0+0.0000001), 0.0, 1.0);
    vec3 d1 = clamp(pos1/(lum1+0.0000001), 0.0, 1.0);

    d0 = exp(-10.0*SCANLINES_STRENGTH*d0*d0);
    d1 = exp(-10.0*SCANLINES_STRENGTH*d1*d1);

    color = clamp(color0.xyz*d0+color1.xyz*d1, 0.0, 1.0);            

    color *= COLOR_BOOST*vec3(RED_BOOST, GREEN_BOOST, BLUE_BOOST);

    float mod_factor = texCoord.x * output_size.x * texture_size.x / video_size.x;

    vec3 dotMaskWeights = mix(
                                 vec3(1.0, 0.7, 1.0),
                                 vec3(0.7, 1.0, 0.7),
                                 floor(mod(mod_factor, 2.0))
                                  );

    color.rgb *= mix(vec3(1.0, 1.0, 1.0), dotMaskWeights, PHOSPHOR);

    color  = GAMMA_OUT(color);

    return vec4(color, 1.0);
}

void main()
{
    FragColor = crt_hyllian_3d(TextureSize.xy, InputSize.xy, OutputSize.xy, TEX0.xy, Texture);
} 
#endif
