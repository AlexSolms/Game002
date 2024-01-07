class StatusBars extends StatusBarObjects{

    helth ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 15, 5, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_green.png', 15, 5, 200, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_health.png', 0, -5, 50, 50),

    };

    coin ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 15, 40, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_blue.png', 15, 40, 0, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_coin.png', 0, 35, 45, 45),
    };

    bottle ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 15, 75, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_blue.png', 15, 75, 0, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_salsa_bottle.png', -3, 70, 50, 45),
    };

     endboss ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty_reverse.png', 500, 5, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_green_reverse.png', 500, 5, 200, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_health_endboss.png', 660, 0, 50, 50),
    }; 
}