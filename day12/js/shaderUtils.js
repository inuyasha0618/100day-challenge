import { 
    ATTR_POSITION_NAME,
    ATTR_POSITION_LOC,
    ATTR_NORMAL_NAME,
    ATTR_NORMAL_LOC,
    ATTR_UV_NAME,
    ATTR_UV_LOC,
    ATTR_COLOR_LOC,
    ATTR_COLOR_NAME,
} from './attrConfig.js'

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

    // bindAttribLocation必须在link之前！！！
    // Todo将bindAttribLocation放在具体的Program中，因为每个program由于shader code 不一样， 所以要绑定的名字和通道可能也不一样
    // TOdo应将创建program的逻辑挪到Program基类中
    gl.bindAttribLocation(program, ATTR_POSITION_LOC,ATTR_POSITION_NAME);
    gl.bindAttribLocation(program, ATTR_NORMAL_LOC,ATTR_NORMAL_NAME);
    gl.bindAttribLocation(program, ATTR_UV_LOC,ATTR_UV_NAME);
    gl.bindAttribLocation(program, ATTR_COLOR_LOC,ATTR_COLOR_NAME);

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

export const getStandardUniformLocations = (gl, program) => {
    return {
        perspective:	gl.getUniformLocation(program,"uPMatrix"),
        modalMatrix:	gl.getUniformLocation(program,"uMVMatrix"),
        cameraMatrix:	gl.getUniformLocation(program,"uCameraMatrix"),
        mainTexture:	gl.getUniformLocation(program,"uMainTex")
    };
}

export const getStandardAttribLocations = (gl,program) => {
    return {
        position:	gl.getAttribLocation(program,ATTR_POSITION_NAME),
        norm:		gl.getAttribLocation(program,ATTR_NORMAL_NAME),
        uv:			gl.getAttribLocation(program,ATTR_UV_NAME),
        color: gl.getAttribLocation(program,ATTR_COLOR_NAME),
    };
}