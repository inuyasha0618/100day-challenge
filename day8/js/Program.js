// 通用的业务无关的program逻辑，如需具体定制program需要继承它

import { createProgramFromShaderSource } from './shaderUtils.js';
import { 
    ATTR_POSITION_NAME,
    ATTR_POSITION_LOC,
    ATTR_NORMAL_NAME,
    ATTR_NORMAL_LOC,
    ATTR_UV_NAME,
    ATTR_UV_LOC,
} from './attrConfig.js'

export default class Program {
    constructor(gl, vertexShaderSrc, fragShaderSrc) {
        this.gl = gl;
        this.program = createProgramFromShaderSource(gl, vertexShaderSrc, fragShaderSrc);
        gl.useProgram(this.program);
        this.uniformLocation = {};
        gl.bindAttribLocation(this.program, ATTR_POSITION_LOC,ATTR_POSITION_NAME);
		gl.bindAttribLocation(this.program, ATTR_NORMAL_LOC,ATTR_NORMAL_NAME);
		gl.bindAttribLocation(this.program, ATTR_UV_LOC,ATTR_UV_NAME);
    }

    activate() {
        this.gl.useProgram(this.program);
        return this;
    }

    deactivate() {
        this.gl.useProgram(null);
        return this;
    }

    renderMesh(mesh) {
        this.gl.bindVertexArray(mesh.vao);
        if (mesh.indexCount) {
            this.gl.drawElements(mesh.drawMode, mesh.indexCount, gl.UNSIGNED_SHORT, 0);
        } else {
            this.gl.drawArrays(mesh.drawMode, 0, mesh.vertexCount);
        }
        this.gl.bindVertexArray(null);
        return this;
    }
}