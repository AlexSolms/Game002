class Chicken extends Enemies {


  y = 300;
  hitbox_y = this.y;
  width = 60;
  hitbox_width = this.width;
  height = 60;
  hitbox_height = this.height;
  speed = 0.08;
  //refreshRate = 10 / 6;

  intervalChickenMove;
  intervalChickenAnimation;
  intervalChickenCollision;



  moveImages = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ]

  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    super.loadImages(this.moveImages);
    this.x = 400 + Math.random() * 2000;
    super.updateHitbox(0, 0, 40); 
    this.speed = 0.4 + Math.random() * 0.10;
    this.animate();
    this.chkCollision();
  }


  /**
   * this function strats the intervals for chicken
   */
  animate() {
    this.intervalChickenMove = setInterval(() => {
      if (this.world.character?.x > 80) {
        super.moveLeft(this.speed);
        this.updateHitbox(0, 0, 20);
      }
    }, this.refreshRate)
    this.intervalChickenAnimation = setInterval(() => {
      if (this.world.character?.x > 80)
        super.playAnimation(this.moveImages);
    }, 130)
  }

  /**
   * this function contains the interval for checking the collision with character or bottle
   */
  chkCollision() {
    this.intervalChickenCollision = setInterval(() => {
      this.chkCollisionWithbottle();
    }, 100);
  }

  /**
   * this function checks if the chicken was hit by the bottle
   */
  chkCollisionWithbottle() {
    if (this.world.bottleInAir && super.isColliding(this.world.bottleToThrow)) {
      this.showChickenDeath();
    }
  }

  /**
   * this function loads the death image, set the flag and stops all animation intervals
   */
  showChickenDeath() {
    super.loadImage('./img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    this.clearAllIntervals();
    this.chickenDead = true;
    this.deathTimeStamp = new Date().getTime();
  }

  /**
   * this function clears all intervals zu stop any animation or movement
   */
  clearAllIntervals() {
    clearInterval(this.intervalChickenMove);
    clearInterval(this.intervalChickenAnimation);
    clearInterval(this.intervalChickenCollision);
  }

}