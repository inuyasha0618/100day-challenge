function initGl(canvas) {
    const gl = cvs.getContext('webgl2');
    if (!gl) {
        document.write('Please change to a browser which supports WebGl 2.0~');
        return;
    }
    // set background
    gl.clearColor(0, 0, 0, 0.9);
    
    const vsSource = document.querySelector('#vertex').text.trim(),
        fsSource = document.querySelector('#fragment').text.trim();
    
    const vertexShader = gl.createShader(gl.VERTEX_SHADER),
        fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vertexShader, vsSource);
    gl.shaderSource(fragmentShader, fsSource);
    
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(vertexShader));
        return;
    }
    
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fragmentShader));
        return;
    }
    
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
    }
    
    gl.useProgram(program);

    return {gl, program};
}
