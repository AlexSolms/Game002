class StatusBarObjects extends DrawableObject{

    constructor(imgPath,x,y,width,height){
        super();
        this.loadImage(imgPath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}