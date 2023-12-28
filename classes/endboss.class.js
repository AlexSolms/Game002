class Endboss extends Enemies {

  x = 700;
  y = 160;
  width = 200;
  height = 200;
  hitbox_x = this.x;
  hitbox_y = this.y - 70;
  hitbox_width = this.width;
  hitbox_height = this.height - 50;
  speed = 2;
  refreshRate = 10 / 6;
  attackSuccuess = false;
  world;
  alertStart = new Date().getTime();
  firstContactWithBoss = true;

  moveImages = [
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
    './img/4_enemie_boss_chicken/5_dead/G23.png',
    './img/4_enemie_boss_chicken/5_dead/G24.png',
    './img/4_enemie_boss_chicken/5_dead/G25.png',
  ]

  constructor() {
    super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    super.loadImages(this.moveImages);
    super.loadImages(this.attackImages);
    super.loadImages(this.aleartImages);
    super.loadImages(this.hurtImages);
    super.loadImages(this.deadImages);
    //this.movementLogic();
    //super.updateHitbox(0, 0, 40); // x für hitbox
    this.x = 700;
    this.animate();
  }

  movementLogic() {
    setInterval(() => {
      super.moveLeft(this.speed);
    }, 100);

  }
  animate() {

    setInterval(() => {
      super.updateHitbox(20, 50, -20);
      this.bossAlert();
      this.chkCollisionWithbottle();
    }, 130)
  }

  //Flags: bossAlert, boss walk, bossColliosion, otherDirection

  // bossAlert-Funktion
  bossAlert() {

    let timeDiv;
    console.log(this.world.character.x);
    if (this.world.character.x >= this.world.endbossArea.left - 100) {
      //this.firstContactWithBoss = true;
      timeDiv = new Date().getTime() - this.alertStart;

      if (this.firstContactWithBoss && timeDiv < 4000) {
        super.playAnimation(this.aleartImages);
      } else if (this.flagBossAlert && timeDiv < 2000) {
        super.playAnimation(this.aleartImages);
      } else {
        this.flagBossAlert = false;
        this.firstContactWithBoss = false;
      }
    }
  }


  // die Endbossantimation:
  // Pepe erscheint: Endoss in aleart 1,5 sekunden vielleicht
  // Endoss in walk nach läuft auf Pepe
  // collision mit Pepe erst Attacke dann flip
  // dann walk bis barrier, dann flip
  // dann wieder von vorn.
  // Hurt unterbricht das Angrifschema nicht 

  // das funktioniert solange die Flasche noch in der Luft ist und noch die sp
  /**
  * this function checks if the chicken was hit by the bottle
  */
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
    if (super.isDead()) super.playAnimation(this.deadImages);
  }


}