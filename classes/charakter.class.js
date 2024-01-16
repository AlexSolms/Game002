class Character extends MovableObject {
  x = 50;
  y = 165
  height = 200;
  width = 100;
  speed = 3;
  world;
  walkingSound = new Audio('./audio/footstep2.mp3');
  deathManSound = new Audio('./audio/death_man.wav');
  ouchSound = new Audio('./audio/ouch.mp3');
  idleTimeStart = new Date().getTime();
  leftBorder = this.width / 2;
  intervalCharMove;
  intervalCharAnim;
  maxHitPoints = 100;
  death = false;
  deathImage = 0;
  deathStart = true;

  moveImages = [
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png'
  ];

  jumpImages = [
    './img/2_character_pepe/3_jump/J-31.png',
    './img/2_character_pepe/3_jump/J-32.png',
    './img/2_character_pepe/3_jump/J-33.png',
    './img/2_character_pepe/3_jump/J-34.png',
    './img/2_character_pepe/3_jump/J-35.png',
    './img/2_character_pepe/3_jump/J-36.png',
    './img/2_character_pepe/3_jump/J-37.png',
    './img/2_character_pepe/3_jump/J-38.png',
    './img/2_character_pepe/3_jump/J-39.png'
  ];

  hurtImages = [
    './img/2_character_pepe/4_hurt/H-41.png',
    './img/2_character_pepe/4_hurt/H-42.png',
    './img/2_character_pepe/4_hurt/H-42.png'
  ];

  deadImages = [
    './img/2_character_pepe/5_dead/D-51.png',
    './img/2_character_pepe/5_dead/D-52.png',
    './img/2_character_pepe/5_dead/D-53.png',
    './img/2_character_pepe/5_dead/D-54.png',
    './img/2_character_pepe/5_dead/D-55.png',
    './img/2_character_pepe/5_dead/D-56.png',
    './img/2_character_pepe/5_dead/D-57.png'
  ];

  idleImages = [
    './img/2_character_pepe/1_idle/idle/I-1.png',
    './img/2_character_pepe/1_idle/idle/I-2.png',
    './img/2_character_pepe/1_idle/idle/I-3.png',
    './img/2_character_pepe/1_idle/idle/I-4.png',
    './img/2_character_pepe/1_idle/idle/I-5.png',
    './img/2_character_pepe/1_idle/idle/I-6.png',
    './img/2_character_pepe/1_idle/idle/I-7.png',
    './img/2_character_pepe/1_idle/idle/I-8.png',
    './img/2_character_pepe/1_idle/idle/I-9.png',
    './img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  longIdleImages = [
    './img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];


  constructor() {
    super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
    super.loadImages(this.moveImages);
    super.loadImages(this.jumpImages);
    super.loadImages(this.deadImages);
    super.loadImages(this.hurtImages);
    super.loadImages(this.idleImages);
    super.loadImages(this.longIdleImages);
    super.applyGravity(0);
    this.animate();
    super.updateHitbox(20, 50, -80);
  }

  /**
   * this function contains the intervals for all animation function for the character
   */
  animate() {
    this.intervalCharMove = setInterval(() => {
      if (!startScreen) {
        this.walkingSound.pause();
        this.movementLogic();
        if (this.x < (this.world.endbossArea.left + 100)) this.world.camera_x = -this.x + 50;
      }
    }, 100 / 8)
    this.intervalCharAnim = setInterval(() => this.animationLogic(), 120)
  }

  /**
   * this logic calls function for movement of the character
   */
  movementLogic() {
    this.checkIfFallingDown();
    this.characterMoveRight();
    this.characterMoveLeft();
    this.characterJump();
  }

  /**
   * this function contains the image animation logic for all process steps 
   */
  animationLogic() {
    this.resetIdletime();
    if (super.isDead()) this.deadRoutine();
    else if (super.isHurt()) this.hurtRoutine();
    else if (super.isAboveGround()) super.playAnimation(this.jumpImages);
    else if (this.world.keyboard.right || this.world.keyboard.left) super.playAnimation(this.moveImages);
    else if ((new Date().getTime() - this.idleTimeStart) > 5000) super.playAnimation(this.longIdleImages);
    else super.playAnimation(this.idleImages);
  }

  /**
   * this function resets the iddel time in the animation logic
   */
  resetIdletime() {
    if (super.isHurt() || super.isAboveGround() || this.world.keyboard.press)
      this.idleTimeStart = new Date().getTime();
  }

  /**
   * this function covers the logic for the right movment
   */
  characterMoveRight() {
    if (this.world.keyboard.right && this.x < this.world.level.levelEndX && !super.isHurt()) {
      super.moveRight();
      this.otherDirection = false;
      super.updateHitbox(20, 50, -80);
      super.isAboveGround() || this.world.mute || this.world.lost || this.world.true ? this.walkingSound.pause() : this.walkingSound.play();
      if (this.x >= this.world.endbossArea.left) {
        this.leftBorder = this.world.endbossArea.left + this.width / 2; // set new border for the final fight
      }
    }
  }

  /**
 * this function covers the logic for the left movment
 */
  characterMoveLeft() {
    if (this.world.keyboard.left && this.x > this.leftBorder && !super.isHurt()) {
      super.updateHitbox(20, 50, -80);
      this.moveLeft(this.speed);
      this.otherDirection = true;
      super.isAboveGround() || this.world.mute || this.world.lost || this.world.true ? this.walkingSound.pause() : this.walkingSound.play();
    }
  }

  /**
   * this function covers the logic for the jump movment
   */
  characterJump() {
    if (this.world.keyboard.jump && !this.isAboveGround() && !super.isHurt()) {
      super.jump(30);
    }
  }

  /**
   * this function sets the falling down flag true in case the character falls down
   */
  checkIfFallingDown() {
    if (!super.isAboveGround()) this.fallingDown = false;
    super.updateHitbox(20, 50, -80);
  }

  /**
   * this function reduces the energy of the charakter
   * @param {Number} factor 
   */
  reduceEnergy(factor) {
    if (!this.isAboveGround(0)) {
      this.hit(factor, false);
      this.x -= 5;
    }
  }

  /**
   * this function plays the dead animation and sets the death flag
   */
  deadRoutine(){
    if (this.deathStart) {
      this.currentImage = 0;
      this.deathStart = false;
    }
    if (this.deathImage < this.deadImages.length) {
      super.playAnimation(this.deadImages);
      this.deathImage++;
    }
    else {
      this.world.mute ? this.deathManSound.pause() : this.deathManSound.play();
      this.death = true;
    }
  }

  /**
   * this function plays the hurt animation and the hurt sound
   */
  hurtRoutine(){
    super.playAnimation(this.hurtImages);
    this.world.mute ? this.ouchSound.pause() : this.ouchSound.play();
  }

  /**
   * this function stops the intervals for character
   */
  stopCharInterval() {
    clearInterval(this.intervalCharMove);
    clearInterval(this.intervalCharAnim);
  }
}

