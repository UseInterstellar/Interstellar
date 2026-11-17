/*
	rAA post-3x - Pass 1
	by Sp00kyFox, 2018-10-20

Filter:	Nearest
Scale:	1x

This is a generalized continuation of the reverse antialiasing filter by
Christoph Feck. Unlike the original filter this is supposed to be used on an
already upscaled image. Which makes it possible to combine rAA with other filters
just as ScaleFX, xBR or others.

Pass 1 does the vertical filtering.



Copyright (c) 2018 Sp00kyFox - ScaleFX@web.de

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

#pragma parameter RAA_SHR1 "rAA-3x 1 Sharpness"  2.0 0.00 10.0 0.05
#pragma parameter RAA_SMT1 "rAA-3x 1 Smoothness" 0.5 0.05 10.0 0.05
#pragma parameter RAA_DVT1 "rAA-3x 1 Deviation"  1.0 0.05 10.0 0.05

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
uniform COMPAT_PRECISION float RAA_SHR1, RAA_SMT1, RAA_DVT1;
#else
#define RAA_SHR1 2.0
#define RAA_SMT1 0.5
#define RAA_DVT1 1.0
#endif

const int scl = 3; // scale factor
const int rad = 7; // search radius

// core function of rAA - tilt of a pixel
vec3 res2x(vec3 pre2, vec3 pre1, vec3 px, vec3 pos1, vec3 pos2)
{
    float d1, d2, w;
	vec4 a, m, t, t1, t2;
    mat4 pre = mat4(vec4(pre2, 1.0), vec4(pre1, 1.0),   vec4(px, 1.0), vec4(pos1, 1.0));
    mat4 pos = mat4(vec4(pre1, 1.0),   vec4(px, 1.0), vec4(pos1, 1.0), vec4(pos2, 1.0));
    mat4  df = pos - pre;

    m.x = (px.x < 0.5) ? px.x : (1.0-px.x);
    m.y = (px.y < 0.5) ? px.y : (1.0-px.y);
    m.z = (px.z < 0.5) ? px.z : (1.0-px.z);
	m = RAA_SHR1 * min(m, min(abs(df[1]), abs(df[2])));   // magnitude
	t = (7. * (df[1] + df[2]) - 3. * (df[0] + df[3])) / 16.; // tilt
	
	a.x = t.x == 0.0 ? 1.0 : m.x/abs(t.x);
   a.y = t.y == 0.0 ? 1.0 : m.y/abs(t.y);
   a.z = t.z == 0.0 ? 1.0 : m.z/abs(t.z);
	t1 = clamp(t, -m, m);                       // limit channels
	t2 = min(1.0, min(min(a.x, a.y), a.z)) * t; // limit length
	
	d1 = length(df[1]); d2 = length(df[2]);
	d1 = d1 == 0.0 ? 0.0 : length(cross(df[1].xyz, t1.xyz))/d1; // distance between line (px, pre1) and point px-t1
	d2 = d2 == 0.0 ? 0.0 : length(cross(df[2].xyz, t1.xyz))/d2; // distance between line (px, pos1) and point px+t1

	w = min(1.0, max(d1,d2)/0.8125); // color deviation from optimal value
	
	return mix(t1.xyz, t2.xyz, pow(w, RAA_DVT1));
}

void main()
{
	// read texels

	vec3 tx[2*rad+1];

	#define TX(n) tx[(n)+rad]
	
	TX(0) = COMPAT_TEXTURE(Source, vTexCoord).rgb;
	
	for(int i=1; i<=rad; i++){
		TX(-i) = COMPAT_TEXTURE(Source, vTexCoord + vec2(0,-i)*SourceSize.zw).rgb;
		TX( i) = COMPAT_TEXTURE(Source, vTexCoord + vec2(0, i)*SourceSize.zw).rgb;
	}
	
	
	// prepare variables for candidate search
	
	ivec2 i1 = ivec2(0), i2 = ivec2(0);
	vec3 df1, df2;
	vec2 d1, d2, d3;
	bvec2 cn;
	
	df1 = TX(1)-TX(0); df2 = TX(0)-TX(-1);
	
	d2 = vec2(length(df1), length(df2));
	d3 = d2.yx;
	
	
	// smoothness weight, protects smooth gradients
	float sw = d2.x + d2.y;
	sw = sw == 0.0 ? 1.0 : pow(length(df1-df2)/sw, RAA_SMT1);
	
	
	// look for proper candidates
	for(int i=1; i<rad; i++){
		d1 = d2;
		d2 = d3;
		d3 = vec2(distance(TX(-i-1), TX(-i)), distance(TX(i), TX(i+1)));
		cn.x = max(d1.x,d3.x)<d2.x;
      cn.y = max(d1.y,d3.y)<d2.y;
		i2.x = cn.x && i2.x==0 && i1.x!=0 ? i : i2.x;
      i2.y = cn.y && i2.y==0 && i1.y!=0 ? i : i2.y;
		i1.x = cn.x && i1.x==0 ? i : i1.x;
      i1.y = cn.y && i1.y==0 ? i : i1.y;
	}

	i2.x = i2.x == 0 ? i1.x+1 : i2.x;
   i2.y = i2.y == 0 ? i1.y+1 : i2.y;

	
	// rAA core with the candidates found above
	vec3 t = res2x(TX(-i2.x), TX(-i1.x), TX(0), TX(i1.y), TX(i2.y));
	
	// distance weight
	float dw = (i1.x == 0 || i1.y == 0) ? 0.0 : 2.0 * ((i1.x-1.0)/(i1.x+i1.y-2.0)) - 1.0;	
	
	// result
	vec3 res = TX(0) + (scl-1.0)/scl * sw*dw * t;
	
	
	// prevent ringing	
	vec3 lo  = min(min(TX(-1),TX(0)),TX(1));
    vec3 hi  = max(max(TX(-1),TX(0)),TX(1));
	
    FragColor = vec4(clamp(res, lo, hi), 1.0);
} 
#endif
