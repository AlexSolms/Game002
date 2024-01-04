let previousCoinX = 400;
let previousBottleX = 300;
let previousCloudX = -50;
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

    

    clouds = Array.from({length: 100}, (_, index) => {
        const x = previousCloudX + 20 + Math.random() * 100;
        previousCloudX = x; // Aktualisiere die vorherige x-Position
        const y = 0 + Math.random() * 100;
        return new Cloud(x,y);
    }),
   

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
    }),
    
    endboss = new Endboss()
    
);