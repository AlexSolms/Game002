class World{
    charakter = new Charakter();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.draw();
    }


    draw(){
this.ctx.drawImage(this.charakter.img, this.charakter.x, this.charakter.y, this.charakter.height, this.charakter.width);
    }
}