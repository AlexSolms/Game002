class LittleChicken extends Enemies {


  y = 320;
  hitbox_y = this.y;
  width = 40;
  hitbox_width = this.width;
  height = 40;
  hitbox_height = this.height + 80;
  speed = 0.08;
   
  SingleChickeHurtSound = new Audio('./audio/singleChickenDie.mp3');

  


  moveImages = [
    './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ]

  constructor(x) {
    super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    super.loadImages(this.moveImages);
    this.x = x;
    super.updateHitbox(0, 0, 40); 
    this.speed = 0.2 + Math.random() * 0.8;
    this.animate();
    this.chkCollision();
  }

}