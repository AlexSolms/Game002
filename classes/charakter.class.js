class Charakter extends MovableObject {
  x = 50;
  y = 165//-150;//165; // Diese Werte müssen sich dynamisch anpassen können. Basis ist die Höhe und die Breite des Canvas
  height = 200; // Die Werte müssen sich also skalieren können, wenn sich die Auflösung ändert
  width = 100;
  speed = 3;
  world;
  walkingSound = new Audio('./audio/footstep2.mp3');
  speedY = 0; //Geschwindigkeit des Körpers
  acceleration = 2.5; // Beschleunigung des Körpers

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

  constructor() {
    super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
    super.loadImages(this.moveImages);
    super.loadImages(this.jumpImages);
    this.applyGravity();
    this.animate();

  }

  applyGravity() {

    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        if (this.y > 165) { this.y = 165; } // damit fange ich ab, dass Pepe tifer sinkt als er soll
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25)

  }

  isAboveGround() {
    return this.y < 165;
  }

  animate() {
    setInterval(() => {
      this.walkingSound.pause();
      if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
        super.moveRight();
        this.otherDirection = false;
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

      if (this.isAboveGround()) {
        super.playAnimation(this.jumpImages);
      } else {

        if (this.world.keyboard.right || this.world.keyboard.left) {
          //laufanimation
          super.playAnimation(this.moveImages);
        }
      }
    }, 130)


  }

}