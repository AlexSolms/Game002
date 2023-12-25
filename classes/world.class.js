class World {
    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarBoss = new StatusBarBoss();
    level = level1;
    bottleToThrow; // = new ThrowableObject(this.character); //this.character
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleInInv = true;
    bottleInAir = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
        this.draw();        
    }

    /**
     * this function provides the instanzes of character and each enemy the methodes and values of the world class.
     */
    setWorld() {
        this.character.world = this;
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].world = this;
        }
    }

    /**
     * this function call a interval for repeating the checks for bottles and collisions
     */
    run() {
        setInterval(() => {
            this.checkThrowObject();
            this.checkCollisions();
            
        }, 50) // wichtig, kann man noch verkleinern, damit sich der Char nicht in den Gegneer bewegt
    }


    /**
     * this function checks if the caracter is in a colission with an enemy.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.fallingDown && !enemy.chickenDead) {
                this.character.hit();
                this.character.x -= 5;
                enemy.changeCickenDirection();
                if(enemy instanceof Endboss) {
                    enemy.attackSuccues = true;
                    console.log(this.level.enemies[0].attackSuccues)
                }
                this.reduceHealthbar(this.character.energy, this.statusBarHealth.statusHealthImages);  
            }
            if(this.character.isColliding(enemy) && this.character.fallingDown && !enemy.chickenDead){
                enemy.showChickenDeath();
                
            }
            if(this.bottleToThrow && this.bottleToThrow.isColliding(enemy)) {
                console.log(this.bottleToThrow);
                this.bottleToThrow.hitEnemy = true;
                if(!this.bottleToThrow.inAir){
                    this.bottleToThrow = null; // über gibt diese Instanz dem Garbage collector
                }
            }
            
        })
    }

    /**
     * this function creates a new instanz of a bottle
     */
    checkThrowObject() {
        if (this.keyboard.E && this.bottleInInv && !this.bottleInAir) {
            this.bottleToThrow = new ThrowableObject(this.character);
            this.bottleInAir = true;
        }
    }

    /**
     * this function can go to the statusbar class. It only calls the image for the status bar.
     */
    reduceHealthbar(energy, ImgSet){
        this.statusBarHealth.setPercentage(energy, ImgSet);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawFlexElements();
        this.drawStaticElements();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * this function contains all elements which change its postitions within the canvas
     */
    drawFlexElements() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.drawChicken();
        
        this.addObjectsToMap(this.level.clouds);
        this.drawBottle();

        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * this function only draws a bottle if no bottle is in air and if a bottle is in Inv
     */
    drawBottle() {
        if (this.bottleToThrow != undefined && !this.bottleToThrow.bottleHit) {
            this.addToMap(this.bottleToThrow); // statt der undefined bedinngung muss hier dann die Variable rein ob Flaschen im Inventar sind     
        } else this.bottleInAir = false;
    }

    /**
     *  this function contains all elements which have static postitions within the canvas
     */
    drawStaticElements() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        if (this.character.x > 300) this.addToMap(this.statusBarBoss);
    }

    /**
     * 
     * This function draws the image of the object with it's parameters for example if its mirroed (otherDirection)
     * @param {Object} objectToDraw - object which needs to to be drawed
     */
    addToMap(objectToDraw) {
        if (objectToDraw.otherDirection) this.flipImg(objectToDraw); // otherDirection wird in einer Instanz für dieses Element gesetzt
        objectToDraw.draw(this.ctx);
        if (!(objectToDraw instanceof StatusBar)) objectToDraw.drawFrame(this.ctx, this.keyboard.debug);

        if (objectToDraw.otherDirection) this.flipImgBack(objectToDraw); // reset needed to change this object only
    }

    /**
     * this function removes the dead chicken after few moments
     */
    drawChicken(){
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if((new Date().getTime() - enemy.deathTimeStamp) > 500){
                this.level.enemies.splice(i,1);
            } 
        }
        this.addObjectsToMap(this.level.enemies);
    }
    
    /**
     * 
     * This function draws each elements of the provided object.
     * @param {Object} objects - repesents a set of similar objects which needs to draw
     */
    addObjectsToMap(objects) {
        objects.forEach(e => {
            this.addToMap(e);
        })
    }

    /**
     * 
     * this function saves the context of the canvas and flipps a single object (mo) 
     * @param {object} mo - represents the instanz which needs to flip 
     */
    flipImg(mo) {
        this.ctx.save();  // saves the original ctx object
        this.ctx.translate(mo.width, 0); // moves the object with objectwidth to avoid image jump
        this.ctx.scale(-1, 1); // flips the image
        mo.x = mo.x * -1; // set mo object on the mirrored coordinate
        if(mo instanceof Character)  mo.updateHitbox(20, 50, 0); 
        if(mo instanceof Chicken)  mo.updateHitbox(0, 0, 20); 
    
    }

    /**
     * 
     * @param {object} mo 
     */
    flipImgBack(mo) {
        mo.x = mo.x * -1 // set object on the mirrored coordinate
        this.ctx.restore() // restores the ctx objekt 
    }



}