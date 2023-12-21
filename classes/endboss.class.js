class Endboss extends Enemies {

  x = 700;
  y = 160;
  width = 200;
  height = 200;
  hitbox_x = this.x;
  hitbox_y = this.y - 70;
  hitbox_width = this.width;
  hitbox_height = this.height - 50;
  speed = 0.08;
  refreshRate = 10 / 6;
  world;

  moveImages = [
    './img/4_enemie_boss_chicken/1_walk/G1.png',
    './img/4_enemie_boss_chicken/1_walk/G2.png',
    './img/4_enemie_boss_chicken/1_walk/G3.png',
    './img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  constructor() {
    super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    super.loadImages(this.moveImages);
    //super.updateHitbox(0, 0, 40); // x für hitbox
    this.x = 700;
    this.animate();
  }

  animate() {

    setInterval(() => {
      super.updateHitbox(20, 50, -20);
      super.playAnimation(this.moveImages);
    }, 130)


  }


  /**
  * this function checks if the chicken was hit by the bottle
  */
  chkCollisionWithbottle() {
    if (this.world.bottleInAir && super.isColliding(this.world.bottleToThrow)) {
      this.showEndbossHurt();
    }
  }

  showEndbossHurt(){

  }


}