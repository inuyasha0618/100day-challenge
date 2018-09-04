// class Vec3 extends Float32Array {
//     constructor(x1: number, x2: number, x3: number) {
//        new super([x1, x2, x3]);
//     }
// }

// class Vec3 extends Float32Array{
//     constructor(x1: number, x2: number, x3: number){
//         super(3);
//         this[0] = x1;
//         this[1] = x2;
//         this[2] = x3;
//     }
// }

class Vec3 {
    elems: Float32Array;
    constructor(x1: number, x2: number, x3: number){
        this.elems = new Float32Array(3);
        this.elems[0] = x1;
        this.elems[1] = x2;
        this.elems[2] = x3;
    }

    normalize(): Vec3 {
        var mag = Math.sqrt( this.elems[0]*this.elems[0] + this.elems[1]*this.elems[1] + this.elems[2]*this.elems[2] );
        this.elems[0] /= mag;
        this.elems[1] /= mag;
        this.elems[2] /= mag;
        return this;
    }

    copy(): Vec3 {
        return new Vec3(this.elems[0], this.elems[1], this.elems[2]);
    }

    scale(v: number): Vec3 {
        this.elems[0] *= v;
        this.elems[1] *= v;
        this.elems[2] *= v;
        return this;
    }

    inverse(): Vec3 {
        this.elems[0] *= -1.0;
        this.elems[1] *= -1.0;
        this.elems[2] *= -1.0;
        return this;
    }

    get r() { return this.elems[0]; } set r(val: number) { this.elems[0] = val; }

    get g() { return this.elems[1]; } set g(val: number) { this.elems[1] = val; }

    get b() { return this.elems[2]; } set b(val: number) { this.elems[2] = val; }

    get x() { return this.elems[0]; } set x(val: number) { this.elems[0] = val; }

    get y() { return this.elems[1]; } set y(val: number) { this.elems[1] = val; }

    get z() { return this.elems[2]; } set z(val: number) { this.elems[2] = val; }

    get length() {
        return Math.sqrt( this.elems[0]*this.elems[0] + this.elems[1]*this.elems[1] + this.elems[2]*this.elems[2] );
    }

    static add(...vecs: Array<Vec3>): Vec3 {
        const reducer = (acc, curr) => {
            return new Vec3(acc.elems[0] + curr.elems[0], acc.elems[1] + curr.elems[1], acc.elems[2] + curr.elems[2]);
        }
        return vecs.reduce(reducer, new Vec3(0.0, 0.0, 0.0));
    }

    static subtract(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(v1.elems[0] - v2.elems[0], v1.elems[1] - v2.elems[1], v1.elems[2] - v2.elems[2]);
    }

    // static multiply(v1: Vec3, v2: Vec3): Vec3 {
    //     return new Vec3(v1.elems[0] * v2.elems[0], v1.elems[1] * v2.elems[1], v1.elems[2] * v2.elems[2]);
    // }

    static multiply(v: Vec3, num: number): Vec3 {
        return new Vec3(v.elems[0] * num, v.elems[1] * num, v.elems[2] * num);
    }

    static divide(v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(v1.elems[0] / v2.elems[0], v1.elems[1] / v2.elems[1], v1.elems[2] / v2.elems[2]);
    }

    static dot(v1: Vec3, v2: Vec3): number {
        return v1.elems[0] * v2.elems[0] + v1.elems[1] * v2.elems[1] + v1.elems[2] * v2.elems[2];
    }

    static cross(v1: Vec3, v2: Vec3): Vec3 {
        const x1: number = v1.elems[0];
        const y1: number = v1.elems[1];
        const z1: number = v1.elems[2];
        const x2: number = v2.elems[0];
        const y2: number = v2.elems[1];
        const z2: number = v2.elems[2];
        return new Vec3(y1 * z2 - y2 * z1, x2 * z1 - x1 * z2, x1 * y2 - x2 * y1);
    }
}

export default Vec3;