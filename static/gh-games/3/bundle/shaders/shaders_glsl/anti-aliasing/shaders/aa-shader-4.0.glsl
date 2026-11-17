//##############################################################//
//						                //
//       AA Shader 4.o shader - coded by guest(r)               //
//		     part of code by ShadX		        //
//##############################################################// 
// Ported by Hyllian and hunterk - 2015

#pragma parameter INTERNAL_RES "Internal Resolution" 1.0 1.0 8.0 1.0

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy


#if defined(VERTEX)

#if __VERSION__ >= 130
#define COMPAT_VARYING out
#define COMPAT_ATTRIBUTE in
#else
#define COMPAT_VARYING varying 
#define COMPAT_ATTRIBUTE attribute 
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
out vec4 FragColor;
#else
#define COMPAT_VARYING varying
#define COMPAT_TEXTURE texture2D
#define FragColor gl_FragColor
#endif

uniform COMPAT_PRECISION int FrameDirection;
uniform COMPAT_PRECISION int FrameCount;
uniform COMPAT_PRECISION vec2 OutputSize;
uniform COMPAT_PRECISION vec2 TextureSize;
uniform COMPAT_PRECISION vec2 InputSize;
uniform sampler2D Texture;
COMPAT_VARYING vec4 TEX0;

// compatibility #defines
#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

#ifdef PARAMETER_UNIFORM
uniform COMPAT_PRECISION float INTERNAL_RES;
#else
#define INTERNAL_RES 1.0
#endif

vec3 dt = vec3(1.0,1.0,1.0);

COMPAT_PRECISION vec3 texture2d (sampler2D tex, vec2 coord, vec4 yx) {

	vec3 s00 = COMPAT_TEXTURE(tex, coord + yx.zw).xyz; 
	vec3 s20 = COMPAT_TEXTURE(tex, coord + yx.xw).xyz; 
	vec3 s22 = COMPAT_TEXTURE(tex, coord + yx.xy).xyz; 
	vec3 s02 = COMPAT_TEXTURE(tex, coord + yx.zy).xyz; 

	float m1=dot(abs(s00-s22),dt)+0.001;
	float m2=dot(abs(s02-s20),dt)+0.001;

	return 0.5*(m2*(s00+s22)+m1*(s02+s20))/(m1+m2);
}

void main()
{
	// Calculating texel coordinates
	vec2 size     = 4.0 * SourceSize.xy / INTERNAL_RES;
//	vec2 size     = X * (outsize.xy * SourceSize.zw) * SourceSize.xy;
	vec2 inv_size = 1.0 / size;

	vec4 yx = vec4(inv_size, -inv_size);
	
	vec2 OGL2Pos = vTexCoord * size;

	vec2 fp = fract(OGL2Pos);
	vec2 dx = vec2(inv_size.x,0.0);
	vec2 dy = vec2(0.0, inv_size.y);
	vec2 g1 = vec2(inv_size.x,inv_size.y);
	vec2 g2 = vec2(-inv_size.x,inv_size.y);
	
	vec2 pC4 = floor(OGL2Pos) * inv_size;	
	
	// Reading the texels
	vec3 C0 = texture2d(Source, pC4 - g1, yx); 
	vec3 C1 = texture2d(Source, pC4 - dy, yx);
	vec3 C2 = texture2d(Source, pC4 - g2, yx);
	vec3 C3 = texture2d(Source, pC4 - dx, yx);
	vec3 C4 = texture2d(Source, pC4     , yx);
	vec3 C5 = texture2d(Source, pC4 + dx, yx);
	vec3 C6 = texture2d(Source, pC4 + g2, yx);
	vec3 C7 = texture2d(Source, pC4 + dy, yx);
	vec3 C8 = texture2d(Source, pC4 + g1, yx);
	
	vec3 ul, ur, dl, dr;
	float m1, m2;
	
	m1 = dot(abs(C0-C4),dt)+0.001;
	m2 = dot(abs(C1-C3),dt)+0.001;
	ul = (m2*(C0+C4)+m1*(C1+C3))/(m1+m2);  
	
	m1 = dot(abs(C1-C5),dt)+0.001;
	m2 = dot(abs(C2-C4),dt)+0.001;
	ur = (m2*(C1+C5)+m1*(C2+C4))/(m1+m2);
	
	m1 = dot(abs(C3-C7),dt)+0.001;
	m2 = dot(abs(C6-C4),dt)+0.001;
	dl = (m2*(C3+C7)+m1*(C6+C4))/(m1+m2);
	
	m1 = dot(abs(C4-C8),dt)+0.001;
	m2 = dot(abs(C5-C7),dt)+0.001;
	dr = (m2*(C4+C8)+m1*(C5+C7))/(m1+m2);
	
	vec3 c11 = 0.5*((dr*fp.x+dl*(1.0-fp.x))*fp.y+(ur*fp.x+ul*(1.0-fp.x))*(1.0-fp.y) );
	
   FragColor = vec4(c11, 1.0);
} 
#endif
