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
precision COMPAT_PRECISION float;
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

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

void weights(out vec4 x, out vec4 y, vec2 t)
{
   vec2 t2 = t * t;
   vec2 t3 = t2 * t;

   vec4 xs = vec4(1.0, t.x, t2.x, t3.x);
   vec4 ys = vec4(1.0, t.y, t2.y, t3.y);

   const vec4 p0 = vec4(+0.0, -0.5, +1.0, -0.5);
   const vec4 p1 = vec4(+1.0,  0.0, -2.5, +1.5);
   const vec4 p2 = vec4(+0.0, +0.5, +2.0, -1.5);
   const vec4 p3 = vec4(+0.0,  0.0, -0.5, +0.5);

   x = vec4(dot(xs, p0), dot(xs, p1), dot(xs, p2), dot(xs, p3));
   y = vec4(dot(ys, p0), dot(ys, p1), dot(ys, p2), dot(ys, p3));
}

void main()
{
   vec2 uv = vTexCoord * SourceSize.xy - 0.5;
   vec2 texel = floor(uv);
   vec2 tex = (texel + 0.5) * SourceSize.zw;
   vec2 phase = uv - texel;

#define TEX(x, y) textureLodOffset(Source, tex, 0.0, ivec2(x, y)).rgb

   vec4 x;
   vec4 y;
   weights(x, y, phase);

   vec3 color;
   vec4 row = x * y.x;
   color  = TEX(-1, -1) * row.x;
   color += TEX(+0, -1) * row.y;
   color += TEX(+1, -1) * row.z;
   color += TEX(+2, -1) * row.w;

   row = x * y.y;
   color += TEX(-1, +0) * row.x;
   color += TEX(+0, +0) * row.y;
   color += TEX(+1, +0) * row.z;
   color += TEX(+2, +0) * row.w;

   row = x * y.z;
   color += TEX(-1, +1) * row.x;
   color += TEX(+0, +1) * row.y;
   color += TEX(+1, +1) * row.z;
   color += TEX(+2, +1) * row.w;

   row = x * y.w;
   color += TEX(-1, +2) * row.x;
   color += TEX(+0, +2) * row.y;
   color += TEX(+1, +2) * row.z;
   color += TEX(+2, +2) * row.w;

   FragColor = vec4(color, 1.0);
} 
#endif
