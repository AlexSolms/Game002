class StatusBarBoss extends StatusBar{
    x = 500;
    y = 0;

    bottleImages = [
        './img/7_statusbars/2_statusbar_endboss/blue.png',
        './img/7_statusbars/2_statusbar_endboss/green.png',
        './img/7_statusbars/2_statusbar_endboss/orange.png'
    ];

    constructor(){
        super(); 
        super.loadImages(this.bottleImages);
        super.loadImage('./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        //super.setPercentage(100,this.bottleImages);  
    }
}