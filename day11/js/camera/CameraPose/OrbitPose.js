import Transform from '../../Transform.js';
const deg2Rad = Math.PI/180;
export default class OrbitPose extends Transform {
    constructor() {
        super();
    }

    updateMatrix() {
        this.transMat.reset()
            .rotateX(this.rotation.x * deg2Rad)
            .rotateY(this.rotation.y * deg2Rad)
            .vtranslate(this.position)
            // 以上是Twc, invert之后变为Tcw
            .invert();
    }
}