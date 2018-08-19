class Matrix4 {
    constructor(opt_src) {
        let i, s, d;
        if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
            s = opt_src.elements;
            d = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
            d[i] = s[i];
            }
            this.elements = d;
        } else {
            this.elements = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
        }
    }

    /**
     * Set the identity matrix.
     * @return this
     */
    setIdentity() {
        let e = this.elements;
        e[0] = 1;   e[4] = 0;   e[8]  = 0;   e[12] = 0;
        e[1] = 0;   e[5] = 1;   e[9]  = 0;   e[13] = 0;
        e[2] = 0;   e[6] = 0;   e[10] = 1;   e[14] = 0;
        e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
        return this;
    }

    setTranslate(x, y, z) {
        let e = this.elements;
        e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
        e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
        e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
        e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        return this;
      };

    multiply(other) {
        var i, e, a, b, ai0, ai1, ai2, ai3;
  
        // Calculate e = a * b
        e = this.elements;
        a = this.elements;
        b = other.elements;
        
        // If e equals b, copy b to temporary matrix.
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
            b[i] = e[i];
            }
        }
        
        for (i = 0; i < 4; i++) {
            ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
            e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
            e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
            e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
            e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        
        return this;
    }

    transpose() {
        let e, t;

        e = this.elements;

        t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
        t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
        t = e[ 3];  e[ 3] = e[12];  e[12] = t;
        t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
        t = e[ 7];  e[ 7] = e[13];  e[13] = t;
        t = e[11];  e[11] = e[14];  e[14] = t;

        return this;
    }

    /**
     * Calculate the inverse matrix of specified matrix, and set to this.
     * @param other The source matrix
     * @return this
     */

    setInverseOf(other) {
        let i, s, d, inv, det;

        s = other.elements;
        d = this.elements;
        inv = new Float32Array(16);

        inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
                    + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
        inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
                    - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
        inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
                    + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
        inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
                    - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];

        inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
                    - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
        inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
                    + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
        inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
                    - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
        inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
                    + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];

        inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
                    + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
        inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
                    - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
        inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
                    + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
        inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
                    - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];

        inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
                    - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
        inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
                    + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
        inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
                    - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
        inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
                    + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];

        det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
        if (det === 0) {
            return this;
        }

        det = 1 / det;
        for (i = 0; i < 16; i++) {
            d[i] = inv[i] * det;
        }

        return this;
    }

    invert() {
        return this.setInverseOf(this);
    }

    setOrtho(left, right, bottom, top, near, far) {
        let e, rw, rh, rd;

        if (left === right || bottom === top || near === far) {
            throw 'null frustum';
        }

        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);

        e = this.elements;

        e[0]  = 2 * rw;
        e[1]  = 0;
        e[2]  = 0;
        e[3]  = 0;

        e[4]  = 0;
        e[5]  = 2 * rh;
        e[6]  = 0;
        e[7]  = 0;

        e[8]  = 0;
        e[9]  = 0;
        e[10] = -2 * rd;
        e[11] = 0;

        e[12] = -(right + left) * rw;
        e[13] = -(top + bottom) * rh;
        e[14] = -(far + near) * rd;
        e[15] = 1;

        return this;
    }

    setPerspective(fovy, aspect, near, far) {
        let e, rd, s, ct;

        if (near === far || aspect === 0) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }

        fovy = Math.PI * fovy / 180 / 2;
        s = Math.sin(fovy);
        if (s === 0) {
            throw 'null frustum';
        }

        rd = 1 / (far - near);
        ct = Math.cos(fovy) / s;

        e = this.elements;

        e[0]  = ct / aspect;
        e[1]  = 0;
        e[2]  = 0;
        e[3]  = 0;

        e[4]  = 0;
        e[5]  = ct;
        e[6]  = 0;
        e[7]  = 0;

        e[8]  = 0;
        e[9]  = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;

        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;

        return this;
    }

    setRotate(angle, x, y, z) {
        let e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

        angle = Math.PI * angle / 180;
        e = this.elements;

        s = Math.sin(angle);
        c = Math.cos(angle);

        if (0 !== x && 0 === y && 0 === z) {
            // Rotation around X axis
            if (x < 0) {
            s = -s;
            }
            e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
            e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
            e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
            e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        } else if (0 === x && 0 !== y && 0 === z) {
            // Rotation around Y axis
            if (y < 0) {
            s = -s;
            }
            e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
            e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
            e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
            e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        } else if (0 === x && 0 === y && 0 !== z) {
            // Rotation around Z axis
            if (z < 0) {
            s = -s;
            }
            e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
            e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
            e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
            e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        } else {
            // Rotation around another axis
            len = Math.sqrt(x*x + y*y + z*z);
            if (len !== 1) {
            rlen = 1 / len;
            x *= rlen;
            y *= rlen;
            z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            e[ 0] = x*x*nc +  c;
            e[ 1] = xy *nc + zs;
            e[ 2] = zx *nc - ys;
            e[ 3] = 0;

            e[ 4] = xy *nc - zs;
            e[ 5] = y*y*nc +  c;
            e[ 6] = yz *nc + xs;
            e[ 7] = 0;

            e[ 8] = zx *nc + ys;
            e[ 9] = yz *nc - xs;
            e[10] = z*z*nc +  c;
            e[11] = 0;

            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }

        return this;
    }

    setScale(x, y, z) {
        let e = this.elements;
        e[0] = x;   e[4] = 0;   e[8]  = 0;   e[12] = 0;
        e[1] = 0;   e[5] = y;   e[9]  = 0;   e[13] = 0;
        e[2] = 0;   e[6] = 0;   e[10] = z;   e[14] = 0;
        e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
        return this;
    }
  
    translate(x, y, z) {
        let e = this.elements;
        e[12] += e[0] * x + e[4] * y + e[8]  * z;
        e[13] += e[1] * x + e[5] * y + e[9]  * z;
        e[14] += e[2] * x + e[6] * y + e[10] * z;
        e[15] += e[3] * x + e[7] * y + e[11] * z;
        return this;
    }

    setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        let e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

        fx = centerX - eyeX;
        fy = centerY - eyeY;
        fz = centerZ - eyeZ;

        // Normalize f.
        rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;

        // Calculate cross product of f and up.
        sx = fy * upZ - fz * upY;
        sy = fz * upX - fx * upZ;
        sz = fx * upY - fy * upX;

        // Normalize s.
        rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;

        // Calculate cross product of s and f.
        ux = sy * fz - sz * fy;
        uy = sz * fx - sx * fz;
        uz = sx * fy - sy * fx;

        // Set to this.
        e = this.elements;
        e[0] = sx;
        e[1] = ux;
        e[2] = -fx;
        e[3] = 0;

        e[4] = sy;
        e[5] = uy;
        e[6] = -fy;
        e[7] = 0;

        e[8] = sz;
        e[9] = uz;
        e[10] = -fz;
        e[11] = 0;

        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;

        // Translate.
        return this.translate(-eyeX, -eyeY, -eyeZ);
    }
}

