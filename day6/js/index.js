import initGl from './utils/initGl.js';
import drawCreator from './drawCreator.js';

const cvs = document.querySelector('#cvs');

const { gl, program } = initGl(cvs);

// Create a cube
//    v6----- v5
//   /|      /|
//  v1------v0|
//  | |     | |
//  | |v7---|-|v4
//  |/      |/
//  v2------v3
// var verticesColors = new Float32Array([
// // Vertex coordinates and color
//     1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v0 White
//     -1.0,  1.0,  1.0,     1.0,  0.0,  1.0,  // v1 Magenta
//     -1.0, -1.0,  1.0,     1.0,  0.0,  0.0,  // v2 Red
//     1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  // v3 Yellow
//     1.0, -1.0, -10.0,     0.0,  1.0,  0.0,  // v4 Green
//     1.0,  1.0, -10.0,     0.0,  1.0,  1.0,  // v5 Cyan
//     -1.0,  1.0, -10.0,     0.0,  0.0,  1.0,  // v6 Blue
//     -1.0, -1.0, -10.0,     0.0,  0.0,  0.0   // v7 Black
// ]);

// create grid
let r = 0;
let grid = [];
for (let i = 1; i < 10; i++) {
    r = 0.08 * i;
    for (let j = 0; j < 100; j++) {
        let theta = Math.PI * 2 / 100 * j;
        grid.push(r * Math.cos(theta));
        grid.push(r * Math.sin(theta));
    }
}

let vertices = new Float32Array(grid);

// Indices of the vertices
// var indices = new Uint8Array([
//     0, 1, 2,   3, 2, 0,    // front
//     0, 3, 4,   0, 4, 5,    // right
//     0, 5, 6,   0, 6, 1,    // up
//     1, 6, 7,   1, 7, 2,    // left
//     7, 4, 3,   7, 3, 2,    // down
//     4, 7, 6,   4, 6, 5     // back
// ]);

gl.enable(gl.DEPTH_TEST);

const SIZE = vertices.BYTES_PER_ELEMENT;

let vertexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.vertexAttribPointer(0, 2, gl.FLOAT, false, SIZE * 2, 0);

gl.enableVertexAttribArray(0);

const draw = drawCreator({
    gl,
    program,
    n: 900
});

draw();