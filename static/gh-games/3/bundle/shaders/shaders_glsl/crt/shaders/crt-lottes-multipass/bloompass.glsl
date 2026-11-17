// PUBLIC DOMAIN CRT STYLED SCAN-LINE SHADER
//
//   by Timothy Lottes
//
// This is more along the style of a really good CGA arcade monitor.
// With RGB inputs instead of NTSC.
// The shadow mask example has the mask rotated 90 degrees for less chromatic aberration.
//
// Left it unoptimized to show the theory behind the algorithm.
//
// It is an example what I personally would want as a display option for pixel art games.
// Please take and use, change, or whatever.

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
    TEX0.xy = TexCoord.xy;
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
// All parameter floats need to have COMPAT_PRECISION in front of them
uniform COMPAT_PRECISION float hardScan;
uniform COMPAT_PRECISION float hardPix;
uniform COMPAT_PRECISION float warpX;
uniform COMPAT_PRECISION float warpY;
uniform COMPAT_PRECISION float maskDark;
uniform COMPAT_PRECISION float maskLight;
uniform COMPAT_PRECISION float scaleInLinearGamma;
uniform COMPAT_PRECISION float shadowMask;
uniform COMPAT_PRECISION float brightBoost;
uniform COMPAT_PRECISION float hardBloomPix;
uniform COMPAT_PRECISION float hardBloomScan;
uniform COMPAT_PRECISION float bloomAmount;
uniform COMPAT_PRECISION float shape;
#else
#define hardScan -8.0
#define hardPix -3.0
#define warpX 0.031
#define warpY 0.041
#define maskDark 0.5
#define maskLight 1.5
#define scaleInLinearGamma 1.0
#define shadowMask 3.0
#define brightBoost 1.0
#define hardBloomPix -1.5
#define hardBloomScan -2.0
#define bloomAmount 0.15
#define shape 2.0
#endif

//Uncomment to reduce instructions with simpler linearization
//(fixes HD3000 Sandy Bridge IGP)
//#define SIMPLE_LINEAR_GAMMA
#define DO_BLOOM

// ------------- //

// sRGB to Linear.
// Assuming using sRGB typed textures this should not be needed.
#ifdef SIMPLE_LINEAR_GAMMA
float ToLinear1(float c)
{
    return c;
}
vec3 ToLinear(vec3 c)
{
    return c;
}
vec3 ToSrgb(vec3 c)
{
    return pow(c, vec3(1.0 / 2.2));
}
#else
float ToLinear1(float c)
{
    if (scaleInLinearGamma == 0.) 
        return c;
    
    return(c<=0.04045) ? c/12.92 : pow((c + 0.055)/1.055, 2.4);
}

vec3 ToLinear(vec3 c)
{
    if (scaleInLinearGamma==0.) 
        return c;
    
    return vec3(ToLinear1(c.r), ToLinear1(c.g), ToLinear1(c.b));
}

// Linear to sRGB.
// Assuming using sRGB typed textures this should not be needed.
float ToSrgb1(float c)
{
    if (scaleInLinearGamma == 0.) 
        return c;
    
    return(c<0.0031308 ? c*12.92 : 1.055*pow(c, 0.41666) - 0.055);
}

vec3 ToSrgb(vec3 c)
{
    if (scaleInLinearGamma == 0.) 
        return c;
    
    return vec3(ToSrgb1(c.r), ToSrgb1(c.g), ToSrgb1(c.b));
}
#endif

// Nearest emulated sample given floating point position and texel offset.
// Also zero's off screen.
vec3 Fetch(vec2 pos,vec2 off){
  pos=(floor(pos*SourceSize.xy+off)+vec2(0.5,0.5))/SourceSize.xy;
#ifdef SIMPLE_LINEAR_GAMMA
  return ToLinear(brightBoost * pow(COMPAT_TEXTURE(Source,pos.xy).rgb, vec3(2.2)));
#else
  return ToLinear(brightBoost * COMPAT_TEXTURE(Source,pos.xy).rgb);
#endif
}

// Distance in emulated pixels to nearest texel.
vec2 Dist(vec2 pos)
{
    pos = pos*SourceSize.xy;
    
    return -((pos - floor(pos)) - vec2(0.5));
}
    
// 1D Gaussian.
float Gaus(float pos, float scale)
{
    return exp2(scale*pow(abs(pos), shape));
}

// 3-tap Gaussian filter along horz line.
vec3 Horz3(vec2 pos, float off)
{
    vec3 b    = Fetch(pos, vec2(-1.0, off));
    vec3 c    = Fetch(pos, vec2( 0.0, off));
    vec3 d    = Fetch(pos, vec2( 1.0, off));
    float dst = Dist(pos).x;

    // Convert distance to weight.
    float scale = hardPix;
    float wb = Gaus(dst-1.0,scale);
    float wc = Gaus(dst+0.0,scale);
    float wd = Gaus(dst+1.0,scale);

    // Return filtered sample.
    return (b*wb+c*wc+d*wd)/(wb+wc+wd);
}

// 5-tap Gaussian filter along horz line.
vec3 Horz5(vec2 pos,float off){
    vec3 a = Fetch(pos,vec2(-2.0, off));
    vec3 b = Fetch(pos,vec2(-1.0, off));
    vec3 c = Fetch(pos,vec2( 0.0, off));
    vec3 d = Fetch(pos,vec2( 1.0, off));
    vec3 e = Fetch(pos,vec2( 2.0, off));
    
    float dst = Dist(pos).x;
    // Convert distance to weight.
    float scale = hardPix;
    float wa = Gaus(dst - 2.0, scale);
    float wb = Gaus(dst - 1.0, scale);
    float wc = Gaus(dst + 0.0, scale);
    float wd = Gaus(dst + 1.0, scale);
    float we = Gaus(dst + 2.0, scale);
    
    // Return filtered sample.
    return (a*wa+b*wb+c*wc+d*wd+e*we)/(wa+wb+wc+wd+we);
}
  
