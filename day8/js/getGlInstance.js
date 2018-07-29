export default function(canvasId) {
    let canvas = document.getElementById(canvasId);
    let gl = canvas.getContext('webgl2');

    if (!gl) {
        console.error('Webgl context is not available.');
        return null;
    }

    gl.clearColor(0.0, 1.0, 1.0, 1.0);

    const glClear = gl.clear.bind(gl);
    const glClearColor = gl.clearColor.bind(gl);

    gl.clearColor = function(r, g, b, a) {
        glClearColor(r, g, b, a);
        return this;
    }

    gl.clear = function() {
        glClear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
        return this;
    }

    gl.setSize = function(w=500, h=500) {
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.canvas.width = w;
        this.canvas.height = h;
        this.viewport(0, 0, w, h);
        return this;
    }

    return gl;
}