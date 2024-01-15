class MovableObject extends DrawableObject {

    hitbox_x = this.x;
    hitbox_y = this.y;
    hitbox_height = this.height;
    hitbox_width = this.width;
    speed; // for x direction
    otherDirection = false;
    energy = 100;
    lastHit;
    ground = 165;
    speedY = 0; //speed of entity
    acceleration = 2.5; // acceleration of entity
    fallingDown = false; // for flagging the move down of object

    /** 
     * this function plays all immages of the image set for an animation
     * @param {Array} imgSet - contains the image set which should be drawed
     */
    playAnimation(imgSet) {
        let i = this.currentImage % imgSet.length;
        let path = imgSet[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * this function draws the hitbox for special entities
     * @param {Object} ctx - the special object liek endboss chicken...
     * @param {Boolean} keyboardDebug - true if B key was hit
     */
    drawFrame(ctx, keyboardDebug) {
        if (keyboardDebug && (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject)) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'grey';
            ctx.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
            ctx.stroke();
        }
    }

    /**
     * this function returns true if the calling entity hits the object mo
     * @param {Object} mo - object for comparing
     * @returns  - true, if colliding
     */
    isColliding(mo) {
        if (mo instanceof Character) {
            mo.hitbox_x = Math.abs(mo.hitbox_x);
        }
        return this.hitbox_x + this.hitbox_width > mo.hitbox_x &&
            this.hitbox_y + this.hitbox_height > mo.hitbox_y &&
            this.hitbox_x < (mo.hitbox_x + mo.hitbox_width) &&
            this.hitbox_y < mo.hitbox_y + mo.hitbox_height;
    }

    /**
     * this function is used in intervals to set the new position for the image of the calling instanz
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * this function is used in intervals to set the new position for the image of the calling instanz
     */
    moveLeft(speed) {
        this.x -= speed;
    }

    /**
     * this function contains the logic for movement of entities (jupmp, throw)
     * @param {Number} groundOffset - value for the y offset
     */
    applyGravity(groundOffset) {
        setInterval(() => {
            if (this.isAboveGround(groundOffset) || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y < 10) this.fallingDown = true;
            }
        }, 1000 / 25)
    }


    /**
     * this function just checks if the y coordinate above the defined ground
     * @returns - true if above.
     */
    isAboveGround(groundOffset = 0) {
        return this.y < (this.ground + groundOffset);
    }

    /**
     * this function sets the writes thi jumpHeight into speedY 
     * @param {Number} jumpHight - max high of jump
     */
    jump(jumpHight) {
        this.speedY = jumpHight;
    }

    /**
     * this function shrinks translates the image size to a hitbox size.
     * @param {Number} offsetX - repesensts the offset for x
     * @param {Number} offsetWidth - repesensts the offset for width
     * @param {Number} offsetY repesensts the offset for y
     */
    updateHitbox(offsetX, offsetWidth, offsetY) {
        this.hitbox_x = this.x + offsetX;
        this.hitbox_y = this.y - offsetY;
        this.hitbox_width = this.width - offsetWidth;
        this.hitbox_height = this.height + offsetY;
    }

    /**
     * this function counts the energy after hit and sets a time stamp for the hurt function
     */
    hit(factor, boss) {
        this.energy -= factor;
        if (this.energy < 0) {
            this.energy = 0;
            if (boss) this.world.statusBars.endboss.statBar.width = 0;
        } else {
            this.reduceHealthBar(factor, boss);
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * this function reduces the healt bars of character and boss by the given factor
     * @param {Number} factor - reducing the the healthbar by factor
     * @param {Boolean} boss - true if this is a function call from boss
     */
    reduceHealthBar(factor, boss) {
        let div = this.maxHitPoints/factor;
        let barMax = this.world.statusBars.helth.backBar.width;
        if (!boss) this.world.statusBars.helth.statBar.width -= barMax/div;
        else {
            this.world.statusBars.endboss.statBar.width -= barMax/div;
            this.world.statusBars.endboss.statBar.x += barMax/div - 2;
        }
    }

    /**
     * this function provides the dead flag to signal if energy is zwro
     * @returns - returns true if energy is zero
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * This function provides a flag if a hit was happen to play the hurt animation
     * @returns - true if timepassed  lower then 500
     */
    isHurt() {
        let timepassed = (new Date().getTime() - this.lastHit);
        return timepassed < 500;
    }
}