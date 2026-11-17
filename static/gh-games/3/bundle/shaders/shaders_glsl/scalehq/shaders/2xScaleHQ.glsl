/*
   2xGLSLHqFilter shader
   
   Copyright (C) 2005 guest(r) - guest.r@gmail.com

   This program is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public License
   as published by the Free Software Foundation; either version 2
   of the License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
*/

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
COMPAT_VARYING vec4 t1;
COMPAT_VARYING vec4 t2;
COMPAT_VARYING vec4 t3;
COMPAT_VARYING vec4 t4;

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
   float x = 0.5 * SourceSize.z;
   float y = 0.5 * SourceSize.w;
   vec2 dg1 = vec2( x, y);
   vec2 dg2 = vec2(-x, y);
   vec2 dx = vec2(x, 0.0);
   vec2 dy = vec2(0.0, y);
   t1 = vec4(vTexCoord - dg1, vTexCoord - dy);
   t2 = vec4(vTexCoord - dg2, vTexCoord + dx);
   t3 = vec4(vTexCoord + dg1, vTexCoord + dy);
   t4 = vec4(vTexCoord + dg2, vTexCoord - dx);
}

#elif defined(FRAGMENT)

#if __VERSION__ >= 130
#define COMPAT_VARYING in
#define COMPAT_TEXTURE texture
out vec4 FragColor;
#else
#define COMPAT_VARYING varying
#define FragColor gl_FragColor
#define COMPAT_TEXTURE texture2D
#endif

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

uniform COMPAT_PRECISION int FrameDirection;
uniform COMPAT_PRECISION int FrameCount;
uniform COMPAT_PRECISION vec2 OutputSize;
uniform COMPAT_PRECISION vec2 TextureSize;
uniform COMPAT_PRECISION vec2 InputSize;
uniform sampler2D Texture;
COMPAT_VARYING vec4 TEX0;
COMPAT_VARYING vec4 t1;
COMPAT_VARYING vec4 t2;
COMPAT_VARYING vec4 t3;
COMPAT_VARYING vec4 t4;

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define OutSize vec4(OutputSize, 1.0 / OutputSize)

float mx = 0.325;      // start smoothing wt.
float k = -0.250;      // wt. decrease factor
float max_w = 0.25;    // max filter weight
float min_w =-0.05;    // min filter weight
float lum_add = 0.25;  // affects smoothing
vec3 dt = vec3(1.0);

void main()
{
   vec3 c00 = COMPAT_TEXTURE(Source, t1.xy).xyz; 
   vec3 c10 = COMPAT_TEXTURE(Source, t1.zw).xyz; 
   vec3 c20 = COMPAT_TEXTURE(Source, t2.xy).xyz; 
   vec3 c01 = COMPAT_TEXTURE(Source, t4.zw).xyz; 
   vec3 c11 = COMPAT_TEXTURE(Source, vTexCoord).xyz; 
   vec3 c21 = COMPAT_TEXTURE(Source, t2.zw).xyz; 
   vec3 c02 = COMPAT_TEXTURE(Source, t4.xy).xyz; 
   vec3 c12 = COMPAT_TEXTURE(Source, t3.zw).xyz; 
   vec3 c22 = COMPAT_TEXTURE(Source, t3.xy).xyz; 

   float md1 = dot(abs(c00 - c22), dt);
   float md2 = dot(abs(c02 - c20), dt);

   float w1 = dot(abs(c22 - c11), dt) * md2;
   float w2 = dot(abs(c02 - c11), dt) * md1;
   float w3 = dot(abs(c00 - c11), dt) * md2;
   float w4 = dot(abs(c20 - c11), dt) * md1;

   float t1 = w1 + w3;
   float t2 = w2 + w4;
   float ww = max(t1, t2) + 0.0001;

   c11 = (w1 * c00 + w2 * c20 + w3 * c22 + w4 * c02 + ww * c11) / (t1 + t2 + ww);

   float lc1 = k / (0.12 * dot(c10 + c12 + c11, dt) + lum_add);
   float lc2 = k / (0.12 * dot(c01 + c21 + c11, dt) + lum_add);

   w1 = clamp(lc1 * dot(abs(c11 - c10), dt) + mx, min_w, max_w);
   w2 = clamp(lc2 * dot(abs(c11 - c21), dt) + mx, min_w, max_w);
   w3 = clamp(lc1 * dot(abs(c11 - c12), dt) + mx, min_w, max_w);
   w4 = clamp(lc2 * dot(abs(c11 - c01), dt) + mx, min_w, max_w);
   FragColor = vec4(w1 * c10 + w2 * c21 + w3 * c12 + w4 * c01 + (1.0 - w1 - w2 - w3 - w4) * c11, 1.0);
} 
#endif
