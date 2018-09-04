import Vec3 from './math/vec.js';
class Ray {
    constructor(origin, direction) {
        this.origin = new Vec3(origin.elems[0], origin.elems[1], origin.elems[2]);
        this.direction = new Vec3(direction.elems[0], direction.elems[1], direction.elems[2]);
    }
    pointAtParam(t) {
        return Vec3.add(this.origin, Vec3.multiply(this.direction, t));
    }
}
export default Ray;
