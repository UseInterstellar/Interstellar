/*
   Copyright (C) 2018 guest(r) - guest.r@gmail.com

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

#pragma parameter AAOFFSET "AA offset first pass" 1.0 0.25 2.0 0.05 

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
    TEX0.xy = TexCoord.xy * 1.00001;
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
uniform COMPAT_PRECISION float AAOFFSET;
#else
#define AAOFFSET  1.0
#endif 

void main()
{
   vec2 tex = vTexCoord;	
   vec2 texsize = SourceSize.xy;
   float dx = AAOFFSET/texsize.x;
   float dy = AAOFFSET/texsize.y;
   vec3 dt = vec3(1.0, 1.0, 1.0);
   
   vec4 yx = vec4( dx, dy,-dx,-dy);
   vec4 xh = vec4( 1.4*dx, 4.4*dy, -1.4*dx, -4.4*dy);
   vec4 yv = vec4( 4.4*dx, 1.4*dy, -4.4*dx, -1.4*dy);
   vec2 xx = vec2( 3.4*dx, 0.0);
   vec2 yy = vec2( 0.0, 3.4*dy);
   
   vec3 c11 = COMPAT_TEXTURE(Source, tex        ).xyz;  
   vec3 s00 = COMPAT_TEXTURE(Source, tex + yx.zw).xyz;
   vec3 s20 = COMPAT_TEXTURE(Source, tex + yx.xw).xyz;
   vec3 s22 = COMPAT_TEXTURE(Source, tex + yx.xy).xyz;
   vec3 s02 = COMPAT_TEXTURE(Source, tex + yx.zy).xyz;
   vec3 h00 = COMPAT_TEXTURE(Source, tex + xh.zw).xyz;
   vec3 h20 = COMPAT_TEXTURE(Source, tex + xh.xw).xyz;
   vec3 h22 = COMPAT_TEXTURE(Source, tex + xh.xy).xyz;
   vec3 h02 = COMPAT_TEXTURE(Source, tex + xh.zy).xyz;
   vec3 v00 = COMPAT_TEXTURE(Source, tex + yv.zw).xyz;
   vec3 v20 = COMPAT_TEXTURE(Source, tex + yv.xw).xyz;
   vec3 v22 = COMPAT_TEXTURE(Source, tex + yv.xy).xyz;
   vec3 v02 = COMPAT_TEXTURE(Source, tex + yv.zy).xyz;
   vec3 c10 = COMPAT_TEXTURE(Source, tex - yy   ).xyz;     
   vec3 c21 = COMPAT_TEXTURE(Source, tex + xx   ).xyz;
   vec3 c12 = COMPAT_TEXTURE(Source, tex + yy   ).xyz;
   vec3 c01 = COMPAT_TEXTURE(Source, tex - xx   ).xyz;
   
   float m1=1.0/(dot(abs(s00-s22),dt)+0.00001);
   float m2=1.0/(dot(abs(s02-s20),dt)+0.00001);
   float h1=1.0/(dot(abs(c10-h22),dt)+0.00001);
   float h2=1.0/(dot(abs(c12-h20),dt)+0.00001);
   float h3=1.0/(dot(abs(h00-c12),dt)+0.00001);
   float h4=1.0/(dot(abs(h02-c10),dt)+0.00001);
   float v1=1.0/(dot(abs(c01-v22),dt)+0.00001);
   float v2=1.0/(dot(abs(c01-v20),dt)+0.00001);
   float v3=1.0/(dot(abs(v00-c21),dt)+0.00001);
   float v4=1.0/(dot(abs(v02-c21),dt)+0.00001);

   vec3 t1 = 0.5*(m1*(s00+s22)+m2*(s02+s20))/(m1+m2);
   vec3 t2 = 0.5*(h1*(c10+h22)+h2*(c12+h20)+h3*(h00+c12)+h4*(h02+c10))/(h1+h2+h3+h4);
   vec3 t3 = 0.5*(v1*(c01+v22)+v2*(c01+v20)+v3*(v00+c21)+v4*(v02+c21))/(v1+v2+v3+v4); 

   float k1 = 1.0/(dot(abs(t1-c11),dt)+0.00001);
   float k2 = 1.0/(dot(abs(t2-c11),dt)+0.00001);
   float k3 = 1.0/(dot(abs(t3-c11),dt)+0.00001);

   FragColor =  vec4((k1*t1 + k2*t2 + k3*t3)/(k1+k2+k3),1.0);
} 
#endif 
