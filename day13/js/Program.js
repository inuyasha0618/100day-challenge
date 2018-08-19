// 通用的业务无关的program逻辑，如需具体定制program需要继承它

import { createProgramFromShaderSource, getStandardUniformLocations } from './shaderUtils.js';
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

export default class Program {
    constructor(gl, vertexShaderSrc, fragShaderSrc) {
        this.gl = gl;
        this.program = createProgramFromShaderSource(gl, vertexShaderSrc, fragShaderSrc);
        gl.useProgram(this.program);
        this.uniformLocation = {};
        this.uniformLoc = getStandardUniformLocations(gl, this.program);
    }

    activate() {
        this.gl.useProgram(this.program);
        return this;
    }

    deactivate() {
        this.gl.useProgram(null);
        return this;
    }

    setModalMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.modalMatrix, false, mat);
    }

    renderModal(modal) {
        const { mesh, transform } = modal;
        this.setModalMatrix(transform.getTransMat());
        this.gl.bindVertexArray(mesh.vao);
        if (mesh.indexCount) {
            this.gl.drawElements(mesh.drawMode, mesh.indexCount, this.gl.UNSIGNED_SHORT, 0);
        } else {
            this.gl.drawArrays(mesh.drawMode, 0, mesh.vertexCount);
        }
        this.gl.bindVertexArray(null);
        return this;
    }
}