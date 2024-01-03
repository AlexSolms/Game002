let previousCoinX = 400;
let previousBottleX = 300;
const level1 = new Level( // ich übergebe hier Arrays als Parameter



    enemies = [
        /*  new Chicken(),
         new Chicken(),
         new Chicken(),*/
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ],
    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],

    backgroundObjects = [
        new BackgroundObject('./img/5_background/layers/air.png', -10),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -10),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -10),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', -10),
        new BackgroundObject('./img/5_background/layers/air.png', 719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/air.png', 1448),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 1448),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 1448),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 1448),
        new BackgroundObject('./img/5_background/layers/air.png', 2177),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 2177),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 2177),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 2177),
    ],
    coins = Array.from({ length: 10 }, (_, index) => {
        const x = previousCoinX + 80 + Math.random() * 120; // Random zwischen 80 und 200
        const y = 100 + Math.random() * 150;
        previousCoinX = x; // Aktualisiere die vorherige x-Position
        return new Coin(x, y);
    }),
    bottles = Array.from({ length: 14 }, (_, index) => {
        const type = Math.floor(Math.random() * 2) + 1;
        const x = previousBottleX + 80 + Math.random() * 120; // Random zwischen 80 und 200
        previousBottleX = x; // Aktualisiere die vorherige x-Position
        return new Bottle(type, x);
    })
    /* coins = [
        new Coin(100, 200),
        new Coin(130, 210),
        new Coin(160, 220),
        new Coin(190, 240),
        new Coin(210, 280),
        new Coin(240, 280),
        new Coin(270, 260),
        new Coin(300, 240),
        new Coin(330, 220),
        new Coin(360, 210)
    ],

    bottles = [
        new Bottle(1, 50),
        new Bottle(1, 80),
        new Bottle(2, 110),
        new Bottle(1, 140),
        new Bottle(1, 170),
        new Bottle(2, 200),
        new Bottle(2, 230),
        new Bottle(1, 260),
        new Bottle(2, 290),
        new Bottle(1, 320),
        new Bottle(2, 350),
        new Bottle(1, 380),
        new Bottle(2, 410),
        new Bottle(1, 440)
    ]
 */

);