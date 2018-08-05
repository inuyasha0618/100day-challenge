import Program from './Program.js';
export default class CircleProgram extends Program {
    constructor(gl) {
        const vShaderSrc = `#version 300 es
        uniform mat4 u_model_mat;
        uniform mat4 u_VP_mat;
        uniform mat4 u_MVP_mat;
        uniform mat4 u_P_mat;
        uniform mat4 u_camera_mat;
        in vec3 a_position;
        in vec3 a_color;
        in vec2 a_uv;
        out vec3 vColor;
        out vec2 uv;
        void main() {
            gl_Position = u_VP_mat * u_model_mat * vec4(a_position, 1.0);
            uv = a_uv;
            vColor = a_color;
        }`;
        const fShaderSrc = `#version 300 es
        precision highp float;
        in vec3 vColor;
        in vec2 uv;
        out vec4 myColor;
        void main() {
            float a = 0.0;
            float x = uv.x - 0.5;
            float y = uv.y - 0.5;
            float r = sqrt(x * x + y * y);

            if (r > 0.5) {
                a = 0.0;
            } else if (r > 0.4) {
                a = 1.0;
            }

            myColor = vec4(1.0 - a, 1.0 - a, 1.0 - a, a);
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