/*
   Reverse Antialiasing Shader

   Adapted from the C source (see Copyright below) to shader
   cg language by Hyllian/Jararaca - sergiogdb@gmail.com

   This shader works best in 2x scale.

*/

/*
 *
 *  Copyright (c) 2012, Christoph Feck <christoph@maxiom.de>
 *  All Rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *    * Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 *
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 *  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 *  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 *  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 *
 */

#pragma parameter REVERSEAA_SHARPNESS "ReverseAA Sharpness" 2.0 0.0 10.0 0.01

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
// out variables go here as COMPAT_VARYING whatever

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

#ifdef PARAMETER_UNIFORM
uniform COMPAT_PRECISION float WHATEVER;
#else
#define WHATEVER 0.0
#endif

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    TEX0.xy = TexCoord.xy * 1.0001;
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
uniform COMPAT_PRECISION float REVERSEAA_SHARPNESS;
#else
#define REVERSEAA_SHARPNESS 2.0
#endif

#define P(x,y) COMPAT_TEXTURE(Source, coord + SourceSize.zw * vec2(x, y)).rgb

vec3 res2x(vec3 pre2, vec3 pre1, vec3 px, vec3 pos1, vec3 pos2)
{
    vec4 t, m;
    mat4 pre = mat4(vec4(pre2, 1.0), vec4(pre1, 1.0),   vec4(px, 1.0), vec4(pos1, 1.0));
    mat4 pos = mat4(vec4(pre1, 1.0),   vec4(px, 1.0), vec4(pos1, 1.0), vec4(pos2, 1.0));
    mat4  df = pos - pre;

    m = 0.5 - abs(vec4(px, 1.0) - 0.5);
    m = REVERSEAA_SHARPNESS * min(m, min(abs(df[1]), abs(df[2])));
    t = (7. * (df[1] + df[2]) - 3. * (df[0] + df[3])) / 16.;
    t = clamp(t, -m, m);

    return t.xyz;
}

void main()
{
   vec2 pos = fract(vTexCoord * SourceSize.xy) - vec2(0.5, 0.5);
   vec2 coord = vTexCoord - pos * SourceSize.zw;

   vec3 E = P( 0., 0.);
   vec3 _tx = res2x(P(-2.,0.), P(-1.,0.), E, P(1.,0.), P(2.,0.)) * pos.x;
   vec3 _ty = res2x(P(0.,-2.), P(0.,-1.), E, P(0.,1.), P(0.,2.)) * pos.y;
   vec3 res = clamp(E + 2.0*(_tx + _ty), 0.0, 1.0);

   FragColor = vec4(res, 1.0);
} 
#endif
