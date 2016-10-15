/*

J3D, a Javascript/WebGL 3D egnine
Created by Bartek Drozdz <bartek@everydayflash.com>
http://www.everyday3d.com/j3d/ 

Uses the following libraries:

glMatrix, Copyright (c) 2010 Brandon Jone
http://code.google.com/p/glmatrix/

requestAnimationFrame
http://paulirish.com/2011/requestanimationframe-for-smart-animating/

*/
// glMatrix v0.9.5
glMatrixArrayType = typeof Float32Array != "undefined" ? Float32Array: typeof WebGLFloatArray != "undefined" ? WebGLFloatArray: Array;
var vec3 = {};
vec3.create = function(a) {
    var b = new glMatrixArrayType(3);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2]
    }
    return b
};
vec3.set = function(a, b) {
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    return b
};
vec3.add = function(a, b, c) {
    if (!c || a == c) {
        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];
        return a
    }
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    c[2] = a[2] + b[2];
    return c
};
vec3.subtract = function(a, b, c) {
    if (!c || a == c) {
        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];
        return a
    }
    c[0] = a[0] - b[0];
    c[1] = a[1] - b[1];
    c[2] = a[2] - b[2];
    return c
};
vec3.negate = function(a, b) {
    b || (b = a);
    b[0] = -a[0];
    b[1] = -a[1];
    b[2] = -a[2];
    return b
};
vec3.scale = function(a, b, c) {
    if (!c || a == c) {
        a[0] *= b;
        a[1] *= b;
        a[2] *= b;
        return a
    }
    c[0] = a[0] * b;
    c[1] = a[1] * b;
    c[2] = a[2] * b;
    return c
};
vec3.normalize = function(a, b) {
    b || (b = a);
    var c = a[0],
    d = a[1],
    e = a[2],
    g = Math.sqrt(c * c + d * d + e * e);
    if (g) {
        if (g == 1) {
            b[0] = c;
            b[1] = d;
            b[2] = e;
            return b
        }
    } else {
        b[0] = 0;
        b[1] = 0;
        b[2] = 0;
        return b
    }
    g = 1 / g;
    b[0] = c * g;
    b[1] = d * g;
    b[2] = e * g;
    return b
};
vec3.cross = function(a, b, c) {
    c || (c = a);
    var d = a[0],
    e = a[1];
    a = a[2];
    var g = b[0],
    f = b[1];
    b = b[2];
    c[0] = e * b - a * f;
    c[1] = a * g - d * b;
    c[2] = d * f - e * g;
    return c
};
vec3.length = function(a) {
    var b = a[0],
    c = a[1];
    a = a[2];
    return Math.sqrt(b * b + c * c + a * a)
};
vec3.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
};
vec3.direction = function(a, b, c) {
    c || (c = a);
    var d = a[0] - b[0],
    e = a[1] - b[1];
    a = a[2] - b[2];
    b = Math.sqrt(d * d + e * e + a * a);
    if (!b) {
        c[0] = 0;
        c[1] = 0;
        c[2] = 0;
        return c
    }
    b = 1 / b;
    c[0] = d * b;
    c[1] = e * b;
    c[2] = a * b;
    return c
};
vec3.lerp = function(a, b, c, d) {
    d || (d = a);
    d[0] = a[0] + c * (b[0] - a[0]);
    d[1] = a[1] + c * (b[1] - a[1]);
    d[2] = a[2] + c * (b[2] - a[2]);
    return d
};
vec3.str = function(a) {
    return "[" + a[0] + ", " + a[1] + ", " + a[2] + "]"
};
var mat3 = {};
mat3.create = function(a) {
    var b = new glMatrixArrayType(9);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        b[6] = a[6];
        b[7] = a[7];
        b[8] = a[8];
        b[9] = a[9]
    }
    return b
};
mat3.set = function(a, b) {
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];
    b[6] = a[6];
    b[7] = a[7];
    b[8] = a[8];
    return b
};
mat3.identity = function(a) {
    a[0] = 1;
    a[1] = 0;
    a[2] = 0;
    a[3] = 0;
    a[4] = 1;
    a[5] = 0;
    a[6] = 0;
    a[7] = 0;
    a[8] = 1;
    return a
};
mat3.transpose = function(a, b) {
    if (!b || a == b) {
        var c = a[1],
        d = a[2],
        e = a[5];
        a[1] = a[3];
        a[2] = a[6];
        a[3] = c;
        a[5] = a[7];
        a[6] = d;
        a[7] = e;
        return a
    }
    b[0] = a[0];
    b[1] = a[3];
    b[2] = a[6];
    b[3] = a[1];
    b[4] = a[4];
    b[5] = a[7];
    b[6] = a[2];
    b[7] = a[5];
    b[8] = a[8];
    return b
};
mat3.toMat4 = function(a, b) {
    b || (b = mat4.create());
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = 0;
    b[4] = a[3];
    b[5] = a[4];
    b[6] = a[5];
    b[7] = 0;
    b[8] = a[6];
    b[9] = a[7];
    b[10] = a[8];
    b[11] = 0;
    b[12] = 0;
    b[13] = 0;
    b[14] = 0;
    b[15] = 1;
    return b
};
mat3.str = function(a) {
    return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + "]"
};
var mat4 = {};
mat4.create = function(a) {
    var b = new glMatrixArrayType(16);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        b[6] = a[6];
        b[7] = a[7];
        b[8] = a[8];
        b[9] = a[9];
        b[10] = a[10];
        b[11] = a[11];
        b[12] = a[12];
        b[13] = a[13];
        b[14] = a[14];
        b[15] = a[15]
    }
    return b
};
mat4.set = function(a, b) {
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];
    b[6] = a[6];
    b[7] = a[7];
    b[8] = a[8];
    b[9] = a[9];
    b[10] = a[10];
    b[11] = a[11];
    b[12] = a[12];
    b[13] = a[13];
    b[14] = a[14];
    b[15] = a[15];
    return b
};
mat4.identity = function(a) {
    a[0] = 1;
    a[1] = 0;
    a[2] = 0;
    a[3] = 0;
    a[4] = 0;
    a[5] = 1;
    a[6] = 0;
    a[7] = 0;
    a[8] = 0;
    a[9] = 0;
    a[10] = 1;
    a[11] = 0;
    a[12] = 0;
    a[13] = 0;
    a[14] = 0;
    a[15] = 1;
    return a
};
mat4.transpose = function(a, b) {
    if (!b || a == b) {
        var c = a[1],
        d = a[2],
        e = a[3],
        g = a[6],
        f = a[7],
        h = a[11];
        a[1] = a[4];
        a[2] = a[8];
        a[3] = a[12];
        a[4] = c;
        a[6] = a[9];
        a[7] = a[13];
        a[8] = d;
        a[9] = g;
        a[11] = a[14];
        a[12] = e;
        a[13] = f;
        a[14] = h;
        return a
    }
    b[0] = a[0];
    b[1] = a[4];
    b[2] = a[8];
    b[3] = a[12];
    b[4] = a[1];
    b[5] = a[5];
    b[6] = a[9];
    b[7] = a[13];
    b[8] = a[2];
    b[9] = a[6];
    b[10] = a[10];
    b[11] = a[14];
    b[12] = a[3];
    b[13] = a[7];
    b[14] = a[11];
    b[15] = a[15];
    return b
};
mat4.determinant = function(a) {
    var b = a[0],
    c = a[1],
    d = a[2],
    e = a[3],
    g = a[4],
    f = a[5],
    h = a[6],
    i = a[7],
    j = a[8],
    k = a[9],
    l = a[10],
    o = a[11],
    m = a[12],
    n = a[13],
    p = a[14];
    a = a[15];
    return m * k * h * e - j * n * h * e - m * f * l * e + g * n * l * e + j * f * p * e - g * k * p * e - m * k * d * i + j * n * d * i + m * c * l * i - b * n * l * i - j * c * p * i + b * k * p * i + m * f * d * o - g * n * d * o - m * c * h * o + b * n * h * o + g * c * p * o - b * f * p * o - j * f * d * a + g * k * d * a + j * c * h * a - b * k * h * a - g * c * l * a + b * f * l * a
};
mat4.inverse = function(a, b) {
    b || (b = a);
    var c = a[0],
    d = a[1],
    e = a[2],
    g = a[3],
    f = a[4],
    h = a[5],
    i = a[6],
    j = a[7],
    k = a[8],
    l = a[9],
    o = a[10],
    m = a[11],
    n = a[12],
    p = a[13],
    r = a[14],
    s = a[15],
    A = c * h - d * f,
    B = c * i - e * f,
    t = c * j - g * f,
    u = d * i - e * h,
    v = d * j - g * h,
    w = e * j - g * i,
    x = k * p - l * n,
    y = k * r - o * n,
    z = k * s - m * n,
    C = l * r - o * p,
    D = l * s - m * p,
    E = o * s - m * r,
    q = 1 / (A * E - B * D + t * C + u * z - v * y + w * x);
    b[0] = (h * E - i * D + j * C) * q;
    b[1] = ( - d * E + e * D - g * C) * q;
    b[2] = (p * w - r * v + s * u) * q;
    b[3] = ( - l * w + o * v - m * u) * q;
    b[4] = ( - f * E + i * z - j * y) * q;
    b[5] = (c * E - e * z + g * y) * q;
    b[6] = ( - n * w + r * t - s * B) * q;
    b[7] = (k * w - o * t + m * B) * q;
    b[8] = (f * D - h * z + j * x) * q;
    b[9] = ( - c * D + d * z - g * x) * q;
    b[10] = (n * v - p * t + s * A) * q;
    b[11] = ( - k * v + l * t - m * A) * q;
    b[12] = ( - f * C + h * y - i * x) * q;
    b[13] = (c * C - d * y + e * x) * q;
    b[14] = ( - n * u + p * B - r * A) * q;
    b[15] = (k * u - l * B + o * A) * q;
    return b
};
mat4.toRotationMat = function(a, b) {
    b || (b = mat4.create());
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];
    b[6] = a[6];
    b[7] = a[7];
    b[8] = a[8];
    b[9] = a[9];
    b[10] = a[10];
    b[11] = a[11];
    b[12] = 0;
    b[13] = 0;
    b[14] = 0;
    b[15] = 1;
    return b
};
mat4.toMat3 = function(a, b) {
    b || (b = mat3.create());
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[4];
    b[4] = a[5];
    b[5] = a[6];
    b[6] = a[8];
    b[7] = a[9];
    b[8] = a[10];
    return b
};
mat4.toInverseMat3 = function(a, b) {
    var c = a[0],
    d = a[1],
    e = a[2],
    g = a[4],
    f = a[5],
    h = a[6],
    i = a[8],
    j = a[9],
    k = a[10],
    l = k * f - h * j,
    o = -k * g + h * i,
    m = j * g - f * i,
    n = c * l + d * o + e * m;
    if (!n) return null;
    n = 1 / n;
    b || (b = mat3.create());
    b[0] = l * n;
    b[1] = ( - k * d + e * j) * n;
    b[2] = (h * d - e * f) * n;
    b[3] = o * n;
    b[4] = (k * c - e * i) * n;
    b[5] = ( - h * c + e * g) * n;
    b[6] = m * n;
    b[7] = ( - j * c + d * i) * n;
    b[8] = (f * c - d * g) * n;
    return b
};
mat4.multiply = function(a, b, c) {
    c || (c = a);
    var d = a[0],
    e = a[1],
    g = a[2],
    f = a[3],
    h = a[4],
    i = a[5],
    j = a[6],
    k = a[7],
    l = a[8],
    o = a[9],
    m = a[10],
    n = a[11],
    p = a[12],
    r = a[13],
    s = a[14];
    a = a[15];
    var A = b[0],
    B = b[1],
    t = b[2],
    u = b[3],
    v = b[4],
    w = b[5],
    x = b[6],
    y = b[7],
    z = b[8],
    C = b[9],
    D = b[10],
    E = b[11],
    q = b[12],
    F = b[13],
    G = b[14];
    b = b[15];
    c[0] = A * d + B * h + t * l + u * p;
    c[1] = A * e + B * i + t * o + u * r;
    c[2] = A * g + B * j + t * m + u * s;
    c[3] = A * f + B * k + t * n + u * a;
    c[4] = v * d + w * h + x * l + y * p;
    c[5] = v * e + w * i + x * o + y * r;
    c[6] = v * g + w * j + x * m + y * s;
    c[7] = v * f + w * k + x * n + y * a;
    c[8] = z * d + C * h + D * l + E * p;
    c[9] = z * e + C * i + D * o + E * r;
    c[10] = z * g + C * j + D * m + E * s;
    c[11] = z * f + C * k + D * n + E * a;
    c[12] = q * d + F * h + G * l + b * p;
    c[13] = q * e + F * i + G * o + b * r;
    c[14] = q * g + F * j + G * m + b * s;
    c[15] = q * f + F * k + G * n + b * a;
    return c
};
mat4.multiplyVec3 = function(a, b, c) {
    c || (c = b);
    var d = b[0],
    e = b[1];
    b = b[2];
    c[0] = a[0] * d + a[4] * e + a[8] * b + a[12];
    c[1] = a[1] * d + a[5] * e + a[9] * b + a[13];
    c[2] = a[2] * d + a[6] * e + a[10] * b + a[14];
    return c
};
mat4.multiplyVec4 = function(a, b, c) {
    c || (c = b);
    var d = b[0],
    e = b[1],
    g = b[2];
    b = b[3];
    c[0] = a[0] * d + a[4] * e + a[8] * g + a[12] * b;
    c[1] = a[1] * d + a[5] * e + a[9] * g + a[13] * b;
    c[2] = a[2] * d + a[6] * e + a[10] * g + a[14] * b;
    c[3] = a[3] * d + a[7] * e + a[11] * g + a[15] * b;
    return c
};
mat4.translate = function(a, b, c) {
    var d = b[0],
    e = b[1];
    b = b[2];
    if (!c || a == c) {
        a[12] = a[0] * d + a[4] * e + a[8] * b + a[12];
        a[13] = a[1] * d + a[5] * e + a[9] * b + a[13];
        a[14] = a[2] * d + a[6] * e + a[10] * b + a[14];
        a[15] = a[3] * d + a[7] * e + a[11] * b + a[15];
        return a
    }
    var g = a[0],
    f = a[1],
    h = a[2],
    i = a[3],
    j = a[4],
    k = a[5],
    l = a[6],
    o = a[7],
    m = a[8],
    n = a[9],
    p = a[10],
    r = a[11];
    c[0] = g;
    c[1] = f;
    c[2] = h;
    c[3] = i;
    c[4] = j;
    c[5] = k;
    c[6] = l;
    c[7] = o;
    c[8] = m;
    c[9] = n;
    c[10] = p;
    c[11] = r;
    c[12] = g * d + j * e + m * b + a[12];
    c[13] = f * d + k * e + n * b + a[13];
    c[14] = h * d + l * e + p * b + a[14];
    c[15] = i * d + o * e + r * b + a[15];
    return c
};
mat4.scale = function(a, b, c) {
    var d = b[0],
    e = b[1];
    b = b[2];
    if (!c || a == c) {
        a[0] *= d;
        a[1] *= d;
        a[2] *= d;
        a[3] *= d;
        a[4] *= e;
        a[5] *= e;
        a[6] *= e;
        a[7] *= e;
        a[8] *= b;
        a[9] *= b;
        a[10] *= b;
        a[11] *= b;
        return a
    }
    c[0] = a[0] * d;
    c[1] = a[1] * d;
    c[2] = a[2] * d;
    c[3] = a[3] * d;
    c[4] = a[4] * e;
    c[5] = a[5] * e;
    c[6] = a[6] * e;
    c[7] = a[7] * e;
    c[8] = a[8] * b;
    c[9] = a[9] * b;
    c[10] = a[10] * b;
    c[11] = a[11] * b;
    c[12] = a[12];
    c[13] = a[13];
    c[14] = a[14];
    c[15] = a[15];
    return c
};
mat4.rotate = function(a, b, c, d) {
    var e = c[0],
    g = c[1];
    c = c[2];
    var f = Math.sqrt(e * e + g * g + c * c);
    if (!f) return null;
    if (f != 1) {
        f = 1 / f;
        e *= f;
        g *= f;
        c *= f
    }
    var h = Math.sin(b),
    i = Math.cos(b),
    j = 1 - i;
    b = a[0];
    f = a[1];
    var k = a[2],
    l = a[3],
    o = a[4],
    m = a[5],
    n = a[6],
    p = a[7],
    r = a[8],
    s = a[9],
    A = a[10],
    B = a[11],
    t = e * e * j + i,
    u = g * e * j + c * h,
    v = c * e * j - g * h,
    w = e * g * j - c * h,
    x = g * g * j + i,
    y = c * g * j + e * h,
    z = e * c * j + g * h;
    e = g * c * j - e * h;
    g = c * c * j + i;
    if (d) {
        if (a != d) {
            d[12] = a[12];
            d[13] = a[13];
            d[14] = a[14];
            d[15] = a[15]
        }
    } else d = a;
    d[0] = b * t + o * u + r * v;
    d[1] = f * t + m * u + s * v;
    d[2] = k * t + n * u + A * v;
    d[3] = l * t + p * u + B * v;
    d[4] = b * w + o * x + r * y;
    d[5] = f * w + m * x + s * y;
    d[6] = k * w + n * x + A * y;
    d[7] = l * w + p * x + B * y;
    d[8] = b * z + o * e + r * g;
    d[9] = f * z + m * e + s * g;
    d[10] = k * z + n * e + A * g;
    d[11] = l * z + p * e + B * g;
    return d
};
mat4.rotateX = function(a, b, c) {
    var d = Math.sin(b);
    b = Math.cos(b);
    var e = a[4],
    g = a[5],
    f = a[6],
    h = a[7],
    i = a[8],
    j = a[9],
    k = a[10],
    l = a[11];
    if (c) {
        if (a != c) {
            c[0] = a[0];
            c[1] = a[1];
            c[2] = a[2];
            c[3] = a[3];
            c[12] = a[12];
            c[13] = a[13];
            c[14] = a[14];
            c[15] = a[15]
        }
    } else c = a;
    c[4] = e * b + i * d;
    c[5] = g * b + j * d;
    c[6] = f * b + k * d;
    c[7] = h * b + l * d;
    c[8] = e * -d + i * b;
    c[9] = g * -d + j * b;
    c[10] = f * -d + k * b;
    c[11] = h * -d + l * b;
    return c
};
mat4.rotateY = function(a, b, c) {
    var d = Math.sin(b);
    b = Math.cos(b);
    var e = a[0],
    g = a[1],
    f = a[2],
    h = a[3],
    i = a[8],
    j = a[9],
    k = a[10],
    l = a[11];
    if (c) {
        if (a != c) {
            c[4] = a[4];
            c[5] = a[5];
            c[6] = a[6];
            c[7] = a[7];
            c[12] = a[12];
            c[13] = a[13];
            c[14] = a[14];
            c[15] = a[15]
        }
    } else c = a;
    c[0] = e * b + i * -d;
    c[1] = g * b + j * -d;
    c[2] = f * b + k * -d;
    c[3] = h * b + l * -d;
    c[8] = e * d + i * b;
    c[9] = g * d + j * b;
    c[10] = f * d + k * b;
    c[11] = h * d + l * b;
    return c
};
mat4.rotateZ = function(a, b, c) {
    var d = Math.sin(b);
    b = Math.cos(b);
    var e = a[0],
    g = a[1],
    f = a[2],
    h = a[3],
    i = a[4],
    j = a[5],
    k = a[6],
    l = a[7];
    if (c) {
        if (a != c) {
            c[8] = a[8];
            c[9] = a[9];
            c[10] = a[10];
            c[11] = a[11];
            c[12] = a[12];
            c[13] = a[13];
            c[14] = a[14];
            c[15] = a[15]
        }
    } else c = a;
    c[0] = e * b + i * d;
    c[1] = g * b + j * d;
    c[2] = f * b + k * d;
    c[3] = h * b + l * d;
    c[4] = e * -d + i * b;
    c[5] = g * -d + j * b;
    c[6] = f * -d + k * b;
    c[7] = h * -d + l * b;
    return c
};
mat4.frustum = function(a, b, c, d, e, g, f) {
    f || (f = mat4.create());
    var h = b - a,
    i = d - c,
    j = g - e;
    f[0] = e * 2 / h;
    f[1] = 0;
    f[2] = 0;
    f[3] = 0;
    f[4] = 0;
    f[5] = e * 2 / i;
    f[6] = 0;
    f[7] = 0;
    f[8] = (b + a) / h;
    f[9] = (d + c) / i;
    f[10] = -(g + e) / j;
    f[11] = -1;
    f[12] = 0;
    f[13] = 0;
    f[14] = -(g * e * 2) / j;
    f[15] = 0;
    return f
};
mat4.perspective = function(a, b, c, d, e) {
    a = c * Math.tan(a * Math.PI / 360);
    b = a * b;
    return mat4.frustum( - b, b, -a, a, c, d, e)
};
mat4.ortho = function(a, b, c, d, e, g, f) {
    f || (f = mat4.create());
    var h = b - a,
    i = d - c,
    j = g - e;
    f[0] = 2 / h;
    f[1] = 0;
    f[2] = 0;
    f[3] = 0;
    f[4] = 0;
    f[5] = 2 / i;
    f[6] = 0;
    f[7] = 0;
    f[8] = 0;
    f[9] = 0;
    f[10] = -2 / j;
    f[11] = 0;
    f[12] = -(a + b) / h;
    f[13] = -(d + c) / i;
    f[14] = -(g + e) / j;
    f[15] = 1;
    return f
};
mat4.lookAt = function(a, b, c, d) {
    d || (d = mat4.create());
    var e = a[0],
    g = a[1];
    a = a[2];
    var f = c[0],
    h = c[1],
    i = c[2];
    c = b[1];
    var j = b[2];
    if (e == b[0] && g == c && a == j) return mat4.identity(d);
    var k, l, o, m;
    c = e - b[0];
    j = g - b[1];
    b = a - b[2];
    m = 1 / Math.sqrt(c * c + j * j + b * b);
    c *= m;
    j *= m;
    b *= m;
    k = h * b - i * j;
    i = i * c - f * b;
    f = f * j - h * c;
    if (m = Math.sqrt(k * k + i * i + f * f)) {
        m = 1 / m;
        k *= m;
        i *= m;
        f *= m
    } else f = i = k = 0;
    h = j * f - b * i;
    l = b * k - c * f;
    o = c * i - j * k;
    if (m = Math.sqrt(h * h + l * l + o * o)) {
        m = 1 / m;
        h *= m;
        l *= m;
        o *= m
    } else o = l = h = 0;
    d[0] = k;
    d[1] = h;
    d[2] = c;
    d[3] = 0;
    d[4] = i;
    d[5] = l;
    d[6] = j;
    d[7] = 0;
    d[8] = f;
    d[9] = o;
    d[10] = b;
    d[11] = 0;
    d[12] = -(k * e + i * g + f * a);
    d[13] = -(h * e + l * g + o * a);
    d[14] = -(c * e + j * g + b * a);
    d[15] = 1;
    return d
};
mat4.str = function(a) {
    return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + "]"
};
quat4 = {};
quat4.create = function(a) {
    var b = new glMatrixArrayType(4);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3]
    }
    return b
};
quat4.set = function(a, b) {
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    return b
};
quat4.calculateW = function(a, b) {
    var c = a[0],
    d = a[1],
    e = a[2];
    if (!b || a == b) {
        a[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));
        return a
    }
    b[0] = c;
    b[1] = d;
    b[2] = e;
    b[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));
    return b
};
quat4.inverse = function(a, b) {
    if (!b || a == b) {
        a[0] *= 1;
        a[1] *= 1;
        a[2] *= 1;
        return a
    }
    b[0] = -a[0];
    b[1] = -a[1];
    b[2] = -a[2];
    b[3] = a[3];
    return b
};
quat4.length = function(a) {
    var b = a[0],
    c = a[1],
    d = a[2];
    a = a[3];
    return Math.sqrt(b * b + c * c + d * d + a * a)
};
quat4.normalize = function(a, b) {
    b || (b = a);
    var c = a[0],
    d = a[1],
    e = a[2],
    g = a[3],
    f = Math.sqrt(c * c + d * d + e * e + g * g);
    if (f == 0) {
        b[0] = 0;
        b[1] = 0;
        b[2] = 0;
        b[3] = 0;
        return b
    }
    f = 1 / f;
    b[0] = c * f;
    b[1] = d * f;
    b[2] = e * f;
    b[3] = g * f;
    return b
};
quat4.multiply = function(a, b, c) {
    c || (c = a);
    var d = a[0],
    e = a[1],
    g = a[2];
    a = a[3];
    var f = b[0],
    h = b[1],
    i = b[2];
    b = b[3];
    c[0] = d * b + a * f + e * i - g * h;
    c[1] = e * b + a * h + g * f - d * i;
    c[2] = g * b + a * i + d * h - e * f;
    c[3] = a * b - d * f - e * h - g * i;
    return c
};
quat4.multiplyVec3 = function(a, b, c) {
    c || (c = b);
    var d = b[0],
    e = b[1],
    g = b[2];
    b = a[0];
    var f = a[1],
    h = a[2];
    a = a[3];
    var i = a * d + f * g - h * e,
    j = a * e + h * d - b * g,
    k = a * g + b * e - f * d;
    d = -b * d - f * e - h * g;
    c[0] = i * a + d * -b + j * -h - k * -f;
    c[1] = j * a + d * -f + k * -b - i * -h;
    c[2] = k * a + d * -h + i * -f - j * -b;
    return c
};
quat4.toMat3 = function(a, b) {
    b || (b = mat3.create());
    var c = a[0],
    d = a[1],
    e = a[2],
    g = a[3],
    f = c + c,
    h = d + d,
    i = e + e,
    j = c * f,
    k = c * h;
    c = c * i;
    var l = d * h;
    d = d * i;
    e = e * i;
    f = g * f;
    h = g * h;
    g = g * i;
    b[0] = 1 - (l + e);
    b[1] = k - g;
    b[2] = c + h;
    b[3] = k + g;
    b[4] = 1 - (j + e);
    b[5] = d - f;
    b[6] = c - h;
    b[7] = d + f;
    b[8] = 1 - (j + l);
    return b
};
quat4.toMat4 = function(a, b) {
    b || (b = mat4.create());
    var c = a[0],
    d = a[1],
    e = a[2],
    g = a[3],
    f = c + c,
    h = d + d,
    i = e + e,
    j = c * f,
    k = c * h;
    c = c * i;
    var l = d * h;
    d = d * i;
    e = e * i;
    f = g * f;
    h = g * h;
    g = g * i;
    b[0] = 1 - (l + e);
    b[1] = k - g;
    b[2] = c + h;
    b[3] = 0;
    b[4] = k + g;
    b[5] = 1 - (j + e);
    b[6] = d - f;
    b[7] = 0;
    b[8] = c - h;
    b[9] = d + f;
    b[10] = 1 - (j + l);
    b[11] = 0;
    b[12] = 0;
    b[13] = 0;
    b[14] = 0;
    b[15] = 1;
    return b
};
quat4.slerp = function(a, b, c, d) {
    d || (d = a);
    var e = c;
    if (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3] < 0) e = -1 * c;
    d[0] = 1 - c * a[0] + e * b[0];
    d[1] = 1 - c * a[1] + e * b[1];
    d[2] = 1 - c * a[2] + e * b[2];
    d[3] = 1 - c * a[3] + e * b[3];
    return d
};
quat4.str = function(a) {
    return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + "]"
};





