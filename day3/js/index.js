import initGl from './utils/initGl.js';
import { cos, sin, pi } from './utils/math.js';

const getRotationMatrix = angle => {

    angle = angle / 180 * pi;

    return new Float32Array([
      cos(angle), sin(angle), 0, 0,
      -sin(angle), cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
}

let time = +new Date;
const speed = 36;
let angle = 0;

const draw = () => {

    let now = +new Date;
    let nowAngle = angle + ((now - time) / 1000 * speed) % 360;

    let formMatrix = getRotationMatrix(nowAngle);

    gl.uniformMatrix4fv(mat, false, formMatrix);

    const cos = Math.cos,
        sin = Math.sin,
        pi = Math.PI,
        fi = pi / 2.01;

    let tcwMat = new Float32Array([
    cos(fi), 0.0, sin(fi), 0.0,
    0.0, 1.0, 0.0, 0.0,
    -sin(fi), 0.0, cos(fi), 0.0,
    0.25*(sin(fi) - cos(fi)), -0.25, -0.25*(sin(fi) + cos(fi)), 1
    ])
    
    gl.uniformMatrix4fv(tcw, false, tcwMat);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    angle = nowAngle;
    time = now;
    requestAnimationFrame(draw);
}


const cvs = document.querySelector('#cvs');

const { gl, program } = initGl(cvs);

let posAndColorArray = new Float32Array([
    -0.5, -0.5, 1.0, 0, 0,
    0.5, -0.5, 0.0, 1.0, 0.0,
    0, 0.5, 0.0, 0.0, 1.0 
])

const SIZE = posAndColorArray.BYTES_PER_ELEMENT;

let posBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER, posAndColorArray, gl.STATIC_DRAW);

gl.vertexAttribPointer(0, 2, gl.FLOAT, false, SIZE * 5, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, SIZE * 5, SIZE * 2);

gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);


const mat = gl.getUniformLocation(program, 'matrix');
const tcw = gl.getUniformLocation(program, 'Tcw');

// gl.uniformMatrix4fv(mat, false, formMatrix);

// gl.clear(gl.COLOR_BUFFER_BIT);
// gl.drawArrays(gl.TRIANGLES, 0, 3);
draw();