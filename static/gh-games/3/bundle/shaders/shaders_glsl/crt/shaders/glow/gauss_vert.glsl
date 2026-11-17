// Parameter lines go here:
#pragma parameter BOOST "Color Boost" 1.0 0.5 1.5 0.02
#pragma parameter CRT_GEOM_BEAM "CRT-Geom Beam" 1.0 0.0 1.0 1.0

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
COMPAT_VARYING vec2 data_pix_no;
COMPAT_VARYING COMPAT_PRECISION float data_one;

vec4 _oPosition1; 
uniform mat4 MVPMatrix;
uniform COMPAT_PRECISION int FrameDirection;
uniform COMPAT_PRECISION int FrameCount;
uniform COMPAT_PRECISION vec2 OutputSize;
uniform COMPAT_PRECISION vec2 TextureSize;
uniform COMPAT_PRECISION vec2 InputSize;

#define vTexCoord TEX0.xy
#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    COL0 = COLOR;
    TEX0.xy = TexCoord.xy;

    data_pix_no = vTexCoord * SourceSize.xy - vec2(0.0, 0.5);
    data_one    = SourceSize.w;
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
COMPAT_VARYING vec2 data_pix_no;
COMPAT_VARYING COMPAT_PRECISION float data_one;

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

#ifdef PARAMETER_UNIFORM
// All parameter floats need to have COMPAT_PRECISION in front of them
uniform COMPAT_PRECISION float BOOST;
uniform COMPAT_PRECISION float CRT_GEOM_BEAM;
#else
#define BOOST 1.0
#define CRT_GEOM_BEAM 1.0
#endif

vec3 beam(vec3 color, float dist)
{
if (CRT_GEOM_BEAM > 0.5){
    vec3 wid     = vec3(2.0) + 2.0 * pow(color, vec3(4.0));
    vec3 weights = vec3(abs(dist) * 3.333333333);

    return 2.0 * color * exp(-pow(weights * inversesqrt(0.5 * wid), wid)) / (0.6 + 0.2 * wid);
   }else{
    float reciprocal_width = 4.0;
    vec3 x = vec3(dist * reciprocal_width);

    return 2.0 * color * exp(-0.5 * x * x) * reciprocal_width;
   }
}

void main()
{
    vec2  texel = floor(data_pix_no);
    float phase = data_pix_no.y - texel.y;
    vec2  tex   = vec2(texel + 0.5) * SourceSize.zw;

    vec3 top    = COMPAT_TEXTURE(Source, tex + vec2(0.0, 0.0 * data_one)).rgb;
    vec3 bottom = COMPAT_TEXTURE(Source, tex + vec2(0.0, 1.0 * data_one)).rgb;

    float dist0 = phase;
    float dist1 = 1.0 - phase;

    vec3 scanline = vec3(0.0);

    scanline += beam(top,    dist0);
    scanline += beam(bottom, dist1);

    FragColor = vec4(BOOST * scanline * 0.869565217391304, 1.0);
} 
#endif
