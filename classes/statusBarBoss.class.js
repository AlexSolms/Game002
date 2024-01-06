class StatusBarBoss extends StatusBar{
    x = 500;
    y = 0;

    bossHealthImages = [
        './img/7_statusbars/2_statusbar_endboss/blue.png',
        './img/7_statusbars/2_statusbar_endboss/green.png'
        
    ];

    constructor(){
        super(); 
       // super.loadImages(this.bottleImages);
        super.loadImages(this.bossHealthImages);
        super.setPercentage(100,this.bossHealthImages);  
    }
}