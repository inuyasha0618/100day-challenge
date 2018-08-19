export default function(canvasId) {
    let canvas = document.getElementById(canvasId);
    let gl = canvas.getContext('webgl2');
    gl.enable(gl.DEPTH_TEST);

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

    gl.loadTexture = function(img,doYFlip){
		var tex = this.createTexture();
		if(doYFlip == true) this.pixelStorei(this.UNPACK_FLIP_Y_WEBGL, true);	//Flip the texture by the Y Position, So 0,0 is bottom left corner.
        this.activeTexture(gl.TEXTURE0);
		this.bindTexture(this.TEXTURE_2D, tex);														//Set text buffer for work
		this.texImage2D(this.TEXTURE_2D, 0, this.RGBA, this.RGBA, this.UNSIGNED_BYTE, img);			//Push image to GPU.
		
		this.texParameteri(this.TEXTURE_2D, this.TEXTURE_MAG_FILTER, this.LINEAR);					//Setup up scaling
		this.texParameteri(this.TEXTURE_2D, this.TEXTURE_MIN_FILTER, this.LINEAR_MIPMAP_NEAREST);	//Setup down scaling
		this.generateMipmap(this.TEXTURE_2D);	//Precalc different sizes of texture for better quality rendering.

		return tex;		
	}

    return gl;
}