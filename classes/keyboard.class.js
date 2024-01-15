class Keyboard {
    jump = false;
    down = false;
    left = false;
    right = false;
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
            if (e.code === "ArrowUp" || e.code === "KeyW") this.jump = true;
            if (e.code === "ArrowDown" || e.code === "KeyS") this.down = true; // not in use
            if (e.code === "ArrowLeft" || e.code === "KeyA") this.left = true;
            if (e.code === "ArrowRight" || e.code === "KeyD") this.right = true;
            if (e.code === "Space") this.throw = true; // bottle throw
            if (e.code === "KeyB") this.debug = !this.debug; //debug mode
            (this.jump || this.throw || this.left || this.right) ? this.press = true : this.press = false;
        });
    }

    /**
     * this function calls the evetlistener for key up operations
     */
    eventlistenerKeyUp() {
        window.addEventListener("keyup", (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") this.jump = false;
            if (e.code === "ArrowDown" || e.code === "KeyS") this.down = false;
            if (e.code === "ArrowLeft" || e.code === "KeyA") this.left = false;
            if (e.code === "ArrowRight" || e.code === "KeyD") this.right = false;
            if (e.code === "Space") this.throw = false;
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

    /**
    * this function is a collection of all calls of the eventlistener for event touchstart
    */
    eventlistenerTouchStart() {
        this.setupTouchListeners(['idThrow1', 'idThrow2'], 'touchstart', 'throw');
        this.setupTouchListeners(['idJump1', 'idJump2'], 'touchstart', 'jump');
        this.setupTouchListeners(['idMoveLeft'], 'touchstart', 'left');
        this.setupTouchListeners(['idMoveRight'], 'touchstart', 'right');
    }

    /**
     * this function is a collection of all calls of the eventlistener for event touchend
     */
    eventlistenerTouchEnd() {
        this.setupTouchListeners(['idThrow1', 'idThrow2'], 'touchend', 'throw');
        this.setupTouchListeners(['idJump1', 'idJump2'], 'touchend', 'jump');
        this.setupTouchListeners(['idMoveLeft'], 'touchend', 'left');
        this.setupTouchListeners(['idMoveRight'], 'touchend', 'right');
    }

    /**
     * this function is used to reduce code by looping through an array of elements with the similar functionality
     * @param {Array} elementIds - contains all element IDs with a similar functionality
     * @param {*} touchEvent - the event name 
     * @param {*} propertyName - the property which sould be changed
     */
    setupTouchListeners(elementIds, touchEvent, propertyName) {
        elementIds.forEach((elementId) => {
            this.touchEventlistener(elementId, touchEvent, (isPressed) => {
                this[propertyName] = isPressed;
                isPressed ? this.press = true : this.press = false;
            });
        });
    }

    /**
     * 
     * @param {String} elementID - indicates the element ID to act on
     * @param {String} touchEvent - repesents which event was happen
     * @param {Function} callback - function which contains as parameter the result if element is touched
     */
    touchEventlistener(elementID, touchEvent, callback) {
        document.getElementById(elementID).addEventListener(touchEvent, (e) => {
            e.preventDefault();
            callback(touchEvent === 'touchstart');
        });
    }

}