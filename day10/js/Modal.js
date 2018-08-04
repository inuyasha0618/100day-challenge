import Transform from './Transform.js';
export default class Modal {
    constructor(meshData) {
        this.mesh = meshData;
        this.transform = new Transform();
    }

    setScale(x, y, z) {
        this.transform.scale.set(x, y, z);
        return this;
    }
    
    setPosition(x, y, z) {
        this.transform.position.set(x, y, z);
        return this;
    }

    setRotation(x, y, z) {
        this.transform.rotation.set(x, y, z);
        return this;
    }

    addScale(dx, dy, dz) {
        this.transform.scale.x += dx;
        this.transform.scale.y += dy;
        this.transform.scale.z += dz;
        return this;
    }

    addPosition(dx, dy, dz) {
        this.transform.position.x += dx;
        this.transform.position.y += dy;
        this.transform.position.z += dz;
        return this;
    }

    addRotation(dx, dy, dz) {
        this.transform.rotation.x += dx;
        this.transform.rotation.y += dy;
        this.transform.rotation.z += dz;
        return this;
    }

    preRender() {
        this.transform.updateMatrix();
        return this;
    }
}