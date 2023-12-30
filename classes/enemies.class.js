class Enemies extends MovableObject{
    world = {};
    refreshRate = 10 / 6;
    chickenDead = false;
    deathTimeStamp;


    /**
   * this function changes the walk direction of a chicken
   */
  changeCickenDirection() {
    this.speed = -this.speed; // damit verschwindet das Huhn am linken Bildschirmrand
    this.otherDirection = !this.otherDirection;
  }

}