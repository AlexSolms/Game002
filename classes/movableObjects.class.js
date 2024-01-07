class MovableObject extends DrawableObject {

    hitbox_x = this.x; // x für hitbox
    hitbox_y = this.y;
    hitbox_height = this.height;
    hitbox_width = this.width;
    speed;
    otherDirection = false;
    energy = 100;
    lastHit;

    speedY = 0; //Geschwindigkeit des Körpers
    acceleration = 2.5; // Beschleunigung des Körpers
    fallingDown = false; // damit ich ein flag hab, dass mir anzeigt, dass der Körper wieder herunter kommt.
    /**
     * 
     * this function plays all immages of the image set for an animation
     * @param {Array} imgSet - contains the image set which should be drawed
     */
    playAnimation(imgSet) {
        let i = this.currentImage % imgSet.length;
        let path = imgSet[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }



    drawFrame(ctx, keyboardDebug) {
        if (keyboardDebug && (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject)) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'grey';
            ctx.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
            ctx.stroke();
        }
    }

    isCollidingNeu(obj) {
        return (this.hitbox_x + this.hitbox_width) >= obj.hitbox_x && //1
            this.hitbox_x <= (obj.hitbox_x + obj.hitbox_width) &&
            (this.hitbox_y + this.offsetY + this.hitbox_height) >= obj.hitbox_y && // 3
            (this.hitbox_y + this.offsetY) <= (obj.hitbox_y + obj.hitbox_height) && //4
            obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }

    isColliding(mo) {
        if( mo instanceof Character  ){ //&& mo.otherDirection mo.fallingDown && && mo.fallingDown && mo.otherDirection
            
                //console.log(mo.otherDirection);
                mo.hitbox_x = Math.abs(mo.hitbox_x);
            
            //console.log('charakter_X:', mo.hitbox_x ,', charakterFrontX:', (mo.hitbox_x + mo.hitbox_width),', ChickenleftX: ', this.hitbox_x,', charakter_bottom_Y:', (mo.hitbox_y + mo.hitbox_height));//, ', Chicken_Y: ', this.hitbox_y
        }
        return this.hitbox_x + this.hitbox_width > mo.hitbox_x && //1
            this.hitbox_y + this.hitbox_height > mo.hitbox_y && // 3
            this.hitbox_x < (mo.hitbox_x + mo.hitbox_width) && //mo.hitbox_x 
            this.hitbox_y < mo.hitbox_y + mo.hitbox_height; //4
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft(speed) {
        this.x -= speed;
    }


    applyGravity(groundOffset) {

        setInterval(() => {
            //console.log(this.isAboveGround(groundOffset), this.speedY, this.y);
            if (this.isAboveGround(groundOffset) || this.speedY > 0) {
                this.y -= this.speedY;
                // if (this.y > this.ground) { this.y = this.ground; } // damit fange ich ab, dass Pepe tifer sinkt als er soll
                this.speedY -= this.acceleration;
                if(this.y <10){
                    this.fallingDown = true;
                }
            }
        }, 1000 / 25)

    }
    ground = 165;

    /**
     * this function just checks if the y coordinate above the defined ground
     * @returns - true if above.
     */
    isAboveGround(groundOffset = 0) {
        return this.y < (this.ground + groundOffset);
    }

    /**
     * 
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
        // this.world.statusBars.charHelth.statBar.width = (this.energy/this.world.statusBars.charHelth.statBar.width) * 100;
        
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.reduceHealthBar(factor, boss);
            this.lastHit = new Date().getTime();
        }
    }

    reduceHealthBar(factor, boss){
        let width = this.world.statusBars.endboss.statBar.width;
        console.log(width);
        if(this.world.level.endboss.energy == 0) {
            console.log('jetze');
        }
  /*  if(!boss) this.world.statusBars.helth.statBar.width -= 2*factor  ;
    else {
         (width <= 2*factor)? width -= 2*factor : width = 0;
        this.world.statusBars.endboss.statBar.x += 2*factor;
    }*/
         if(!boss) this.world.statusBars.helth.statBar.width -= 2*factor  ;
        else {
            this.world.statusBars.endboss.statBar.width -= 2*factor;
            this.world.statusBars.endboss.statBar.x += 2*factor;
        } 
    }

  /*   let width = this.world.statusBars.endboss.statBar.width;
    if(!boss) this.world.statusBars.helth.statBar.width -= 2*factor  ;
    else {
         (width <= 2*factor)? width = 0 : width -= 2*factor;
        this.world.statusBars.endboss.statBar.x += 2*factor;
    }
 */
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