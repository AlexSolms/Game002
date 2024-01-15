class StatusBars extends StatusBarObjects{

    helth ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 15, 15, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_green.png', 15, 15, 200, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_health.png', 0, 5, 50, 50)

    };

    coin ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 15, 50, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_blue.png', 15, 50, 0, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_coin.png', 0, 45, 45, 45)
    };

    bottle ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 15, 85, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_blue.png', 15, 85, 0, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_salsa_bottle.png', -3, 80, 50, 45)
    };

     endboss ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty_reverse.png', 500, 15, 200, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_green_reverse.png', 500, 15, 200, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_health_endboss.png', 662, 5, 50, 50)
    }; 
}