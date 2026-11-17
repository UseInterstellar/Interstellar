/*
   Hyllian's xBR-vertex code and texel mapping
   
   Copyright (C) 2011/2016 Hyllian - sergiogdb@gmail.com

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

// This shader also uses code and/or concepts from xBRZ as it appears
// in the Desmume source code. The license for which is as follows:

// ****************************************************************************
// * This file is part of the HqMAME project. It is distributed under         *
// * GNU General Public License: http://www.gnu.org/licenses/gpl-3.0          *
// * Copyright (C) Zenju (zenju AT gmx DOT de) - All Rights Reserved          *
// *                                                                          *
// * Additionally and as a special exception, the author gives permission     *
// * to link the code of this program with the MAME library (or with modified *
// * versions of MAME that use the same license as MAME), and distribute      *
// * linked combinations including the two. You must obey the GNU General     *
// * Public License in all respects for all of the code used other than MAME. *
// * If you modify this file, you may extend this exception to your version   *
// * of the file, but you are not obligated to do so. If you do not wish to   *
// * do so, delete this exception statement from your version.                *
// ****************************************************************************

#define BLEND_NONE 0
#define BLEND_NORMAL 1
#define BLEND_DOMINANT 2
#define LUMINANCE_WEIGHT 1.0
#define EQUAL_COLOR_TOLERANCE 30.0/255.0
#define STEEP_DIRECTION_THRESHOLD 2.2
#define DOMINANT_DIRECTION_THRESHOLD 3.6

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
COMPAT_VARYING vec4 t7;

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
	vec2 ps = vec2(SourceSize.z, SourceSize.w);
	float dx = ps.x;
	float dy = ps.y;

	 //  A1 B1 C1
	// A0 A  B  C C4
	// D0 D  E  F F4
	// G0 G  H  I I4
	 //  G5 H5 I5

	t1 = vTexCoord.xxxy + vec4( -dx, 0.0, dx,-2.0*dy); // A1 B1 C1
	t2 = vTexCoord.xxxy + vec4( -dx, 0.0, dx, -dy);    //  A  B  C
	t3 = vTexCoord.xxxy + vec4( -dx, 0.0, dx, 0.0);    //  D  E  F
	t4 = vTexCoord.xxxy + vec4( -dx, 0.0, dx, dy);     //  G  H  I
	t5 = vTexCoord.xxxy + vec4( -dx, 0.0, dx, 2.0*dy); // G5 H5 I5
	t6 = vTexCoord.xyyy + vec4(-2.0*dx,-dy, 0.0, dy);  // A0 D0 G0
	t7 = vTexCoord.xyyy + vec4( 2.0*dx,-dy, 0.0, dy);  // C4 F4 I4
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
COMPAT_VARYING vec4 t7;

// fragment compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

	const float  one_sixth = 1.0 / 6.0;
	const float  two_sixth = 2.0 / 6.0;
	const float four_sixth = 4.0 / 6.0;
	const float five_sixth = 5.0 / 6.0;

	float reduce(const vec3 color)
	{
		return dot(color, vec3(65536.0, 256.0, 1.0));
	}
	
	float DistYCbCr(const vec3 pixA, const vec3 pixB)
	{
		const vec3 w = vec3(0.2627, 0.6780, 0.0593);
		const float scaleB = 0.5 / (1.0 - w.b);
		const float scaleR = 0.5 / (1.0 - w.r);
		vec3 diff = pixA - pixB;
		float Y = dot(diff, w);
		float Cb = scaleB * (diff.b - Y);
		float Cr = scaleR * (diff.r - Y);
		
		return sqrt( ((LUMINANCE_WEIGHT * Y) * (LUMINANCE_WEIGHT * Y)) + (Cb * Cb) + (Cr * Cr) );
	}
	
	bool IsPixEqual(const vec3 pixA, const vec3 pixB)
	{
		return (DistYCbCr(pixA, pixB) < EQUAL_COLOR_TOLERANCE);
	}
	
	bool IsBlendingNeeded(const ivec4 blend)
	{
		return any(notEqual(blend, ivec4(BLEND_NONE)));
	}
	
	//---------------------------------------
	// Input Pixel Mapping:    --|21|22|23|--
	//                         19|06|07|08|09
	//                         18|05|00|01|10
	//                         17|04|03|02|11
	//                         --|15|14|13|--
	//
	// Output Pixel Mapping: 20|21|22|23|24|25
	//                       19|06|07|08|09|26
	//                       18|05|00|01|10|27
	//                       17|04|03|02|11|28
	//                       16|15|14|13|12|29
	//                       35|34|33|32|31|30

void main()
{
vec2 f = fract(vTexCoord.xy * SourceSize.xy);

	//---------------------------------------
	// Input Pixel Mapping:  20|21|22|23|24
	//                       19|06|07|08|09
	//                       18|05|00|01|10
	//                       17|04|03|02|11
	//                       16|15|14|13|12
  
	vec3 src[25];
  
	src[21] = COMPAT_TEXTURE(Source, t1.xw).rgb;
	src[22] = COMPAT_TEXTURE(Source, t1.yw).rgb;
	src[23] = COMPAT_TEXTURE(Source, t1.zw).rgb;
	src[ 6] = COMPAT_TEXTURE(Source, t2.xw).rgb;
	src[ 7] = COMPAT_TEXTURE(Source, t2.yw).rgb;
	src[ 8] = COMPAT_TEXTURE(Source, t2.zw).rgb;
	src[ 5] = COMPAT_TEXTURE(Source, t3.xw).rgb;
	src[ 0] = COMPAT_TEXTURE(Source, t3.yw).rgb;
	src[ 1] = COMPAT_TEXTURE(Source, t3.zw).rgb;
	src[ 4] = COMPAT_TEXTURE(Source, t4.xw).rgb;
	src[ 3] = COMPAT_TEXTURE(Source, t4.yw).rgb;
	src[ 2] = COMPAT_TEXTURE(Source, t4.zw).rgb;
	src[15] = COMPAT_TEXTURE(Source, t5.xw).rgb;
	src[14] = COMPAT_TEXTURE(Source, t5.yw).rgb;
	src[13] = COMPAT_TEXTURE(Source, t5.zw).rgb;
	src[19] = COMPAT_TEXTURE(Source, t6.xy).rgb;
	src[18] = COMPAT_TEXTURE(Source, t6.xz).rgb;
	src[17] = COMPAT_TEXTURE(Source, t6.xw).rgb;
	src[ 9] = COMPAT_TEXTURE(Source, t7.xy).rgb;
	src[10] = COMPAT_TEXTURE(Source, t7.xz).rgb;
	src[11] = COMPAT_TEXTURE(Source, t7.xw).rgb;
	
		float v[9];
		v[0] = reduce(src[0]);
		v[1] = reduce(src[1]);
		v[2] = reduce(src[2]);
		v[3] = reduce(src[3]);
		v[4] = reduce(src[4]);
		v[5] = reduce(src[5]);
		v[6] = reduce(src[6]);
		v[7] = reduce(src[7]);
		v[8] = reduce(src[8]);
		
		ivec4 blendResult = ivec4(BLEND_NONE);
		
		// Preprocess corners
		// Pixel Tap Mapping: --|--|--|--|--
		//                    --|--|07|08|--
		//                    --|05|00|01|10
		//                    --|04|03|02|11
		//                    --|--|14|13|--
		// Corner (1, 1)
		if ( ((v[0] == v[1] && v[3] == v[2]) || (v[0] == v[3] && v[1] == v[2])) == false)
		{
			float dist_03_01 = DistYCbCr(src[ 4], src[ 0]) + DistYCbCr(src[ 0], src[ 8]) + DistYCbCr(src[14], src[ 2]) + DistYCbCr(src[ 2], src[10]) + (4.0 * DistYCbCr(src[ 3], src[ 1]));
			float dist_00_02 = DistYCbCr(src[ 5], src[ 3]) + DistYCbCr(src[ 3], src[13]) + DistYCbCr(src[ 7], src[ 1]) + DistYCbCr(src[ 1], src[11]) + (4.0 * DistYCbCr(src[ 0], src[ 2]));
			bool dominantGradient = (DOMINANT_DIRECTION_THRESHOLD * dist_03_01) < dist_00_02;
			blendResult[2] = ((dist_03_01 < dist_00_02) && (v[0] != v[1]) && (v[0] != v[3])) ? ((dominantGradient) ? BLEND_DOMINANT : BLEND_NORMAL) : BLEND_NONE;
		}

		// Pixel Tap Mapping: --|--|--|--|--
		//                    --|06|07|--|--
		//                    18|05|00|01|--
		//                    17|04|03|02|--
		//                    --|15|14|--|--
		// Corner (0, 1)
		if ( ((v[5] == v[0] && v[4] == v[3]) || (v[5] == v[4] && v[0] == v[3])) == false)
		{
			float dist_04_00 = DistYCbCr(src[17], src[ 5]) + DistYCbCr(src[ 5], src[ 7]) + DistYCbCr(src[15], src[ 3]) + DistYCbCr(src[ 3], src[ 1]) + (4.0 * DistYCbCr(src[ 4], src[ 0]));
			float dist_05_03 = DistYCbCr(src[18], src[ 4]) + DistYCbCr(src[ 4], src[14]) + DistYCbCr(src[ 6], src[ 0]) + DistYCbCr(src[ 0], src[ 2]) + (4.0 * DistYCbCr(src[ 5], src[ 3]));
			bool dominantGradient = (DOMINANT_DIRECTION_THRESHOLD * dist_05_03) < dist_04_00;
			blendResult[3] = ((dist_04_00 > dist_05_03) && (v[0] != v[5]) && (v[0] != v[3])) ? ((dominantGradient) ? BLEND_DOMINANT : BLEND_NORMAL) : BLEND_NONE;
		}
		
		// Pixel Tap Mapping: --|--|22|23|--
		//                    --|06|07|08|09
		//                    --|05|00|01|10
		//                    --|--|03|02|--
		//                    --|--|--|--|--
		// Corner (1, 0)
		if ( ((v[7] == v[8] && v[0] == v[1]) || (v[7] == v[0] && v[8] == v[1])) == false)
		{
			float dist_00_08 = DistYCbCr(src[ 5], src[ 7]) + DistYCbCr(src[ 7], src[23]) + DistYCbCr(src[ 3], src[ 1]) + DistYCbCr(src[ 1], src[ 9]) + (4.0 * DistYCbCr(src[ 0], src[ 8]));
			float dist_07_01 = DistYCbCr(src[ 6], src[ 0]) + DistYCbCr(src[ 0], src[ 2]) + DistYCbCr(src[22], src[ 8]) + DistYCbCr(src[ 8], src[10]) + (4.0 * DistYCbCr(src[ 7], src[ 1]));
			bool dominantGradient = (DOMINANT_DIRECTION_THRESHOLD * dist_07_01) < dist_00_08;
			blendResult[1] = ((dist_00_08 > dist_07_01) && (v[0] != v[7]) && (v[0] != v[1])) ? ((dominantGradient) ? BLEND_DOMINANT : BLEND_NORMAL) : BLEND_NONE;
		}
		
		// Pixel Tap Mapping: --|21|22|--|--
		//                    19|06|07|08|--
		//                    18|05|00|01|--
		//                    --|04|03|--|--
		//                    --|--|--|--|--
		// Corner (0, 0)
		if ( ((v[6] == v[7] && v[5] == v[0]) || (v[6] == v[5] && v[7] == v[0])) == false)
		{
			float dist_05_07 = DistYCbCr(src[18], src[ 6]) + DistYCbCr(src[ 6], src[22]) + DistYCbCr(src[ 4], src[ 0]) + DistYCbCr(src[ 0], src[ 8]) + (4.0 * DistYCbCr(src[ 5], src[ 7]));
			float dist_06_00 = DistYCbCr(src[19], src[ 5]) + DistYCbCr(src[ 5], src[ 3]) + DistYCbCr(src[21], src[ 7]) + DistYCbCr(src[ 7], src[ 1]) + (4.0 * DistYCbCr(src[ 6], src[ 0]));
			bool dominantGradient = (DOMINANT_DIRECTION_THRESHOLD * dist_05_07) < dist_06_00;
			blendResult[0] = ((dist_05_07 < dist_06_00) && (v[0] != v[5]) && (v[0] != v[7])) ? ((dominantGradient) ? BLEND_DOMINANT : BLEND_NORMAL) : BLEND_NONE;
		}
		
		vec3 dst[36];
		dst[ 0] = src[0];
		dst[ 1] = src[0];
		dst[ 2] = src[0];
		dst[ 3] = src[0];
		dst[ 4] = src[0];
		dst[ 5] = src[0];
		dst[ 6] = src[0];
		dst[ 7] = src[0];
		dst[ 8] = src[0];
		dst[ 9] = src[0];
		dst[10] = src[0];
		dst[11] = src[0];
		dst[12] = src[0];
		dst[13] = src[0];
		dst[14] = src[0];
		dst[15] = src[0];
		dst[16] = src[0];
		dst[17] = src[0];
		dst[18] = src[0];
		dst[19] = src[0];
		dst[20] = src[0];
		dst[21] = src[0];
		dst[22] = src[0];
		dst[23] = src[0];
		dst[24] = src[0];
		dst[25] = src[0];
		dst[26] = src[0];
		dst[27] = src[0];
		dst[28] = src[0];
		dst[29] = src[0];
		dst[30] = src[0];
		dst[31] = src[0];
		dst[32] = src[0];
		dst[33] = src[0];
		dst[34] = src[0];
		dst[35] = src[0];
		
		// Scale pixel
		if (IsBlendingNeeded(blendResult) == true)
		{
			float dist_01_04 = DistYCbCr(src[1], src[4]);
			float dist_03_08 = DistYCbCr(src[3], src[8]);
			bool haveShallowLine = (STEEP_DIRECTION_THRESHOLD * dist_01_04 <= dist_03_08) && (v[0] != v[4]) && (v[5] != v[4]);
			bool haveSteepLine   = (STEEP_DIRECTION_THRESHOLD * dist_03_08 <= dist_01_04) && (v[0] != v[8]) && (v[7] != v[8]);
			bool needBlend = (blendResult[2] != BLEND_NONE);
			bool doLineBlend = (  blendResult[2] >= BLEND_DOMINANT ||
							   ((blendResult[1] != BLEND_NONE && !IsPixEqual(src[0], src[4])) ||
								 (blendResult[3] != BLEND_NONE && !IsPixEqual(src[0], src[8])) ||
								 (IsPixEqual(src[4], src[3]) && IsPixEqual(src[3], src[2]) && IsPixEqual(src[2], src[1]) && IsPixEqual(src[1], src[8]) && IsPixEqual(src[0], src[2]) == false) ) == false );
			
			vec3 blendPix = ( DistYCbCr(src[0], src[1]) <= DistYCbCr(src[0], src[3]) ) ? src[1] : src[3];
			dst[10] = mix(dst[10], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.250 : 0.000);
			dst[11] = mix(dst[11], blendPix, (needBlend && doLineBlend) ? ((haveSteepLine) ? 0.750 : ((haveShallowLine) ? 0.250 : 0.000)) : 0.000);
			dst[12] = mix(dst[12], blendPix, (needBlend && doLineBlend) ? ((!haveShallowLine && !haveSteepLine) ? 0.500 : 1.000) : 0.000);
			dst[13] = mix(dst[13], blendPix, (needBlend && doLineBlend) ? ((haveShallowLine) ? 0.750 : ((haveSteepLine) ? 0.250 : 0.000)) : 0.000);
			dst[14] = mix(dst[14], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.250 : 0.000);
			dst[25] = mix(dst[25], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.250 : 0.000);
			dst[26] = mix(dst[26], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.750 : 0.000);
			dst[27] = mix(dst[27], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 1.000 : 0.000);
			dst[28] = mix(dst[28], blendPix, (needBlend) ? ((doLineBlend) ? ((haveSteepLine) ? 1.000 : ((haveShallowLine) ? 0.750 : 0.500)) : 0.05652034508) : 0.000);
			dst[29] = mix(dst[29], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.4236372243) : 0.000);
			dst[30] = mix(dst[30], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.9711013910) : 0.000);
			dst[31] = mix(dst[31], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.4236372243) : 0.000);
			dst[32] = mix(dst[32], blendPix, (needBlend) ? ((doLineBlend) ? ((haveShallowLine) ? 1.000 : ((haveSteepLine) ? 0.750 : 0.500)) : 0.05652034508) : 0.000);
			dst[33] = mix(dst[33], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 1.000 : 0.000);
			dst[34] = mix(dst[34], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.750 : 0.000);
			dst[35] = mix(dst[35], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.250 : 0.000);
			
			dist_01_04 = DistYCbCr(src[7], src[2]);
			dist_03_08 = DistYCbCr(src[1], src[6]);
			haveShallowLine = (STEEP_DIRECTION_THRESHOLD * dist_01_04 <= dist_03_08) && (v[0] != v[2]) && (v[3] != v[2]);
			haveSteepLine   = (STEEP_DIRECTION_THRESHOLD * dist_03_08 <= dist_01_04) && (v[0] != v[6]) && (v[5] != v[6]);
			needBlend = (blendResult[1] != BLEND_NONE);
			doLineBlend = (  blendResult[1] >= BLEND_DOMINANT ||
						  !((blendResult[0] != BLEND_NONE && !IsPixEqual(src[0], src[2])) ||
							(blendResult[2] != BLEND_NONE && !IsPixEqual(src[0], src[6])) ||
							(IsPixEqual(src[2], src[1]) && IsPixEqual(src[1], src[8]) && IsPixEqual(src[8], src[7]) && IsPixEqual(src[7], src[6]) && !IsPixEqual(src[0], src[8])) ) );
		
			dist_01_04 = DistYCbCr(src[7], src[2]);
			dist_03_08 = DistYCbCr(src[1], src[6]);
			haveShallowLine = (STEEP_DIRECTION_THRESHOLD * dist_01_04 <= dist_03_08) && (v[0] != v[2]) && (v[3] != v[2]);
			haveSteepLine   = (STEEP_DIRECTION_THRESHOLD * dist_03_08 <= dist_01_04) && (v[0] != v[6]) && (v[5] != v[6]);
			needBlend = (blendResult[1] != BLEND_NONE);
			doLineBlend = (  blendResult[1] >= BLEND_DOMINANT ||
						  !((blendResult[0] != BLEND_NONE && !IsPixEqual(src[0], src[2])) ||
							(blendResult[2] != BLEND_NONE && !IsPixEqual(src[0], src[6])) ||
							(IsPixEqual(src[2], src[1]) && IsPixEqual(src[1], src[8]) && IsPixEqual(src[8], src[7]) && IsPixEqual(src[7], src[6]) && !IsPixEqual(src[0], src[8])) ) );
			
			blendPix = ( DistYCbCr(src[0], src[7]) <= DistYCbCr(src[0], src[1]) ) ? src[7] : src[1];
			dst[ 7] = mix(dst[ 7], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.250 : 0.000);
			dst[ 8] = mix(dst[ 8], blendPix, (needBlend && doLineBlend) ? ((haveSteepLine) ? 0.750 : ((haveShallowLine) ? 0.250 : 0.000)) : 0.000);
			dst[ 9] = mix(dst[ 9], blendPix, (needBlend && doLineBlend) ? ((!haveShallowLine && !haveSteepLine) ? 0.500 : 1.000) : 0.000);
			dst[10] = mix(dst[10], blendPix, (needBlend && doLineBlend) ? ((haveShallowLine) ? 0.750 : ((haveSteepLine) ? 0.250 : 0.000)) : 0.000);
			dst[11] = mix(dst[11], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.250 : 0.000);
			dst[20] = mix(dst[20], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.250 : 0.000);
			dst[21] = mix(dst[21], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.750 : 0.000);
			dst[22] = mix(dst[22], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 1.000 : 0.000);
			dst[23] = mix(dst[23], blendPix, (needBlend) ? ((doLineBlend) ? ((haveSteepLine) ? 1.000 : ((haveShallowLine) ? 0.750 : 0.500)) : 0.05652034508) : 0.000);
			dst[24] = mix(dst[24], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.4236372243) : 0.000);
			dst[25] = mix(dst[25], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.9711013910) : 0.000);
			dst[26] = mix(dst[26], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.4236372243) : 0.000);
			dst[27] = mix(dst[27], blendPix, (needBlend) ? ((doLineBlend) ? ((haveShallowLine) ? 1.000 : ((haveSteepLine) ? 0.750 : 0.500)) : 0.05652034508) : 0.000);
			dst[28] = mix(dst[28], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 1.000 : 0.000);
			dst[29] = mix(dst[29], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.750 : 0.000);
			dst[30] = mix(dst[30], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.250 : 0.000);

			dist_01_04 = DistYCbCr(src[5], src[8]);
			dist_03_08 = DistYCbCr(src[7], src[4]);
			haveShallowLine = (STEEP_DIRECTION_THRESHOLD * dist_01_04 <= dist_03_08) && (v[0] != v[8]) && (v[1] != v[8]);
			haveSteepLine   = (STEEP_DIRECTION_THRESHOLD * dist_03_08 <= dist_01_04) && (v[0] != v[4]) && (v[3] != v[4]);
			needBlend = (blendResult[0] != BLEND_NONE);
			doLineBlend = (  blendResult[0] >= BLEND_DOMINANT ||
						  !((blendResult[3] != BLEND_NONE && !IsPixEqual(src[0], src[8])) ||
							(blendResult[1] != BLEND_NONE && !IsPixEqual(src[0], src[4])) ||
							(IsPixEqual(src[8], src[7]) && IsPixEqual(src[7], src[6]) && IsPixEqual(src[6], src[5]) && IsPixEqual(src[5], src[4]) && !IsPixEqual(src[0], src[6])) ) );
			
			blendPix = ( DistYCbCr(src[0], src[5]) <= DistYCbCr(src[0], src[7]) ) ? src[5] : src[7];
			dst[ 4] = mix(dst[ 4], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.250 : 0.000);
			dst[ 5] = mix(dst[ 5], blendPix, (needBlend && doLineBlend) ? ((haveSteepLine) ? 0.750 : ((haveShallowLine) ? 0.250 : 0.000)) : 0.000);
			dst[ 6] = mix(dst[ 6], blendPix, (needBlend && doLineBlend) ? ((!haveShallowLine && !haveSteepLine) ? 0.500 : 1.000) : 0.000);
			dst[ 7] = mix(dst[ 7], blendPix, (needBlend && doLineBlend) ? ((haveShallowLine) ? 0.750 : ((haveSteepLine) ? 0.250 : 0.000)) : 0.000);
			dst[ 8] = mix(dst[ 8], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.250 : 0.000);
			dst[35] = mix(dst[35], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.250 : 0.000);
			dst[16] = mix(dst[16], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.750 : 0.000);
			dst[17] = mix(dst[17], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 1.000 : 0.000);
			dst[18] = mix(dst[18], blendPix, (needBlend) ? ((doLineBlend) ? ((haveSteepLine) ? 1.000 : ((haveShallowLine) ? 0.750 : 0.500)) : 0.05652034508) : 0.000);
			dst[19] = mix(dst[19], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.4236372243) : 0.000);
			dst[20] = mix(dst[20], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.9711013910) : 0.000);
			dst[21] = mix(dst[21], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.4236372243) : 0.000);
			dst[22] = mix(dst[22], blendPix, (needBlend) ? ((doLineBlend) ? ((haveShallowLine) ? 1.000 : ((haveSteepLine) ? 0.750 : 0.500)) : 0.05652034508) : 0.000);
			dst[23] = mix(dst[23], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 1.000 : 0.000);
			dst[24] = mix(dst[24], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.750 : 0.000);
			dst[25] = mix(dst[25], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.250 : 0.000);
			
			
			dist_01_04 = DistYCbCr(src[3], src[6]);
			dist_03_08 = DistYCbCr(src[5], src[2]);
			haveShallowLine = (STEEP_DIRECTION_THRESHOLD * dist_01_04 <= dist_03_08) && (v[0] != v[6]) && (v[7] != v[6]);
			haveSteepLine   = (STEEP_DIRECTION_THRESHOLD * dist_03_08 <= dist_01_04) && (v[0] != v[2]) && (v[1] != v[2]);
			needBlend = (blendResult[3] != BLEND_NONE);
			doLineBlend = (  blendResult[3] >= BLEND_DOMINANT ||
						  !((blendResult[2] != BLEND_NONE && !IsPixEqual(src[0], src[6])) ||
							(blendResult[0] != BLEND_NONE && !IsPixEqual(src[0], src[2])) ||
							(IsPixEqual(src[6], src[5]) && IsPixEqual(src[5], src[4]) && IsPixEqual(src[4], src[3]) && IsPixEqual(src[3], src[2]) && !IsPixEqual(src[0], src[4])) ) );
			
			blendPix = ( DistYCbCr(src[0], src[3]) <= DistYCbCr(src[0], src[5]) ) ? src[3] : src[5];
			dst[13] = mix(dst[13], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.250 : 0.000);
			dst[14] = mix(dst[14], blendPix, (needBlend && doLineBlend) ? ((haveSteepLine) ? 0.750 : ((haveShallowLine) ? 0.250 : 0.000)) : 0.000);
			dst[15] = mix(dst[15], blendPix, (needBlend && doLineBlend) ? ((!haveShallowLine && !haveSteepLine) ? 0.500 : 1.000) : 0.000);
			dst[ 4] = mix(dst[ 4], blendPix, (needBlend && doLineBlend) ? ((haveShallowLine) ? 0.750 : ((haveSteepLine) ? 0.250 : 0.000)) : 0.000);
			dst[ 5] = mix(dst[ 5], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.250 : 0.000);
			dst[30] = mix(dst[30], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.250 : 0.000);
			dst[31] = mix(dst[31], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 0.750 : 0.000);
			dst[32] = mix(dst[32], blendPix, (needBlend && doLineBlend && haveSteepLine) ? 1.000 : 0.000);
			dst[33] = mix(dst[33], blendPix, (needBlend) ? ((doLineBlend) ? ((haveSteepLine) ? 1.000 : ((haveShallowLine) ? 0.750 : 0.500)) : 0.05652034508) : 0.000);
			dst[34] = mix(dst[34], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.4236372243) : 0.000);
			dst[35] = mix(dst[35], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.9711013910) : 0.000);
			dst[16] = mix(dst[16], blendPix, (needBlend) ? ((doLineBlend) ? 1.000 : 0.4236372243) : 0.000);
			dst[17] = mix(dst[17], blendPix, (needBlend) ? ((doLineBlend) ? ((haveShallowLine) ? 1.000 : ((haveSteepLine) ? 0.750 : 0.500)) : 0.05652034508) : 0.000);
			dst[18] = mix(dst[18], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 1.000 : 0.000);
			dst[19] = mix(dst[19], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.750 : 0.000);
			dst[20] = mix(dst[20], blendPix, (needBlend && doLineBlend && haveShallowLine) ? 0.250 : 0.000);
			
		}
		
			vec3 res = mix( mix( mix( mix( mix( mix(dst[20], dst[21], step(one_sixth, f.x) ), dst[22], step(two_sixth, f.x) ), mix( mix(dst[23], dst[24], step(four_sixth, f.x) ), dst[25], step(five_sixth, f.x) ), step(0.50, f.x) ),
		                                  mix( mix( mix(dst[19], dst[ 6], step(one_sixth, f.x) ), dst[ 7], step(two_sixth, f.x) ), mix( mix(dst[ 8], dst[ 9], step(four_sixth, f.x) ), dst[26], step(five_sixth, f.x) ), step(0.50, f.x) ), step(one_sixth, f.y) ),
		                                  mix( mix( mix(dst[18], dst[ 5], step(one_sixth, f.x) ), dst[ 0], step(two_sixth, f.x) ), mix( mix(dst[ 1], dst[10], step(four_sixth, f.x) ), dst[27], step(five_sixth, f.x) ), step(0.50, f.x) ), step(two_sixth, f.y) ),
		                        mix( mix( mix( mix( mix(dst[17], dst[ 4], step(one_sixth, f.x) ), dst[ 3], step(two_sixth, f.x) ), mix( mix(dst[ 2], dst[11], step(four_sixth, f.x) ), dst[28], step(five_sixth, f.x) ), step(0.50, f.x) ),
		                                  mix( mix( mix(dst[16], dst[15], step(one_sixth, f.x) ), dst[14], step(two_sixth, f.x) ), mix( mix(dst[13], dst[12], step(four_sixth, f.x) ), dst[29], step(five_sixth, f.x) ), step(0.50, f.x) ), step(four_sixth, f.y) ),
		                                  mix( mix( mix(dst[35], dst[34], step(one_sixth, f.x) ), dst[33], step(two_sixth, f.x) ), mix( mix(dst[32], dst[31], step(four_sixth, f.x) ), dst[30], step(five_sixth, f.x) ), step(0.50, f.x) ), step(five_sixth, f.y) ),
		                     step(0.50, f.y) );
								 
   FragColor = vec4(res, 1.0);
} 
#endif
