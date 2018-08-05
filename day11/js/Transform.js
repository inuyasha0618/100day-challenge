import { Vector3, Matrix4 } from './Math.js';
// Transform 作为一个基类吧， 相机的transform继承于它
export default class Transform {
    constructor() {
        this.position = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
        this.rotation = new Vector3(0, 0, 0);
        this.transMat = new Matrix4();
    }

    updateMatrix() {
        this.transMat.reset()
            .vtranslate(this.position)
            .rotateX(this.rotation.x * Transform.deg2Rad)
            .rotateY(this.rotation.y * Transform.deg2Rad)
            .rotateZ(this.rotation.z * Transform.deg2Rad)
            .vscale(this.scale);

    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
        return this;
    }

    setScale(x, y, z) {
        this.scale.set(x, y, z);
        return this;
    }
    
    setPosition(x, y, z) {
        this.position.set(x, y, z);
        return this;
    }

    setRotation(x, y, z) {
        this.rotation.set(x, y, z);
        return this;
    }

    addScale(dx, dy, dz) {
        this.scale.x += dx;
        this.scale.y += dy;
        this.scale.z += dz;
        return this;
    }

    addPosition(dx, dy, dz) {
        this.position.x += dx;
        this.position.y += dy;
        this.position.z += dz;
        return this;
    }

    addRotation(dx, dy, dz) {
        this.rotation.x += dx;
        this.rotation.y += dy;
        this.rotation.z += dz;
        return this;
    }

    getTransMat() {return this.transMat;}

    reset() {
        this.position.set(0, 0, 0);
        this.scale.set(1, 1, 1);
        this.rotation.set(0, 0, 0);
        this.transMat.reset();
    }
}

Transform.deg2Rad = Math.PI/180;