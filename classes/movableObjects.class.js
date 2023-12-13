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
     * @param {Array} arr - ['./img/image1.png, ./img/image2.png,...]
     */
    loadImages(arr){
        
        arr.forEach((path)=>{
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

            })
        
        


    }

    playAnimation(imgSet){
        let i = this.currentImage % imgSet.length;
        let path = imgSet[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    moveRight(){

    }


    moveLeft(speed, refreshRate){
        setInterval(() => this.x -= speed, refreshRate);
    }
}