j3dlogIds = {};
function j3dlog(a) {
    J3D.debug && console.log(a)
}
function j3dlogOnce(a) {
    J3D.debug && j3dlogIds[a] == null && console.log(a);
    j3dlogIds[a] = !0
};
J3D = {};
J3D.debug = !0;
J3D.LightmapAtlas = [];
J3D.SHADER_MAX_LIGHTS = 4;
J3D.RENDER_AS_OPAQUE = 0;
J3D.RENDER_AS_TRANSPARENT = 1;
var v3 = function(a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
v3.prototype.set = function(a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
v3.prototype.magSq = function() {
    return this.x * this.x + this.y * this.y + this.z * this.z
};
v3.prototype.mag = function() {
    return Math.sqrt(this.magSq())
};
v3.prototype.mul = function(a) {
    return new v3(this.x * a, this.y * a, this.z * a)
};
v3.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this
};
v3.prototype.norm = function() {
    var a = 1 / this.mag();
    this.set(this.x * a, this.y * a, this.z * a);
    return this
};
v3.prototype.cp = function() {
    return new v3(this.x, this.y, this.z)
};
v3.prototype.add = function(a) {
    return v3.add(this, a)
};
v3.prototype.xyz = function() {
    return [this.x, this.y, this.z]
};
v3.prototype.toUniform = function() {
    return this.xyz()
};
v3.add = function(a, b) {
    var c = new v3(a.x, a.y, a.z);
    c.x += b.x;
    c.y += b.y;
    c.z += b.z;
    return c
};
v3.prototype.sub = function(a) {
    return v3.sub(this, a)
};
v3.sub = function(a, b) {
    var c = new v3(a.x, a.y, a.z);
    c.x -= b.x;
    c.y -= b.y;
    c.z -= b.z;
    return c
};
v3.dot = function(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z
};
v3.cross = function(a, b) {
    return new v3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x)
};
v3.ZERO = function() {
    return new v3(0, 0, 0)
};
v3.ONE = function() {
    return new v3(1, 1, 1)
};
v3.RIGHT = function() {
    return new v3(1, 0, 0)
};
v3.UP = function() {
    return new v3(0, 1, 0)
};
v3.FORWARD = function() {
    return new v3(0, 0, 1)
};
v3.random = function() {
    return new v3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
};
var v2 = function(a, b) {
    this.x = a || 0;
    this.y = b || 0
};
v2.prototype.set = function(a, b) {
    this.x = a || 0;
    this.y = b || 0
};
v2.prototype.xy = function() {
    return [this.x, this.y]
};
v2.prototype.isOne = function() {
    return this.x == 1 && this.y == 1
};
v2.prototype.isZero = function() {
    return this.x == 0 && this.y == 0
};
v2.ZERO = function() {
    return new v2(0, 0)
};
v2.ONE = function() {
    return new v2(1, 1)
};
v2.random = function() {
    return new v2(Math.random() * 2 - 1, Math.random() * 2 - 1)
};
var m44 = function() {
    this.array = [];
    this.identity()
};
m44.prototype.identity = function() {
    this.n11 = 1;
    this.n21 = this.n14 = this.n13 = this.n12 = 0;
    this.n22 = 1;
    this.n32 = this.n31 = this.n24 = this.n23 = 0;
    this.n33 = 1;
    this.n43 = this.n42 = this.n41 = this.n34 = 0;
    this.n44 = 1
};
m44.prototype.ortho = function(a, b, c, d, e, g) {
    var f, h, j;
    f = b - a;
    h = d - c;
    j = g - e;
    this.n11 = 2 / f;
    this.n14 = -((b + a) / f);
    this.n22 = -2 / h;
    this.n24 = (d + c) / h;
    this.n33 = 2 / j;
    this.n34 = -((g + e) / j);
    this.makeArray()
};
m44.prototype.perspective = function(a, b, c, d) {
    a = c * Math.tan(a * Math.PI / 360);
    var e = d - c;
    this.n11 = c / (a * b);
    this.n22 = c / a;
    this.n33 = -(d + c) / e;
    this.n34 = -(2 * d * c) / e;
    this.n43 = -1;
    this.n44 = 0;
    this.makeArray()
};
m44.prototype.makeArray = function() {
    this.array[0] = this.n11;
    this.array[1] = this.n21;
    this.array[2] = this.n31;
    this.array[3] = this.n41;
    this.array[4] = this.n12;
    this.array[5] = this.n22;
    this.array[6] = this.n32;
    this.array[7] = this.n42;
    this.array[8] = this.n13;
    this.array[9] = this.n23;
    this.array[10] = this.n33;
    this.array[11] = this.n43;
    this.array[12] = this.n14;
    this.array[13] = this.n24;
    this.array[14] = this.n34;
    this.array[15] = this.n44
};
m44.prototype.toArray = function() {
    return this.array
};



