class MovableObject extends DrawableObject{
   
    hitbox_x; // x für hitbox
    hitbox_y;
    hitbox_height;
    hitbox_width;    
    speed;
    otherDirection = false;
    energy = 100;
    lastHit;

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
        if (keyboardDebug && (this instanceof Charakter || this instanceof Chicken || this instanceof Endboss)) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'grey';
            ctx.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
            ctx.stroke();
        }
    }

    isCollidingNeu(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height) &&
            obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }

    isColliding(mo) {
        return this.hitbox_x + this.hitbox_width > mo.hitbox_x &&
            this.hitbox_y + this.hitbox_height > mo.hitbox_y &&
            this.hitbox_x < mo.hitbox_x &&
            this.hitbox_y < mo.hitbox_y + mo.hitbox_height;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft(speed) {
        this.x -= speed;
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