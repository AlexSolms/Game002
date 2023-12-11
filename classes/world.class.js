class World {
    charakter = new Charakter();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.charakter.img, this.charakter.x, this.charakter.y, this.charakter.width, this.charakter.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
        })
        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height)
        })

        let self =this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }
}