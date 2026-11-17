/*
   4xGLSLHqFilter shader
   
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
COMPAT_VARYING vec4 t5;
COMPAT_VARYING vec4 t6;

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
   vec2 sd1 = dg1 * 0.5;
   vec2 sd2 = dg2 * 0.5;
   vec2 ddx = vec2(x, 0.0);
   vec2 ddy = vec2(0.0, y);
   t1 = vec4(vTexCoord - sd1, vTexCoord - ddy);
   t2 = vec4(vTexCoord - sd2, vTexCoord + ddx);
   t3 = vec4(vTexCoord + sd1, vTexCoord + ddy);
   t4 = vec4(vTexCoord + sd2, vTexCoord - ddx);
   t5 = vec4(vTexCoord - dg1, vTexCoord - dg2);
   t6 = vec4(vTexCoord + dg1, vTexCoord + dg2);
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
COMPAT_VARYING vec4 t5;
COMPAT_VARYING vec4 t6;

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define OutSize vec4(OutputSize, 1.0 / OutputSize)

float mx = 1.0;      // start smoothing wt.
float k = -1.10;      // wt. decrease factor
float max_w = 0.75;    // max filter weight
float min_w = 0.03;    // min filter weight
float lum_add = 0.33;  // affects smoothing
vec3 dt = vec3(1.0);

void main()
{
   vec3 c  = COMPAT_TEXTURE(Source, vTexCoord).xyz;
   vec3 i1 = COMPAT_TEXTURE(Source, t1.xy).xyz; 
   vec3 i2 = COMPAT_TEXTURE(Source, t2.xy).xyz; 
   vec3 i3 = COMPAT_TEXTURE(Source, t3.xy).xyz; 
   vec3 i4 = COMPAT_TEXTURE(Source, t4.xy).xyz; 
   vec3 o1 = COMPAT_TEXTURE(Source, t5.xy).xyz; 
   vec3 o3 = COMPAT_TEXTURE(Source, t6.xy).xyz; 
   vec3 o2 = COMPAT_TEXTURE(Source, t5.zw).xyz;
   vec3 o4 = COMPAT_TEXTURE(Source, t6.zw).xyz;
   vec3 s1 = COMPAT_TEXTURE(Source, t1.zw).xyz; 
   vec3 s2 = COMPAT_TEXTURE(Source, t2.zw).xyz; 
   vec3 s3 = COMPAT_TEXTURE(Source, t3.zw).xyz; 
   vec3 s4 = COMPAT_TEXTURE(Source, t4.zw).xyz; 

   float ko1=dot(abs(o1-c),dt);
   float ko2=dot(abs(o2-c),dt);
   float ko3=dot(abs(o3-c),dt);
   float ko4=dot(abs(o4-c),dt);

   float k1=min(dot(abs(i1-i3),dt),max(ko1,ko3));
   float k2=min(dot(abs(i2-i4),dt),max(ko2,ko4));

   float w1 = k2; if(ko3<ko1) w1*=ko3/ko1;
   float w2 = k1; if(ko4<ko2) w2*=ko4/ko2;
   float w3 = k2; if(ko1<ko3) w3*=ko1/ko3;
   float w4 = k1; if(ko2<ko4) w4*=ko2/ko4;

   c=(w1*o1+w2*o2+w3*o3+w4*o4+0.001*c)/(w1+w2+w3+w4+0.001);
   w1 = k*dot(abs(i1-c)+abs(i3-c),dt)/(0.125*dot(i1+i3,dt)+lum_add);
   w2 = k*dot(abs(i2-c)+abs(i4-c),dt)/(0.125*dot(i2+i4,dt)+lum_add);
   w3 = k*dot(abs(s1-c)+abs(s3-c),dt)/(0.125*dot(s1+s3,dt)+lum_add);
   w4 = k*dot(abs(s2-c)+abs(s4-c),dt)/(0.125*dot(s2+s4,dt)+lum_add);

   w1 = clamp(w1+mx,min_w,max_w); 
   w2 = clamp(w2+mx,min_w,max_w);
   w3 = clamp(w3+mx,min_w,max_w); 
   w4 = clamp(w4+mx,min_w,max_w);

   FragColor = vec4((w1*(i1+i3)+w2*(i2+i4)+w3*(s1+s3)+w4*(s2+s4)+c)/(2.0*(w1+w2+w3+w4)+1.0), 1.0);
} 
#endif
