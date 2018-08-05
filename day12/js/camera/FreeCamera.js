import { Matrix4 } from '../Math.js';
import OrbitPose from './CameraPose/OrbitPose.js';
// 自由相机
export default class FreeCamera {
    constructor({
        posX = 0,
        posY = 0,
        posZ = 0,
        fovy = 60,
        aspect = 1.0,
        near = 1.0,
        far = 100.0,
        cameraMode = 'ORBIT',
        gl,
    } = {}) {
        this.perspectiveMat = new Matrix4().setPerspective(fovy, aspect, near, far);

        // 由于相机的位姿是会随着操作变化的，故这里需要Transform来管理底层的矩阵操作
        // TODO: 加入自由模式判断
        this.pos = new OrbitPose().setPosition(posX, posY, posZ);
        this.vpMat = new Matrix4();
        this.canvas = gl.canvas;
        const { left, top } = this.canvas.getBoundingClientRect()
        this.canvasLeft = left;
        this.canvasTop = top;
        this.prevX = 0;
        this.prevY = 0;

        this.handleMousedown = this.handleMousedown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseWheel = this.handleMouseWheel.bind(this);

        this.registerMouseEvent();
    }

    updateMatrix() {
        this.pos.updateMatrix();
        Matrix4.multiply(this.vpMat.reset(), this.perspectiveMat, this.pos.transMat);
        return this;
    }

    getVpMat() {
        this.updateMatrix();
        return this.vpMat;
    }

    handleMouseMove(e) {
        const currentX = e.pageX - this.canvasLeft;
        const currentY = e.pageY - this.canvasTop;
        const dx = currentX - this.prevX;
        const dy = currentY - this.prevY;
        this.prevX = currentX;
        this.prevY = currentY;

        if (e.shiftKey) {
            this.pos.position.y += 0.5*dy;
        } else {
            this.pos.addRotation(-0.1*dy, -0.1*dx, 0);
        }
    }

    handleMouseUp(e) {
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp)
    }

    handleMousedown(e) {
        this.prevX = e.pageX - this.canvasLeft;
        this.prevY = e.pageY - this.canvasTop;
        this.canvas.addEventListener('mousemove',  this.handleMouseMove);
        this.canvas.addEventListener('mouseup',  this.handleMouseUp);
    }
    
    handleMouseWheel(e) {
        let delta = Math.max(-1, Math.min(1, e.wheelDelta || (-e.detail)));
        this.pos.position.z += -delta;
        console.log(`delta ${e.wheelData}`);
    }

    registerMouseEvent() {
        this.canvas.addEventListener('mousedown',  this.handleMousedown);
        this.canvas.addEventListener('mousewheel',  this.handleMouseWheel);
    }
}