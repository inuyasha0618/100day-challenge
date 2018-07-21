import initGl from './utils/initGl.js';
import drawCreator from './drawCreator.js';

const cvs = document.querySelector('#cvs');

const { gl, program } = initGl(cvs);

var verticesColors = new Float32Array([
    // Three triangles on the right side
    0.75,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
    0.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
    1.25, -1.0,  -4.0,  1.0,  0.4,  0.4, 

    0.75,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
    0.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
    1.25, -1.0,  -2.0,  1.0,  0.4,  0.4, 

    0.75,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
    0.25, -1.0,   0.0,  0.4,  0.4,  1.0,
    1.25, -1.0,   0.0,  1.0,  0.4,  0.4, 

    // Three triangles on the left side
   -0.75,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
   -1.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
   -0.25, -1.0,  -4.0,  1.0,  0.4,  0.4, 

   -0.75,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
   -1.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
   -0.25, -1.0,  -2.0,  1.0,  0.4,  0.4, 

   -0.75,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
   -1.25, -1.0,   0.0,  0.4,  0.4,  1.0,
   -0.25, -1.0,   0.0,  1.0,  0.4,  0.4, 
  ]);

const SIZE = verticesColors.BYTES_PER_ELEMENT;

let posBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

gl.vertexAttribPointer(0, 3, gl.FLOAT, false, SIZE * 6, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);

gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);

const draw = drawCreator({
    gl,
    program,
    initialAngle: 0,
    axisX: 0,
    axisY: 0,
    axisZ: 1,
    speed: 66,
    n: 18
});

draw();