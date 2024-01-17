class Enemies extends MovableObject{
    world = {};
    refreshRate = 10 / 6;
    chickenDead = false;
    deathTimeStamp;
    intervalChickenMove;
    intervalChickenAnimation;
    intervalChickenCollision;

    /**
   * this function changes the walk direction of a chicken
   */
  changeCickenDirection() {
    this.speed = -this.speed; // damit verschwindet das Huhn am linken Bildschirmrand
    this.otherDirection = !this.otherDirection;
  }

/**
   * this function strats the intervals for chicken
   */
animate() {
  this.intervalChickenMove = setInterval(() => {
    if (this.x - this.world.character?.x < 1000 && this.world.character?.x > 80) {
      super.moveLeft(this.speed);
      this.updateHitbox(0, 0, 20);
    }
  }, this.refreshRate)
  this.intervalChickenAnimation = setInterval(() => {
    if (this.x - this.world.character?.x < 1000 && this.world.character?.x > 80) 
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
  super.loadImage('./img/3_enemies_chicken/chicken_small/2_dead/dead.png');
  this.world.mute ? this.SingleChickeHurtSound.pause() : this.SingleChickeHurtSound.play();
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