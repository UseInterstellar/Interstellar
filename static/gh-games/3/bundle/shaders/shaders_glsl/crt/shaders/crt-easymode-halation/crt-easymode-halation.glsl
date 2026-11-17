/*
    CRT Shader by EasyMode
    License: GPL
*/

// Parameter lines go here:
#pragma parameter GAMMA_OUTPUT "Gamma Output" 2.2 0.1 5.0 0.01
#pragma parameter SHARPNESS_H "Sharpness Horizontal" 0.6 0.0 1.0 0.05
#pragma parameter SHARPNESS_V "Sharpness Vertical" 1.0 0.0 1.0 0.05
#pragma parameter MASK_TYPE "Mask Type" 4.0 0.0 7.0 1.0
#pragma parameter MASK_STRENGTH_MIN "Mask Strength Min." 0.2 0.0 0.5 0.01
#pragma parameter MASK_STRENGTH_MAX "Mask Strength Max." 0.2 0.0 0.5 0.01
#pragma parameter MASK_SIZE "Mask Size" 1.0 1.0 100.0 1.0
#pragma parameter SCANLINE_STRENGTH_MIN "Scanline Strength Min." 0.2 0.0 1.0 0.05
#pragma parameter SCANLINE_STRENGTH_MAX "Scanline Strength Max." 0.4 0.0 1.0 0.05
#pragma parameter SCANLINE_BEAM_MIN "Scanline Beam Min." 1.0 0.25 5.0 0.05
#pragma parameter SCANLINE_BEAM_MAX "Scanline Beam Max." 1.0 0.25 5.0 0.05
#pragma parameter GEOM_CURVATURE "Geom Curvature" 0.0 0.0 0.1 0.01
#pragma parameter GEOM_WARP "Geom Warp" 0.0 0.0 0.1 0.01
#pragma parameter GEOM_CORNER_SIZE "Geom Corner Size" 0.0 0.0 0.1 0.01
#pragma parameter GEOM_CORNER_SMOOTH "Geom Corner Smoothness" 150.0 50.0 1000.0 25.0
#pragma parameter INTERLACING_TOGGLE "Interlacing Toggle" 1.0 0.0 1.0 1.0
#pragma parameter HALATION "Halation" 0.03 0.0 1.0 0.01
#pragma parameter DIFFUSION "Diffusion" 0.0 0.0 1.0 0.01
#pragma parameter BRIGHTNESS "Brightness" 1.0 0.0 2.0 0.05

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
uniform sampler2D PassPrev4Texture;
COMPAT_VARYING vec4 TEX0;

// compatibility #defines
#define Source Texture
#define vTexCoord TEX0.xy

#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize
#define outsize vec4(OutputSize, 1.0 / OutputSize)

#ifdef PARAMETER_UNIFORM
// All parameter floats need to have COMPAT_PRECISION in front of them
uniform COMPAT_PRECISION float GAMMA_OUTPUT;
uniform COMPAT_PRECISION float SHARPNESS_H;
uniform COMPAT_PRECISION float SHARPNESS_V;
uniform COMPAT_PRECISION float MASK_TYPE;
uniform COMPAT_PRECISION float MASK_STRENGTH_MIN;
uniform COMPAT_PRECISION float MASK_STRENGTH_MAX;
uniform COMPAT_PRECISION float MASK_SIZE;
uniform COMPAT_PRECISION float SCANLINE_STRENGTH_MIN;
uniform COMPAT_PRECISION float SCANLINE_STRENGTH_MAX;
uniform COMPAT_PRECISION float SCANLINE_BEAM_MIN;
uniform COMPAT_PRECISION float SCANLINE_BEAM_MAX;
uniform COMPAT_PRECISION float GEOM_CURVATURE;
uniform COMPAT_PRECISION float GEOM_WARP;
uniform COMPAT_PRECISION float GEOM_CORNER_SIZE;
uniform COMPAT_PRECISION float GEOM_CORNER_SMOOTH;
uniform COMPAT_PRECISION float INTERLACING_TOGGLE;
uniform COMPAT_PRECISION float HALATION;
uniform COMPAT_PRECISION float DIFFUSION;
uniform COMPAT_PRECISION float BRIGHTNESS;
#else
#define GAMMA_OUTPUT 2.2
#define SHARPNESS_H 0.6
#define SHARPNESS_V 1.0
#define MASK_TYPE 4.0
#define MASK_STRENGTH_MIN 0.2
#define MASK_STRENGTH_MAX 0.2
#define MASK_SIZE 1.0
#define SCANLINE_STRENGTH_MIN 0.2
#define SCANLINE_STRENGTH_MAX 0.4
#define SCANLINE_BEAM_MIN 1.0
#define SCANLINE_BEAM_MAX 1.0
#define GEOM_CURVATURE 0.0
#define GEOM_WARP 0.0
#define GEOM_CORNER_SIZE 0.0
#define GEOM_CORNER_SMOOTH 150
#define INTERLACING_TOGGLE 1.0
#define HALATION 0.3
#define DIFFUSION 0.0
#define BRIGHTNESS 1.0
#endif

