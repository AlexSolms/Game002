class Charakter extends MovableObject {
  x = 50;
  y = 165; // Diese Werte müssen sich dynamisch anpassen können. Basis ist die Höhe und die Breite des Canvas
  height = 200; // Die Werte müssen sich also skalieren können, wenn sich die Auflösung ändert
  width = 100;
  speed = 3;
  world;
  walkingSound = new Audio('./audio/footstep2.mp3');

  moveImages = [
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png',
  ]


  constructor() {
    super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
    super.loadImages(this.moveImages);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walkingSound.pause();
      if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walkingSound.play();
      }
      if (this.world.keyboard.left && this.x > 48) {
        this.x -= this.speed;

        this.otherDirection = true;
        this.walkingSound.play();
      }
      //hier muss eine Logic rein. Wenn this.x eine bestimmte Stelle erreicht hat, dann darf sich das Bild nicht mehr verschieben
      this.world.camera_x = -this.x + 50; // for moving teh complete content in oppsite direcrion of the charakter, die 50 ist der Startpunkt des Charakters
    }, 100 / 6)
    setInterval(() => {
      // das kommt in die move Funktion später
      if (this.world.keyboard.right || this.world.keyboard.left) {
        //laufanimation
        super.playAnimation(this.moveImages);
      }
    }, 130)


  }



  jump() {

  }
}