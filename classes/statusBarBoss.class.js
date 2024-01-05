class StatusBarBoss extends StatusBar{
    x = 500;
    y = 0;

    bossHealthImages = [
        './img/7_statusbars/2_statusbar_endboss/orange0.png',
        './img/7_statusbars/2_statusbar_endboss/orange20.png',
        './img/7_statusbars/2_statusbar_endboss/orange40.png',
        './img/7_statusbars/2_statusbar_endboss/orange60.png',
        './img/7_statusbars/2_statusbar_endboss/orange80.png',
        './img/7_statusbars/2_statusbar_endboss/orange100.png'
    ];

    constructor(){
        super(); 
       // super.loadImages(this.bottleImages);
        super.loadImages(this.bossHealthImages);
        super.setPercentage(100,this.bossHealthImages);  
    }
}