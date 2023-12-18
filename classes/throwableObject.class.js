class ThrowableObject extends MovableObject {
    width = 40;
    height = 80;
    imgCount = 0;
    bottleHit = false;
    inAir = false;

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
        this.y = character.y - character.height / 4;
        this.animate();
    }

    /**
     * this function plays the spin animation asl long bottle is above ground and switch to the slpash animaition if the ground is hit
     * Need to be change to check if the enemy was hit using the collision option
      */
    animate() {
            this.throw();
            let animationInterval = setInterval(() => {
                if (super.isAboveGround(50)) {
                    super.playAnimation(this.BottleInAirImages);
                    this.inAir = true;
                    console.log(this.imgCount);
                } else {
                    clearInterval(animationInterval); // Stoppe das Intervall, wenn alle Bilder abgespielt wurden
                    this.splash();
                }
            }, 60) 
    }

    /**
     * This function plays the bottle splash animation
     */
    splash() {
        let splashInterval = setInterval(() => {
            if (this.imgCount < 6) {
                super.playAnimation(this.BottleSplash);
                this.imgCount++;
            } else {
                clearInterval(splashInterval); // Stoppe das Intervall, wenn alle Bilder der Splash-Animation abgespielt wurden
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
            if (super.isAboveGround(40)) {
                this.x += 14;
            } else {
                clearInterval(throwInterval); // Stoppe das Intervall, wenn das Objekt den Boden erreicht hat
                console.log()
            }
        }, 40);
    }

}