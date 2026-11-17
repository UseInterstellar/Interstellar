// AntiAliased Nearest Neighbor
// by jimbo1qaz and wareya
// Licensed MIT

// Parameter lines go here:
// set to true to interpolate in sRGB instead of a pseudo-perceptual colorspace
#pragma parameter NOGAMMA "Interpolate in sRGB" 0.0 0.0 1.0 1.0

// Do bilinear filtering instead of anti-aliased nearest neighbor filtering (used for debugging color)
#pragma parameter BILINEAR "Force Bilinear Filtering" 0.0 0.0 1.0 1.0

// http://i.imgur.com/kzwZkVf.png

#define NOT(fl) (1.-fl)
#define YES(fl) fl

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
    TEX0.xy = TexCoord.xy * TextureSize.xy / InputSize.xy;
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

// fragment compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

#ifdef PARAMETER_UNIFORM
uniform COMPAT_PRECISION float NOGAMMA;
uniform COMPAT_PRECISION float BILINEAR;
#else
#define NOGAMMA 0.0
#define BILINEAR 0.0
#endif

// http://entropymine.com/imageworsener/srgbformula/
vec3 srgb2linear(vec3 srgb) {
    return vec3(
        srgb.r > 0.0404482362771082 ? pow(srgb.r*0.947867298578199 + 0.052132701421801, 2.4) : srgb.r*0.0773993808049536,
        srgb.g > 0.0404482362771082 ? pow(srgb.g*0.947867298578199 + 0.052132701421801, 2.4) : srgb.g*0.0773993808049536,
        srgb.b > 0.0404482362771082 ? pow(srgb.b*0.947867298578199 + 0.052132701421801, 2.4) : srgb.b*0.0773993808049536 
    );
}

vec3 linear2srgb(vec3 linear) {
    return vec3(
        linear.x > 0.00313066844250063 ? pow(linear.x, 0.416666666666667)*1.055 - 0.055 : linear.x*12.92,
        linear.y > 0.00313066844250063 ? pow(linear.y, 0.416666666666667)*1.055 - 0.055 : linear.y*12.92,
        linear.z > 0.00313066844250063 ? pow(linear.z, 0.416666666666667)*1.055 - 0.055 : linear.z*12.92
    );
}

// https://www.w3.org/Graphics/Color/srgb22
#define RS 0.2126
#define GS 0.7152
#define BS 0.0722

vec3 rgb2vry(vec3 rgb) {
    if (NOGAMMA == 1.0)
        return rgb;

    // https://en.wikipedia.org/wiki/Opponent_process
    vec3 linear = srgb2linear(rgb);

    // https://en.wikipedia.org/wiki/Lightness#Relationship_between_lightness.2C_value.2C_and_relative_luminance
    // "scientists eventually converged on a roughly cube-root curve"
    // CIE does the same thing.
    vec3 vry = vec3(
        pow(linear.x*RS + linear.y*GS + linear.z*BS, 0.333333333333333),
        linear.x - linear.y,
        (linear.x + linear.y) * 0.49999 - linear.z
    );

    return vry;
}
vec3 vry2rgb(vec3 vry) {
    if (NOGAMMA == 1.0)
        return vry;

    // Magic.
    float t = pow(vry.x, 3.);
    
    vec3 rgb = vec3(
        t + vry.y*(GS       + BS * 0.49999) + vry.z*BS,
        t - vry.y*(RS       + BS * 0.49999) + vry.z*BS,
        t + vry.y*(GS * 0.49999 - RS * 0.49999) - vry.z*(RS+GS)
    );
    
    return linear2srgb(rgb);
}

vec3 vry_interp(vec3 first, vec3 second, float frac) {
    if (NOGAMMA == 1.0)
        return first*NOT(frac) + second*YES(frac);
    
    // Because the chroma values were generated on linear light, but the luma must be interpolated in perceptual gamma (3)
    // it can cause out-of-gamut oversaturated values, since the chroma field is not a fixed size as luma values change.
    // To compensate, we can "pull" the chroma interpolation path in the opposite way the luma path is curved.
    float new_luma = first.x*NOT(frac) + second.x*YES(frac);
    float linear_span = pow(second.x, 3.) - pow(first.x, 3.);
    
    if (linear_span == 0.) 
        linear_span = 1.;

    float luma_fraction = (pow(new_luma, 3.) - pow(first.x, 3.)) / linear_span;
    
    return  vec3(new_luma,
                first.y*NOT(luma_fraction) + second.y*YES(luma_fraction),
                first.z*NOT(luma_fraction) + second.z*YES(luma_fraction)
            );
}

vec3 percent(float ssize, float tsize, float coord, float mod) {
    if (BILINEAR == 1.0)
        tsize = ssize;
    
    float minfull = (coord*tsize - 0.49999)/tsize*ssize * mod;
    float maxfull = (coord*tsize + 0.49999)/tsize*ssize * mod;

    float realfull = floor(maxfull) + 0.00001;

    if (minfull > realfull) {
        return vec3(1.00001, (realfull + 0.49999)/ssize, (realfull + 0.49999)/ssize);
    }

    return  vec3(
                (maxfull - realfull) / (maxfull - minfull),
                (realfull - 0.49999) / ssize,
                (realfull + 0.49999) / ssize
            );
}

void main()
{
    vec2 viewportSize = outsize.xy;
    vec2 gameCoord = vTexCoord;

    vec3 xstuff = percent(SourceSize.x, viewportSize.x, gameCoord.x,  InputSize.x / TextureSize.x);
    vec3 ystuff = percent(SourceSize.y, viewportSize.y, gameCoord.y,  InputSize.y / TextureSize.y);

    float xkeep = xstuff.x;
    float ykeep = ystuff.x;

    // get points to interpolate across in pseudo-perceptual colorspace
    vec3 a = rgb2vry(COMPAT_TEXTURE(Source, vec2(xstuff.y, ystuff.y)).rgb);
    vec3 b = rgb2vry(COMPAT_TEXTURE(Source, vec2(xstuff.z, ystuff.y)).rgb);
    vec3 c = rgb2vry(COMPAT_TEXTURE(Source, vec2(xstuff.y, ystuff.z)).rgb);
    vec3 d = rgb2vry(COMPAT_TEXTURE(Source, vec2(xstuff.z, ystuff.z)).rgb);

    // interpolate
    vec3 x1     = vry_interp(a,  b,  xkeep);
    vec3 x2     = vry_interp(c,  d,  xkeep);
    vec3 result = vry_interp(x1, x2, ykeep);

    // convert back to sRGB and return
    FragColor = vec4(vry2rgb(result), 1.);
} 
#endif
