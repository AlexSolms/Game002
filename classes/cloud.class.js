class Cloud extends MovableObject {

    y = 0;
    height = 140;
    width = 250;
    speed = 0.015;
    refreshRate = 10 / 6;

    constructor(x, y) {
        super().loadImage('./img/5_background/layers/4_clouds/1.png')
        this.x = x;
        this.y = y;
        this.moveclouds();
    }

    /**
     * this function sets the interval for the cloud movement
     */
    moveclouds() {
        setInterval(() => {
            super.moveLeft(this.speed);
        }, this.refreshRate)
    }

}