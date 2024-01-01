class Character extends MovableObject {
  x = 50;
  // hitbox_x = this.x + 20; // x für hitbox
  y = 165//-150;//165; // Diese Werte müssen sich dynamisch anpassen können. Basis ist die Höhe und die Breite des Canvas
  //hitbox_y = this.y;
  height = 200; // Die Werte müssen sich also skalieren können, wenn sich die Auflösung ändert
  //hitbox_height = this.height;
  width = 100;
  //hitbox_width = this.width - 50;
  speed = 3;
  world;
  walkingSound = new Audio('./audio/footstep2.mp3');
  idleTimeStart = new Date().getTime();
  leftBorder = this.width/2;





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
    super.updateHitbox(20, 50, 0);
  }



/**
 * this function contains the intervals for all animation function for the character
 */
  animate() {
    setInterval(() => {
      this.walkingSound.pause();
      this.movementLogic();
      //hier muss eine Logic rein. Wenn this.x eine bestimmte Stelle erreicht hat, dann darf sich das Bild nicht mehr verschieben
      this.world.camera_x = -this.x + 50; // for moving teh complete content in oppsite direcrion of the charakter, die 50 ist der Startpunkt des Charakters
    }, 100 / 6)
    setInterval(() =>this.animationLogic(), 130)
  }

  movementLogic(){
    this.checkIfFallingDown();
      this.characterMoveRight();
      this.characterMoveLeft();
      this.characterJump();
  }
  /**
   * this function contains the image animation logic for all process steps 
   */
  animationLogic(){
    super.updateHitbox(20, 50, 0);// Hitbox
    this.resetIdletime();
    if (super.isDead()) super.playAnimation(this.deadImages);
    else if (super.isHurt()) super.playAnimation(this.hurtImages);
    else if (super.isAboveGround()) super.playAnimation(this.jumpImages);
    else if (this.world.keyboard.right || this.world.keyboard.left) super.playAnimation(this.moveImages);
    else if ((new Date().getTime() - this.idleTimeStart) > 5000) super.playAnimation(this.longIdleImages);
    else super.playAnimation(this.idleImages);
  }

  /**
   * this function resets the iddel time in the animation logic
   */
  resetIdletime() {
    if (super.isHurt() || super.isAboveGround() || this.world.keyboard.right || this.world.keyboard.left)
      this.idleTimeStart = new Date().getTime();
  }

/**
 * this function covers the logic for the right movment
 */
  characterMoveRight() {
    if (this.world.keyboard.right && this.x < this.world.level.levelEndX && !super.isHurt()) {
      super.moveRight();
      this.otherDirection = false;
      super.updateHitbox(20, 50, 0); // Hitbox
      super.isAboveGround()?this.walkingSound.pause():this.walkingSound.play();
      
      if (this.x >= this.world.endbossArea.left) {
        this.leftBorder = this.world.endbossArea.left + this.width/2; // set new border for the final fight
      }
    }
  }

  /**
 * this function covers the logic for the left movment
 */
  characterMoveLeft() {
    if (this.world.keyboard.left && this.x > this.leftBorder && !super.isHurt()) {
      this.moveLeft(this.speed);
      this.otherDirection = true;
      super.isAboveGround()?this.walkingSound.pause():this.walkingSound.play();
    }
  }

/**
 * this function covers the logic for the jump movment
 */
  characterJump() {
    if (this.world.keyboard.up && !this.isAboveGround() && !super.isHurt()) {
      super.jump(30);
      //this.walkingSound.pause();
    }
  }

  /**
   * this function sets the falling down flag true in case the character falls down
   */
  checkIfFallingDown() {
    if (!super.isAboveGround()) this.fallingDown = false;
  }

}