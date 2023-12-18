class StatusBarCoin extends StatusBar{
    y = 45;
     statusCoinImages = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',  
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    constructor(){
        super(); 
        super.loadImages(this.statusCoinImages);
        super.loadImage('./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        super.setPercentage(100,this.statusCoinImages); 
    }
    
}