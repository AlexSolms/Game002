class Bottle extends MovableObject{

    y = 290;
    width = 40;
    height = 80;
    hitbox_y = this.y;
    hitbox_width =this.width;
    hitbox_height = this.height;

    imgBottle = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    constructor(number, x){
       
        super().loadImage('./img/6_salsa_bottle/' + number +'_salsa_bottle_on_ground.png'); 
        this.x = x;
        this.hitbox_x = this.x;
    }

}