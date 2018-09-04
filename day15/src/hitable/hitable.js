import Vec3 from '../math/vec.js';
class Hitable {
}
class Sphere extends Hitable {
    constructor(center, radius) {
        super();
        this.center = center;
        this.radius = radius;
    }
    hit(ray, t_min, t_max, rec) {
        const origin = ray.origin;
        const direction = ray.direction;
        const oc = Vec3.subtract(origin, this.center);
        const a = Vec3.dot(direction, direction);
        const b = 2.0 * Vec3.dot(direction, oc);
        const c = Vec3.dot(oc, oc) - this.radius * this.radius;
        const discriminant = b * b - 4.0 * a * c;
        if (discriminant > 0) {
            let temp = (-b - Math.sqrt(discriminant)) / (2.0 * a);
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
export { Sphere };
