class StatusBars extends StatusBarObjects{

    charHelth ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 200, 5, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_green.png', 200, 5, 200, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_health.png', 180, -5, 50, 50),

    };

    charCoin ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 200, 40, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_blue.png', 200, 40, 100, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_coin.png', 180, 30, 50, 50),
    };

    charBottle ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 200, 75, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_blue.png', 200, 75, 70, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_salsa_bottle.png', 180, 65, 50, 50),
    };

     charEndboss ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty_reverse.png', 500, 5, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_green_reverse.png', 500, 5, 200, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_health_endboss.png', 660, 0, 50, 50),
    }; 
}