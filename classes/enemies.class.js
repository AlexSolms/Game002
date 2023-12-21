class Enemies extends MovableObject{
    world = {};

    /**
   * this function changes the walk direction of a chicken
   */
  changeCickenDirection() {
    this.speed = -this.speed; // damit verschwindet das Huhn am linken Bildschirmrand
    this.otherDirection = !this.otherDirection;
  }

}