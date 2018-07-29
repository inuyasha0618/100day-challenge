import getGlInstance from './getGlInstance.js';
import { getProgramObj, getShaderSrc } from './shaderUtils.js';
import RenderLoop from './RenderLoop.js';
import Program from './Program.js';
import Mesh from './Mesh.js';

class CustomProgram extends Program {
    constructor(gl) {
        let vShaderSrc = getShaderSrc('vertex-shader');
        let fShaderSrc = getShaderSrc('fragment-shader');
        super(gl, vShaderSrc, fShaderSrc);
        this.uniformLocation.uAngle = gl.getUniformLocation(this.program, 'u_angle');
        this.uniformLocation.uPointSize = gl.getUniformLocation(this.program, 'u_pointsize');
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

let mesh = new Mesh({
    gl,
    aryVert: [0.0, 0.0, 0.0,   0.1, 0.1, 0.0,   0.1, -0.1, 0.0,   -0.1, 0.1, 0.0,   -0.1, -0.1, 0.0,]
});

let mesh2 = new Mesh({
    gl,
    aryVert: [0.0, 0.0, 0.0,   0.1, 0.1, 0.0,   0.1, -0.1, 0.0,   -0.1, 0.1, 0.0,   -0.1, -0.1, 0.0,].map(val => val + 0.2)
});

const drawPoint = ((rotSpeed, shrinkSpeed = 10, pointSize=10.0, angle=0) => dt => {
    let incAngle = rotSpeed * Math.PI / 180.0 * dt;
    angle += incAngle;
    pointSize += shrinkSpeed * dt;
    let size = 20 + 10 * Math.sin(pointSize);
    gl.clear();
    program.activate().set(angle, size).renderMesh(mesh).renderMesh(mesh2);

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
