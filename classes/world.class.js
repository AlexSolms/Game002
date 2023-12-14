class World {
    charakter = new Charakter();
    level = level1;
    /*  enemies = level1.enemies 
     clouds = level1.clouds
     backgroundObjects = level1.backgroundObjects */
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    setWorld() {
        this.charakter.world = this;
    }

    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.charakter.isColliding(enemy)) {
                    console.log('Collision with Character ', this.charakter.hitbox_x + this.charakter.hitbox_width,' enemy: ', enemy.hitbox_x);
                }
            })
        }, 1000)
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.charakter);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * 
     * This function draws the image of the object with it's parameters for example if its mirroed (otherDirection)
     * @param {Object} mo - object which needs to to be drawed
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImg(mo); // otherDirection wird in einer Instanz für dieses Element gesetzt
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx, this.keyboard.debug);
        if (mo.otherDirection) this.flipImgBack(mo); // reset needed to change this object only
    }

    addObjectsToMap(objects) {
        objects.forEach(e => {
            this.addToMap(e);
        })
    }

    flipImg(mo) {
        this.ctx.save();  // saves the original ctx object
        this.ctx.translate(mo.width, 0); // moves the object with objectwidth to avoid image jump
        this.ctx.scale(-1, 1); // flips the image
        mo.x = mo.x * -1; // set mo object on the mirrored coordinate
        mo.updateHitbox(20, 50); //hitbox
    }

    flipImgBack(mo) {
        mo.x = mo.x * -1 // set object on the mirrored coordinate
        this.ctx.restore() // restores the ctx objekt 
    }



}