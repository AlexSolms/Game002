class StatusBars extends StatusBarObjects{

    helth ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 15, 15, 150, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_green.png', 15, 15, 150, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_health.png', 0, 5, 50, 50)

    };

    coin ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 190, 15, 150, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_blue.png', 190, 15, 0, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_coin.png', 175, 10, 45, 45)
    };

    bottle ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty.png', 350, 15, 150, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_blue.png', 350, 15, 0, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_salsa_bottle.png', 332, 10, 50, 45)
    };

     endboss ={
        backBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_empty_reverse.png', 550, 15, 150, 50),
        statBar : new StatusBarObjects('./img/7_statusbars/4_bar_elements/statusbar_green_reverse.png', 550, 15, 150, 50),
        icon : new StatusBarObjects('./img/7_statusbars/3_icons/icon_health_endboss.png', 662, 10, 50, 50)
    }; 
}