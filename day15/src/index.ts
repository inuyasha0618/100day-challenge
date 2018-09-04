import Vec3 from './math/vec.js';
import Ray from './ray.js';
import { Sphere, hit_record } from './hitable/hitable.js';
console.time('render');
const canvas: any = document.querySelector('#cvs');
const ctx = canvas.getContext('2d');
const { width, height } = canvas.getBoundingClientRect();
const imgData = ctx.createImageData(width, height);

const top_left:Vec3 = new Vec3(-2.0, 2.0, -1.0);
const hori:Vec3 = new Vec3(4.0, 0.0, 0.0);
const vert:Vec3 = new Vec3(0.0, -4.0, 0.0);

function color(t: number): Vec3 {
    const white:Vec3 = new Vec3(255.0, 255.0, 255.0);
    const black:Vec3 = new Vec3(0.0, 0.0, 0.0);
    return Vec3.add(Vec3.multiply(white, (1.0 - t)), Vec3.multiply(black, t));
}

const center: Vec3 = new Vec3(0.0, 0.0, -3.0);
const radius: number = 0.5;
const origin: Vec3 = new Vec3(0.0, 0.0, 0.0);

const sphere: Sphere = new Sphere(center, radius);

for(let i=0; i<imgData.width; i++) {
    for(let j=0; j<imgData.height; j++) {        
        const ray: Ray = new Ray(origin, Vec3.add(top_left, Vec3.multiply(hori, i / width), Vec3.multiply(vert, j / height)));
        const index = (j*imgData.width+i)*4;  //calculate index
        const pixColor: Vec3 = color(j / height);

        let rec: hit_record = {t: 0, p: new Vec3(0, 0, 0), normal: new Vec3(0, 0, 0)};
        const isHit: boolean = sphere.hit(ray, 0, 1000, rec);
        if (isHit) {
            const normal: Vec3 = rec.normal;
            imgData.data[index] = (normal.x + 1.0) * 0.5 * 255;   // red
            imgData.data[index+1] = (normal.y + 1.0) * 0.5 * 255; // green
            imgData.data[index+2] = (normal.z + 1.0) * 0.5 * 255; // blue
            imgData.data[index+3] = 255; // force alpha to 100%

        } else {
            imgData.data[index] = pixColor.r;   // red
            imgData.data[index+1] = pixColor.g; // green
            imgData.data[index+2] = pixColor.b; // blue
            imgData.data[index+3] = 255; // force alpha to 100%
        }
    }
}
//set the data back
ctx.putImageData(imgData,0,0);

console.timeEnd('render');
