import initGl from './utils/initGl.js';
import drawCreator from './drawCreator.js';

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

const draw = drawCreator({
    gl,
    program,
    initialAngle: 0,
    axisX: 0,
    axisY: 0,
    axisZ: 1,
    speed: 66
});

draw();