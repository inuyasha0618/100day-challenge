// 固定位置相机
import { Matrix4 } from '../Math.js';
import Transform from '../Transform.js';
export default class FixedCamera {
    constructor(
        {
            eyeX = 0,
            eyeY = 50,
            eyeZ = -15,
            centerX = 0,
            centerY = 0,
            centerZ = -60,
            upX = 0,
            upY = 1,
            upZ = 0,
            fovy = 60,
            aspect = 1.0,
            near = 1.0,
            far = 100.0,
        } = {}) {
        // 相当于相机的内参
        this.perspectiveMat = new Matrix4().setPerspective(fovy, aspect, near, far);
        console.log(fovy, aspect, near, far);
        console.log(this.perspectiveMat);
        // 相机的姿态矩阵， Tcw
        // 由于相机的位姿是会随着操作变化的，故这里需要Transform来管理底层的矩阵操作
        // this.pos = new Transform();
        this.posMat = new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
        // 相机的 perspectiveMat * Tcw
        this.vpMat = new Matrix4();
    }

    updateMatrix() {
        Matrix4.multiply(this.vpMat.reset(), this.perspectiveMat, this.posMat);
        return this;
    }

    getVpMat() {
        this.updateMatrix();
        return this.vpMat;
    }

    getCameraMat() {
        return this.posMat;
    }

    getPerspectiveMat() {
        return this.perspectiveMat;
    }
}