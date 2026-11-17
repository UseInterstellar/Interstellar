/*
   Hyllian's CRT Shader - pass1
  
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

#pragma parameter OutputGamma "CRT - Output Gamma" 2.2 0.0 5.0 0.1
#pragma parameter PHOSPHOR "CRT - Phosphor ON/OFF" 1.0 0.0 1.0 1.0
#pragma parameter COLOR_BOOST "CRT - Color Boost" 1.5 1.0 2.0 0.05
#pragma parameter RED_BOOST "CRT - Red Boost" 1.0 1.0 2.0 0.01
#pragma parameter GREEN_BOOST "CRT - Green Boost" 1.0 1.0 2.0 0.01
#pragma parameter BLUE_BOOST "CRT - Blue Boost" 1.0 1.0 2.0 0.01
#pragma parameter SCANLINES_STRENGTH "CRT - Scanline Strength" 0.72 0.0 1.0 0.02
#pragma parameter BEAM_MIN_WIDTH "CRT - Min Beam Width" 0.86 0.0 1.0 0.02
#pragma parameter BEAM_MAX_WIDTH "CRT - Max Beam Width" 1.0 0.0 1.0 0.02

#define GAMMA_OUT(color)    pow(color, vec3(1.0 / OutputGamma, 1.0 / OutputGamma, 1.0 / OutputGamma))

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
uniform PRECISION vec2 Pass1TextureSize;
uniform PRECISION vec2 Pass1InputSize;


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
uniform PRECISION vec2 Pass1TextureSize;
uniform PRECISION vec2 Pass1InputSize;
uniform sampler2D s_p;
IN vec2 texCoord;

#ifdef PARAMETER_UNIFORM
uniform PRECISION float OutputGamma;
uniform PRECISION float PHOSPHOR;
uniform PRECISION float COLOR_BOOST;
uniform PRECISION float RED_BOOST;
uniform PRECISION float GREEN_BOOST;
uniform PRECISION float BLUE_BOOST;
uniform PRECISION float SCANLINES_STRENGTH;
uniform PRECISION float BEAM_MIN_WIDTH;
uniform PRECISION float BEAM_MAX_WIDTH;
#else
#define OutputGamma 2.2
#define PHOSPHOR 1.0
#define COLOR_BOOST 1.5
#define RED_BOOST 1.0
#define GREEN_BOOST 1.0
#define BLUE_BOOST 1.0
#define SCANLINES_STRENGTH 0.72
#define BEAM_MIN_WIDTH 0.86
#define BEAM_MAX_WIDTH 1.0
#endif
// END PARAMETERS //

void main()
{
    vec2 texture_size = vec2(Pass1TextureSize.x, TextureSize.y);

    vec3 color;
    vec2 dx = vec2(1.0/texture_size.x, 0.0);
    vec2 dy = vec2(0.0, 1.0/texture_size.y);
    vec2 pix_coord = texCoord*texture_size+vec2(0.0,0.5);

    vec2 tc = (floor(pix_coord)+vec2(0.0,0.5))/texture_size;

    vec2 fp = fract(pix_coord);

    vec3 color0 = tex2D(s_p, tc - dy).xyz;
    vec3 color1 = tex2D(s_p, tc     ).xyz;

    float pos0 = fp.y;
    float pos1 = 1. - fp.y;

    vec3 lum0 = mix(vec3(BEAM_MIN_WIDTH), vec3(BEAM_MAX_WIDTH), color0);
    vec3 lum1 = mix(vec3(BEAM_MIN_WIDTH), vec3(BEAM_MAX_WIDTH), color1);

    vec3 d0 = clamp(pos0/(lum0+0.0000001), 0.0, 1.0);
    vec3 d1 = clamp(pos1/(lum1+0.0000001), 0.0, 1.0);

    d0 = exp(-10.0*SCANLINES_STRENGTH*d0*d0);
    d1 = exp(-10.0*SCANLINES_STRENGTH*d1*d1);

    color = clamp(color0*d0+color1*d1, 0.0, 1.0);            

    color *= COLOR_BOOST*vec3(RED_BOOST, GREEN_BOOST, BLUE_BOOST);
    float mod_factor = texCoord.x * OutputSize.x * Pass1TextureSize.x / Pass1InputSize.x;

    vec3 dotMaskWeights = mix(
                                 vec3(1.0, 0.7, 1.0),
                                 vec3(0.7, 1.0, 0.7),
                                 floor(mod(mod_factor, 2.0))
                                  );

    color.rgb *= mix(vec3(1.0, 1.0, 1.0), dotMaskWeights, PHOSPHOR);

    color  = GAMMA_OUT(color);

    FragColor =  vec4(color, 1.0);
}
#endif
