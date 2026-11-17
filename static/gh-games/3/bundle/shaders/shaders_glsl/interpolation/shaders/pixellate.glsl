//    Pixellate Shader
//    Copyright (c) 2011, 2012 Fes
//    Permission to use, copy, modify, and/or distribute this software for any
//    purpose with or without fee is hereby granted, provided that the above
//    copyright notice and this permission notice appear in all copies.
//    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
//    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
//    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
//    SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
//   WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
//    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
//    IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//    (Fes gave their permission to have this shader distributed under this
//    licence in this forum post:
//        http://board.byuu.org/viewtopic.php?p=57295#p57295

// Parameter lines go here:
#pragma parameter INTERPOLATE_IN_LINEAR_GAMMA "Linear Gamma Weight" 1.0 0.0 1.0 1.0

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
#define COMPAT_PRECISION highp
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
uniform COMPAT_PRECISION float INTERPOLATE_IN_LINEAR_GAMMA;
#else
#define INTERPOLATE_IN_LINEAR_GAMMA 1.0
#endif

void main()
{
   vec2 texelSize = SourceSize.zw;

   vec2 range = vec2(abs(InputSize.x / (outsize.x * SourceSize.x)), abs(InputSize.y / (outsize.y * SourceSize.y)));
   range = range / 2.0 * 0.999;

   float left   = vTexCoord.x - range.x;
   float top    = vTexCoord.y + range.y;
   float right  = vTexCoord.x + range.x;
   float bottom = vTexCoord.y - range.y;
   
   vec3 topLeftColor     = COMPAT_TEXTURE(Source, (floor(vec2(left, top)     / texelSize) + 0.5) * texelSize).rgb;
   vec3 bottomRightColor = COMPAT_TEXTURE(Source, (floor(vec2(right, bottom) / texelSize) + 0.5) * texelSize).rgb;
   vec3 bottomLeftColor  = COMPAT_TEXTURE(Source, (floor(vec2(left, bottom)  / texelSize) + 0.5) * texelSize).rgb;
   vec3 topRightColor    = COMPAT_TEXTURE(Source, (floor(vec2(right, top)    / texelSize) + 0.5) * texelSize).rgb;

   if (INTERPOLATE_IN_LINEAR_GAMMA > 0.5){
	topLeftColor     = pow(topLeftColor, vec3(2.2));
	bottomRightColor = pow(bottomRightColor, vec3(2.2));
	bottomLeftColor  = pow(bottomLeftColor, vec3(2.2));
	topRightColor    = pow(topRightColor, vec3(2.2));
   }

   vec2 border = clamp(floor((vTexCoord / texelSize) + vec2(0.5)) * texelSize, vec2(left, bottom), vec2(right, top));

   float totalArea = 4.0 * range.x * range.y;

   vec3 averageColor;
   averageColor  = ((border.x - left)  * (top - border.y)    / totalArea) * topLeftColor;
   averageColor += ((right - border.x) * (border.y - bottom) / totalArea) * bottomRightColor;
   averageColor += ((border.x - left)  * (border.y - bottom) / totalArea) * bottomLeftColor;
   averageColor += ((right - border.x) * (top - border.y)    / totalArea) * topRightColor;

   FragColor = (INTERPOLATE_IN_LINEAR_GAMMA > 0.5) ? vec4(pow(averageColor, vec3(1.0 / 2.2)), 1.0) : vec4(averageColor, 1.0);
} 
#endif