var gl;
J3D.Engine = function(a, b, c) {
    var d = a ? a: document.createElement("canvas");
    if (!a) a = b && b.resolution ? b.resolution: 1,
    d.width = window.innerWidth / a,
    d.height = window.innerHeight / a,
    d.style.width = "100%",
    d.style.height = "100%",
    document.body.appendChild(d);
    try {
        gl = d.getContext("experimental-webgl", c),
        gl.viewportWidth = d.width,
        gl.viewportHeight = d.height
    } catch(e) {
        j3dlog("ERROR. Getting webgl context failed!");
        return
    }
    this.setClearColor(J3D.Color.black);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CW);
    this.shaderAtlas = new J3D.ShaderAtlas;
    this.scene = new J3D.Scene;
    this.canvas = d;
    this._opaqueMeshes = [];
    this._transparentMeshes = [];
    this._lights = [];
    this.gl = gl
};
J3D.Engine.prototype.setClearColor = function(a) {
    gl.clearColor(a.r, a.g, a.b, a.a)
};
J3D.Engine.prototype.render = function() {
    J3D.Time.tick();
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.scene.numChildren > 0 && this.renderScene()
};
J3D.Engine.prototype.renderScene = function() {
    this._opaqueMeshes.length = 0;
    this._transparentMeshes.length = 0;
    for (var a = this._lights.length = 0; a < this.scene.numChildren; a++) this.updateTransform(this.scene.childAt(a), null);
    this.camera.updateInverseMat();
    if (this.scene.skybox) gl.depthMask(!1),
    this.scene.skybox.renderer.mid = this.camera.camera.near + (this.camera.camera.far - this.camera.camera.near) / 2,
    this.renderObject(this.scene.skybox),
    gl.depthMask(!0);
    for (a = 0; a < this._lights.length; a++) {
        var b = this._lights[a];
        b.updateWorldPosition()
    }
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    for (a = 0; a < this._opaqueMeshes.length; a++) this.renderObject(this._opaqueMeshes[a]);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    for (a = 0; a < this._transparentMeshes.length; a++) b = this._transparentMeshes[a],
    gl.blendFunc(b.geometry.srcFactor != null ? b.geometry.srcFactor: gl.SRC_ALPHA, b.geometry.dstFactor != null ? b.geometry.dstFactor: gl.ONE),
    this.renderObject(b)
};
J3D.Engine.prototype.renderObject = function(a) {
    var b = this.shaderAtlas.getShader(a.renderer);
    gl.useProgram(b);
    b.uniforms.pMatrix && gl.uniformMatrix4fv(b.uniforms.pMatrix.location, !1, this.camera.camera.projectionMat.toArray());
    b.uniforms.vMatrix && gl.uniformMatrix4fv(b.uniforms.vMatrix.location, !1, this.camera.inverseMat);
    b.uniforms.mMatrix && gl.uniformMatrix4fv(b.uniforms.mMatrix.location, !1, a.globalMatrix);
    b.uniforms.nMatrix && gl.uniformMatrix3fv(b.uniforms.nMatrix.location, !1, a.normalMatrix);
    b.uniforms.uEyePosition && gl.uniform3fv(b.uniforms.uEyePosition.location, this.camera.worldPosition.xyz());
    b.uniforms.uTileOffset && gl.uniform4fv(b.uniforms.uTileOffset.location, a.getTileOffset());
    J3D.ShaderUtil.setLights(b, this._lights);
    J3D.ShaderUtil.setAttributes(b, a.geometry);
    a.renderer.setup(b, a);
    gl.cullFace(a.renderer.cullFace || gl.BACK);
    b = a.renderer.drawMode != null ? a.renderer.drawMode: gl.TRIANGLES;
    a.geometry.hasElements ? (gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, a.geometry.elements.buffer), gl.drawElements(b, a.geometry.elements.size, gl.UNSIGNED_SHORT, 0)) : gl.drawArrays(b, 0, a.geometry.size)
};
J3D.Engine.prototype.updateTransform = function(a, b) {
    a.updateWorld(b);
    for (var c = 0; c < a.numChildren; c++) this.updateTransform(a.childAt(c), a);
    a.enabled && (a.renderer && a.geometry && (a.geometry.renderMode == J3D.RENDER_AS_TRANSPARENT ? this._transparentMeshes.push(a) : this._opaqueMeshes.push(a)), a.light && this._lights.push(a))
};


