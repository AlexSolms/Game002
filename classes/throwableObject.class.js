class ThrowableObject extends MovableObject {
    width = 40;
    hitbox_width = this.width;
    height = 80;
    hitbox_height = this.height - 20;
    imgCount = 0;
    bottleHit = false;
    inAir = false;
    hitEnemy = false;
    world;
    mute;
    splashSound = new Audio('./audio/water-splash.mp3');

    BottleInAirImages = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    BottleSplash = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(character) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        super.loadImages(this.BottleInAirImages);
        super.loadImages(this.BottleSplash);
        this.x = character.x + character.hitbox_width;
        this.hitbox_x = this.x;
        this.y = character.y + character.height / 8; // hier muss ich noch was anpassen, die Flasche fliegt nicht mehr so hoch
        this.hitbox_y = this.y;
        this.animate();
    }

    /**
     * this function plays the spin animation as long bottle is above ground and switch to the slpash animaition if hits hits the ground or an enemy
     */
    animate() {
        this.throw();
        let animationInterval = setInterval(() => {
            if (this.hitEnemy || !super.isAboveGround(50)) {
                clearInterval(animationInterval); // Stops interval of spinning bottle if bottle hits the ground or an enemy
                this.splash();
                this.world.mute ? this.splashSound.pause() : this.splashSound.play();
            } else {
                
                super.playAnimation(this.BottleInAirImages);
                this.updateBottleHitbox();
                this.inAir = true;
            }
        }, 60)
    }


    /**
     * This function plays the bottle splash animation
     */
    splash() {
        let splashInterval = setInterval(() => {
         /*    if(this.world.mute) {
                this.splashSound.pause;
            }
            else{ */
            // this.splashSound.play;
          /*   } */
            if (this.imgCount < 6) {
                
                this.updateBottleHitbox();
                super.playAnimation(this.BottleSplash);
                this.imgCount++;
            } else {
                clearInterval(splashInterval); // Stops interval,when all images of Splash-Animation was played
                this.bottleHit = true;
                this.inAir = false;
            }
        }, 50);
    }

    /**
     * this function provides the logic for the movment of the bottle while throwing
     */
    throw() {
        this.speedY = 15;
        super.applyGravity(95);
        let throwInterval = setInterval(() => {
            if (super.isAboveGround(30)) {
                this.x += 15;
            } else {
                clearInterval(throwInterval); // Stops interval,when object hit the ground
            }
        }, 40);
    }

    /**
     * this function just updates the hitbox
     */
    updateBottleHitbox() {
        this.hitbox_x = this.x;
        this.hitbox_y = this.y;
        this.hitbox_height = 60;
        this.hitbox_width = 35;
    }

}