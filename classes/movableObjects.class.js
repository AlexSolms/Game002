class MovableObject{
    x;
    y;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['./img/image1.png, ./img/image2.png,...]
     */
    loadIamages(arr){
        
        arr.forEach((path)=>{
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

            })
        
        


    }
    moveRight(){

    }


    moveLeft(speed, refreshRate){
        setInterval(() => this.x -= speed, refreshRate);
    }
}