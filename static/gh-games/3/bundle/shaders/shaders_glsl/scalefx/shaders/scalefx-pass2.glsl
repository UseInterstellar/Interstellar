/*
	ScaleFX - Pass 2
	by Sp00kyFox, 2017-03-01

Filter:	Nearest
Scale:	1x

ScaleFX is an edge interpolation algorithm specialized in pixel art. It was
originally intended as an improvement upon Scale3x but became a new filter in
its own right.
ScaleFX interpolates edges up to level 6 and makes smooth transitions between
different slopes. The filtered picture will only consist of colours present
in the original.

Pass 2 resolves ambiguous configurations of corner candidates at pixel junctions.



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
COMPAT_VARYING vec4 t1;
COMPAT_VARYING vec4 t2;
COMPAT_VARYING vec4 t3;

// vertex compatibility #defines
#define vTexCoord TEX0.xy
#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    COL0 = COLOR;
    TEX0.xy = TexCoord.xy;
	float dx = SourceSize.z, dy = SourceSize.w;
	
	t1 = TEX0.xxxy + vec4(  -dx,   0., dx,  -dy);	// A, B, C
	t2 = TEX0.xxxy + vec4(  -dx,   0., dx,    0.);	// D, E, F
	t3 = TEX0.xxxy + vec4(  -dx,   0., dx,   dy);	// G, H, I
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
uniform sampler2D PassPrev2Texture;
COMPAT_VARYING vec4 TEX0;
COMPAT_VARYING vec4 t1;
COMPAT_VARYING vec4 t2;
COMPAT_VARYING vec4 t3;

// fragment compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

#define PassOutput0 PassPrev2Texture

#define LE(x, y) (1. - step(y, x))
#define GE(x, y) (1. - step(x, y))
#define LEQ(x, y) step(x, y)
#define GEQ(x, y) step(y, x)
#define NOT(x) (1. - (x))

// corner dominance at junctions
vec4 dom(vec3 x, vec3 y, vec3 z, vec3 w){
	return 2. * vec4(x.y, y.y, z.y, w.y) - (vec4(x.x, y.x, z.x, w.x) + vec4(x.z, y.z, z.z, w.z));
}

// necessary but not sufficient junction condition for orthogonal edges
float clear(vec2 crn, vec2 a, vec2 b){
	return (crn.x >= max(min(a.x, a.y), min(b.x, b.y))) && (crn.y >= max(min(a.x, b.y), min(b.x, a.y))) ? 1. : 0.;
}

void main()
{
	/*	grid		metric		pattern

		A B C		x y z		x y
		D E F		  o w		w z
		G H I
	*/

#ifdef GL_ES
	#define TEXm(x) COMPAT_TEXTURE(PassOutput0, x)
	#define TEXs(x) COMPAT_TEXTURE(Source, x)

	// metric data
	vec4 A = TEXm(t1.xw), B = TEXm(t1.yw);
	vec4 D = TEXm(t2.xw), E = TEXm(t2.yw), F = TEXm(t2.zw);
	vec4 G = TEXm(t3.xw), H = TEXm(t3.yw), I = TEXm(t3.zw);
	
	// strength data
	vec4 As = TEXs(t1.xw), Bs = TEXs(t1.yw), Cs = TEXs(t1.zw);
	vec4 Ds = TEXs(t2.xw), Es = TEXs(t2.yw), Fs = TEXs(t2.zw);
	vec4 Gs = TEXs(t3.xw), Hs = TEXs(t3.yw), Is = TEXs(t3.zw);
#else
	#define TEXm(x, y) textureOffset(PassOutput0, vTexCoord, ivec2(x, y))
	#define TEXs(x, y) textureOffset(Source, vTexCoord, ivec2(x, y))

	// metric data
	vec4 A = TEXm(-1,-1), B = TEXm( 0,-1);
	vec4 D = TEXm(-1, 0), E = TEXm( 0, 0), F = TEXm( 1, 0);
	vec4 G = TEXm(-1, 1), H = TEXm( 0, 1), I = TEXm( 1, 1);	

	// strength data
	vec4 As = TEXs(-1,-1), Bs = TEXs( 0,-1), Cs = TEXs( 1,-1);
	vec4 Ds = TEXs(-1, 0), Es = TEXs( 0, 0), Fs = TEXs( 1, 0);
	vec4 Gs = TEXs(-1, 1), Hs = TEXs( 0, 1), Is = TEXs( 1, 1);
