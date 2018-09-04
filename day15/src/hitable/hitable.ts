import Vec3 from '../math/vec.js';
import Ray from '../ray.js';

interface hit_record {
    t: number,
    p: Vec3,
    normal: Vec3
}

abstract class Hitable {
    abstract hit(ray: Ray, t_min: number, t_max: number, rec: hit_record): boolean;
}

class Sphere extends Hitable {
    center: Vec3;
    radius: number;

    constructor(center: Vec3, radius: number) {
        super();
        this.center = center;
        this.radius = radius;
    }

    hit(ray: Ray, t_min: number, t_max: number, rec: hit_record): boolean {
        const origin: Vec3 = ray.origin;
        const direction: Vec3 = ray.direction;
        const oc: Vec3 = Vec3.subtract(origin, this.center);
        const a: number = Vec3.dot(direction, direction);
        const b: number = 2.0 * Vec3.dot(direction, oc);
        const c: number = Vec3.dot(oc, oc) - this.radius * this.radius;
        const discriminant = b * b - 4.0 * a * c;
        // 没有解返回-1
        if (discriminant > 0) {
            let temp: number = (-b - Math.sqrt(discriminant)) / (2.0 * a);
            if (temp > t_min && temp < t_max) {
                rec.t = temp;
                rec.p = ray.pointAtParam(temp);
                rec.normal = Vec3.subtract(rec.p, this.center).normalize();
                return true;
            }

            temp = (-b + Math.sqrt(discriminant)) / (2.0 * a);
            if (temp > t_min && temp < t_max) {
                rec.t = temp;
                rec.p = ray.pointAtParam(temp);
                rec.normal = Vec3.subtract(rec.p, this.center).normalize();
                return true;
            }
        }

        return false;
    }
}

export { Sphere, hit_record };