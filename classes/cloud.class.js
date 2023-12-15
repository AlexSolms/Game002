class Cloud extends MovableObject {

    y = 50;
    height = 120;
    width = 250;
    speed = 0.015;
    refreshRate = 10 / 6;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500;
        this.moveclouds();
    }

    moveclouds() {
        setInterval(() => {
            super.moveLeft(this.speed);
        }, this.refreshRate)
    }

}