class StatusBar extends DrawableObject {
    x = 0;
   width = 200;
   height= 45;
    percentage = 100;  

    // setPercentage(50)
    setPercentage(percentage, imgset){
        this.percentage = percentage; 
        let path = imgset[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage==100){
            return 5;
        } else if (this.percentage>80){
            return 4;
        }else if (this.percentage>60){
            return 3;
        }else if (this.percentage>40){
            return 2;
        }else if (this.percentage>20){
            return 1;
        }else return 0;
    }
}