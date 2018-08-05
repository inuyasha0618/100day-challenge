import Mesh from './Mesh.js';
const vertices = [   // Vertex coordinates
    // -1.0, 1.0, 0.0,  -1.0, -1.0, 0.0,  1.0, -1.0, 0.0,   1.0, 1.0, 0.0,  // v0-v1-v2-v3 front
];


const indices = [       // Indices of the vertices
    // 0, 1, 2,   0, 2, 3,    // front
];

const uvs = [
    // 0.0, 0.0,  0.0, 1.0,  1.0, 1.0,  1.0, 0.0
];

let p = 0;
for (let i = 0; i < 30; i++) {
    let size = 1.0 + 4 * Math.random();
    let dx = 6 + Math.random() * 12;
    // let dx = 60;
    let dy = -8 + Math.random() * 16;
    let theta = Math.random() * Math.PI * 2;
    let half = size / 2;
    let sin = Math.sin(theta);
    let cos = Math.cos(theta);

    vertices.push(
        -cos * (half - dx), half + dy, sin * (half - dx),
        -cos * (half - dx), -half + dy, sin * (half - dx),
        cos * (half + dx), -half + dy, -sin * (half + dx),
        cos * (half + dx), half + dy, -sin * (half + dx)
    );

    uvs.push(0.0, 0.0,  0.0, 1.0,  1.0, 1.0,  1.0, 0.0)

    indices.push(p, p + 1, p + 2,   p, p + 2, p + 3);
    p += 4;
}


 const createQuadMesh = gl => new Mesh({
  gl,
  aryVert: vertices,
  aryInd: indices,
  aryUV: uvs,
  drawMode: gl.TRIANGLES,
  enableBlending: true,
 });

 export default createQuadMesh;