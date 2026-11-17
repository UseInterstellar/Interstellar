// version directive if necessary

// good place for credits/license

#pragma parameter BLOOM_STRENGTH "Bloom Strength" 0.45 0.0 1.0 0.01
#pragma parameter SOURCE_BOOST "Bloom Color Boost" 1.15 1.0 1.3 0.01

#define INV_OUTPUT_GAMMA (1.0 / 2.2)
#define saturate(c) clamp(c, 0.0, 1.0)

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

#ifdef PARAMETER_UNIFORM
uniform COMPAT_PRECISION float BLOOM_STRENGTH;
uniform COMPAT_PRECISION float SOURCE_BOOST;
#else
#define BLOOM_STRENGTH 0.45
#define SOURCE_BOOST 1.15
#endif

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
uniform sampler2D Pass2Texture;
#define CRT_PASS Pass2Texture
COMPAT_VARYING vec4 TEX0;

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define OutSize vec4(OutputSize, 1.0 / OutputSize)

#ifdef PARAMETER_UNIFORM
uniform COMPAT_PRECISION float BLOOM_STRENGTH;
uniform COMPAT_PRECISION float SOURCE_BOOST;
#else
#define BLOOM_STRENGTH 0.45
#define SOURCE_BOOST 1.15
#endif

void main()
{
	vec3 source = SOURCE_BOOST * COMPAT_TEXTURE(CRT_PASS, vTexCoord).rgb;
	vec3 bloom = COMPAT_TEXTURE(Source, vTexCoord).rgb;
	source += BLOOM_STRENGTH * bloom;
FragColor = vec4(pow(saturate(source), vec3(INV_OUTPUT_GAMMA,INV_OUTPUT_GAMMA,INV_OUTPUT_GAMMA)), 1.0);
} 
#endif
