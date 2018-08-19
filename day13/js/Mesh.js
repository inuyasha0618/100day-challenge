import { 
    ATTR_POSITION_LOC,
    ATTR_NORMAL_LOC,
    ATTR_UV_LOC,
    ATTR_COLOR_LOC,
} from './attrConfig.js'

export default class Mesh {
    constructor({gl, aryInd=[], aryVert=[], aryColor=[], aryNorm=[], aryUV=[]}) {
        this.drawMode = gl.TRIANGLES;
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        if (aryVert.length > 0) {
            let vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(aryVert), gl.STATIC_DRAW);
            gl.vertexAttribPointer(ATTR_POSITION_LOC, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(ATTR_POSITION_LOC);
            this.vertexCount = aryVert.length / 3;
        }

        if (aryColor.length > 0) {
            let colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(aryColor), gl.STATIC_DRAW);
            gl.vertexAttribPointer(ATTR_COLOR_LOC, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(ATTR_COLOR_LOC);
        }

        if (aryNorm.length > 0) {
            let normBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(aryNorm), gl.STATIC_DRAW);
            gl.vertexAttribPointer(ATTR_NORMAL_LOC, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(ATTR_NORMAL_LOC);
        }

        if (aryUV.length > 0) {
            let uvBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(aryUV), gl.STATIC_DRAW);
            gl.vertexAttribPointer(ATTR_UV_LOC, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(ATTR_UV_LOC);
        }

        if (aryInd.length > 0) {
            let indexBuffer = gl.createBuffer();
            this.indexCount = aryInd.length;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(aryInd), gl.STATIC_DRAW);
        }

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}