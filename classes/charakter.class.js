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

hurtImages=[
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


  constructor() {
    super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
    super.loadImages(this.moveImages);
    super.loadImages(this.jumpImages);
    super.loadImages(this.deadImages);
    super.loadImages(this.hurtImages);
    super.applyGravity(0);
    this.animate();
    super.updateHitbox(20, 50);
  }

  


  animate() {
    setInterval(() => {
      this.walkingSound.pause();
      this.checkIfFallingDown();
      if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
        super.moveRight();
        this.otherDirection = false;
        super.updateHitbox(20, 50); // Hitbox
        this.walkingSound.play();
      }
      if (this.world.keyboard.left && this.x > 48) {
        this.moveLeft(this.speed);
        this.otherDirection = true;
        this.walkingSound.play();
      }
      if (this.world.keyboard.up && !this.isAboveGround()) {
        super.jump(30);
      }
      //hier muss eine Logic rein. Wenn this.x eine bestimmte Stelle erreicht hat, dann darf sich das Bild nicht mehr verschieben
      this.world.camera_x = -this.x + 50; // for moving teh complete content in oppsite direcrion of the charakter, die 50 ist der Startpunkt des Charakters
    }, 100 / 6)

    setInterval(() => {
      // das kommt in die move Funktion später
      super.updateHitbox(20, 50);// Hitbox
      if (this.isDead()) {
        super.playAnimation(this.deadImages);
      } else if (this.isHurt()){ // hurt soll nur ausgelöst werden, wenn der Chakter nicht von oben herunterfällt
        super.playAnimation(this.hurtImages);
      } else if (this.isAboveGround()) {
        super.playAnimation(this.jumpImages);
      } else {
        if (this.world.keyboard.right || this.world.keyboard.left) {
          //laufanimation
          super.playAnimation(this.moveImages);
        }
      }
    }, 130)

    
  }

  /**
   * this function sets the falling down flag true in case the character falls down
   */
  checkIfFallingDown(){
    if(!this.isAboveGround()) this.fallingDown = false;
  }

}