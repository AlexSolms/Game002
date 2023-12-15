class StatusBarBottle extends StatusBar{
    y = 90;
    bottleImages = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    constructor(){
        super(); 
        super.loadImages(this.bottleImages);
        super.loadImage('./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        super.setPercentage(100,this.bottleImages);
        
    }
    
}