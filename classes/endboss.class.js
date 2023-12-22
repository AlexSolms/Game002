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
  attackImages=[
    './img/4_enemie_boss_chicken/3_attack/G13.png',
    './img/4_enemie_boss_chicken/3_attack/G17.png',
    './img/4_enemie_boss_chicken/3_attack/G18.png',
    './img/4_enemie_boss_chicken/3_attack/G19.png',
    './img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  aleartImages=[
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
    './img/4_enemie_boss_chicken/4_hurt/G23.png',
    './img/4_enemie_boss_chicken/4_hurt/G24.png',
    './img/4_enemie_boss_chicken/4_hurt/G25.png',
  ]

  constructor() {
    super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    super.loadImages(this.moveImages);
    super.loadImages(this.attackImages);
    super.loadImages(this.aleartImages);
    super.loadImages(this.hurtImages);
    super.loadImages(this.deadImages);

    //super.updateHitbox(0, 0, 40); // x für hitbox
    this.x = 700;
    this.animate();
  }

  animate() {

    setInterval(() => {
      super.updateHitbox(20, 50, -20);
      super.playAnimation(this.aleartImages);
      this.chkCollisionWithbottle();
    }, 130)


  }

// hier muss noch eine Zeitfunktion rein, die die hurt animation nach 1 s abbricht und wieder in die normale animation übergeht
// bitte einen PAP schreiben!!!!!
  /**
  * this function checks if the chicken was hit by the bottle
  */
  chkCollisionWithbottle() {
    if (this.world.bottleInAir && super.isColliding(this.world.bottleToThrow)) {
      this.showEndbossHurt();
    }
  }

  showEndbossHurt(){
    super.playAnimation(this.hurtImages);
  }


}