#define FIX(c) max(abs(c), 1e-5)
#define PI 3.141592653589
#define TEX2D(c) COMPAT_TEXTURE(tex, c)

COMPAT_PRECISION float curve_distance(float x, float sharp)
{
    float x_step = step(0.5, x);
    float curve = 0.5 - sqrt(0.25 - (x - x_step) * (x - x_step)) * sign(0.5 - x);

    return mix(x, curve, sharp);
}

mat4 get_color_matrix(sampler2D tex, vec2 co, vec2 dx)
{
    return mat4(TEX2D(co - dx), TEX2D(co), TEX2D(co + dx), TEX2D(co + 2.0 * dx));
}

vec4 filter_lanczos(vec4 coeffs, mat4 color_matrix)
{
    vec4 col = color_matrix * coeffs;
    vec4 sample_min = min(color_matrix[1], color_matrix[2]);
    vec4 sample_max = max(color_matrix[1], color_matrix[2]);

    col = clamp(col, sample_min, sample_max);

    return col;
}

vec3 get_scanline_weight(float pos, float beam, float strength)
{
    float weight = 1.0 - pow(cos(pos * 2.0 * PI) * 0.5 + 0.5, beam);
    
    weight = weight * strength * 2.0 + (1.0 - strength);
    
    return vec3(weight);
}

vec2 curve_coordinate(vec2 co, float curvature)
{
    vec2 curve = vec2(curvature, curvature * 0.75);
    vec2 co2 = co + co * curve - curve / 2.0;
    vec2 co_weight = vec2(co.y, co.x) * 2.0 - 1.0;

    co = mix(co, co2, co_weight * co_weight);

    return co;
}

COMPAT_PRECISION float get_corner_weight(vec2 co, vec2 corner, float smoothfunc)
{
    float corner_weight;
    
    co = min(co, vec2(1.0) - co) * vec2(1.0, 0.75);
    co = (corner - min(co, corner));
    corner_weight = clamp((corner.x - sqrt(dot(co, co))) * smoothfunc, 0.0, 1.0);
    corner_weight = mix(1.0, corner_weight, ceil(corner.x));
    
    return corner_weight;
}

