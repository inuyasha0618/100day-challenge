import { cos, sin, pi } from './utils/math.js';
import Matrix4 from './utils/matrix.js'
export default ({gl, program, initialAngle=0, axisX=0, axisY=0, axisZ=1, speed=36}) => {
    let firstTime = true;
    let time = +new Date;
    let angle = initialAngle;
    const mat = gl.getUniformLocation(program, 'matrix');
    const tcw = gl.getUniformLocation(program, 'Tcw');
    const perspective = gl.getUniformLocation(program, 'perspective');
    const modelMatrix = new Matrix4();
    const tcwMat = new Matrix4().setLookAt(1, 1, 10, 0.2, 0.2, 0.2, 0, 0, 1);
    const perspectiveMat = new Matrix4().setPerspective(60, 1, 2.0, 100.0);

    gl.uniformMatrix4fv(tcw, false, tcwMat.elements);
    gl.uniformMatrix4fv(perspective, false, perspectiveMat.elements);

    const draw = () => {
        let now = +new Date;
        let nowAngle = 0;
        if (firstTime) {
            nowAngle = initialAngle;
            firstTime = false;
        } else {
            nowAngle = angle + ((now - time) / 1000 * speed) % 360;

        }
        modelMatrix.setRotate(nowAngle, axisX, axisY, axisZ);

        gl.uniformMatrix4fv(mat, false, modelMatrix.elements);
        
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        angle = nowAngle;
        time = now;
        requestAnimationFrame(draw);
    };

    return draw;
};
