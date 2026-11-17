/*
   Copyright (C) 2010 Team XBMC
   http://www.xbmc.org
   Copyright (C) 2011 Stefanos A.
   http://www.opentk.com

This Program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2, or (at your option)
any later version.

This Program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with XBMC; see the file COPYING.  If not, write to
the Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.
http://www.gnu.org/copyleft/gpl.html
*/

// Default to Mitchel-Netravali coefficients for best psychovisual result
// bicubic-sharp is B = 0.1 and C = 0.5
// bicubic-sharper is B = 0.0 and C = 0.75
#pragma parameter B "Bicubic Coeff B" 0.33 0.0 1.0 0.01
#pragma parameter C "Bicubic Coeff C" 0.33 0.0 1.0 0.01

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
COMPAT_ATTRIBUTE vec4 TexCoord;
COMPAT_VARYING vec4 TEX0;

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
uniform COMPAT_PRECISION float B, C;
#else
#define B 0.3333
#define C 0.3333
#endif

float weight(float x)
{
	float ax = abs(x);

	if (ax < 1.0)
	{
		return
			(
			 pow(x, 2.0) * ((12.0 - 9.0 * B - 6.0 * C) * ax + (-18.0 + 12.0 * B + 6.0 * C)) +
			 (6.0 - 2.0 * B)
			) / 6.0;
	}
	else if ((ax >= 1.0) && (ax < 2.0))
	{
		return
			(
			 pow(x, 2.0) * ((-B - 6.0 * C) * ax + (6.0 * B + 30.0 * C)) +
			 (-12.0 * B - 48.0 * C) * ax + (8.0 * B + 24.0 * C)
			) / 6.0;
	}
	else
	{
		return 0.0;
	}
}
	
vec4 weight4(float x)
{
	return vec4(
			weight(x - 2.0),
			weight(x - 1.0),
			weight(x),
			weight(x + 1.0));
}

vec3 pixel(float xpos, float ypos, sampler2D tex)
{
	return COMPAT_TEXTURE(tex, vec2(xpos, ypos)).rgb;
}

vec3 line_run(float ypos, vec4 xpos, vec4 linetaps, sampler2D tex)
{
	return
		pixel(xpos.r, ypos, tex) * linetaps.r +
		pixel(xpos.g, ypos, tex) * linetaps.g +
		pixel(xpos.b, ypos, tex) * linetaps.b +
		pixel(xpos.a, ypos, tex) * linetaps.a;
}

void main()
{
        vec2 stepxy = vec2(1.0/SourceSize.x, 1.0/SourceSize.y);
        vec2 pos = vTexCoord.xy + stepxy * 0.5;
        vec2 f = fract(pos / stepxy);
		
	vec4 linetaps   = weight4(1.0 - f.x);
	vec4 columntaps = weight4(1.0 - f.y);

	//make sure all taps added together is exactly 1.0, otherwise some (very small) distortion can occur
	linetaps /= linetaps.r + linetaps.g + linetaps.b + linetaps.a;
	columntaps /= columntaps.r + columntaps.g + columntaps.b + columntaps.a;

	vec2 xystart = (-1.5 - f) * stepxy + pos;
	vec4 xpos = vec4(xystart.x, xystart.x + stepxy.x, xystart.x + stepxy.x * 2.0, xystart.x + stepxy.x * 3.0);


// final sum and weight normalization
   vec4 final = vec4(line_run(xystart.y                 , xpos, linetaps, Source) * columntaps.r +
                      line_run(xystart.y + stepxy.y      , xpos, linetaps, Source) * columntaps.g +
                      line_run(xystart.y + stepxy.y * 2.0, xpos, linetaps, Source) * columntaps.b +
                      line_run(xystart.y + stepxy.y * 3.0, xpos, linetaps, Source) * columntaps.a,1);

   FragColor = final;
} 
#endif