J3D.Scene = function() {
    var a = this,
    b = [];
    this.ambient = J3D.Color.black;
    this.add = function() {
        for (var c, d = 0; d < arguments.length; d++) {
            var e = arguments[d];
            c || (c = e);
            b.push(e);
            e.parent = null;
            a.numChildren = b.length
        }
        return c
    };
    this.childAt = function(a) {
        return b[a]
    };
    this.addSkybox = function(a) {
        this.skybox = new J3D.Transform;
        this.skybox.renderer = new J3D.BuiltinShaders.fetch("Skybox");
        this.skybox.renderer.uCubemap = a;
        this.skybox.geometry = J3D.Primitive.Cube(1, 1, 1).flip()
    }
};
J3D.Scene.prototype.find = function(a) {
    a = a.split("/");
    for (var b = 0; b < this.numChildren; b++) if (this.childAt(b).name == a[0]) return a.length == 1 ? this.childAt(b) : this.childAt(b).find(a.slice(1));
    return null
};



J3D.Loader = {};
J3D.Loader.loadJSON = function(a, b) {
    var c = new XMLHttpRequest;
    c.open("GET", a);
    c.onreadystatechange = function() {
        c.readyState == 4 && b.call(null, JSON.parse(c.responseText))
    };
    c.send()
};
J3D.Loader.parseJSONScene = function(a, b, c) {
    var d = new J3D.Transform;
    d.light = new J3D.Light(J3D.AMBIENT);
    d.light.color = J3D.Loader.fromObject(J3D.Color, a.ambient);
    c.scene.add(d);
    c.setClearColor(J3D.Loader.fromObject(J3D.Color, a.background));
    for (var e in a.textures) d = new J3D.Texture(a.path + a.textures[e].file),
    a.textures[e] = d;
    for (var g in a.materials) {
        e = a.materials[g];
        e = J3D.Loader.fetchShader(e.type, e);
        e.color = J3D.Loader.fromObject(J3D.Color, e.color);
        if (e.textureTile) e.textureTile = J3D.Loader.v2FromArray(e.textureTile);
        if (e.textureOffset) e.textureOffset = J3D.Loader.v2FromArray(e.textureOffset);
        if (e.colorTexture) e.colorTexture = a.textures[e.colorTexture],
        e.hasColorTexture = !0;
        a.materials[g] = e
    }
    for (var f in a.lights) {
        g = a.lights[f];
        g = J3D.Loader.fromObject(J3D.Light, g);
        g.color = J3D.Loader.fromObject(J3D.Color, g.color);
        if (g.direction) g.direction = J3D.Loader.v3FromArray(g.direction);
        a.lights[f] = g
    }
    for (var h in a.cameras) f = a.cameras[h],
    f = new J3D.Camera({
        fov: f.fov,
        near: f.near,
        far: f.far
    }),
    a.cameras[h] = f;
    for (h = 0; h < a.transforms.length; h++) {
        f = a.transforms[h];
        f = J3D.Loader.fromObject(J3D.Transform, f);
        f.position = J3D.Loader.v3FromArray(f.position);
        f.rotation = J3D.Loader.v3FromArray(f.rotation);
        if (f.renderer) f.renderer = a.materials[f.renderer];
        if (f.mesh) f.geometry = new J3D.Mesh(b[f.mesh]);
        if (f.light) f.light = a.lights[f.light];
        if (f.camera) f.camera = a.cameras[f.camera],
        c.camera = f;
        a.transforms[h] = f
    }
    b = function(c) {
        for (var b = 0; b < a.transforms.length; b++) if (a.transforms[b].uid == c) return a.transforms[b]
    };
    for (h = 0; h < a.transforms.length; h++) f = a.transforms[h],
    f.parent != null ? (f.parent = b(f.parent), f.parent.add(f)) : c.scene.add(f)
};
J3D.Loader.fetchShader = function(a, b) {
    var c = J3D.BuiltinShaders.fetch(a),
    d;
    for (d in b) c[d] = b[d];
    return c
};
J3D.Loader.fromObject = function(a, b) {
    var c = new a,
    d;
    for (d in b) c[d] = b[d];
    return c
};
J3D.Loader.v2FromArray = function(a) {
    return new v2(a[0], a[1])
};
J3D.Loader.v3FromArray = function(a) {
    return new v3(a[0], a[1], a[2])
};
J3D.Loader.loadGLSL = function(a, b) {
    var c = new XMLHttpRequest;
    c.open("GET", a);
    c.onreadystatechange = function() {
        c.readyState == 4 && b.call(null, J3D.ShaderUtil.parseGLSL(c.responseText))
    };
    c.send()
};


J3D.Geometry = function() {
    this.renderMode = J3D.RENDER_AS_OPAQUE;
    this.arrays = [];
    this.hasElements = !1
};
J3D.Geometry.prototype.setTransparency = function(a, b, c) {
    a ? (this.renderMode = J3D.RENDER_AS_TRANSPARENT, this.srcFactor = b, this.dstFactor = c) : this.renderMode = J3D.RENDER_AS_OPAQUE
};
J3D.Geometry.prototype.addArray = function(a, b, c, d, e) {
    if (!d) d = gl.FLOAT;
    if (!e) e = gl.STATIC_DRAW;
    a = new J3D.Geometry.Attribute(a, b, c, d, e, gl.ARRAY_BUFFER);
    this.arrays.push(a);
    this.size = a.size;
    return a
};
J3D.Geometry.prototype.replaceArray = function(a, b, c) {
    if (!c) c = gl.STATIC_DRAW;
    a.data = b;
    gl.bindBuffer(gl.ARRAY_BUFFER, a.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, b, c)
};
J3D.Geometry.prototype.addElement = function(a, b, c) {
    if (!b) b = gl.UNSIGNED_SHORT;
    if (!c) c = gl.STATIC_DRAW;
    this.elements = new J3D.Geometry.Attribute("", a, 0, b, c, gl.ELEMENT_ARRAY_BUFFER);
    this.hasElements = !0
};
J3D.Geometry.Attribute = function(a, b, c, d, e, g) {
    this.name = a;
    this.data = b;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(g, this.buffer);
    gl.bufferData(g, b, e);
    this.size = c > 0 ? b.length / c: b.length;
    this.itemSize = c;
    this.type = d
};


J3D.Mesh = function(a) {
    J3D.Geometry.call(this);
    this.hasUV1 = !1;
    for (var b in a) switch (b) {
    case "vertices":
        this.vertexPositionBuffer = this.addArray("aVertexPosition", new Float32Array(a[b]), 3);
        break;
    case "colors":
        a[b].length > 0 && this.addArray("aVertexColor", new Float32Array(a[b]), 4);
        break;
    case "normals":
        this.vertexNormalBuffer = a[b].length > 0 ? this.addArray("aVertexNormal", new Float32Array(a[b]), 3) : this.addArray("aVertexNormal", new Float32Array(this.size * 3), 3);
        break;
    case "uv1":
        a[b].length > 0 ? this.addArray("aTextureCoord", new Float32Array(a[b]), 2) : this.addArray("aTextureCoord", new Float32Array(this.size * 2), 2);
        this.hasUV1 = !0;
        break;
    case "uv2":
        a[b].length > 0 && this.addArray("aTextureCoord2", new Float32Array(a[b]), 2);
        break;
    case "tris":
        a[b].length > 0 && this.addElement(new Uint16Array(a[b]));
        break;
    default:
        console.log("WARNING! Unknown attribute: " + b)
    }
    this.flip = function() {
        for (var a = [], b = this.vertexPositionBuffer.data, e = 0; e < b.length; e += 3) a.push(b[e], b[e + 2], b[e + 1]);
        b = new Float32Array(a);
        a = [];
        var g = this.vertexNormalBuffer.data;
        for (e = 0; e < g.length; e += 3) {
            var f = new v3(g[e], g[e + 1], g[e + 2]);
            f.neg();
            a = a.concat(f.xyz())
        }
        g = new Float32Array(a);
        this.replaceArray(this.vertexPositionBuffer, b);
        this.replaceArray(this.vertexNormalBuffer, g);
        return this
    }
};
J3D.Mesh.prototype = new J3D.Geometry;
J3D.Mesh.prototype.constructor = J3D.Mesh;
J3D.Mesh.prototype.supr = J3D.Geometry.prototype;


