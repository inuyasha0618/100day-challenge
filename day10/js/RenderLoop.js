export default class RenderLoop {
    constructor(cb, fps=0) {
        this.currentFps = 0;
        this.isActive = false;
        this.msLastFrame = performance.now();

        if (fps && typeof fps === 'number' && !Number.isNaN(fps)) {
            this.msFpsLimit = 1000/fps;
            this.run = () => {
                let currentTime = performance.now();
                let msDt = currentTime - this.msLastFrame;
                let dt = msDt/1000;

                if (msDt >= this.msFpsLimit) {
                    cb(dt);
                    this.currentFps =  Math.floor(1.0 / dt);
                    this.msLastFrame = currentTime;    
                }

                if (this.isActive) window.requestAnimationFrame(this.run);
            }
        } else {
            this.run = () => {
                let currentTime = performance.now();
                let dt = (currentTime - this.msLastFrame)/1000;
                cb(dt);
                this.currentFps =  Math.floor(1.0 / dt);                
                this.msLastFrame = currentTime;
                if (this.isActive) window.requestAnimationFrame(this.run);
            }
        }
    }

    start() {
        this.msLastFrame = performance.now();
        this.isActive = true;
        window.requestAnimationFrame(this.run);
        return this;
    }

    stop() {
        this.isActive = false;
        return this;
    }
}