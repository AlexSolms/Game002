class ThrowableObject extends MovableObject{
width = 40;
height = 80;
    
    
    BottleInAirImages = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(character) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        super.loadImages(this.BottleInAirImages);
        //console.log('pups ', character.hitbox_x);
       
        
       // this.speed = 0.08;
        //this.animate();
        this.throw(character);
      }


      animate() {
       
        setInterval(() => {
          super.playAnimation(this.BottleInAirImages);
        }, 130)
      }

       throw(character){
        this.x = character.x + character.hitbox_width;
        this.y = character.y - character.height/4;
        this.speedY = 20;
        
        if (super.isAboveGround(200)) {
            super.applyGravity(95);
            setInterval(() => {
                this.x += 8;
            }, 50);
        } else{
            super.loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        }
       
       }
}