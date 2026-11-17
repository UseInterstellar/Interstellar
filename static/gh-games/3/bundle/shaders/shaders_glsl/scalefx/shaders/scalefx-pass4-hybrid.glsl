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

// Parameter lines go here:
#pragma parameter SFX_RAA "ScaleFX rAA Sharpness" 2.0 0.0 10.0 0.05

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

// vertex compatibility #defines
#define vTexCoord TEX0.xy
#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    COL0 = COLOR;
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
uniform sampler2D PassPrev5Texture;
COMPAT_VARYING vec4 TEX0;

// fragment compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)
#define Original PassPrev5Texture

#ifdef PARAMETER_UNIFORM
// All parameter floats need to have COMPAT_PRECISION in front of them
uniform COMPAT_PRECISION float SFX_RAA;
#else
#define SFX_RAA 2.0
#endif

// extract corners
vec4 loadCrn(vec4 x){
	return floor(mod(x*80. + 0.5, 9.));
}

// extract mids
vec4 loadMid(vec4 x){
	return floor(mod(x*8.888888 + 0.055555, 9.));
}

vec3 res2x(vec3 pre2, vec3 pre1, vec3 px, vec3 pos1, vec3 pos2)
{
	vec4 t, m;
	mat4 pre = mat4(vec4(pre2, 1.0), vec4(pre1, 1.0),   vec4(px, 1.0), vec4(pos1, 1.0));
    mat4 pos = mat4(vec4(pre1, 1.0),   vec4(px, 1.0), vec4(pos1, 1.0), vec4(pos2, 1.0));
    mat4  df = pos - pre;
	
	m = mix(vec4(px, 1.0), 1.-vec4(px, 1.0), step(vec4(px, 1.0), vec3(0.5)));	
	m = SFX_RAA * min(m, min(abs(df[1]), abs(df[2])));
	t = (7. * (df[1] + df[2]) - 3. * (df[0] + df[3])) / 16.;
	t = clamp(t, -m, m);
   
	return t.xyz;
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

	// determine subpixel
	vec2 fc = fract(vTexCoord * SourceSize.xy);
	vec2 fp = floor(3.0 * fc);
	
	// check adjacent pixels to prevent artifacts
	vec4 hn = COMPAT_TEXTURE(Source, vTexCoord + vec2(fp.x - 1., 0.) / SourceSize.xy);
	vec4 vn = COMPAT_TEXTURE(Source, vTexCoord + vec2(0., fp.y - 1.) / SourceSize.xy);

	// extract data
	vec4 crn = loadCrn(E), hc = loadCrn(hn), vc = loadCrn(vn);
	vec4 mid = loadMid(E), hm = loadMid(hn), vm = loadMid(vn);

	vec3 res = fp.y == 0. ? (fp.x == 0. ? vec3(crn.x, hc.y, vc.w) : fp.x == 1. ? vec3(mid.x, 0., vm.z) : vec3(crn.y, hc.x, vc.z)) : (fp.y == 1. ? (fp.x == 0. ? vec3(mid.w, hm.y, 0.) : fp.x == 1. ? vec3(0.) : vec3(mid.y, hm.w, 0.)) : (fp.x == 0. ? vec3(crn.w, hc.z, vc.x) : fp.x == 1. ? vec3(mid.z, 0., vm.x) : vec3(crn.z, hc.w, vc.y)));	
	

#define TEX(x, y) textureOffset(Original, vTexCoord, ivec2(x, y)).rgb

	// reverseAA
	vec3 E0 = TEX( 0, 0);
	vec3 B0 = TEX( 0,-1), B1 = TEX( 0,-2), H0 = TEX( 0, 1), H1 = TEX( 0, 2);
	vec3 D0 = TEX(-1, 0), D1 = TEX(-2, 0), F0 = TEX( 1, 0), F1 = TEX( 2, 0);

	// output coordinate - 0 = E0, 1 = D0, 2 = D1, 3 = F0, 4 = F1, 5 = B0, 6 = B1, 7 = H0, 8 = H1
	vec3 sfx = res.x == 1. ? D0 : res.x == 2. ? D1 : res.x == 3. ? F0 : res.x == 4. ? F1 : res.x == 5. ? B0 : res.x == 6. ? B1 : res.x == 7. ? H0 : H1;

	// rAA weight
	vec2 w = 2. * fc - 1.;
	w.x = res.y == 0. ? w.x : 0.;
	w.y = res.z == 0. ? w.y : 0.;

	// rAA filter
	vec3 t1 = res2x(D1, D0, E0, F0, F1);
	vec3 t2 = res2x(B1, B0, E0, H0, H1);

	vec3 a = min(min(min(min(B0,D0),E0),F0),H0);
	vec3 b = max(max(max(max(B0,D0),E0),F0),H0);
	vec3 raa = clamp(E0 + w.x*t1 + w.y*t2, a, b);

	// hybrid output
	FragColor = vec4((res.x != 0.) ? sfx : raa, 0.);	
} 
#endif
