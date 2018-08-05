import getGlInstance from './getGlInstance.js';
import RenderLoop from './RenderLoop.js';
import CubeProgram from './program/CubeProgram.js';
import Mesh from './Mesh.js';
import Modal from './Modal.js';
import FixedCamera from './camera/FixedCamera.js';
import FreeCamera from './camera/FreeCamera.js';
import { vertices as cubeVertices, colors as cubeColors, indices as cubeIndices } from './vertexData/cubeData.js';
import { vertices as gridVertices, colors as gridColors } from './vertexData/gridData.js';

const btn = document.getElementById('btn');
const fps = document.getElementById('fps');

let gl = getGlInstance('cvs-id').setSize(600, 600).clearColor(0.0, 0.0, 0.0, 1.0).clear();
let program = new CubeProgram(gl);

const cubeMesh = new Mesh({
    gl,
    aryVert: cubeVertices,
    aryInd: cubeIndices,
    aryColor: cubeColors,
});

const gridMesh = new Mesh({
    gl,
    aryVert: gridVertices,
    aryColor: gridColors,
    drawMode: gl.LINES,
})

const camera = new FixedCamera({
    eyeX: 8,
    eyeY: 20,
    eyeZ: 20.0,
    centerX: 0,
    centerY: 3,
    centerZ: -10,
    upX: 0,
    upY: 1,
    upZ: 0,
    fovy: 60,
    aspect: 1.0,
    near: 1.0,
    far: 100.0,
});

const freeCamera = new FreeCamera({
    posX: 3,
    posY: 10,
    posZ: 50.0,
    fovy: 60,
    aspect: 1.0,
    near: 1.0,
    far: 100.0,
    gl,
})
const cubeModal = new Modal(cubeMesh)
.setPosition(5.0, 12.0, -10.0)
// .setRotation(30, 30, 30);

const gridModal = new Modal(gridMesh);

const drawPoint = ((rotSpeed, shrinkSpeed = 10, pointSize=10.0, angle=0) => dt => {
    gl.clear();
    // program.activate().renderModal(modal);

    let p = cubeModal.transform.position,				//Just an pointer to transform position, make code smaller 
            angle = Math.atan2(p.y,p.x)  + (1*dt),		//Calc the current angle plus 1 degree per second rotation
            radius = Math.sqrt(p.x * p.x + p.y * p.y),	//Calc the distance from origin.
            scale = Math.max(0.2,  Math.abs(Math.sin(angle)) * 1.2  );   //Just messing with numbers and seeing what happens :)

        // Camera放在这里在render期间保证只更新一次, 不然在每个modal里分别更新会导致camera不一致的情况, 而且如果有多个modal的情况下
        // 每次都向gpu更新camera的位姿就代价比较大了

        program.activate()
        // .setPerspectiveMat(camera.getPerspectiveMat())
        // .setCameraMat(camera.getCameraMat())
        // .setVPMatrix(camera.getVpMat())
        .setVPMatrix(freeCamera.getVpMat())
        .renderModal(
            cubeModal	
            .setScale( scale, scale, scale)
                    // .setPosition( radius * Math.cos(angle), radius * Math.sin(angle), -1.5 )
                    .addRotation( 30 * dt, 60 * dt, 15 * dt )
        )
        .renderModal(gridModal);

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
