import Program from './Program.js';
import { getShaderSrc } from '../shaderUtils.js';
export default class CustomProgram extends Program {
    constructor(gl) {
        let vShaderSrc = getShaderSrc('vertex-shader');
        let fShaderSrc = getShaderSrc('fragment-shader');
        super(gl, vShaderSrc, fShaderSrc);
        gl.useProgram(null);
    }

    getStandardUniformLocations() {
        return {
            perspective:	this.gl.getUniformLocation(this.program,"uPMatrix"),
            modalMatrix:	this.gl.getUniformLocation(this.program,"uModelMatrix"),
            cameraMatrix:	this.gl.getUniformLocation(this.program,"uCameraMatrix"),
            mainTexture:	this.gl.getUniformLocation(this.program,"uMainTex"),
            mvpMatrix:      this.gl.getUniformLocation(this.program,"uMVPMatrix"),
            vpMatrix:      this.gl.getUniformLocation(this.program,"uVPMatrix"),
        };
    }

    setModalMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.modalMatrix, false, mat.raw);
        return this;
    }

    setPerspectiveMat(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.perspective, false, mat.raw);
        return this;
    }

    setCameraMat(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.cameraMatrix, false, mat.raw);
        return this;
    }

    setVPMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.vpMatrix, false, mat.raw);
        return this;
    }

    setMvpMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.mvpMatrix, false, mat.raw);
        return this;
    }
}