#endif

	// strength & dominance junctions
	vec4 jSx = vec4(As.z, Bs.w, Es.x, Ds.y), jDx = dom(As.yzw, Bs.zwx, Es.wxy, Ds.xyz);
	vec4 jSy = vec4(Bs.z, Cs.w, Fs.x, Es.y), jDy = dom(Bs.yzw, Cs.zwx, Fs.wxy, Es.xyz);
	vec4 jSz = vec4(Es.z, Fs.w, Is.x, Hs.y), jDz = dom(Es.yzw, Fs.zwx, Is.wxy, Hs.xyz);
	vec4 jSw = vec4(Ds.z, Es.w, Hs.x, Gs.y), jDw = dom(Ds.yzw, Es.zwx, Hs.wxy, Gs.xyz);


	// majority vote for ambiguous dominance junctions
	vec4 zero4 = vec4(0.);
	vec4 jx = min(GE(jDx, zero4) * (LEQ(jDx.yzwx, zero4) * LEQ(jDx.wxyz, zero4) + GE(jDx + jDx.zwxy, jDx.yzwx + jDx.wxyz)), 1.);
	vec4 jy = min(GE(jDy, zero4) * (LEQ(jDy.yzwx, zero4) * LEQ(jDy.wxyz, zero4) + GE(jDy + jDy.zwxy, jDy.yzwx + jDy.wxyz)), 1.);
	vec4 jz = min(GE(jDz, zero4) * (LEQ(jDz.yzwx, zero4) * LEQ(jDz.wxyz, zero4) + GE(jDz + jDz.zwxy, jDz.yzwx + jDz.wxyz)), 1.);
	vec4 jw = min(GE(jDw, zero4) * (LEQ(jDw.yzwx, zero4) * LEQ(jDw.wxyz, zero4) + GE(jDw + jDw.zwxy, jDw.yzwx + jDw.wxyz)), 1.);


	// inject strength without creating new contradictions
	vec4 res;
	res.x = min(jx.z + NOT(jx.y) * NOT(jx.w) * GE(jSx.z, 0.) * (jx.x + GE(jSx.x + jSx.z, jSx.y + jSx.w)), 1.);
	res.y = min(jy.w + NOT(jy.z) * NOT(jy.x) * GE(jSy.w, 0.) * (jy.y + GE(jSy.y + jSy.w, jSy.x + jSy.z)), 1.);
	res.z = min(jz.x + NOT(jz.w) * NOT(jz.y) * GE(jSz.x, 0.) * (jz.z + GE(jSz.x + jSz.z, jSz.y + jSz.w)), 1.);
	res.w = min(jw.y + NOT(jw.x) * NOT(jw.z) * GE(jSw.y, 0.) * (jw.w + GE(jSw.y + jSw.w, jSw.x + jSw.z)), 1.);	


	// single pixel & end of line detection
	res = min(res * (vec4(jx.z, jy.w, jz.x, jw.y) + NOT(res.wxyz * res.yzwx)), 1.);


	// output

	vec4 clr;
	clr.x = clear(vec2(D.z, E.x), vec2(D.w, E.y), vec2(A.w, D.y));
	clr.y = clear(vec2(F.x, E.z), vec2(E.w, E.y), vec2(B.w, F.y));
	clr.z = clear(vec2(H.z, I.x), vec2(E.w, H.y), vec2(H.w, I.y));
	clr.w = clear(vec2(H.x, G.z), vec2(D.w, H.y), vec2(G.w, G.y));

	vec4 h = vec4(min(D.w, A.w), min(E.w, B.w), min(E.w, H.w), min(D.w, G.w));
	vec4 v = vec4(min(E.y, D.y), min(E.y, F.y), min(H.y, I.y), min(H.y, G.y));

	vec4 or   = GE(h + vec4(D.w, E.w, E.w, D.w), v + vec4(E.y, E.y, H.y, H.y));	// orientation
	vec4 hori = LE(h, v) * clr;	// horizontal edges
	vec4 vert = GE(h, v) * clr;	// vertical edges

	FragColor = (res + 2. * hori + 4. * vert + 8. * or) / 15.;
} 
#endif
