import { cos, sin, pi } from './utils/math.js';
import Matrix4 from './utils/matrix.js'

const mul = (...mats) => {
    let initialMat = new Matrix4().setIdentity();
    return mats.reduce((accu, current) => {
        return accu.multiply(current);
    }, initialMat);
}

export default ({
    gl,
    program,
    initialEarthAngle=0,
    initialMoonAngle=0,
    speedEarth=36,
    speedMoon=36,
    n=1,
    earthSelfSpeed=20,
    moonSelfSpeed=80,
}) => {
    let firstTime = true;
    let time  = +new Date;
    let start = time;
    let earthAngle = initialEarthAngle;
    let moonAngle = initialMoonAngle;
    let sunHeight = 0;
    let earthSelfAngle = 0;
    let moonSelfAngle = 0;

    const viewMat = new Matrix4().setLookAt(0, 50, -15, 0, 0, -60, 0, 0, -1);
    const perspectiveMat = new Matrix4().setPerspective(60, 1, 1.0, 100.0);

    const mvpLocation = gl.getUniformLocation(program, 'mvp');

    const drawSun = (sunHeight) => {
        let trans = new Matrix4().setTranslate(0, sunHeight, -60);
        let scale = new Matrix4().setScale(3.0, 3.0, 3.0);
        let mvp = mul(perspectiveMat, viewMat, trans, scale);
        gl.uniformMatrix4fv(mvpLocation, false, mvp.elements);
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
        return trans;
    }

    const drawEarth = (sunLocation, angle, earthSelfAngle) => {
        const trans = new Matrix4().setTranslate(0, 0, -26);
        const rot = new Matrix4().setRotate(angle, 0, 1, 0);
        const selfRot = new Matrix4().setRotate(earthSelfAngle, 0, 1, 0);
        const Twe = mul(sunLocation, rot, trans);
        const mvp = mul(perspectiveMat, viewMat, Twe, selfRot);
        gl.uniformMatrix4fv(mvpLocation, false, mvp.elements);
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
        return Twe;
    }

    const drawMoon = (Twe, angle, moonSelfAngle) => {
        const trans = new Matrix4().setTranslate(0, 0, -5);
        let scale = new Matrix4().setScale(0.5, 0.5, 0.5);
        const rot = new Matrix4().setRotate(angle, 0, 1, 0);
        const selfRot = new Matrix4().setRotate(moonSelfAngle, 0, 1, 0);
        const mvp = mul(perspectiveMat, viewMat, Twe, rot, trans, scale, selfRot);
        gl.uniformMatrix4fv(mvpLocation, false, mvp.elements);
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    }

    const draw = () => {
        let now = +new Date;

        if (firstTime) {
            firstTime = false;
        } else {
            earthAngle = (earthAngle + (now - time) / 1000 * speedEarth) % 360;
            moonAngle = (moonAngle + (now - time) / 1000 * speedMoon) % 360;

            earthSelfAngle = (earthSelfAngle + (now - time) / 1000 * earthSelfSpeed) % 360;
            moonSelfAngle = (moonSelfAngle + (now - time) / 1000 * moonSelfSpeed) % 360;
            sunHeight = 15 * sin((now - start) / 10 * pi / 180);
        }

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const sunLocation = drawSun(sunHeight);
        const earthLocation = drawEarth(sunLocation, earthAngle, earthSelfAngle);
        drawMoon(earthLocation, moonAngle, moonSelfAngle);

        time = now;
        requestAnimationFrame(draw);
    };

    return draw;
};