// 7-tap Gaussian filter along horz line.
vec3 Horz7(vec2 pos,float off)
{
    vec3 a = Fetch(pos, vec2(-3.0, off));
    vec3 b = Fetch(pos, vec2(-2.0, off));
    vec3 c = Fetch(pos, vec2(-1.0, off));
    vec3 d = Fetch(pos, vec2( 0.0, off));
    vec3 e = Fetch(pos, vec2( 1.0, off));
    vec3 f = Fetch(pos, vec2( 2.0, off));
    vec3 g = Fetch(pos, vec2( 3.0, off));

    float dst = Dist(pos).x;
    // Convert distance to weight.
    float scale = hardBloomPix;
    float wa = Gaus(dst - 3.0, scale);
    float wb = Gaus(dst - 2.0, scale);
    float wc = Gaus(dst - 1.0, scale);
    float wd = Gaus(dst + 0.0, scale);
    float we = Gaus(dst + 1.0, scale);
    float wf = Gaus(dst + 2.0, scale);
    float wg = Gaus(dst + 3.0, scale);

    // Return filtered sample.
    return (a*wa+b*wb+c*wc+d*wd+e*we+f*wf+g*wg)/(wa+wb+wc+wd+we+wf+wg);
}
  
// Return scanline weight.
float Scan(vec2 pos, float off)
{
    float dst = Dist(pos).y;

    return Gaus(dst + off, hardScan);
}
  
// Return scanline weight for bloom.
float BloomScan(vec2 pos, float off)
{
    float dst = Dist(pos).y;
    
    return Gaus(dst + off, hardBloomScan);
}

// Allow nearest three lines to effect pixel.
vec3 Tri(vec2 pos)
{
    vec3 a = Horz3(pos,-1.0);
    vec3 b = Horz5(pos, 0.0);
    vec3 c = Horz3(pos, 1.0);
    
    float wa = Scan(pos,-1.0); 
    float wb = Scan(pos, 0.0);
    float wc = Scan(pos, 1.0);
    
    return a*wa + b*wb + c*wc;
}
  
// Small bloom.
vec3 Bloom(vec2 pos)
{
    vec3 a = Horz5(pos,-2.0);
    vec3 b = Horz7(pos,-1.0);
    vec3 c = Horz7(pos, 0.0);
    vec3 d = Horz7(pos, 1.0);
    vec3 e = Horz5(pos, 2.0);

    float wa = BloomScan(pos,-2.0);
    float wb = BloomScan(pos,-1.0); 
    float wc = BloomScan(pos, 0.0);
    float wd = BloomScan(pos, 1.0);
    float we = BloomScan(pos, 2.0);

    return a*wa+b*wb+c*wc+d*wd+e*we;
}
  
// Distortion of scanlines, and end of screen alpha.
vec2 Warp(vec2 pos)
{
    pos  = pos*2.0-1.0;    
    pos *= vec2(1.0 + (pos.y*pos.y)*warpX, 1.0 + (pos.x*pos.x)*warpY);
    
    return pos*0.5 + 0.5;
}
  
// Shadow mask.
vec3 Mask(vec2 pos)
{
    vec3 mask = vec3(maskDark, maskDark, maskDark);
  
    // Very compressed TV style shadow mask.
    if (shadowMask == 1.0) 
    {
        float line = maskLight;
        float odd = 0.0;
        
        if (fract(pos.x*0.166666666) < 0.5) odd = 1.0;
        if (fract((pos.y + odd) * 0.5) < 0.5) line = maskDark;  
        
        pos.x = fract(pos.x*0.333333333);

        if      (pos.x < 0.333) mask.r = maskLight;
        else if (pos.x < 0.666) mask.g = maskLight;
        else                    mask.b = maskLight;
        mask*=line;  
    } 

    // Aperture-grille.
    else if (shadowMask == 2.0) 
    {
        pos.x = fract(pos.x*0.333333333);

        if      (pos.x < 0.333) mask.r = maskLight;
        else if (pos.x < 0.666) mask.g = maskLight;
        else                    mask.b = maskLight;
    } 

    // Stretched VGA style shadow mask (same as prior shaders).
    else if (shadowMask == 3.0) 
    {
        pos.x += pos.y*3.0;
        pos.x  = fract(pos.x*0.166666666);

        if      (pos.x < 0.333) mask.r = maskLight;
        else if (pos.x < 0.666) mask.g = maskLight;
        else                    mask.b = maskLight;
    }

    // VGA style shadow mask.
    else if (shadowMask == 4.0) 
    {
        pos.xy  = floor(pos.xy*vec2(1.0, 0.5));
        pos.x  += pos.y*3.0;
        pos.x   = fract(pos.x*0.166666666);

        if      (pos.x < 0.333) mask.r = maskLight;
        else if (pos.x < 0.666) mask.g = maskLight;
        else                    mask.b = maskLight;
    }

    return mask;
}

void main()
{
    vec2 pos = vTexCoord;

    FragColor = vec4(Bloom(pos)*bloomAmount, 1.0);
} 
#endif
