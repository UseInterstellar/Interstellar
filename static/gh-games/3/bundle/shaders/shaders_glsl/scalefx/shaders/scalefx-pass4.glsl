/*
	ScaleFX - Pass 4
	by Sp00kyFox, 2017-03-01

Filter:	Nearest
Scale:	3x

ScaleFX is an edge interpolation algorithm specialized in pixel art. It was
originally intended as an improvement upon Scale3x but became a new filter in
its own right.
ScaleFX interpolates edges up to level 6 and makes smooth transitions between
different slopes. The filtered picture will only consist of colours present
in the original.

Pass 4 outputs subpixels based on previously calculated tags.


Copyright (c) 2016 Sp00kyFox - ScaleFX@web.de

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

uniform mat4 MVPMatrix;
uniform COMPAT_PRECISION int FrameDirection;
uniform COMPAT_PRECISION int FrameCount;
uniform COMPAT_PRECISION vec2 OutputSize;
uniform COMPAT_PRECISION vec2 TextureSize;
uniform COMPAT_PRECISION vec2 InputSize;
uniform COMPAT_PRECISION vec2 PassPrev5TextureSize;
uniform COMPAT_PRECISION vec2 PassPrev5InputSize;
COMPAT_VARYING vec4 t1;
COMPAT_VARYING vec4 t2;
COMPAT_VARYING vec4 t3;
COMPAT_VARYING vec4 t4;

// vertex compatibility #defines
#define vTexCoord TEX0.xy
#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    COL0 = COLOR;
    TEX0.xy = TexCoord.xy;
	
	vec2 ps = 1.0/PassPrev5TextureSize;
	float dx = ps.x, dy = ps.y;

	t1 = TEX0.xxxy + vec4( 0., -dx, -2.*dx,     0.);	// E, D, D0
	t2 = TEX0.xyxy + vec4(dx,   0,  2.*dx,     0.);	// F, F0
	t3 = TEX0.xyxy + vec4( 0., -dy,     0., -2.*dy);	// B, B0
	t4 = TEX0.xyxy + vec4( 0.,  dy,     0.,  2.*dy);	// H, H0
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
uniform sampler2D PassPrev5Texture;
COMPAT_VARYING vec4 TEX0;
COMPAT_VARYING vec4 t1;
COMPAT_VARYING vec4 t2;
COMPAT_VARYING vec4 t3;
COMPAT_VARYING vec4 t4;

// fragment compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

// extract corners
vec4 loadCrn(vec4 x){
	return floor(mod(x*80. + 0.5, 9.));
}

// extract mids
vec4 loadMid(vec4 x){
	return floor(mod(x*8.888888 + 0.055555, 9.));
}

void main()
{
	/*	grid		corners		mids

		  B		x   y	  	  x
		D E F				w   y
		  H		w   z	  	  z
	*/


	// read data
	vec4 E = COMPAT_TEXTURE(Source, vTexCoord);

	// extract data
	vec4 crn = loadCrn(E);
	vec4 mid = loadMid(E);

	// determine subpixel
	vec2 fp = floor(3.0 * fract(vTexCoord * SourceSize.xy));
	float sp = fp.y == 0. ? (fp.x == 0. ? crn.x : fp.x == 1. ? mid.x : crn.y) : (fp.y == 1. ? (fp.x == 0. ? mid.w : fp.x == 1. ? 0. : mid.y) : (fp.x == 0. ? crn.w : fp.x == 1. ? mid.z : crn.z));

	// output coordinate - 0 = E, 1 = D, 2 = D0, 3 = F, 4 = F0, 5 = B, 6 = B0, 7 = H, 8 = H0
	vec2 res = sp == 0. ? vec2(0.,0.) : sp == 1. ? vec2(-1.,0.) : sp == 2. ? vec2(-2.,0.) : sp == 3. ? vec2(1.,0.) : sp == 4. ? vec2(2.,0.) : sp == 5. ? vec2(0,-1) : sp == 6. ? vec2(0.,-2.) : sp == 7. ? vec2(0.,1.) : vec2(0.,2.);

	// ouput
	FragColor = COMPAT_TEXTURE(PassPrev5Texture, vTexCoord + res / SourceSize.xy);
} 
#endif