J3D.Light = function(a) {
    this.type = a != null ? a: J3D.NONE;
    this.direction = v3.ZERO();
    this.color = J3D.Color.black;
    this.intensity = 1
};
J3D.NONE = parseInt( - 1);
J3D.AMBIENT = parseInt(0);
J3D.DIRECT = parseInt(1);
J3D.POINT = parseInt(2);
J3D.HEMISPHERE = parseInt(3);
J3D.SPHERICAL_HARMONICS = parseInt(4);
J3D.PERSPECTIVE = 0;
J3D.ORTHO = 1;
J3D.Camera = function(a) {
    a || (a = {});
    if (!a.type) a.type = J3D.PERSPECTIVE;
    if (!a.near) a.near = 1;
    if (!a.far) a.far = 1E3;
    if (a.type == J3D.PERSPECTIVE) {
        if (!a.fov) a.fov = 45;
        if (!a.aspect) a.aspect = gl.viewportWidth / gl.viewportHeight
    } else {
        if (a.left == null) a.left = 0;
        if (a.right == null) a.right = 1;
        if (a.top == null) a.top = 0;
        if (a.bottom == null) a.bottom = 1
    }
    this.near = a.near;
    this.far = a.far;
    this.projectionMat = new m44;
    a.type == J3D.PERSPECTIVE ? this.projectionMat.perspective(a.fov, a.aspect, a.near, a.far) : this.projectionMat.ortho(a.left, a.right, a.top, a.bottom, a.near, a.far)
};


J3D.Texture = function(a, b) {
    var c = this;
    this.tex = gl.createTexture();
    b || (b = {});
    this.isVideo = this.loaded = !1;
    this.onLoad = b.onLoad;
    this.mipmap = b.mipmap != null ? b.mipmap: !0;
    this.flip = b.flip != null ? b.flip: !0;
    this.wrapMode = b.wrapMode || gl.REPEAT;
    this.magFilter = b.magFilter || gl.LINEAR;
    this.minFilter = b.minFilter || gl.LINEAR_MIPMAP_NEAREST;
    var d = function() {
        var b = c.src && c.src.width > 0 && c.src.height > 0 && (c.src.width & c.src.width - 1) == 0 && (c.src.height & c.src.height - 1) == 0;
        gl.bindTexture(gl.TEXTURE_2D, c.tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, c.flip);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c.src);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, c.magFilter);
        b ? gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, c.minFilter) : gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        b ? (gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, c.wrapMode), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, c.wrapMode)) : (c.wrapMode != gl.CLAMP_TO_EDGE && j3dlog("WARNING! Texture: " + a + " : only CLAMP_TO_EDGE wrapMode is supported for non-power-of-2 textures."), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE));
        c.mipmap && b && gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        c.onLoad && c.onLoad.call();
        c.loaded = !0
    },
    e = function(a) {
        c.src = new Image;
        c.src.onload = function() {
            d()
        };
        c.src.src = a
    },
    g = function(a) {
        c.isVideo = !0;
        c.src = document.createElement("video");
        c.src.src = a;
        c.src.preload = "auto";
        c.src.addEventListener("canplaythrough",
        function() {
            c.src.play();
            d()
        });
        c.src.load()
    };
    if (typeof a == "string") switch (a.substring(a.lastIndexOf(".") + 1).toLowerCase()) {
    case "jpg":
    case "png":
    case "gif":
        e(a);
        break;
    case "mp4":
    case "webm":
    case "ogv":
        g(a)
    } else if (a.getContext) c.src = a,
    d()
};
J3D.Texture.prototype.update = function() {
    this.loaded && this.isVideo && (gl.bindTexture(gl.TEXTURE_2D, this.tex), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.src), gl.bindTexture(gl.TEXTURE_2D, null))
};
J3D.Texture.prototype.toUniform = function() {
    this.update();
    return this.tex
};


J3D.Cubemap = function(a) {
    var b = this;
    this.tex = gl.createTexture();
    this.facesLeft = 6;
    this.faceImages = {};
    var c = function(a, c) {
        b.faceImages[a] = new Image;
        b.faceImages[a].onload = function() {
            b.facesLeft--;
            b.facesLeft == 0 && (gl.bindTexture(gl.TEXTURE_CUBE_MAP, b.tex), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, b.faceImages.front), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, b.faceImages.back), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, b.faceImages.up), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, b.faceImages.down), gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, b.faceImages.right), gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, b.faceImages.left), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.generateMipmap(gl.TEXTURE_CUBE_MAP), gl.bindTexture(gl.TEXTURE_CUBE_MAP, null))
        };
        b.faceImages[a].src = c
    };
    c("left", a.left);
    c("right", a.right);
    c("up", a.up);
    c("down", a.down);
    c("back", a.back);
    c("front", a.front)
};
J3D.Cubemap.prototype.toUniform = function() {
    return this.tex
};


J3D.Transform = function(a, b) {
    var c = this;
    this.uid = b || 0;
    this.name = a;
    var d = [];
    this.numChildren = 0;
    this.position = v3.ZERO();
    this.rotation = v3.ZERO();
    this.scale = v3.ONE();
    this.worldPosition = v3.ZERO();
    this.matrix = mat4.create();
    this.globalMatrix = mat4.create();
    this.normalMatrix = mat3.create();
    this._lockedMatrix = this.isStatic = !1;
    this.enabled = !0;
    this.textureTile = v2.ONE();
    this.textureOffset = v2.ZERO();
    this.add = function(a) {
        d.push(a);
        c.numChildren = d.length;
        return a
    };
    this.childAt = function(a) {
        return d[a]
    }
};
J3D.Transform.prototype.clone = function() {
    var a = new J3D.Transform;
    a.position = this.position.cp();
    a.rotation = this.rotation.cp();
    a.scale = this.scale.cp();
    a.isStatic = this.isStatic;
    a.renderer = this.renderer;
    a.mesh = this.mesh;
    a.camera = this.camera;
    a.light = this.light;
    return a
};
J3D.Transform.prototype.forward = function() {
    var a = mat4.create();
    a = mat4.multiplyVec3(mat3.toMat4(this.normalMatrix, a), [0, 0, 1]);
    return (new v3(a[0], a[1], a[2])).norm()
};
J3D.Transform.prototype.left = function() {
    var a = mat4.create();
    a = mat4.multiplyVec3(mat3.toMat4(this.normalMatrix, a), [1, 0, 0]);
    return (new v3(a[0], a[1], a[2])).norm()
};
J3D.Transform.prototype.updateWorld = function(a) {
    if (!this._lockedMatrix && (mat4.identity(this.matrix), mat4.translate(this.matrix, [this.position.x, this.position.y, this.position.z]), mat4.rotateZ(this.matrix, this.rotation.z), mat4.rotateX(this.matrix, this.rotation.x), mat4.rotateY(this.matrix, this.rotation.y), mat4.scale(this.matrix, [this.scale.x, this.scale.y, this.scale.z]), a != null ? mat4.multiply(a.globalMatrix, this.matrix, this.globalMatrix) : this.globalMatrix = this.matrix, mat4.toInverseMat3(this.globalMatrix, this.normalMatrix), mat3.transpose(this.normalMatrix), this.isStatic)) this._lockedMatrix = !0
};
J3D.Transform.prototype.updateWorldPosition = function() {
    var a = [0, 0, 0];
    mat4.multiplyVec3(this.globalMatrix, a);
    this.worldPosition.x = a[0];
    this.worldPosition.y = a[1];
    this.worldPosition.z = a[2]
};
J3D.Transform.prototype.getTileOffset = function() {
    var a, b;
    a = this.renderer.textureTile && this.textureTile.isOne() ? this.renderer.textureTile.xy() : this.textureTile.xy();
    b = this.renderer.textureOffset && this.textureOffset.isZero() ? this.renderer.textureOffset.xy() : this.textureOffset.xy();
    return a.concat(b)
};
J3D.Transform.prototype.find = function(a) {
    for (var b = 0; b < this.numChildren; b++) if (this.childAt(b).name == a[0]) return a.length == 1 ? this.childAt(b) : this.childAt(b).find(a.slice(1));
    return null
};
J3D.Transform.prototype.updateInverseMat = function() {
    if (!this.inverseMat) this.inverseMat = mat4.create();
    mat4.inverse(this.globalMatrix, this.inverseMat);
    this.updateWorldPosition()
};




J3D.ShaderAtlas = function() {
    this.shaders = {};
    this.programs = {};
    this.shaderCount = 0
};
J3D.ShaderAtlas.prototype.compileShaderSource = function(a, b, c, d) {
    var e = d.common || "";
    if (d.includes && d.includes.length > 0) for (var g = 0; g < d.includes.length; g++) e += J3D.ShaderSource[d.includes[g]];
    if (c == gl.VERTEX_SHADER) {
        var f = "";
        if (d.vertexIncludes && d.vertexIncludes.length > 0) for (g = 0; g < d.vertexIncludes.length; g++) f += J3D.ShaderSource[d.vertexIncludes[g]]
    } else if (f = "", d.fragmentIncludes && d.fragmentIncludes.length > 0) for (g = 0; g < d.fragmentIncludes.length; g++) f += J3D.ShaderSource[d.fragmentIncludes[g]];
    b = e + f + b;
    c = gl.createShader(c);
    gl.shaderSource(c, b);
    gl.compileShader(c);
    gl.getShaderParameter(c, gl.COMPILE_STATUS) || j3dlog("ERROR. Shader compile error: " + gl.getShaderInfoLog(c));
    this.programs[a] = c
};
J3D.ShaderAtlas.prototype.linkShader = function(a) {
    a = a.name;
    var b = this.programs[a + "Vert"],
    c = this.programs[a + "Frag"],
    d = gl.createProgram();
    gl.attachShader(d, b);
    gl.attachShader(d, c);
    gl.linkProgram(d);
    gl.getProgramParameter(d, gl.LINK_STATUS) || console.log("Error linking program " + a);
    gl.useProgram(d);
    c = 0;
    d.uniforms = {};
    var e = gl.getProgramParameter(d, gl.ACTIVE_UNIFORMS);
    for (b = 0; b < e; b++) {
        var g = gl.getActiveUniform(d, b);
        d.uniforms[g.name] = g;
        d.uniforms[g.name].location = gl.getUniformLocation(d, g.name);
        if (J3D.ShaderUtil.isTexture(g.type)) d.uniforms[g.name].texid = c,
        c++
    }
    d.attributes = {};
    c = gl.getProgramParameter(d, gl.ACTIVE_ATTRIBUTES);
    for (b = 0; b < c; b++) e = gl.getActiveAttrib(d, b),
    d.attributes[e.name] = gl.getAttribLocation(d, e.name),
    gl.enableVertexAttribArray(d.attributes[e.name]);
    this.shaderCount++;
    this.shaders[a] = d
};
J3D.ShaderAtlas.prototype.getShader = function(a) {
    this.shaders[a.name] || (this.compileShaderSource(a.name + "Vert", a.vertSource(), gl.VERTEX_SHADER, a.metaData), this.compileShaderSource(a.name + "Frag", a.fragSource(), gl.FRAGMENT_SHADER, a.metaData), this.linkShader(a));
    return this.shaders[a.name]
};



J3D.Particles = function(a) {
    this.renderMode = J3D.RENDER_AS_OPAQUE;
    this.vertSize = 3;
    this.vertices = a.positions;
    this.vertNum = a.positions.length / this.vertSize;
    this.vertBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuf);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    if (a.colors) this.colorSize = 4,
    this.colors = a.colors,
    this.colorBuf = gl.createBuffer(),
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuf),
    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    if (a.animation) {
        if (!a.animationSize) throw Error("Please specify the size of animaton attribute");
        this.animSize = a.animationSize;
        this.animation = a.animation;
        this.animBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.animBuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.animation, gl.STATIC_DRAW)
    }
};
J3D.Particles.prototype.setTransparency = function(a, b, c) {
    a ? (this.renderMode = J3D.RENDER_AS_TRANSPARENT, this.srcFactor = b, this.dstFactor = c) : this.renderMode = J3D.RENDER_AS_OPAQUE
};


