class Keyboard {
    up = false;
    down = false;
    left = false;
    right = false;
    space = false;
    press = false;
    debug = false;
    throw = false;


    constructor() {
        this.keyboardControl();
        this.tochControl();
    }

    /**
     * this function calls the keyboard control functions
     */
    keyboardControl() {
        this.eventlistenerKeyDown();
        this.eventlistenerKeyUp();
    }

    /**
     * this function calls the evetlistener for key down operations
     */
    eventlistenerKeyDown() {
        window.addEventListener("keydown", (e) => {
            //console.log(e);
            if (e.code === "ArrowUp" || e.code === "KeyW") this.up = true;
            if (e.code === "ArrowDown" || e.code === "KeyS") this.down = true; // not in use
            if (e.code === "ArrowLeft" || e.code === "KeyA") this.left = true;
            if (e.code === "ArrowRight" || e.code === "KeyD") this.right = true;
            if (e.code === "KeyE") this.throw = true; // bottle throw
            if (e.code === "KeyB") this.debug = !this.debug; //debug mode
            if (e.code === "Space") this.space = true;
            (this.up || this.down || this.left || this.right) ? this.press = true : this.press = false;
        });
    }

    /**
     * this function calls the evetlistener for key up operations
     */
    eventlistenerKeyUp() {
        window.addEventListener("keyup", (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") this.up = false;
            if (e.code === "ArrowDown" || e.code === "KeyS") this.down = false;
            if (e.code === "ArrowLeft" || e.code === "KeyA") this.left = false;
            if (e.code === "ArrowRight" || e.code === "KeyD") this.right = false;
            if (e.code === "KeyE") this.throw = false;
            if (e.code === "Space") this.space = false;
            this.press = false;
        });
    }

    /**
     * this function call eventlistener function for touch operations
     */
    tochControl() {
        this.eventlistenerTouchStart();
        this.eventlistenerTouchEnd();

    }



    eventlistenerTouchStart() {
        this.touchEventlistener('idThrow1', 'touchstart', (action) => {
            this.throw = action;
        });
        this.touchEventlistener('idThrow2', 'touchstart', (action) => {
            this.throw = action;
        });
        this.touchEventlistener('idJump1', 'touchstart', (action) => {
            this.up = action;
        });
        this.touchEventlistener('idJump2', 'touchstart', (action) => {
            this.up = action;
        });
        this.touchEventlistener('idMoveLeft', 'touchstart', (action) => {
            this.left = action;
        });
        this.touchEventlistener('idMoveRight', 'touchstart', (action) => {
            this.right = action;
        });
    }

    eventlistenerTouchEnd() {
        this.touchEventlistener('idThrow1', 'touchend', (action) => {
            this.throw = action;
        });
        this.touchEventlistener('idThrow2', 'touchend', (action) => {
            this.throw = action;
        });
        this.touchEventlistener('idJump1', 'touchend', (action) => {
            this.up = action;
        });
        this.touchEventlistener('idJump2', 'touchend', (action) => {
            this.up = action;
        });
        this.touchEventlistener('idMoveLeft', 'touchend', (action) => {
            this.left = action;
        });
        this.touchEventlistener('idMoveRight', 'touchend', (action) => {
            this.right = action;
        });
    }

    touchEventlistener(elementID, touchEvent, callback) {
        document.getElementById(elementID).addEventListener(touchEvent, (e) => {
            e.preventDefault();
            callback(touchEvent === 'touchstart');
        });
    }
   
}