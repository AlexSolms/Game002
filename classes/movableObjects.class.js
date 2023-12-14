class MovableObject {
    x;
    hitbox_x; // x für hitbox
    y;
    hitbox_y;
    height;
    hitbox_height;
    width;
    hitbox_width;
    img;
    imageCache = {};
    currentImage = 0;
    speed;
    otherDirection = false;
    /*  OFFSET_X = 20;
      OFFSET_WIDTH = 50; */
    energy = 100;
    lastHit;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * this function loads all imgages of an image set to the image cache.
     * @param {Array} imgSet - ['./img/image1.png, ./img/image2.png,...]
     */
    loadImages(imgSet) {
        imgSet.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
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
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    isDead(){
        return this.energy === 0;
    }

    isHurt(){

let timepassed = (new Date().getTime() - this.lastHit)
//console.log((timepassed) );
return timepassed <500;
    }
}