// 数学部分结束

const initGl = (canvas, vertexShaderSrc, fragShaderSrc) => {
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        document.write('Please change to a browser which supports WebGl 2.0~');
        return;
    }
    // set background
    gl.clearColor(0, 0, 0, 0.9);
    
    const vertexShader = gl.createShader(gl.VERTEX_SHADER),
        fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vertexShader, vertexShaderSrc.trim());
    gl.shaderSource(fragmentShader, fragShaderSrc.trim());
    
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(vertexShader));
        return;
    }
    
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fragmentShader));
        return;
    }
    
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
    }
    
    gl.useProgram(program);

    return {gl, program};
}

const mul = (...mats) => {
    let initialMat = new Matrix4().setIdentity();
    return mats.reduce((accu, current) => {
        return accu.multiply(current);
    }, initialMat);
}

const drawCreator = ({
    gl,
    program,
    n=1,
}) => {
    const viewMat = new Matrix4().setLookAt(3, 10, 100, 3, 10, 0, 0, 1, 0);
    const perspectiveMat = new Matrix4().setPerspective(60, 1, 1.0, 1000.0);

    const perspectiveIndex = gl.getUniformLocation(program, 'u_perspective');
    const viewIndex = gl.getUniformLocation(program, 'u_view');
    const uTimeIndex = gl.getUniformLocation(program, 'u_time');
    gl.uniformMatrix4fv(perspectiveIndex, false, perspectiveMat.elements);
    gl.uniformMatrix4fv(viewIndex, false, viewMat.elements);

    const draw = () => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniform1f(uTimeIndex, performance.now());
        gl.drawElements(gl.TRIANGLE_STRIP, n, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(draw);
    };

    return draw;
};

const cvs = document.querySelector('#cvs');
console.log('haha');

