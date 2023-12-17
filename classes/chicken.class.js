class Chicken extends MovableObject {


  y = 300;
  hitbox_y = this.y;
  width = 60;
  hitbox_width = this.width;
  height = 60;
  hitbox_height = this.height;
  speed = 0.08;
  refreshRate = 10 / 6;
  world;


  moveImages = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ]

  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    super.loadImages(this.moveImages);
    this.x = 200 + Math.random() * 500;
    super.updateHitbox(0, 0); // x für hitbox
    this.speed = 0.08 + Math.random() * 0.10;
    this.animate();
    this.chkCollisionWithCharacter();
    //console.log();
  }


  animate() {
    setInterval(() => {
      super.moveLeft(this.speed);
      this.updateHitbox(0, 0);
    }, this.refreshRate)

    setInterval(() => {
      super.playAnimation(this.moveImages);
    }, 130)
  }
 
  chkCollisionWithCharacter(){
    setInterval(() => {
      if(super.isColliding( this.world.character)) {
        //console.log('hit');
        this.speed = -this.speed; // damit verschwindet das Huhn am linken Bildschirmrand
      //this.otherDirection ? this.otherDirection = false : this.otherDirection = true;
        this.otherDirection = !this.otherDirection;
      //this.x = -this.x;
      }
    }, 1000); // ich will hier eigentlich checken, ob gerade eine Kollision stattgefunden hat.
  }


}