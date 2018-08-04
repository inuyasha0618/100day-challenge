// 固定位置相机
export default class FreeCamera {
    constructor(position = {x:0, y:0, z:0}, perspective={near: 0.5, far: 2, fov: 30, ratio = 1.0, upDirection}) {

    }

    updateMatrix() {
        return this;
    }
}