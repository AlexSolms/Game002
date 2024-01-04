class Coin extends MovableObject {

    y = 165;
    width = 40;
    height = 80;
    hitbox_y = this.y;
    hitbox_width =this.width;
    hitbox_height = this.height; 



    imgCoin = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ]

    coinInterval;

    constructor(x,y) {
        super().loadImage('./img/8_coin/coin_1.png');
        super.loadImages(this.imgCoin);
        this.x = this.hitbox_x = x;
        this.y = this.hitbox_y = y;
    }

    coinAnimation() {
        this.coinInterval = setInterval(() => {
            super.playAnimation(this.imgCoin);
        }, 100 / 6);
    }
}