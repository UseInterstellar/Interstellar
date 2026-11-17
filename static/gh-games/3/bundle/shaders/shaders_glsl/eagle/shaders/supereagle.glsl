/*              SuperEagle code               */
/*  Copied from the Dosbox source code        */
/*  Copyright (C) 2002-2007  The DOSBox Team  */
/*  License: GNU-GPL                          */
/*  Adapted by guest(r) on 16.4.2007          */

/*  GET_RESULT function                            */
/*  Copyright (c) 1999-2001 by Derek Liauw Kie Fa  */
/*  License: GNU-GPL                               */

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
COMPAT_VARYING vec4 t1;
COMPAT_VARYING vec4 t2;
COMPAT_VARYING vec4 t3;
COMPAT_VARYING vec4 t4;
COMPAT_VARYING vec4 t5;
COMPAT_VARYING vec4 t6;
COMPAT_VARYING vec4 t7;
COMPAT_VARYING vec4 t8;

#define vTexCoord TEX0.xy
#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define OutputSize vec4(OutputSize, 1.0 / OutputSize)

void main()
{
    gl_Position = MVPMatrix * VertexCoord;
    COL0 = COLOR;
    TEX0.xy = TexCoord.xy;
   float dx = SourceSize.z;
   float dy = SourceSize.w;
   t1.xy = vTexCoord + vec2(-dx,-dy);
   t1.zw = vTexCoord + vec2(-dx,  0);
   t2.xy = vTexCoord + vec2(+dx,-dy);
   t2.zw = vTexCoord + vec2(+dx+dx,-dy);
   t3.xy = vTexCoord + vec2(-dx,  0);
   t3.zw = vTexCoord + vec2(+dx,  0);
   t4.xy = vTexCoord + vec2(+dx+dx,  0);
   t4.zw = vTexCoord + vec2(-dx,+dy);
   t5.xy = vTexCoord + vec2(  0,+dy);
   t5.zw = vTexCoord + vec2(+dx,+dy);
   t6.xy = vTexCoord + vec2(+dx+dx,+dy);
   t6.zw = vTexCoord + vec2(-dx,+dy+dy);
   t7.xy = vTexCoord + vec2(  0,+dy+dy);
   t7.zw = vTexCoord + vec2(+dx,+dy+dy);
   t8.xy = vTexCoord + vec2(+dx+dx,+dy+dy);
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
precision mediump int;
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
COMPAT_VARYING vec4 t8;

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define OutputSize vec4(OutputSize, 1.0 / OutputSize)

vec3 dtt = vec3(65536.0,255.0,1.0);

COMPAT_PRECISION float reduce(vec3 color)
{
	return dot(color, dtt);
}

/*  GET_RESULT function                            */
/*  Copyright (c) 1999-2001 by Derek Liauw Kie Fa  */
/*  License: GNU-GPL                               */

int GET_RESULT(float A, float B, float C, float D)
{
   int x = 0; int y = 0; int r = 0;
   if (A == C) x+=1; else if (B == C) y+=1;
   if (A == D) x+=1; else if (B == D) y+=1;
   if (x <= 1) r+=1; 
   if (y <= 1) r-=1;
   return r;
} 

void main()
{
   vec2 fp = fract(vTexCoord * SourceSize.xy);

   // Reading the texels

   vec3 C0 = COMPAT_TEXTURE(Source, t1.xy).xyz; 
   vec3 C1 = COMPAT_TEXTURE(Source, t1.zw).xyz;
   vec3 C2 = COMPAT_TEXTURE(Source, t2.xy).xyz;
   vec3 D3 = COMPAT_TEXTURE(Source, t2.zw).xyz;
   vec3 C3 = COMPAT_TEXTURE(Source, t3.xy).xyz;
   vec3 C4 = COMPAT_TEXTURE(Source, vTexCoord).xyz;
   vec3 C5 = COMPAT_TEXTURE(Source, t3.zw).xyz;
   vec3 D4 = COMPAT_TEXTURE(Source, t4.xy).xyz;
   vec3 C6 = COMPAT_TEXTURE(Source, t4.zw).xyz;
   vec3 C7 = COMPAT_TEXTURE(Source, t5.xy).xyz;
   vec3 C8 = COMPAT_TEXTURE(Source, t5.zw).xyz;
   vec3 D5 = COMPAT_TEXTURE(Source, t6.xy).xyz;
   vec3 D0 = COMPAT_TEXTURE(Source, t6.zw).xyz;
   vec3 D1 = COMPAT_TEXTURE(Source, t7.xy).xyz;
   vec3 D2 = COMPAT_TEXTURE(Source, t7.zw).xyz;
   vec3 D6 = COMPAT_TEXTURE(Source, t8.xy).xyz;

   vec3 p00,p10,p01,p11;

   // reducing vec3 to float	
   float c0 = reduce(C0);float c1 = reduce(C1);
   float c2 = reduce(C2);float c3 = reduce(C3);
   float c4 = reduce(C4);float c5 = reduce(C5);
   float c6 = reduce(C6);float c7 = reduce(C7);
   float c8 = reduce(C8);float d0 = reduce(D0);
   float d1 = reduce(D1);float d2 = reduce(D2);
   float d3 = reduce(D3);float d4 = reduce(D4);
   float d5 = reduce(D5);float d6 = reduce(D6);
   
/*              SuperEagle code               */
/*  Copied from the Dosbox source code        */
/*  Copyright (C) 2002-2007  The DOSBox Team  */
/*  License: GNU-GPL                          */
/*  Adapted by guest(r) on 16.4.2007          */

   if (c4 != c8) {
      if (c7 == c5) {
         p01 = p10 = C7;
         if ((c6 == c7) || (c5 == c2)) {
            p00 = 0.25*(3.0*C7+C4);
         } else {
            p00 = 0.5*(C4+C5);
         }

         if ((c5 == d4) || (c7 == d1)) {
            p11 = 0.25*(3.0*C7+C8);
         } else {
            p11 = 0.5*(C7+C8);
         }
      } else {
         p11 = 0.125*(6.0*C8+C7+C5);
         p00 = 0.125*(6.0*C4+C7+C5);

         p10 = 0.125*(6.0*C7+C4+C8);
         p01 = 0.125*(6.0*C5+C4+C8);
      }
   } else {
      if (c7 != c5) {
         p11 = p00 = C4;

         if ((c1 == c4) || (c8 == d5)) {
            p01 = 0.25*(3.0*C4+C5);
         } else {
            p01 = 0.5*(C4+C5);
         }

         if ((c8 == d2) || (c3 == c4)) {
            p10 = 0.25*(3.0*C4+C7);
         } else {
            p10 = 0.5*(C7+C8);
         }
      } else {
         int r = 0;
         r += GET_RESULT(c5,c4,c6,d1);
         r += GET_RESULT(c5,c4,c3,c1);
         r += GET_RESULT(c5,c4,d2,d5);
         r += GET_RESULT(c5,c4,c2,d4);

         if (r > 0) {
            p01 = p10 = C7;
            p00 = p11 = 0.5*(C4+C5);
         } else if (r < 0) {
            p11 = p00 = C4;
            p01 = p10 = 0.5*(C4+C5);
         } else {
            p11 = p00 = C4;
            p01 = p10 = C7;
         }
      }
   }
   
// Distributing the four products
   p10 = (fp.x < 0.50) ? (fp.y < 0.50 ? p00 : p10) : (fp.y < 0.50 ? p01: p11);
  
   FragColor = vec4(p10, 1.0);
} 
#endif
