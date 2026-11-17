/**
* Practical Elliptical Texture Filtering on the GPU
* Copyright 2010-2011 Pavlos Mavridis, All rights reserved.
*
* Version: 0.6 - 12 / 7 / 2011 (DD/MM/YY)
*/

#pragma parameter distortion "EWA Curvature" 0.2 0.0 1.0 0.05

#define USE_LOD

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
uniform COMPAT_PRECISION float distortion;
#else
#define distortion 0.2
#endif

//{========= TEXTURE FILTERING (EWA) PARAMETERS =========
#define MAX_ECCENTRICITY 1
#define NUM_PROBES 1
#define FILTER_WIDTH 0.8
#define FILTER_SHARPNESS 1.0
#define TEXELS_PER_PIXEL 1.0
#define TEXEL_LIMIT 32
#define FILTER_FUNC triFilter
//}======================================================

#define M_PI 3.14159265358979323846

#define SourceImage Source

//{========================= FILTER FUNCTIONS =======================
// We only use the Gaussian filter function. The other filters give
// very similar results.
 
float boxFilter(float r2){
    return 1.0;
}
 
float gaussFilter(float r2){
    float alpha = FILTER_SHARPNESS;
    return exp(-alpha * r2);
}
 
float triFilter(float r2){
    float alpha = FILTER_SHARPNESS;
    float r= sqrt(r2);
    return max(0., 1.-r);///alpha);
}
 
float sinc(float x){
    return sin(M_PI*x)/(M_PI*x);
}
 
float lanczosFilter(float r2){
    if (r2==0.)
        return 1.;
    float r= sqrt(r2);
    return sinc(r)*sinc(r/1.3);
}
 
//catmull-rom filter
float crFilter(float r2){
    float r = sqrt(r2);
    return (r>=2.)? 0. :(r<1.)?(3.*r*r2-5.*r2+2.):(-r*r2+5.*r2-8.*r+4.);
}
 
float quadraticFilter(float r2){
    float a = FILTER_SHARPNESS;
    return 1.0 - r2/(a*a);
}
 
float cubicFilter(float r2){
    float a = FILTER_SHARPNESS;
    float r = sqrt(r2);
    return 1.0 - 3.*r2/(a*a) + 2.*r*r2/(a*a*a);
}
//}

//==================== EWA ( reference / 2-tex / 4-tex) ====================
 
/**
*   EWA filter
*   Adapted from an ANSI C implementation from Matt Pharr
*/

vec4 ewaFilter(sampler2D Source, vec2 p0, vec2 du, vec2 dv, float lod, int psize){
#ifdef USE_LOD 
    int scale = psize >> int(lod);
#else
	int scale = psize;
#endif
    vec4 foo = COMPAT_TEXTURE(Source,p0);
   
    //don't bother with elliptical filtering if the scale is very small
    if(scale<2)
        return foo;
	vec2 temp0 = p0;
    temp0 -=vec2(0.5,0.5)/float(scale);
    vec2 p = float(scale) * temp0;
 
    float ux = FILTER_WIDTH * du.s * float(scale);
    float vx = FILTER_WIDTH * du.t * float(scale);
    float uy = FILTER_WIDTH * dv.s * float(scale);
    float vy = FILTER_WIDTH * dv.t * float(scale);
 
    // compute ellipse coefficients
    // A*x*x + B*x*y + C*y*y = F.
    float A = vx*vx+vy*vy+1.;
    float B = -2.*(ux*vx+uy*vy);
    float C = ux*ux+uy*uy+1.;
    float F = A*C-B*B/4.;
 
    // Compute the ellipse's (u,v) bounding box in texture space
    float bbox_du = 2. / (-B*B+4.0*C*A) * sqrt((-B*B+4.0*C*A)*C*F);
    float bbox_dv = 2. / (-B*B+4.0*C*A) * sqrt(A*(-B*B+4.0*C*A)*F);
 
    //the ellipse bbox             
    int u0 = int(floor(p.s - bbox_du));
    int u1 = int(ceil (p.s + bbox_du));
    int v0 = int(floor(p.t - bbox_dv));
    int v1 = int(ceil (p.t + bbox_dv));
 
    // Heckbert MS thesis, p. 59; scan over the bounding box of the ellipse
    // and incrementally update the value of Ax^2+Bxy*Cy^2; when this
    // value, q, is less than F, we're inside the ellipse so we filter
    // away..
    vec4 num= vec4(0., 0., 0., 1.);
    float den = 0.;
    float ddq = 2. * A;
    float U = float(u0) - p.s;
   
    for (int v = v0; v <= v1; ++v) {
        float V = float(v) - p.t;
        float dq = A*(2.*U+1.) + B*V;
        float q = (C*V + B*U)*V + A*U*U;

        for (int u = u0; u <= u1; ++u) {
            if (q < F)
            {
                float r2 = q / F;
                float weight = FILTER_FUNC(r2);
#ifdef USE_LOD
                num += weight* textureLod(Source, vec2(u+0.5,v+0.5)/scale , int(lod));
#else
                num += weight* COMPAT_TEXTURE(Source, vec2(float(u)+0.5,float(v)+0.5)/float(scale));
#endif
                den += weight;
            }
            q += dq;
            dq += ddq;
        }

    }

    vec4 color = num*(1./den);
    return color;
}

#ifdef USE_LOD
//Function for mip-map lod selection
vec2 textureQueryLODEWA(sampler2D tex, vec2 du, vec2 dv, int psize){
    int scale = psize;
 
    float ux = du.s * scale;
    float vx = du.t * scale;
    float uy = dv.s * scale;
    float vy = dv.t * scale;
 
    // compute ellipse coefficients
    // A*x*x + B*x*y + C*y*y = F.
    float A = vx*vx+vy*vy;
    float B = -2*(ux*vx+uy*vy);
    float C = ux*ux+uy*uy;
    float F = A*C-B*B/4.;
       
    A = A/F;
    B = B/F;
    C = C/F;
   
    float root=sqrt((A-C)*(A-C)+B*B);
    float majorRadius = sqrt(2./(A+C-root));
    float minorRadius = sqrt(2./(A+C+root));
 
    float majorLength = majorRadius;
    float minorLength = minorRadius;
 
    if (minorLength<0.01) minorLength=0.01;
 
    const float maxEccentricity = MAX_ECCENTRICITY;
 
    float e = majorLength / minorLength;
 
    if (e > maxEccentricity) {
        minorLength *= (e / maxEccentricity);
    }
   
    float lod = log2(minorLength / TEXELS_PER_PIXEL);  
    lod = clamp (lod, 0.0, log2(float(psize)));
 
    return vec2(lod, e);
}
#endif

vec4 texture2DEWA(sampler2D tex, vec2 coords){
 
    vec2 du = dFdx(coords);
    vec2 dv = dFdy(coords);
   
    int psize = int(TextureSize.x);//textureSize(tex, 0).x;
    float lod = 0.;
#ifdef USE_LOD
    lod = textureQueryLODEWA(tex, du, dv, psize).x;
#endif

    return ewaFilter(tex, coords, du, dv, lod, psize );
}

vec2 radialDistortion(vec2 coord) {
    vec2 cc = coord - vec2(0.5);
    float dist = dot(cc, cc) * distortion;
    return coord + cc * (1.0 - dist) * dist;
}

void main()
{
    FragColor = texture2DEWA(SourceImage,radialDistortion(vTexCoord * TextureSize / InputSize) * InputSize / TextureSize);
} 
#endif