J3D.Postprocess = function(a) {
    this.drawMode = gl.TRIANGLES;
    this.engine = a;
    this.fbo = new J3D.FrameBuffer;
    this.geometry = J3D.Primitive.FullScreenQuad();
    this.filter = null
};
J3D.Postprocess.prototype.render = function() {
    this.fbo.bind();
    this.engine.render();
    this.fbo.unbind();
    this.renderEffect(this.fbo.texture)
};
J3D.Postprocess.prototype.renderEffect = function(a) {
    this.program = engine.shaderAtlas.getShader(this.filter);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.program);
    J3D.ShaderUtil.setTexture(this.program, 0, "uTexture", a);
    J3D.ShaderUtil.setAttributes(this.program, this.geometry);
    this.filter.setup(this.program);
    gl.drawArrays(this.drawMode, 0, this.geometry.size)
};



J3D.FrameBuffer = function(a, b) {
    this.width = a ? a: gl.viewportWidth;
    this.height = b ? b: gl.viewportHeight;
    this.fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    this.depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
};
J3D.FrameBuffer.prototype.bind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
};
J3D.FrameBuffer.prototype.unbind = function() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
};



J3D.Primitive = {};
J3D.Primitive.Cube = function(a, b, c) {
    var d = J3D.Primitive.getEmpty();
    a *= 0.5;
    b *= 0.5;
    c *= 0.5;
    J3D.Primitive.addQuad(d, new v3( - a, b, c), new v3(a, b, c), new v3(a, -b, c), new v3( - a, -b, c));
    J3D.Primitive.addQuad(d, new v3(a, b, -c), new v3( - a, b, -c), new v3( - a, -b, -c), new v3(a, -b, -c));
    J3D.Primitive.addQuad(d, new v3( - a, b, -c), new v3( - a, b, c), new v3( - a, -b, c), new v3( - a, -b, -c));
    J3D.Primitive.addQuad(d, new v3(a, b, c), new v3(a, b, -c), new v3(a, -b, -c), new v3(a, -b, c));
    J3D.Primitive.addQuad(d, new v3(a, b, c), new v3( - a, b, c), new v3( - a, b, -c), new v3(a, b, -c));
    J3D.Primitive.addQuad(d, new v3(a, -b, c), new v3(a, -b, -c), new v3( - a, -b, -c), new v3( - a, -b, c));
    return new J3D.Mesh(d)
};
J3D.Primitive.FullScreenQuad = function() {
    var a = new J3D.Geometry;
    a.addArray("aVertexPosition", new Float32Array([ - 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1]), 2);
    a.addArray("aTextureCoord", new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]), 2);
    return a
};
J3D.Primitive.Plane = function(a, b, c, d, e, g) {
    var f = J3D.Primitive.getEmpty();
    e || (e = 0);
    g || (g = 0);
    a *= 0.5;
    b *= 0.5;
    c || (c = 1);
    d || (d = 1);
    e = -a + e;
    g = b + g;
    a = a * 2 / c;
    b = b * 2 / d;
    for (var h = 0; h < c; h++) for (var j = 0; j < d; j++) {
        var i = e + h * a,
        k = i + a,
        l = g - j * b,
        m = l - b,
        n = new v3(i, l, 0);
        l = new v3(k, l, 0);
        k = new v3(k, m, 0);
        i = new v3(i, m, 0);
        J3D.Primitive.addQuad(f, n, l, k, i, 1 / c * h, 1 / c * (h + 1), 1 - 1 / d * (j + 1), 1 - 1 / d * j)
    }
    return new J3D.Mesh(f)
};
J3D.Primitive.getEmpty = function() {
    var a = {};
    a.vertices = [];
    a.normals = [];
    a.uv1 = [];
    a.tris = [];
    return a
};
J3D.Primitive.addQuad = function(a, b, c, d, e, g, f, h, j) {
    var i = v3.cross(b.sub(c), c.sub(d)).norm(),
    k = a.vertices.length / 3;
    g = g ? g: 0;
    f = f ? f: 1;
    h = h ? h: 0;
    j = j ? j: 1;
    a.vertices.push(b.x, b.y, b.z, c.x, c.y, c.z, d.x, d.y, d.z, e.x, e.y, e.z);
    a.normals.push(i.x, i.y, i.z, i.x, i.y, i.z, i.x, i.y, i.z, i.x, i.y, i.z);
    a.uv1.push(g, j, f, j, f, h, g, h);
    a.tris.push(k, k + 1, k + 2, k, k + 2, k + 3)
};



J3D.Shader = function(a, b, c, d) {
    if (!a) throw Error("You must specify a name for custom shaders");
    if (b == null || c == null) throw Error("You must pass a vertex and fragment shader source for custom shaders");
    this.name = a;
    this.drawMode = 4;
    this._vertSource = b;
    this._fragSource = c;
    this.reloadStaticUniforms = !0;
    this.su = {};
    this.loadedStaticTextures = {};
    this.metaData = d || {}
};
J3D.Shader.prototype.vertSource = function() {
    return this._vertSource
};
J3D.Shader.prototype.fragSource = function() {
    return this._fragSource
};
J3D.Shader.prototype.setup = function(a) {
    if (this.reloadStaticUniforms) this.loadedStaticTextures = {};
    this.uTime = J3D.Time.time;
    var b = 0,
    c;
    for (c in a.uniforms) this.reloadStaticUniforms && this.su[c] != null && this[c] == null && this.su[c].loaded == null && J3D.ShaderUtil.setUniform(c, a, this.su),
    this.su[c] != null && this[c] == null && this.su[c].loaded && !this.loadedStaticTextures[c] && (J3D.ShaderUtil.setUniform(c, a, this.su), this.loadedStaticTextures[c] = !0),
    this[c] != null && (b++, J3D.ShaderUtil.setUniform(c, a, this));
    this.reloadStaticUniforms = !1;
    j3dlogOnce("Shader " + this.name + " has " + b + " dynamic uniforms")
};
J3D.Shader.prototype.clone = function() {
    var a = new J3D.Shader(this.name + Math.random(), this._vertSource, this._fragSource);
    for (s in this) typeof this[s] !== "function" && this.hasOwnProperty(s) && (a[s] = this[s]);
    if (this.hasOwnProperty("setup")) a.setup = this.setup;
    a.su = {};
    for (ss in this.su) typeof this.su[ss] !== "function" && this.su.hasOwnProperty(ss) && (a.su[ss] = this.su[ss]);
    a.reloadStaticUniforms = !0;
    return a
};


