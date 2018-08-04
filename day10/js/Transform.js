import { Vector3, Matrix4 } from './Math.js';

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

    getTransMat() {return this.transMat;}

    reset() {
        this.position.set(0, 0, 0);
        this.scale.set(1, 1, 1);
        this.rotation.set(0, 0, 0);
        this.transMat.reset();
    }
}

Transform.deg2Rad = Math.PI/180;