class Endboss extends MovableObject{

    x= 700;
    y = 160;
    width = 200;
    height = 200;
    speed = 0.08;
    refreshRate = 10 / 6;

    moveImages = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
      ];

      constructor(){
        super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        super.loadImages(this.moveImages);
        this.x= 700;
        this.animate();
      }

      animate() {

        setInterval(() => {
          super.updateHitbox(20, 50);
          super.playAnimation(this.moveImages);
        }, 130)
    
    
      }

      
}