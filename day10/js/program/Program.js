// 通用的业务无关的program逻辑，如需具体定制program需要继承它
// program的作用是
// 1. 通过传入的shader code string 及 gl 对象，创建一个跟特定shader code相关联的program对象
// 2. 并且能够给uniform变量赋值
// 3. 渲染modal

import { createProgramFromShaderSource } from '../shaderUtils.js';

export default class Program {
    constructor(gl, vertexShaderSrc, fragShaderSrc) {
        this.gl = gl;
        // Todo 应该把这些shaderUtils里面的方法拿到Program里
        this.program = createProgramFromShaderSource(gl, vertexShaderSrc, fragShaderSrc);
        gl.useProgram(this.program);
        this.uniformLoc = this.getStandardUniformLocations();
    }

    // 一个program是与特定的两个shader相关联的，而uniform变量名都是每个shader相关联的，故把getStandardUniformLocations放在这里
    // Todo: program应作为一个基类， 具体的业务program应继承于它，并且重写getStandardUniformLocations
    getStandardUniformLocations() {
        return {};
    }

    activate() {
        this.gl.useProgram(this.program);
        return this;
    }

    deactivate() {
        this.gl.useProgram(null);
        return this;
    }

    // 这几个方法在派生类中被覆写
    setModalMatrix(mat) {
        return this;
    }

    setVPMatrix(mat) {
        return this;
    }

    setMvpMatrix(mat) {
        return this;
    }

    renderModal(modal) {
        modal.preRender();
        const { mesh, transform } = modal;
        this.setModalMatrix(transform.getTransMat());
        // TODO: set mvp
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