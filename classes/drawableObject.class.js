class DrawableObject{
    img;
    imageCache = {};
    x;
    y;
    height;
    width;
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path; //if(path)
    }

    /**
     * 
     * this function loads all imgages of an image set to the image cache.
     * @param {Array} imgSet - ['./img/image1.png, ./img/image2.png,...]
     */
    loadImages(imgSet) {
        imgSet.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

}