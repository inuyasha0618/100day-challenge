import Vec3 from './math/vec.js';
import Ray from './ray.js';
import { Sphere } from './hitable/hitable.js';
console.time('render');
const canvas = document.querySelector('#cvs');
const ctx = canvas.getContext('2d');
const { width, height } = canvas.getBoundingClientRect();
const imgData = ctx.createImageData(width, height);
const top_left = new Vec3(-2.0, 2.0, -1.0);
const hori = new Vec3(4.0, 0.0, 0.0);
const vert = new Vec3(0.0, -4.0, 0.0);
function color(t) {
    const white = new Vec3(255.0, 255.0, 255.0);
    const black = new Vec3(0.0, 0.0, 0.0);
    return Vec3.add(Vec3.multiply(white, (1.0 - t)), Vec3.multiply(black, t));
}
const center = new Vec3(0.0, 0.0, -3.0);
const radius = 0.5;
const origin = new Vec3(0.0, 0.0, 0.0);
const sphere = new Sphere(center, radius);
for (let i = 0; i < imgData.width; i++) {
    for (let j = 0; j < imgData.height; j++) {
        const ray = new Ray(origin, Vec3.add(top_left, Vec3.multiply(hori, i / width), Vec3.multiply(vert, j / height)));
        const index = (j * imgData.width + i) * 4;
        const pixColor = color(j / height);
        let rec = { t: 0, p: new Vec3(0, 0, 0), normal: new Vec3(0, 0, 0) };
        const isHit = sphere.hit(ray, 0, 1000, rec);
        if (isHit) {
            const normal = rec.normal;
            imgData.data[index] = (normal.x + 1.0) * 0.5 * 255;
            imgData.data[index + 1] = (normal.y + 1.0) * 0.5 * 255;
            imgData.data[index + 2] = (normal.z + 1.0) * 0.5 * 255;
            imgData.data[index + 3] = 255;
        }
        else {
            imgData.data[index] = pixColor.r;
            imgData.data[index + 1] = pixColor.g;
            imgData.data[index + 2] = pixColor.b;
            imgData.data[index + 3] = 255;
        }
    }
}
ctx.putImageData(imgData, 0, 0);
console.timeEnd('render');
