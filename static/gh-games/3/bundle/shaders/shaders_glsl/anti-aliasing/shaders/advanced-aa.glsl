/*
   Copyright (C) 2006 guest(r) - guest.r@gmail.com

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

/*
   The AdvancedAA shader is well used to:
   - AA 2xscaled gfx. to its 4x absolute size,   
   - AA hi-res "screens" (640x480) to their 2x size or,
   - AA gfx. back to it's original size (looks nice above 640x480, set scaling to 1.0) 
*/

#pragma parameter AA_RESOLUTION_X "AA Input Res X" 0.0 0.0 1920.0 1.0
#pragma parameter AA_RESOLUTION_Y "AA Input Res Y" 0.0 0.0 1920.0 1.0

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
#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)
#define vTexCoord TEX0.xy

#ifdef PARAMETER_UNIFORM
// All parameter floats need to have COMPAT_PRECISION in front of them
uniform COMPAT_PRECISION float AA_RESOLUTION_X;
uniform COMPAT_PRECISION float AA_RESOLUTION_Y;
#else
#define AA_RESOLUTION_X 0.0
#define AA_RESOLUTION_Y 0.0
#endif

#define AA_RESOLUTION_X_DEF SourceSize.x
#define AA_RESOLUTION_Y_DEF SourceSize.y

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    COL0 = COLOR;
    TEX0.xy = TexCoord.xy;
	
   	vec2 ps = vec2(1.0/((AA_RESOLUTION_X == 0.0) ? AA_RESOLUTION_X_DEF : AA_RESOLUTION_X), 1.0/((AA_RESOLUTION_Y == 0.0) ? AA_RESOLUTION_Y_DEF : AA_RESOLUTION_Y));
	float dx = ps.x*0.5;
	float dy = ps.y*0.5;
	
	t1.xy = vTexCoord + vec2(-dx, 0);
	t2.xy = vTexCoord + vec2( dx, 0);
	t3.xy = vTexCoord + vec2( 0,-dy);
	t4.xy = vTexCoord + vec2( 0, dy);
	t1.zw = vTexCoord + vec2(-dx,-dy);
	t2.zw = vTexCoord + vec2(-dx, dy);
	t3.zw = vTexCoord + vec2( dx,-dy);
	t4.zw = vTexCoord + vec2( dx, dy);
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

vec3  dt = vec3(1.,1.,1.);

void main()
{
   vec3 c00 = COMPAT_TEXTURE(Source, t1.zw).xyz; 
   vec3 c10 = COMPAT_TEXTURE(Source, t3.xy).xyz;
   vec3 c20 = COMPAT_TEXTURE(Source, t3.zw).xyz;
   vec3 c01 = COMPAT_TEXTURE(Source, t1.xy).xyz;
   vec3 c11 = COMPAT_TEXTURE(Source, vTexCoord).xyz;
   vec3 c21 = COMPAT_TEXTURE(Source, t2.xy).xyz;
   vec3 c02 = COMPAT_TEXTURE(Source, t2.zw).xyz;
   vec3 c12 = COMPAT_TEXTURE(Source, t4.xy).xyz;
   vec3 c22 = COMPAT_TEXTURE(Source, t4.zw).xyz;

   float d1=dot(abs(c00-c22),dt)+0.0001;
   float d2=dot(abs(c20-c02),dt)+0.0001;
   float hl=dot(abs(c01-c21),dt)+0.0001;
   float vl=dot(abs(c10-c12),dt)+0.0001;
   
   float k1=0.5*(hl+vl);
   float k2=0.5*(d1+d2);

   vec3 t1=(hl*(c10+c12)+vl*(c01+c21)+k1*c11)/(2.5*(hl+vl));
   vec3 t2=(d1*(c20+c02)+d2*(c00+c22)+k2*c11)/(2.5*(d1+d2));

   k1=dot(abs(t1-c11),dt)+0.0001;
   k2=dot(abs(t2-c11),dt)+0.0001;
   
   FragColor = vec4((k1*t2+k2*t1)/(k1+k2),1);
} 
#endif
