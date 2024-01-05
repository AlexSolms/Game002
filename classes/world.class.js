class World {
    character = new Character();
    statusBars = new StatusBars();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarBoss = new StatusBarBoss();
    level = level1;
    bottleToThrow; // = new ThrowableObject(this.character); //this.character
    maxBottleCount;
    bottleCount = 0;
    coinCount = 0;
    maxCointCount;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleInInv = true;
    bottleInAir = false;
    lost = false;
    won = false;
    runInterval;

    endbossArea = {
        left: 400,
        right: 1000
    }

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
        this.level.endboss.world = this;
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].world = this;
        }
    }

    /**
     * this function call a interval for repeating the checks for bottles and collisions
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkThrowObject();
            this.checkCollisions();
        }, 100) // wichtig, kann man noch verkleinern, damit sich der Char nicht in den Gegneer bewegt
    }

    /**
     * this function checks if the caracter is in a colission with an enemy.
     */
    checkCollisions() {
        this.chickenCollision();
        this.collectBottles();
        this.collectCoins();
        this.bossAttack();
        this.characterDead();
    }

    /**
     * this function controls the bevaviour of the special enemy with different collions
     */
    chickenCollision(){
        this.level.enemies.forEach((enemy) => {
            this.chickenAttack(enemy);
            this.characterJumpsOfChicken(enemy);
            this.bottleHitEnemy(enemy);
        })
    }

    /**
     * this function checks if the chicken hits the character
     * @param {Object} enemy - the explizit enemy object
     */
    chickenAttack(enemy){
        if (this.character.isColliding(enemy) && !this.character.fallingDown && !enemy.chickenDead) {
            this.character.reduceEnergy(10);
            enemy.changeCickenDirection();
            this.reduceHealthbar(this.character.energy, this.statusBarHealth.statusHealthImages);
        }
    }

    /**
     * this function checks if character hits chicken on top an shows start show chicken death
     * @param {Object} enemy - the explizit enemy object
     */
    characterJumpsOfChicken(enemy) {
        if (this.character.isColliding(enemy) && this.character.fallingDown && !enemy.chickenDead) {
           // if (enemy instanceof Chicken) 
            enemy.showChickenDeath();
        }
    }

    /**
     * this function checks if bottle hits the enemy and sets flags
     * @param {Object} enemy - the explizit enemy object
     * hier kann ich dann den boss übergeben solabd ich ihn ausgegliedert habe.
     */
    bottleHitEnemy(enemy) {
        if (this.bottleToThrow && this.bottleToThrow.isColliding(enemy)) {
            // console.log(this.bottleToThrow);
            this.bottleToThrow.hitEnemy = true;
            if (!this.bottleToThrow.inAir) {
                this.bottleToThrow = null; // über gibt diese Instanz dem Garbage collector
            }
        }
    }

    bossAttack() {
        if (this.character.isColliding(endboss) && !this.character.fallingDown && !endboss.chickenDead) {
            this.character.reduceEnergy(20);
            this.reduceHealthbar(this.character.energy, this.statusBarHealth.statusHealthImages);
            endboss.attackSuccuess = true;
        }
    }

    /**
     * this function collects the bottles
     */
    collectBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                console.log('bottle hit');
                this.level.bottles.splice(index, 1);
                this.bottleCount++;
                console.log('bottles: ', this.bottleCount);
            }
        })
    }

    /**
     * this function collects the coins
     */
    collectCoins() {
        this.level.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                console.log('coins hit');
                this.level.coins.splice(index, 1);
                this.coinCount++;
                console.log('coins: ', this.coinCount);
            }
        })
    }

    /**
     * this function stops all intervalls and set the flag for lost screen
     */
    characterDead() {
        if (this.character.energy == 0) {
            console.log(this.character.energy);
            this.lost = true;
            clearInterval(this.runInterval);
            this.level.enemies.forEach((enemy) => enemy.clearAllIntervals());
            this.level.endboss.clearAllIntervals();
        }
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
    reduceHealthbar(energy, ImgSet) {
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
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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
        
        this.addToMap(this.statusBars.charHelth.backBar);
        this.addToMap(this.statusBars.charHelth.statBar);
        this.addToMap(this.statusBars.charHelth.icon);
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
        if (!(objectToDraw instanceof StatusBar)&&!(objectToDraw instanceof StatusBarObjects)) objectToDraw.drawFrame(this.ctx, this.keyboard.debug);
        if (objectToDraw.otherDirection) this.flipImgBack(objectToDraw); // reset needed to change this object only
    }

    /**
     * this function removes the dead chicken after few moments
     */
    drawChicken() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if ((enemy instanceof Chicken) && (new Date().getTime() - enemy.deathTimeStamp) > 500) {
                this.level.enemies.splice(i, 1);
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
        if (mo instanceof Character) mo.updateHitbox(20, 50, 0);
        if (mo instanceof Chicken) mo.updateHitbox(0, 0, 20);

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