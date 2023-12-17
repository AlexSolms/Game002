class MovableObject extends DrawableObject{
   
    hitbox_x; // x für hitbox
    hitbox_y;
    hitbox_height;
    hitbox_width;    
    speed;
    otherDirection = false;
    energy = 100;
    lastHit;
  
    speedY = 0; //Geschwindigkeit des Körpers
  acceleration = 2.5; // Beschleunigung des Körpers

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
        if (keyboardDebug && (this instanceof Character || this instanceof Chicken || this instanceof Endboss)) {
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
        return this.hitbox_x + this.hitbox_width > mo.hitbox_x && //1
            this.hitbox_y + this.hitbox_height > mo.hitbox_y && // 3
            this.hitbox_x < (mo.hitbox_x + mo.hitbox_width)&& //mo.hitbox_x 
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
    
    jump(jumpHight) {
        this.speedY = jumpHight;
    }
    updateHitbox(offsetX, offsetWidth) {
        this.hitbox_x = this.x + offsetX;
        this.hitbox_y = this.y;
        this.hitbox_width = this.width - offsetWidth;
        this.hitbox_height = this.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy === 0;
    }

    isHurt() {
        let timepassed = (new Date().getTime() - this.lastHit)
        //console.log((timepassed) );
        return timepassed < 500;
    }
}