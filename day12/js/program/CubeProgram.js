import Program from './Program.js';
export default class CustomProgram extends Program {
    constructor(gl) {
        const vShaderSrc = `#version 300 es
        uniform mat4 u_model_mat;
        uniform mat4 u_VP_mat;
        uniform mat4 u_MVP_mat;
        uniform mat4 u_P_mat;
        uniform mat4 u_camera_mat;
        in vec3 a_position;
        in vec3 a_color;
        out vec3 vColor;
        void main() {
            gl_Position = u_VP_mat * u_model_mat * vec4(a_position, 1.0);
            vColor = a_color;
        }`;
        const fShaderSrc = `#version 300 es
        precision highp float;
        in vec3 vColor;
        out vec4 myColor;
        void main() {
            myColor = vec4(vColor, 1.0);
        }`;
        super(gl, vShaderSrc, fShaderSrc);
        gl.useProgram(null);
    }

    getStandardUniformLocations() {
        return {
            uPmat:	this.gl.getUniformLocation(this.program,"u_P_mat"),
            modalMat:	this.gl.getUniformLocation(this.program,"u_model_mat"),
            cameraMat:	this.gl.getUniformLocation(this.program,"u_camera_mat"),
            mvpMat:      this.gl.getUniformLocation(this.program,"u_MVP_mat"),
            vpMat:      this.gl.getUniformLocation(this.program,"u_VP_mat"),
        };
    }

    setModalMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.modalMat, false, mat.raw);
        return this;
    }

    setPerspectiveMat(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.uPmat, false, mat.raw);
        return this;
    }

    setCameraMat(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.cameraMat, false, mat.raw);
        return this;
    }

    setVPMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.vpMat, false, mat.raw);
        return this;
    }

    setMvpMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.mvpMat, false, mat.raw);
        return this;
    }
}