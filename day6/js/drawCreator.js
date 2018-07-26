import Matrix4 from './utils/matrix.js'

export default ({gl, program, n=1}) => {
    let firstTime = true;

    const uniformTime = gl.getUniformLocation(program, 'time');
    const uniformColor = gl.getUniformLocation(program, 'color');
    gl.uniform3f(uniformColor, 1, 0, 0);

    const tcwMat = new Matrix4().setLookAt(0, -30.2, 15, 0, 0, 1, 0, 0, 1);
    
    const perspectiveMat = new Matrix4().setPerspective(60, 1, 1.0, 100.0);

    const tcw = gl.getUniformLocation(program, 'Tcw');
    const perspective = gl.getUniformLocation(program, 'perspective');
    
    gl.uniformMatrix4fv(tcw, false, tcwMat.elements);
    gl.uniformMatrix4fv(perspective, false, perspectiveMat.elements);


    const initialTime = +new Date();

    const draw = () => {
        let time = 0;
        if (firstTime) {
            time = initialTime;
            firstTime = false;
        } else {
            time = +new Date() - initialTime;
        }

        gl.uniform1f(uniformTime, time);
        
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, n);

        requestAnimationFrame(draw);
    };

    return draw;
};
