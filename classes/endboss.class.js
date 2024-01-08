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
  flagNewHurt = true;
  bossHitPoints = 100;
  hitFactor = 15;

  intervalBossMove;
  intervalBossAnimation;

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
    super();
    super.loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    super.loadImages(this.walkImages);
    super.loadImages(this.attackImages);
    super.loadImages(this.aleartImages);
    super.loadImages(this.hurtImages);
    super.loadImages(this.deadImages);
    this.animate();
  }


  /**
   * this function starts the intervals for movement and animation
   */
  animate() {
    this.intervalBossMove = setInterval(() => {
      if (this.flagBossWalk && !this.chickenDead) this.movementLogic();
    }, this.refreshRate);//this.refreshRate
    this.intervalBossAnimation = setInterval(() => {
      if (!this.chickenDead && this.world) {
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

  /**
   * this funktion plays the alert animation if the flag was set and so on
   * @param {Number} timeDiv - provides the time diverence between start and now
   */
  standardAlert(timeDiv) {
    if (!this.firstContactWithBoss && this.flagBossAlert && timeDiv < 2000) {
      super.playAnimation(this.aleartImages);
    } else if (!(timeDiv < 2000) && !this.firstContactWithBoss) {
      this.flagBossAlert = false;
      this.flagBossWalk = true;
      this.attackSuccuess = false;
      if (this.flagNewAttack) this.speed = 0.8;
    }
  }

  /**
   * this function plays the walk animation for the boss
   */
  bossWalk() {
    if (this.flagBossWalk) {
      if ((this.x - this.world.character.x) < 100)
        super.playAnimation(this.attackImages);
      else super.playAnimation(this.walkImages);
    }
  }

  /**
   * this function provides the logic for the boss movement
   */
  movementLogic() {
    super.updateHitbox(20, 50, -20);
    super.moveLeft(this.speed);
    this.hitLeft();
    this.hitRight();
  }

  /**
   * this function provides logic if the boss hits the character
   */
hitLeft(){
  if (this.attackSuccuess && this.flagNewAttack || this.x <= this.world.character.x) {
    super.changeCickenDirection();
    this.attackSuccuess = false;
    this.flagNewAttack = false;
  }
}

  /** 
   * this function provides the logic for the boss if he hits right boss area border
   */
  hitRight(){
    if (this.x > this.world.endbossArea.right) {
      this.x = this.startPosition;
      super.changeCickenDirection();
      this.flagBossAlert = true;
      this.flagBossWalk = false;
      this.flagNewAttack = true;
      this.alertStart = new Date().getTime();
    }
  }

  // hier muss noch eine Logik rein die dem Boss nur einmal energy abzieht, solage die bottle noch in der Luft ist
  /**
   * this funktion just calls the endboss hurt logic
   */
  chkCollisionWithbottle() {
    if (this.world.bottleInAir && super.isColliding(this.world.bottleToThrow)) {
      this.showEndbossHurt();
    }
  }

  /**
   * this function provides the logic for the endboss animation and calls the hit() funtkion
   */
  showEndbossHurt() {
    super.playAnimation(this.hurtImages);
    if (!this.world.bottleToThrow.hitEnemy) {//it is only true whe a new instanz of bottle is created
      this.world.bottleHitEnemy(this);
      super.hit(this.hitFactor, true);
    }
    if (super.isDead()) {
      super.playAnimation(this.deadImages);
      this.showBossDeath();
    }
  }


  /**
  * this function loads the death image, set the flag and stops all animation intervals
  */
  showBossDeath() {
    super.loadImage('./img/4_enemie_boss_chicken/5_dead/G26.png');
    this.clearAllIntervals();
    this.chickenDead = true;
    this.deathTimeStamp = new Date().getTime();
    this.world.won = true;
  }

  /**
  * this function clears all intervals zu stop any animation or movement
  */
  clearAllIntervals() {
    clearInterval(this.intervalBossMove);
    clearInterval(this.intervalBossAnimation);
    // clearInterval(this.intervalCollision);
  }

}