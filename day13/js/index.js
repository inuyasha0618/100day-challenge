import getGlInstance from './getGlInstance.js';
import { getProgramObj, getShaderSrc } from './shaderUtils.js';
import RenderLoop from './RenderLoop.js';
import Program from './Program.js';
import Mesh from './Mesh.js';
import Modal from './Modal.js';

class CustomProgram extends Program {
    constructor(gl) {
        let vShaderSrc = getShaderSrc('vertex-shader');
        let fShaderSrc = getShaderSrc('fragment-shader');
        super(gl, vShaderSrc, fShaderSrc);
        this.uniformLocation.uAngle = gl.getUniformLocation(this.program, 'u_angle');
        this.uniformLocation.uPointSize = gl.getUniformLocation(this.program, 'u_pointsize');
        this.uniformLocation.uSampler = gl.getUniformLocation(this.program, 'u_Sampler');
        gl.uniform1f(this.uniformLocation.uAngle, 0);
        gl.uniform1f(this.uniformLocation.uPointSize, 20);
        gl.useProgram(null);
    }

    set(angle, pointSize) {
        gl.uniform1f(this.uniformLocation.uAngle, angle);
        gl.uniform1f(this.uniformLocation.uPointSize, pointSize);
        return this;
    }
}

const btn = document.getElementById('btn');
const fps = document.getElementById('fps');

let gl = getGlInstance('cvs-id').setSize(600, 600).clearColor(0.0, 0.0, 0.0, 1.0).clear();
let program = new CustomProgram(gl);
const img = new Image();
img.onload = function() {
    gl.loadTexture(img, false);
    gl.uniform1i(program.uniformLocation.uSampler, 0);
}
img.src = './js/sky.jpg';

let vertices = [   // Vertex coordinates
    1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,  // v0-v3-v4-v5 right
    1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
   -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,  // v1-v6-v7-v2 left
   -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,  // v7-v4-v3-v2 down
    1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0   // v4-v7-v6-v5 back
 ].map(val => val * 0.1);

 let colors = [     // Colors
   0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  // v0-v1-v2-v3 front(blue)
   0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  // v0-v3-v4-v5 right(green)
   1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
   1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
   1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
   0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0   // v4-v7-v6-v5 back
 ];

 let indices = [       // Indices of the vertices
    0, 1, 2,   0, 2, 3,    // front
    4, 5, 6,   4, 6, 7,    // right
    8, 9,10,   8,10,11,    // up
   12,13,14,  12,14,15,    // left
   16,17,18,  16,18,19,    // down
   20,21,22,  20,22,23     // back
 ];

let uvs = [
    1.0, 0.0,  0.0, 0.0,  0.0, 1.0,  1.0, 1.0,
    1.0, 0.0,  0.0, 0.0,  0.0, 1.0,  1.0, 1.0,
    1.0, 0.0,  0.0, 0.0,  0.0, 1.0,  1.0, 1.0,
    1.0, 0.0,  0.0, 0.0,  0.0, 1.0,  1.0, 1.0,
    1.0, 0.0,  0.0, 0.0,  0.0, 1.0,  1.0, 1.0,
    1.0, 0.0,  0.0, 0.0,  0.0, 1.0,  1.0, 1.0,
];

let mesh = new Mesh({
    gl,
    aryVert: vertices,
    aryInd: indices,
    aryColor: colors,
    aryUV: uvs,
});

let modal = new Modal(mesh).setPosition(0.0, 0.0, -0.0).setRotation(30, 30, 30);

const drawPoint = ((rotSpeed, shrinkSpeed = 10, pointSize=10.0, angle=0) => dt => {
    gl.clear();
    // program.activate().renderModal(modal);

    let p = modal.transform.position,				//Just an pointer to transform position, make code smaller 
            angle = Math.atan2(p.y,p.x)  + (1*dt),		//Calc the current angle plus 1 degree per second rotation
            radius = Math.sqrt(p.x * p.x + p.y * p.y),	//Calc the distance from origin.
            scale = Math.max(0.2,  Math.abs(Math.sin(angle)) * 1.2  );   //Just messing with numbers and seeing what happens :)

        //-- Code Style One : Traditional -- 
        //gModal.setScale(scale,scale,1)
        //gModal.setPosition( radius * Math.cos(angle), radius * Math.sin(angle), 0 );
        //gModal.transform.rotation.z += 15 * dt;
        //gModal.transform.rotation.x += 30 * dt;
        //gModal.transform.rotation.y += 60 * dt;
        //gShader.activate().renderModal(gModal.preRender());

        //-- Code Style Two : Chaining --
        program.activate().renderModal(
            modal	
            // .setScale( scale, scale, scale)
            // .setPosition( radius * Math.cos(angle), radius * Math.sin(angle), 0 )
            .addRotation( 30 * dt, 60 * dt, 15 * dt )
        );

    fps.innerHTML = RLoop.currentFps;
})(90);

const RLoop = new RenderLoop(drawPoint).start();

btn.addEventListener('click', function() {
    if (RLoop.isActive) {
        RLoop.stop();
        btn.innerHTML = 'start';
        return;
    }

    btn.innerHTML = 'stop';
    RLoop.start();
})