void main()
{
    vec2 tex_size = SourceSize.xy;
    vec2 midpoint = vec2(0.5, 0.5);
    float scan_offset = 0.0;
    float timer = vec2(FrameCount, FrameCount).x;

    if (INTERLACING_TOGGLE > 0.5 && InputSize.y >= 400.)
    {
        tex_size.y *= 0.5;

        if (mod(timer, 2.0) > 0.0)
        {
            midpoint.y = 0.75;
            scan_offset = 0.5;
        }        
        else midpoint.y = 0.25;
    }

    vec2 co = vTexCoord * tex_size * (1.0 / InputSize.xy);
    vec2 xy = curve_coordinate(co, GEOM_WARP);
    float corner_weight = get_corner_weight(curve_coordinate(co, GEOM_CURVATURE), vec2(GEOM_CORNER_SIZE), GEOM_CORNER_SMOOTH);

    xy *= InputSize.xy / tex_size;

    vec2 dx = vec2(1.0 / tex_size.x, 0.0);
    vec2 dy = vec2(0.0, 1.0 / tex_size.y);
    vec2 pix_co = xy * tex_size - midpoint;
    vec2 tex_co = (floor(pix_co) + midpoint) / tex_size;
    vec2 dist = fract(pix_co);
    float curve_x, curve_y;
    vec3 col, col2, diff;

    curve_x = curve_distance(dist.x, SHARPNESS_H * SHARPNESS_H);
    curve_y = curve_distance(dist.y, SHARPNESS_V * SHARPNESS_V);

    vec4 coeffs_x = PI * vec4(1.0 + curve_x, curve_x, 1.0 - curve_x, 2.0 - curve_x);
    vec4 coeffs_y = PI * vec4(1.0 + curve_y, curve_y, 1.0 - curve_y, 2.0 - curve_y);

    coeffs_x = FIX(coeffs_x);
    coeffs_x = 2.0 * sin(coeffs_x) * sin(coeffs_x / 2.0) / (coeffs_x * coeffs_x);
    coeffs_x /= dot(coeffs_x, vec4(1.0));

    coeffs_y = FIX(coeffs_y);
    coeffs_y = 2.0 * sin(coeffs_y) * sin(coeffs_y / 2.0) / (coeffs_y * coeffs_y);
    coeffs_y /= dot(coeffs_y, vec4(1.0));

    mat4 color_matrix;


    color_matrix[0] = filter_lanczos(coeffs_x, get_color_matrix(PassPrev4Texture, tex_co - dy, dx));
    color_matrix[1] = filter_lanczos(coeffs_x, get_color_matrix(PassPrev4Texture, tex_co, dx));
    color_matrix[2] = filter_lanczos(coeffs_x, get_color_matrix(PassPrev4Texture, tex_co + dy, dx));
    color_matrix[3] = filter_lanczos(coeffs_x, get_color_matrix(PassPrev4Texture, tex_co + 2.0 * dy, dx));

    col = filter_lanczos(coeffs_y, color_matrix).rgb;
    diff = COMPAT_TEXTURE(Source, xy).rgb;

    float rgb_max = max(col.r, max(col.g, col.b));
    float sample_offset = (InputSize.y * outsize.w) * 0.5;
    float scan_pos = xy.y * tex_size.y + scan_offset;
    float scan_strength = mix(SCANLINE_STRENGTH_MAX, SCANLINE_STRENGTH_MIN, rgb_max);
    float scan_beam = clamp(rgb_max * SCANLINE_BEAM_MAX, SCANLINE_BEAM_MIN, SCANLINE_BEAM_MAX);
    vec3 scan_weight = vec3(0.0);

    float mask_colors;
    float mask_dot_width;
    float mask_dot_height;
    float mask_stagger;
    float mask_dither;
    vec4 mask_config;

    if      (MASK_TYPE == 1.) mask_config = vec4(2.0, 1.0, 1.0, 0.0);
    else if (MASK_TYPE == 2.) mask_config = vec4(3.0, 1.0, 1.0, 0.0);
    else if (MASK_TYPE == 3.) mask_config = vec4(2.1, 1.0, 1.0, 0.0);
    else if (MASK_TYPE == 4.) mask_config = vec4(3.1, 1.0, 1.0, 0.0);
    else if (MASK_TYPE == 5.) mask_config = vec4(2.0, 1.0, 1.0, 1.0);
    else if (MASK_TYPE == 6.) mask_config = vec4(3.0, 2.0, 1.0, 3.0);
    else if (MASK_TYPE == 7.) mask_config = vec4(3.0, 2.0, 2.0, 3.0);

    mask_colors = floor(mask_config.x);
    mask_dot_width = mask_config.y;
    mask_dot_height = mask_config.z;
    mask_stagger = mask_config.w;
    mask_dither = fract(mask_config.x) * 10.0;

    vec2 mod_fac = floor(vTexCoord * outsize.xy * SourceSize.xy / (InputSize.xy * vec2(MASK_SIZE, mask_dot_height * MASK_SIZE))) * 1.0001;
    int dot_no = int(mod((mod_fac.x + mod(mod_fac.y, 2.0) * mask_stagger) / mask_dot_width, mask_colors));
    float dither = mod(mod_fac.y + mod(floor(mod_fac.x / mask_colors), 2.0), 2.0);

    float mask_strength = mix(MASK_STRENGTH_MAX, MASK_STRENGTH_MIN, rgb_max);
    float mask_dark, mask_bright, mask_mul;
    vec3 mask_weight;

    mask_dark = 1.0 - mask_strength;
    mask_bright = 1.0 + mask_strength * 2.0;

    if (dot_no == 0) mask_weight = mix(vec3(mask_bright, mask_bright, mask_bright), vec3(mask_bright, mask_dark, mask_dark), mask_colors - 2.0);
    else if (dot_no == 1) mask_weight = mix(vec3(mask_dark, mask_dark, mask_dark), vec3(mask_dark, mask_bright, mask_dark), mask_colors - 2.0);
    else mask_weight = vec3(mask_dark, mask_dark, mask_bright);

    if (dither > 0.9) mask_mul = mask_dark;
    else mask_mul = mask_bright;

    mask_weight *= mix(1.0, mask_mul, mask_dither);
    mask_weight = mix(vec3(1.0), mask_weight, clamp(MASK_TYPE, 0.0, 1.0));

    col2 = (col * mask_weight);
    col2 *= BRIGHTNESS;

    scan_weight = get_scanline_weight(scan_pos - sample_offset, scan_beam, scan_strength);
    col = clamp(col2 * scan_weight, 0.0, 1.0);
    scan_weight = get_scanline_weight(scan_pos, scan_beam, scan_strength);
    col += clamp(col2 * scan_weight, 0.0, 1.0);
    scan_weight = get_scanline_weight(scan_pos + sample_offset, scan_beam, scan_strength);
    col += clamp(col2 * scan_weight, 0.0, 1.0);
    col /= 3.0;

    col *= vec3(corner_weight);
    col += diff * mask_weight * HALATION * vec3(corner_weight);
    col += diff * DIFFUSION * vec3(corner_weight);
    col = pow(col, vec3(1.0 / GAMMA_OUTPUT));

   FragColor = vec4(col, 1.0);
} 
#endif
