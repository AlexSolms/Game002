let previousCoinX = 400;
let previousBottleX = 300;
let previousCloudX = -50;
let previousChickenX = 500;
let chickenMax = 25;
const maxCoin = 10;
const maxBottle = 27;
let cloudMax = 100;
const maxBackgroundCount = 5;
const backgroundStartPos = -10;
const backgroundWidth = 729;
const backgroundObjects = createBackgroundObjects();
const worldEnd = (backgroundWidth * (maxBackgroundCount + 1));
let adult = false;


const level1 = new Level(
    enemies = Array.from({ length: chickenMax }, generateChicken),
    clouds = Array.from({ length: cloudMax }, generateCloud),
    backgroundObjects,
    coins = Array.from({ length: maxCoin }, generateCoin),
    bottles = Array.from({ length: maxBottle }, generateBottle),
    endboss = new Endboss(worldEnd - 450)
);

/**
 * this function repeats adding of background sets to backgroundObjects based on maxBackgroundCount
 * @returns - the object with all backgrounds
 */
function createBackgroundObjects() {
    const backgroundObjects = [];
    for (let i = 0; i <= maxBackgroundCount; i++) {
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/air.png`, backgroundStartPos + i * backgroundWidth));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/3_third_layer/${i % 2 + 1}.png`, backgroundStartPos + i * backgroundWidth));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/2_second_layer/${i % 2 + 1}.png`, backgroundStartPos + i * backgroundWidth));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/1_first_layer/${i % 2 + 1}.png`, backgroundStartPos + i * backgroundWidth));
    }
    return backgroundObjects;
}

/**
 * this function calculates the x coordinate based on the x position of predecessor
 * 
 * @param {Number} previousobjX - position of predecessor
 * @param {Number} minDist - min distance to predecessor
 * @param {Number} multiplier - factor for multiply it to a random number to add it to the min distance
 * @returns - x position
 */
function xPosition(previousobjX, minDist, multiplier) {
    return previousobjX + minDist + Math.random() * multiplier;
}

/**
 * this function generates a random Y position between the min y height and a multiplier
 * 
 * @param {Number} minY -min hight
 * @param {Number} multiplier -factor for multiply it to a random number to add it to the min hight
 * @returns - Y position 
 */
function yPosition(minY, multiplier) {
    return minY + Math.random() * multiplier;
}


// I know the following both functions looks similar and it could covered in one function. 
// I didnt go this way because of the paramaters which needs to be set.

/**
 * this function generates a new cloud based on the x postition of the predecessor
 * @returns - position of new cloud
 */
function generateCloud() {
    const x = xPosition(previousCloudX, 20, 150);
    const y = yPosition(0, 100);
    previousCloudX = x;
    return new Cloud(x, y);
}

/**
 * this function generates a new coin based on the x postition of the predecessor
 * @returns - position of new coin
 */
function generateCoin() {
    const x = xPosition(previousCoinX, minSpwanDistanz(maxCoin), 70);
    const y = yPosition(100, 150);
    previousCoinX = x;
    return new Coin(x, y);
}


/**
 * this function generates a new bottle based on the x postition of the predecessor
 * @returns - position of new bottle
 */
function generateBottle() {
    const type = Math.floor(Math.random() * 2) + 1;
    const x = xPosition(previousBottleX, minSpwanDistanz(maxBottle), 50);
    previousBottleX = x;
    return new Bottle(type, x);
}

/**
 * this function generates a new chicken based on the x postition of the predecessor
 * @returns - position of new chicken
 */
function generateChicken() {
    const x = xPosition(previousChickenX, minSpwanDistanz(chickenMax), 50);
    previousChickenX = x;
    if (adult) {
        adult = false;
        return new LittleChicken(x);
    } else {
        adult = true;
        return new Chicken(x);
    }
}

/**
 * this function returns the min distance between 2 objects based on the world size
 * @param {Number} objCount - number of objects
 * @returns - min distance between 2 objects
 */
function minSpwanDistanz(objCount) {
    return (worldEnd - (backgroundWidth * 2)) / objCount;
}