const vertexShaderSrc = `#version 300 es
uniform mat4 mvp;
uniform float u_start;
uniform float u_time;
uniform mat4 u_perspective;
uniform mat4 u_view;
const float radius = 15.0;
layout (location=0) in vec3 latlon;
layout (location=1) in vec3 color;
out vec3 vColor;

float r(float n1, float n2, float n3, float m, float a, float b, float fi) {
    float t1 = cos(m * fi / 4.0) / a;
    t1 = pow(abs(t1), n2);
    float t2 = sin(m * fi / 4.0) / b;
    t2 = pow(abs(t2), n3);
    float t3 = t1 + t2;
    float r = pow(t3, -1.0 / n1);
    return r;
}

mat4 rotX(float angle) {
    const float pi = 3.141592653589793;
    angle = angle / 180.0 * pi;
    return mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, cos(angle), sin(angle), 0.0,
        0.0, -sin(angle), cos(angle), 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotY(float angle) {
    const float pi = 3.141592653589793;
    angle = angle / 180.0 * pi;
    return mat4(
        cos(angle), 0.0, -sin(angle), 0.0,
        0.0, 1.0, 0.0, 0.0,
        sin(angle), 0.0, cos(angle), 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotZ(float angle) {
    const float pi = 3.141592653589793;
    angle = angle / 180.0 * pi;
    return mat4(
        cos(angle), sin(angle), 0.0, 0.0,     
        -sin(angle), cos(angle), 0.0, 0.0,     
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

float interpolate(float startTime, float currTime, float cycle, float beginValue, float targetValue) {
    float timeCost = (currTime - startTime) / 1000.0;
    float cycleIndex = floor(timeCost / cycle);
    float t = timeCost / cycle - cycleIndex;
    if (cycleIndex / 2.0 - floor(cycleIndex / 2.0) == 0.0) {
        return beginValue + t * (targetValue - beginValue);
    } else {
        return targetValue + t * (beginValue - targetValue);
    }
}

void main() {
    float lat = latlon.x;
    float lon = latlon.y;
    float cycle = 1.0;
    float r1n1 = interpolate(u_start, u_time, cycle, 0.2, 1.0);
    float r1n2 = interpolate(u_start, u_time, cycle, 1.7, 1.0);
    float r1n3 = interpolate(u_start, u_time, cycle, 1.7, 1.0);
    float r1m = interpolate(u_start, u_time, cycle, 7.0, 6.0);
    float r1a = interpolate(u_start, u_time, cycle, 1.0, 1.0);
    float r1b = interpolate(u_start, u_time, cycle, 1.0, 1.0);

    float r2n1 = interpolate(u_start, u_time, cycle, 0.2, 1.0);
    float r2n2 = interpolate(u_start, u_time, cycle, 1.7, 1.0);
    float r2n3 = interpolate(u_start, u_time, cycle, 1.7, 1.0);
    float r2m = interpolate(u_start, u_time, cycle, 7.0, 3.0);
    float r2a = interpolate(u_start, u_time, cycle, 1.0, 1.0);
    float r2b = interpolate(u_start, u_time, cycle, 1.0, 1.0);

    float r2 = r(r2n1, r2n2, r2n3, r2m, r2a, r2b, lat);
    float r1 = r(r1n1, r1n2, r1n3, r1m, r1a, r1b, lon);

    float x =  radius * r1 * cos(lon) * r2 * cos(lat);
    float y =  radius * r2 * sin(lat);
    float z =  radius * r1 * sin(lon) * r2 * cos(lat);

    float angleX = (u_time - u_start) / 1000.0 * 100.0;
    float angleY = (u_time - u_start) / 1000.0 * 150.0;
    float angleZ = (u_time - u_start) / 1000.0 * 70.0;

    gl_Position = u_perspective * u_view * rotY(angleY) * rotX(angleX) * rotZ(angleZ) * vec4(x, y, z, 1);
    // vColor = color;
    float offset = interpolate(u_start, u_time, cycle, 0.0, 1.0);
    if (latlon.z == 1.0) {
        vColor = vec3(offset, offset, offset);
    } else {
        vColor = vec3(1.0 - offset, 1.0 - offset, 1.0 - offset);
    }
}`;

const fragShaderSrc = `
#version 300 es
precision highp float;
in vec3 vColor;
out vec4 fragColor;
void main() {
    fragColor = vec4(vColor, 1.0);
}
`
const { gl, program } = initGl(cvs, vertexShaderSrc, fragShaderSrc);



const vertices = [];
const colors = [];
const index = [];

const total = 50;

for (let i = 0; i <= total; i++) {
    let lat =  -Math.PI / 2 + Math.PI / total * i;
    for (let j = 0; j < total; j++) {
        let lon = -Math.PI + Math.PI * 2 / total * j;
        vertices.push(lat, lon, i % 2 === 0 ? 0 : 1);
        colors.push(1.0, 0.4, 0.4);
    }
}

for (let row = 0; row < total; row++) {
    for (let col = 0; col < total; col++) {
        index.push(col + row * total, col + ( row + 1 ) * total);
        if (col === total - 1) {
            index.push(row * total, ( row + 1 ) * total);
        }
    }
}


gl.enable(gl.DEPTH_TEST);


let vertexBuffer = gl.createBuffer();
let colorBuffer = gl.createBuffer();
let indexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);

const uStartIndex = gl.getUniformLocation(program, 'u_start');
gl.uniform1f(uStartIndex, performance.now());

const draw = drawCreator({
    gl,
    program,
    initialAngle: 0,
    speedEarth: 50,
    n: index.length,
});

draw();