J3D.ShaderSource = {};
J3D.ShaderSource.CopyFilter = "//#name CopyFilter\n//#description All this shader does is to render a texture (typically a render texture) pixel-to-pixel.\n//#description It is useful in effects like Persistence\n//#author bartekd\n//#include CommonFilterInclude\n//#vertex\n//#include BasicFilterVertex\n//#fragment\nuniform sampler2D uTexture;\nvarying vec2 vTextureCoord;\nvoid main(void) {\nvec4 p = texture2D(uTexture, vTextureCoord);\ngl_FragColor = vec4(p.rgb, 1.0);\n}\n";
J3D.ShaderSource.Depth = "//#name Depth\n//#author bartekd\n//#include CommonInclude\n//#vertex\n//#include VertexInclude\nvarying float depth;\nvoid main(void) {\nvec4 p = mMatrix * vec4(aVertexPosition, 1.0);\ngl_Position = pMatrix * vMatrix * p;\ndepth = gl_Position.z/gl_Position.w;\n}\n//#fragment\nvarying float depth;\nvoid main(void) {\nfloat d = 1.0 - depth;\ngl_FragColor = vec4(d, d, d, 1.0);\n}\n";
J3D.ShaderSource.Gouraud = "//#name Gouraud\n//#author bartekd\n//#include CommonInclude\n//#vertex\n//#include VertexInclude\n//#include Lights\nuniform float specularIntensity;\nuniform float shininess;\nvarying vec3 vLight;\nvarying vec2 vTextureCoord;\nvoid main(void) {\nvec4 p = mMatrix * vec4(aVertexPosition, 1.0);\ngl_Position = pMatrix * vMatrix * p;\nvTextureCoord = getTextureCoord(aTextureCoord);\nvec3 n = normalize( nMatrix * aVertexNormal );\nvLight = computeLights(p, n, specularIntensity, shininess);\n}\n//#fragment\nuniform vec4 color;\nuniform sampler2D colorTexture;\nuniform bool hasColorTexture;\nvarying vec3 vLight;\nvarying vec2 vTextureCoord;\nvoid main(void) {\nvec4 tc = color;\nif(hasColorTexture) tc *= texture2D(colorTexture, vTextureCoord);\ngl_FragColor = vec4(tc.rgb * vLight, color.a);\n}\n";
J3D.ShaderSource.Lightmap = "//#name Lightmap\n//#author bartekd\n//#include CommonInclude\n//#vertex\n//#include VertexInclude\nuniform vec4 lightmapAtlas;\nvarying vec2 vTextureCoord;\nvarying vec2 vTextureCoord2;\nvoid main(void) {\nvTextureCoord = getTextureCoord(aTextureCoord);\nvTextureCoord2 = aTextureCoord2 * lightmapAtlas.xy + lightmapAtlas.zw;\ngl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);\n}\n//#fragment\nuniform vec4 color;\nuniform sampler2D colorTexture;\nuniform sampler2D lightmapTexture;\nvarying vec2 vTextureCoord;\nvarying vec2 vTextureCoord2;\nvoid main(void) {\nvec4 tc = texture2D(colorTexture, vTextureCoord);\nvec4 lm = texture2D(lightmapTexture, vTextureCoord2);\nif(tc.a < 0.1) discard;\nelse gl_FragColor = vec4(color.rgb * tc.rgb * lm.rgb, 1.0);\n}\n";
J3D.ShaderSource.Normal2Color = "//#name Normal2Color\n//#author bartekd\n//#include CommonInclude\n//#vertex\n//#include VertexInclude\nvarying vec3 vColor;\nvoid main(void) {\ngl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);\nvColor = normalize( aVertexNormal / 2.0 + vec3(0.5) );\n}\n//#fragment\nvarying vec3 vColor;\nvoid main(void) {\ngl_FragColor = vec4(vColor, 1.0);\n}\n";
J3D.ShaderSource.Phong = "//#name Phong\n//#description Classic phong shader\n//#author bartekd\n//#include CommonInclude\n//#vertex\n//#include VertexInclude\nvarying vec4 vPosition;\nvarying vec3 vLight;\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\nvoid main(void) {\nvTextureCoord = getTextureCoord(aTextureCoord);\nvNormal = nMatrix * aVertexNormal;\nvPosition = mMatrix * vec4(aVertexPosition, 1.0);\ngl_Position = pMatrix * vMatrix * vPosition;\ngl_PointSize = 5.0;\n}\n//#fragment\n//#include Lights\nuniform vec4 color;\nuniform sampler2D colorTexture;\nuniform bool hasColorTexture;\nuniform float specularIntensity;\nuniform float shininess;\nvarying vec4 vPosition;\nvarying vec3 vLight;\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\nvoid main(void) {\nvec4 tc = color;\nif(hasColorTexture) tc *= texture2D(colorTexture, vTextureCoord);\nvec3 l = computeLights(vPosition, vNormal, specularIntensity, shininess);\ngl_FragColor = vec4(tc.rgb * l, color.a);\n}\n";
J3D.ShaderSource.Reflective = "//#name Reflective\n//#description Based on Cg tutorial: http://http.developer.nvidia.com/CgTutorial/cg_tutorial_chapter07.html\n//#author bartekd\n//#include CommonInclude\n//#vertex\n//#include VertexInclude\nvarying vec3 vNormal;\nvarying vec3 refVec;\nvoid main(void) {\ngl_Position = mvpMatrix() * vec4(aVertexPosition, 1.0);\nvNormal = normalize(nMatrix * aVertexNormal);\nvec3 incident = normalize( (vec4(aVertexPosition, 1.0) * mMatrix).xyz - uEyePosition);\nrefVec = reflect(incident, vNormal);\n}\n//#fragment\nuniform samplerCube uCubemap;\nvarying vec3 refVec;\nvoid main(void) {\ngl_FragColor = textureCube(uCubemap, refVec);\n}\n";
J3D.ShaderSource.Skybox = "//#name Skybox\n//#author bartekd\n//#include CommonInclude\n//#vertex\n//#include VertexInclude\nuniform float mid;\nvarying vec3 vVertexPosition;\nvoid main(void) {\ngl_Position = pMatrix * vMatrix * vec4(uEyePosition + aVertexPosition * mid, 1.0);\nvVertexPosition = aVertexPosition;\n}\n//#fragment\nuniform samplerCube uCubemap;\nvarying vec3 vVertexPosition;\nvoid main(void) {\ngl_FragColor = textureCube(uCubemap, vVertexPosition);\n}\n";
J3D.ShaderSource.Toon = "//#name Toon\n//#author bartekd\n//#include CommonInclude\n//#vertex\n//#include VertexInclude\n//#include Lights\nvarying float vLight;\nvarying vec2 vTextureCoord;\nvoid main(void) {\nvec4 p = mMatrix * vec4(aVertexPosition, 1.0);\ngl_Position = pMatrix * vMatrix * p;\ngl_PointSize = 10.0;\nvTextureCoord = getTextureCoord(aTextureCoord);\nvec3 n = normalize( nMatrix * aVertexNormal );\nvLight = computeLights(p, n, 0.0, 0.0).r;\n}\n//#fragment\nuniform vec4 uColor;\nuniform sampler2D uColorSampler;\nvarying float vLight;\nvarying vec2 vTextureCoord;\nvoid main(void) {\nvec4 tc = texture2D(uColorSampler, vec2(vLight, 0.5) );\ngl_FragColor = vec4(tc.rgb, 1.0);\n}\n";
J3D.ShaderSource.Vignette = "//#name Vignette\n//#author bartekd\n//#vertex\n//#include BasicFilterVertex\n//#fragment\n//#include CommonFilterInclude\nuniform sampler2D uTexture;\nvarying vec2 vTextureCoord;\nvoid main(void) {\nvec2 m = vec2(0.5, 0.5);\nfloat d = distance(m, vTextureCoord) * 1.0;\nvec3 c = texture2D(uTexture, vTextureCoord).rgb * (1.0 - d * d);\ngl_FragColor = vec4(c.rgb, 1.0);\n}\n";
J3D.ShaderSource.BasicFilterVertex = "//#name BasicFilterVertex\n//#description A basic vertex shader for filters that use a full screen quad and have all the logic in fragment shader\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying vec2 vTextureCoord;\nvoid main(void) {\ngl_Position = vec4(aVertexPosition, 0.0, 1.0);\nvTextureCoord = aTextureCoord;\n}\n";
J3D.ShaderSource.CommonFilterInclude = "//#name CommonFilterInclude\n//#description Common uniforms and function for filters\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform float uTime;\nfloat whiteNoise(vec2 uv, float scale) {\nfloat x = (uv.x + 0.2) * (uv.y + 0.2) * (10000.0 + uTime);\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.005 );\nreturn clamp( 0.1 + dx * 100.0, 0.0, 1.0 ) * scale;\n}\n";
J3D.ShaderSource.CommonInclude = "//#name CommonInclude\n//#description Collection of common uniforms, functions and structs to include in shaders (both fragment and vertex)\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform float uTime;\nuniform mat4 mMatrix;\nuniform mat4 vMatrix;\nuniform mat3 nMatrix;\nuniform mat4 pMatrix;\nuniform vec3 uEyePosition;\nuniform vec4 uTileOffset;\nmat4 mvpMatrix() {\nreturn pMatrix * vMatrix * mMatrix;\n}\nmat4 mvMatrix() {\nreturn vMatrix * mMatrix;\n}\nfloat luminance(vec3 c) {\nreturn c.r * 0.299 + c.g * 0.587 + c.b * 0.114;\n}\nfloat brightness(vec3 c) {\nreturn c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722;\n}\nvec2 getTextureCoord(vec2 uv) {\nreturn uv * uTileOffset.xy + uTileOffset.zw;\n}\n";
J3D.ShaderSource.Lights = "//#name Lights\n//#description Collection of light equations with the necessary\n//#description Requires CommonInclude\nstruct lightSource {\nint type;\nvec3 direction;\nvec3 color;\nvec3 position;\nfloat intensity;\n};\nuniform lightSource uLight[4];\nconst float C1 = 0.429043;\nconst float C2 = 0.511664;\nconst float C3 = 0.743125;\nconst float C4 = 0.886227;\nconst float C5 = 0.247708;\n//const vec3 L00  = vec3( 0.871297,  0.875222,  0.864470);\n//const vec3 L1m1 = vec3( 0.175058,  0.245335,  0.312891);\n//const vec3 L10  = vec3( 0.034675,  0.036107,  0.037362);\n//const vec3 L11  = vec3(-0.004629, -0.029448, -0.048028);\n//const vec3 L2m2 = vec3(-0.120535, -0.121160, -0.117507);\n//const vec3 L2m1 = vec3( 0.003242,  0.003624,  0.007511);\n//const vec3 L20  = vec3(-0.028667, -0.024926, -0.020998);\n//const vec3 L21  = vec3(-0.077539, -0.086325, -0.091591);\n//const vec3 L22  = vec3(-0.161784, -0.191783, -0.219152);\nconst vec3 L00  = vec3( 0.078908,  0.043710,  0.054161);\nconst vec3 L1m1 = vec3( 0.039499,  0.034989,  0.060488);\nconst vec3 L10  = vec3(-0.033974, -0.018236, -0.026940);\nconst vec3 L11  = vec3(-0.029213, -0.005562,  0.000944);\nconst vec3 L2m2 = vec3(-0.011141, -0.005090, -0.012231);\nconst vec3 L2m1 = vec3(-0.026240, -0.022401, -0.047479);\nconst vec3 L20  = vec3(-0.015570, -0.009471, -0.014733);\nconst vec3 L21  = vec3( 0.056014,  0.021444,  0.013915);\nconst vec3 L22  = vec3( 0.021205, -0.005432, -0.030374);\nvec3 sphericalHarmonics(vec3 n, lightSource ls) {\nvec3 c =  C1 * L22 * (n.x * n.x - n.y * n.y) +\nC3 * L20 * n.z * n.z +\nC4 * L00 -\nC5 * L20 +\n2.0 * C1 * L2m2 * n.x * n.y +\n2.0 * C1 * L21  * n.x * n.z +\n2.0 * C1 * L2m1 * n.y * n.z +\n2.0 * C2 * L11  * n.x +\n2.0 * C2 * L1m1 * n.y +\n2.0 * C2 * L10  * n.z;\nc *= ls.intensity;\nreturn c;\n}\nvec3 hemisphere(vec4 p, vec3 n, lightSource ls) {\nvec3 lv = normalize(ls.position - p.xyz);\nreturn ls.color * (dot(n, lv) * 0.5 + 0.5);\n}\nvec3 phong(vec4 p, vec3 n, float si, float sh, lightSource ls){\nvec3 ld;\nif(ls.type == 1) ld = -ls.direction;\nelse if(ls.type == 2) ld = normalize(ls.position - p.xyz);\nfloat dif = max(dot(n, ld), 0.0);\nfloat spec = 0.0;\nif(si > 0.0) {\nvec3 eyed = normalize(uEyePosition - p.xyz);\nvec3 refd = reflect(-ld, n);\nspec = pow(max(dot(refd, eyed), 0.0), sh) * si;\n};\nreturn ls.color * dif + ls.color * spec;\n}\nvec3 singleLight(vec4 p, vec3 n, float si, float sh, lightSource ls) {\nif(ls.type == 0) {\nreturn ls.color;\n} else if(ls.type == 1 || ls.type == 2) {\nreturn phong(p, n, si, sh, ls);\n} else if(ls.type == 3) {\nreturn hemisphere(p, n, ls);\n} else if(ls.type == 4) {\nreturn sphericalHarmonics(n, ls);\n} else {\nreturn vec3(0);\n}\n}\nvec3 computeLights(vec4 p, vec3 n, float si, float sh) {\nvec3 s = vec3(0);\ns += singleLight(p, n, si, sh, uLight[0]);\ns += singleLight(p, n, si, sh, uLight[1]);\ns += singleLight(p, n, si, sh, uLight[2]);\ns += singleLight(p, n, si, sh, uLight[3]);\nreturn s;\n}\n";
J3D.ShaderSource.Modifiers = "//#name Modifiers\n//#description A collection of modifier functions for geometry (only bend for now)\nvec3 bend(vec3 ip, float ba, vec2 b, float o, float a) {\nvec3 op = ip;\nip.x = op.x * cos(a) - op.y * sin(a);\nip.y = op.x * sin(a) + op.y * cos(a);\nif(ba != 0.0) {\nfloat radius = b.y / ba;\nfloat onp = (ip.x - b.x) / b.y - o;\nip.z = cos(onp * ba) * radius - radius;\nip.x = (b.x + b.y * o) + sin(onp * ba) * radius;\n}\nop = ip;\nip.x = op.x * cos(-a) - op.y * sin(-a);\nip.y = op.x * sin(-a) + op.y * cos(-a);\nreturn ip;\n}\n";
J3D.ShaderSource.VertexInclude = "//#name VertexInclude\n//#description Common attributes for a mesh - include this in a vertex shader so you don't rewrite this over and over again\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aTextureCoord;\nattribute vec2 aTextureCoord2;\nattribute vec4 aVertexColor;\n";



J3D.Color = function(a, b, c, d) {
    var e = this;
    this.r = a || 0;
    this.g = b || 0;
    this.b = c || 0;
    this.a = d || 0;
    this.rgba = function() {
        return [e.r, e.g, e.b, e.a]
    };
    this.rgb = function() {
        return [e.r, e.g, e.b]
    };
    this.toUniform = function(a) {
        return a == gl.FLOAT_VEC3 ? this.rgb() : this.rgba()
    }
};
J3D.Color.white = new J3D.Color(1, 1, 1, 1);
J3D.Color.black = new J3D.Color(0, 0, 0, 1);
J3D.Color.red = new J3D.Color(1, 0, 0, 1);
J3D.Color.green = new J3D.Color(0, 1, 0, 1);
J3D.Color.blue = new J3D.Color(0, 0, 1, 1);


