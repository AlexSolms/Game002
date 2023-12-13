class MovableObject{
    x;
    y;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;
    speed;
    otherDirection = false;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * this function loads all imgages of an image set to the image cache.
     * @param {Array} imgSet - ['./img/image1.png, ./img/image2.png,...]
     */
    loadImages(imgSet){
        imgSet.forEach((path)=>{
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
            })
    }

    /**
     * 
     * this function plays all immages of the image set for an animation
     * @param {Array} imgSet - contains the image set which should be drawed
     */
    playAnimation(imgSet){
        let i = this.currentImage % imgSet.length;
        let path = imgSet[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }



    moveRight(){
        this.x += this.speed;
        }


    moveLeft(speed){
        this.x -= speed;
    }

    jump(jumpHight) {
        this.speedY = jumpHight;
      }
}