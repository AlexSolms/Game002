class Charakter extends MovableObject {
  x = 50;
  y = 165; // Diese Werte müssen sich dynamisch anpassen können. Basis ist die Höhe und die Breite des Canvas
  height = 200; // Die Werte müssen sich also skalieren können, wenn sich die Auflösung ändert
  width = 100;

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
    super.loadIamages(this.moveImages);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.moveImages.length;
      let path = this.moveImages[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 130)


  }



  jump() {

  }
}