J3D.Time = {};
J3D.Time.time = 0;
J3D.Time.startTime = 0;
J3D.Time.lastTime = 0;
J3D.Time.deltaTime = 0;
J3D.Time.tick = function() {
    var a = (new Date).getTime();
    if (J3D.Time.startTime == 0) J3D.Time.startTime = a;
    if (J3D.Time.lastTime != 0) J3D.Time.deltaTime = a - J3D.Time.lastTime;
    J3D.Time.lastTime = a;
    J3D.Time.time = (a - J3D.Time.startTime) / 1E3
};
J3D.Time.formatTime = function() {
    var a = Math.floor(J3D.Time.time % 1 * 100),
    b = Math.floor(J3D.Time.time) % 60,
    c = Math.floor(J3D.Time.time / 60);
    a < 10 && (a = "0" + a);
    a == 100 && (a = "00");
    b < 10 && (b = "0" + b);
    c < 10 && (c = "0" + c);
    return c + ":" + b + ":" + a
};



J3D.ParticleUtil = {};
J3D.ParticleUtil.insideCube = function(a, b, c) {
    var d = new Float32Array(a * 3);
    c = c || v3.ZERO();
    b /= 2;
    for (var e = 0; e < a * 3; e += 3) d[e] = c.x + Math.random() * b * 2 - b + Math.random(),
    d[e + 1] = c.y + Math.random() * b * 2 - b + Math.random(),
    d[e + 2] = c.z + Math.random() * b * 2 - b + Math.random();
    return d
};
J3D.ParticleUtil.onSphere = function(a, b, c, d) {
    var e = new Float32Array(a * 3);
    d || v3.ZERO();
    c = c == null ? 1 : c;
    for (d = 0; d < a * 3; d += 3) {
        var g = v3.random().norm().mul(b + Math.random() * c);
        e[d] = g.x;
        e[d + 1] = g.y;
        e[d + 2] = g.z
    }
    return e
};
J3D.ParticleUtil.randomColors = function(a, b, c) {
    var d = new Float32Array(a * 4);
    c = (c == null ? 1 : c) - b;
    for (var e = 0; e < a * 4; e++) d[e] = b + Math.random() * c;
    return d
};



J3D.ShaderUtil = {};
J3D.ShaderUtil.setTexture = function(a, b, c, d) {
    gl.activeTexture(33984 + b);
    gl.bindTexture(gl.TEXTURE_2D, d);
    gl.uniform1i(a.uniforms[c].location, b)
};
J3D.ShaderUtil.setTextureCube = function(a, b, c, d) {
    gl.activeTexture(33984 + b);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, d);
    gl.uniform1i(a.uniforms[c].location, b)
};
J3D.ShaderUtil.setAttributes = function(a, b) {
    for (var c = 0; c < b.arrays.length; c++) {
        var d = b.arrays[c];
        a.attributes[d.name] != null && (gl.bindBuffer(gl.ARRAY_BUFFER, d.buffer), gl.vertexAttribPointer(a.attributes[d.name], d.itemSize, gl.FLOAT, !1, 0, 0))
    }
};
J3D.ShaderUtil.setLights = function(a, b) {
    for (var c = 0; c < J3D.SHADER_MAX_LIGHTS; c++) b[c] && a.uniforms["uLight[" + c + "].type"] ? (gl.uniform1i(a.uniforms["uLight[" + c + "].type"].location, b[c].light.type), gl.uniform3fv(a.uniforms["uLight[" + c + "].direction"].location, b[c].light.direction.xyz()), gl.uniform3fv(a.uniforms["uLight[" + c + "].color"].location, b[c].light.color.rgb()), gl.uniform3fv(a.uniforms["uLight[" + c + "].position"].location, b[c].worldPosition.xyz()), gl.uniform1f(a.uniforms["uLight[" + c + "].intensity"].location, b[c].light.intensity)) : a.uniforms["uLight[" + c + "].type"] && gl.uniform1i(a.uniforms["uLight[" + c + "].type"].location, J3D.NONE)
};
J3D.ShaderUtil.isTexture = function(a) {
    return a == gl.SAMPLER_2D || a == gl.SAMPLER_CUBE
};
J3D.ShaderUtil.getTypeName = function(a) {
    switch (a) {
    case gl.BYTE:
        return "BYTE (0x1400)";
    case gl.UNSIGNED_BYTE:
        return "UNSIGNED_BYTE (0x1401)";
    case gl.SHORT:
        return "SHORT (0x1402)";
    case gl.UNSIGNED_SHORT:
        return "UNSIGNED_SHORT (0x1403)";
    case gl.INT:
        return "INT (0x1404)";
    case gl.UNSIGNED_INT:
        return "UNSIGNED_INT (0x1405)";
    case gl.FLOAT:
        return "FLOAT (0x1406)";
    case gl.FLOAT_VEC2:
        return "FLOAT_VEC2 (0x8B50)";
    case gl.FLOAT_VEC3:
        return "FLOAT_VEC3 (0x8B51)";
    case gl.FLOAT_VEC4:
        return "FLOAT_VEC4 (0x8B52)";
    case gl.INT_VEC2:
        return "INT_VEC2   (0x8B53)";
    case gl.INT_VEC3:
        return "INT_VEC3   (0x8B54)";
    case gl.INT_VEC4:
        return "INT_VEC4   (0x8B55)";
    case gl.BOOL:
        return "BOOL \t\t(0x8B56)";
    case gl.BOOL_VEC2:
        return "BOOL_VEC2  (0x8B57)";
    case gl.BOOL_VEC3:
        return "BOOL_VEC3  (0x8B58)";
    case gl.BOOL_VEC4:
        return "BOOL_VEC4  (0x8B59)";
    case gl.FLOAT_MAT2:
        return "FLOAT_MAT2 (0x8B5A)";
    case gl.FLOAT_MAT3:
        return "FLOAT_MAT3 (0x8B5B)";
    case gl.FLOAT_MAT4:
        return "FLOAT_MAT4 (0x8B5C)";
    case gl.SAMPLER_2D:
        return "SAMPLER_2D (0x8B5E)";
    case gl.SAMPLER_CUBE:
        return "SAMPLER_CUBE (0x8B60)";
    default:
        return "Unknown (" + a.toString(16) + ")"
    }
};
J3D.ShaderUtil.setUniform = function(a, b, c) {
    var d = b.uniforms[a];
    if (d) switch (c = c[a], c.toUniform && (c = c.toUniform(d.type)), d.type) {
    case gl.BYTE:
        gl.uniform1i(d.location, c);
        break;
    case gl.UNSIGNED_BYTE:
        gl.uniform1i(d.location, c);
        break;
    case gl.SHORT:
        gl.uniform1i(d.location, c);
        break;
    case gl.UNSIGNED_SHORT:
        gl.uniform1i(d.location, c);
        break;
    case gl.INT:
        gl.uniform1i(d.location, c);
        break;
    case gl.INT_VEC2:
        gl.uniform2iv(d.location, c);
        break;
    case gl.INT_VEC3:
        gl.uniform3iv(d.location, c);
        break;
    case gl.INT_VEC4:
        gl.uniform4iv(d.location, c);
        break;
    case gl.UNSIGNED_INT:
        gl.uniform1i(d.location, c);
        break;
    case gl.FLOAT:
        gl.uniform1f(d.location, c);
        break;
    case gl.FLOAT_VEC2:
        gl.uniform2fv(d.location, c);
        break;
    case gl.FLOAT_VEC3:
        gl.uniform3fv(d.location, c);
        break;
    case gl.FLOAT_VEC4:
        gl.uniform4fv(d.location, c);
        break;
    case gl.BOOL:
        gl.uniform1i(d.location, c);
        break;
    case gl.BOOL_VEC2:
        gl.uniform2iv(d.location, c);
        break;
    case gl.BOOL_VEC3:
        gl.uniform3iv(d.location, c);
        break;
    case gl.BOOL_VEC4:
        gl.uniform4iv(d.location, c);
        break;
    case gl.FLOAT_MAT2:
        gl.uniformMatrix2fv(d.location, !1, c);
        break;
    case gl.FLOAT_MAT3:
        gl.uniformMatrix3fv(d.location, !1, c);
        break;
    case gl.FLOAT_MAT4:
        gl.uniformMatrix4fv(d.location, !1, c);
        break;
    case gl.SAMPLER_2D:
        J3D.ShaderUtil.setTexture(b, d.texid, a, c);
        break;
    case gl.SAMPLER_CUBE:
        J3D.ShaderUtil.setTextureCube(b, d.texid, a, c);
        break;
    default:
        return "WARNING! Unknown uniform type ( 0x" + d.type.toString(16) + " )"
    }
};
J3D.ShaderUtil.parseGLSL = function(a) {
    a = a.split("\n");
    var b = "",
    c = "",
    d = {};
    d.common = "";
    d.includes = [];
    d.vertexIncludes = [];
    d.fragmentIncludes = [];
    for (var e = 0, g = function(a, b) {
        var c = b.indexOf(a);
        if (c > -1) return b.substring(c + a.length + 1);
        return null
    },
    f = 0; f < a.length; f++) if (a[f].indexOf("//#") > -1) if (a[f].indexOf("//#fragment") > -1) e++;
    else if (a[f].indexOf("//#vertex") > -1) e++;
    else {
        d.name = d.name || g("name", a[f]);
        var h = g("include", a[f]);
        if (h) switch (e) {
        case 0:
            d.includes.push(h);
            break;
        case 1:
            d.vertexIncludes.push(h);
            break;
        case 2:
            d.fragmentIncludes.push(h)
        }
    } else switch (h = a[f], h.indexOf("//") > -1 && (h = h.substring(0, h.indexOf("//"))), e) {
    case 0:
        d.common += h + "\n";
        break;
    case 1:
        b += h + "\n";
        break;
    case 2:
        c += h + "\n"
    }
    return new J3D.Shader(d.name || "Shader" + Math.round(Math.random() * 1E3), b, c, d)
};


J3D.BuiltinShaders = function() {
    var a = {},
    b = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Phong);
    b.su.color = J3D.Color.white;
    b.hasColorTexture = !1;
    a.Phong = b;
    b = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Gouraud);
    b.su.color = J3D.Color.white;
    b.hasColorTexture = !1;
    a.Gouraud = b;
    b = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Lightmap);
    b.setup = function(a, b) {
        for (var e in a.uniforms) e == "lightmapTexture" ? J3D.ShaderUtil.setTexture(a, 1, "lightmapTexture", J3D.LightmapAtlas[b.lightmapIndex].tex) : e == "lightmapAtlas" && gl.uniform4fv(a.uniforms.lightmapAtlas.location, b.lightmapTileOffset);
        J3D.Shader.prototype.setup.call(this, a, b)
    };
    a.Lightmap = b;
    a.Toon = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Toon);
    a.Reflective = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Reflective);
    a.Skybox = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Skybox);
    a.Normal2Color = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Normal2Color);
    return {
        shaders: a,
        fetch: function(b) {
            return a[b] ? a[b].clone() : (j3dlog("ERROR. Built-in shader " + b + " doesn't exist"), null)
        }
    }
} ();
if (!window.requestAnimationFrame) window.requestAnimationFrame = function() {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(a) {
        window.setTimeout(a, 1E3 / 60)
    }
} ();