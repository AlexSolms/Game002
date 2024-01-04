class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    endboss;
    levelEndX = 3*729 + 40;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, endboss) {

        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}