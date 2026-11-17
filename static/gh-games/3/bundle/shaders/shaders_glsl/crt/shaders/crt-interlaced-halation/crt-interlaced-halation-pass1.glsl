/*
    CRT-interlaced-halation shader - pass1

    Like the CRT-interlaced shader, but adds a subtle glow around bright areas
    of the screen.

    Copyright (C) 2010-2012 cgwg, Themaister and DOLLS

    This program is free software; you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by the Free
    Software Foundation; either version 2 of the License, or (at your option)
    any later version.

    (cgwg gave their consent to have the original version of this shader
    distributed under the GPL in this message:

        http://board.byuu.org/viewtopic.php?p=26075#p26075

        "Feel free to distribute my shaders under the GPL. After all, the
        barrel distortion code was taken from the Curvature shader, which is
        under the GPL."
    )
*/

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
   float dx = 1.0 / TextureSize.x;
   
    t1 = TEX0.xxxy + vec4( -4.0*dx, -3.0*dx, -2.0*dx, 0);
    t2 = TEX0.xxxy + vec4(     -dx,       0,      dx, 0);
    t3 = TEX0.xxxy + vec4(  2.0*dx,  3.0*dx,  4.0*dx, 0);

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

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

        #define display_gamma 2.2
        #define TEX2D(c) pow(COMPAT_TEXTURE(Source,(c)),vec4(display_gamma))

void main()
{
                float wid = 2.0;

                float c1 = exp(-1.0/wid/wid);
                float c2 = exp(-4.0/wid/wid);
                float c3 = exp(-9.0/wid/wid);
                float c4 = exp(-16.0/wid/wid);
                float norm = 1.0 / (1.0 + 2.0*(c1+c2+c3+c4));

                vec4 sum = vec4(0.0, 0.0, 0.0, 0.0);

                sum += TEX2D(t1.xw) * vec4(c4);
                sum += TEX2D(t1.yw) * vec4(c3);
                sum += TEX2D(t1.zw) * vec4(c2);
                sum += TEX2D(t2.xw) * vec4(c1);
                sum += TEX2D(vTexCoord);
                sum += TEX2D(t2.zw) * vec4(c1);
                sum += TEX2D(t3.xw) * vec4(c2);
                sum += TEX2D(t3.yw) * vec4(c3);
                sum += TEX2D(t3.zw) * vec4(c4);

                FragColor = vec4(pow(sum*vec4(norm), vec4(1.0/display_gamma)));
} 
#endif
