class DrawableObject {
    img;
    imageCache = {};
    x;
    y;
    height;
    width;
    currentImage = 0;

    /**
     * this function creats a new instanz of  image and adds the path to the src attribute
     * @param {String} path - path of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path; 
    }

    /**
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

    /**
     * this function calls the drawImage function for the object
     * @param {Object} ctx - object which should be drawed
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


}