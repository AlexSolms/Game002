class Endboss extends Enemies {
  startPosition = 1000;
  x = this.startPosition;
  y = 160;
  width = 200;
  height = 200;
  hitbox_x = this.x;
  hitbox_y = this.y - 70;
  hitbox_width = this.width;
  hitbox_height = this.height - 50;
  startSpeed = 1.8;
  speed = this.startSpeed;
  refreshRate = 10 / 6;
  attackSuccuess = false;
  world;
  alertStart = new Date().getTime();
  firstContactWithBoss = true;
  borderHit = false;
  flagBossAlert = true;
  flagBossWalk = false;
  flagNewAttack = true;
  bossHitPoints = 100;

  moveInterval;
  animationInteral;

  walkImages = [
    './img/4_enemie_boss_chicken/1_walk/G1.png',
    './img/4_enemie_boss_chicken/1_walk/G2.png',
    './img/4_enemie_boss_chicken/1_walk/G3.png',
    './img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  attackImages = [
    './img/4_enemie_boss_chicken/3_attack/G13.png',
    './img/4_enemie_boss_chicken/3_attack/G17.png',
    './img/4_enemie_boss_chicken/3_attack/G18.png',
    './img/4_enemie_boss_chicken/3_attack/G19.png',
    './img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  aleartImages = [
    './img/4_enemie_boss_chicken/2_alert/G5.png',
    './img/4_enemie_boss_chicken/2_alert/G6.png',
    './img/4_enemie_boss_chicken/2_alert/G7.png',
    './img/4_enemie_boss_chicken/2_alert/G8.png',
    './img/4_enemie_boss_chicken/2_alert/G9.png',
    './img/4_enemie_boss_chicken/2_alert/G10.png',
    './img/4_enemie_boss_chicken/2_alert/G11.png',
    './img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  hurtImages = [
    './img/4_enemie_boss_chicken/4_hurt/G21.png',
    './img/4_enemie_boss_chicken/4_hurt/G22.png',
    './img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  deadImages = [
    './img/4_enemie_boss_chicken/5_dead/G24.png',
    './img/4_enemie_boss_chicken/5_dead/G25.png',
    './img/4_enemie_boss_chicken/5_dead/G26.png',
  ]

  constructor() {
    super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    super.loadImages(this.walkImages);
    super.loadImages(this.attackImages);
    super.loadImages(this.aleartImages);
    super.loadImages(this.hurtImages);
    super.loadImages(this.deadImages);
    //this.movementLogic();
    //super.updateHitbox(0, 0, 40); // x für hitbox

    this.animate();
  }


  animate() {
    this.moveInterval = setInterval(() => {
      if (this.flagBossWalk && !this.chickenDead) {
        this.movementLogic();
      }
    }, this.refreshRate);//this.refreshRate

    this.animationInteral = setInterval(() => {
      if (!this.chickenDead) {
        super.updateHitbox(20, 50, -20);
        this.bossAlert();
        this.bossWalk();
        this.chkCollisionWithbottle();
      }
    }, 130);

  }

  //Flags: bossAlert, boss walk, bossColliosion, otherDirection

  // bossAlert-Funktion
  bossAlert() {
    let timeDiv;
    let borderChk = this.world.character.leftBorder >= this.world.endbossArea.left;
    this.startTimerFirstContact(borderChk);
    timeDiv = new Date().getTime() - this.alertStart;
    if (this.borderHit) {
      this.startAnimation(timeDiv);
      this.standardAlert(timeDiv);
    }
  }

  /**
   * this function sets the start time for the startAnimation() function
   * @param {Boolean} borderChk - true if character hits the boss area
   */
  startTimerFirstContact(borderChk) {
    if (borderChk && !this.borderHit) {
      this.alertStart = new Date().getTime();
      this.borderHit = true;
    }
  }

  /**
   * this function plays the start animation 
   * @param {Number} timeDiv - represents the time in ms between actual time and saved start time
   */
  startAnimation(timeDiv) {
    if (timeDiv < 2000 && this.firstContactWithBoss) {
      super.playAnimation(this.aleartImages);
    } else if (this.firstContactWithBoss) { //this.borderHit && 
      this.firstContactWithBoss = false;
      this.alertStart = new Date().getTime();
    }
  }

  standardAlert(timeDiv) {
    //console.log(timeDiv);

    if (!this.firstContactWithBoss && this.flagBossAlert && timeDiv < 2000) {
      super.playAnimation(this.aleartImages);
      //this.flagNewAttack= false;
      //console.log('m');
    } else if (!(timeDiv < 2000) && !this.firstContactWithBoss) {
      this.flagBossAlert = false;
      this.flagBossWalk = true;
      this.attackSuccuess = false;
      //this.flagNewAttack = true;
      if (this.flagNewAttack) this.speed = 0.8;
    }
  }

  bossWalk() {
    if (this.flagBossWalk) {

      if ((this.x - this.world.character.x) < 100)
        super.playAnimation(this.attackImages);
      else super.playAnimation(this.walkImages);
    }
  }

  movementLogic() {
    super.updateHitbox(20, 50, -20);
    super.moveLeft(this.speed);

    if (this.attackSuccuess && this.flagNewAttack || this.x <= this.world.character.x) {
      super.changeCickenDirection();
      this.attackSuccuess = false;
      this.flagNewAttack = false;
    }
    if (this.x > this.world.endbossArea.right) {

      this.x = this.startPosition;

      super.changeCickenDirection();
      this.flagBossAlert = true;
      this.flagBossWalk = false;
      this.flagNewAttack = true;
      this.alertStart = new Date().getTime();

    }

  }

 
  chkCollisionWithbottle() {
    if (this.world.bottleInAir && super.isColliding(this.world.bottleToThrow)) {
      this.showEndbossHurt();
    }
  }

  showEndbossHurt() {
    //Aktuell bekommt der Boss noch mehrfach Schaden, wenn die Flasche an ihm zerschellt. Ich brauche also ein flag, dass mir zeigt 
    super.playAnimation(this.hurtImages);
    super.hit();
    console.log('Energy: ', this.energy);
    if (super.isDead()) {
      super.playAnimation(this.deadImages);
      this.showChickenDeath();
    
    
    }
  }

  /**
 * this function loads the death image, set the flag and stops all animation intervals
 */
  showChickenDeath() {
    super.loadImage('./img/4_enemie_boss_chicken/5_dead/G26.png');
    this.clearAllIntervals();
    this.chickenDead = true;
    this.deathTimeStamp = new Date().getTime();
  }

  /**
 * this function clears all intervals zu stop any animation or movement
 */
  clearAllIntervals() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInteral);
    // clearInterval(this.intervalCollision);
  }

}