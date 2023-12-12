class BackgroundObject extends MovableObject {

    height = 400;
    width = 730;
    y = 0;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}