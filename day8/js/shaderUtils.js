export const getShaderSrc = scriptId => {
    let scriptNode = document.getElementById(scriptId);
    if (!scriptNode) {
        console.error(`${scriptId} not found`);
        return null;
    }

    if (scriptNode.text.trim() == '') {
        console.error(`${scriptId} has no content`);
        return null;
    }

    return scriptNode.text.trim();
}

const getShaderObj = (gl, shaderSrc, type) => {

    let shader = gl.createShader(type);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`Error compiling shader : ${shaderSrc} ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

const createProgram = (gl, vShader, fShader) => {
    let program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`Error creating shader program ${gl.getProgramInfoLog(program)}`);
        gl.deleteProgram(program);
        return null;
    }

    gl.detachShader(program, vShader);
    gl.detachShader(program, fShader);
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);

    return program;
}

export const createProgramFromShaderSource = (gl, vShaderSource, fShaderSource) => {
    let vShader = getShaderObj(gl, vShaderSource, gl.VERTEX_SHADER);    if (!vShader) return null;
    let fShader = getShaderObj(gl, fShaderSource, gl.FRAGMENT_SHADER);  if (!fShader) return null;

    return createProgram(gl, vShader, fShader);   
}

export const getProgramObj = (gl, vsId, fsId) => {
    let vShaderSource = getShaderSrc(vsId);                             if (!vShaderSource) return null;
    let fShaderSource = getShaderSrc(fsId);                             if (!fShaderSource) return null;

    let vShader = getShaderObj(gl, vShaderSource, gl.VERTEX_SHADER);    if (!vShader) return null;
    let fShader = getShaderObj(gl, fShaderSource, gl.FRAGMENT_SHADER);  if (!fShader) return null;

    return createProgram(gl, vShader, fShader);
}