let canvas;
let world;
let startScreen = true;
const CANVASWIDTH = 720; 
const CANVASHEIGHT = 400;
let keyboard = new Keyboard();
let startInterval;
let mute = true;
const winSound = './audio/win.wav';
const looseSound = './audio/gameOver.mp3';

/**
 * this is the init function for starting teh game
 */
function init() {
    canvas = document.getElementById('idCanvas');
    world = new World(canvas, keyboard, mute);
    if (!is_touch_enabled()) {
        document.getElementById('idLeftButtons').classList.add('d-none');
        document.getElementById('idRightButtons').classList.add('d-none');
    }
    startInterval = setInterval(() => {
        if (world.lost) endScreen('idYouLostScreen', looseSound);
        if (world.won) endScreen('idYouWonScreen', winSound);
        screenCheck();
    }, 100);
}


/**
 * this function starts the end screen inklusive sound
 */
function endScreen(srceen, endSound){
    winSettings(srceen);
    world.gamesound.pause();
    world.lost = false;
    world.win = false;
    setTimeout(function () {
        if(!mute) playSound(endSound);
    }, 500);
}

/**
 * this function plays the end sound
 * @param {String} soundPath - path to soundfile
 */
function playSound(soundPath) {
    const sound = new Audio(soundPath);
    sound.play();
}

/**
 * this function calls the end screen based on the screen parameter
 * @param {String} screen - id of screen container
 */
function winSettings(screen) {
    world.clearGameIntervals();
    clearInterval(startInterval);
    document.getElementById(screen).classList.remove('d-none');
    document.getElementById('idHelpBottonContainer2').classList.add('d-none');
}

/**
 * this function toggles the d-none class for specific elements
 */
function start() {
    document.getElementById('idOverlay').classList.remove('d-none');
    document.getElementById('idStartscreen').classList.add('d-none');
    document.getElementById('idGamecontainer').classList.remove('d-none');
    document.getElementById('idHeadline').classList.remove('d-none');
    startScreen = false;
}

/**
 * thsi function reloads the game
 */
function reStart() {
    window.location.reload();
}

/**
 * this function toggles the d-none class for some container
 */
function helpMenu() {
    document.getElementById('idHelpContainer').classList.toggle('d-none');
    document.getElementById('idHelpBottonContainer2').classList.toggle('d-none');
    document.getElementById('idHelpBottonContainer3').classList.toggle('d-none');
}

/**
 * this function detects if the screen is a touch screen
 * @returns - true is touch is enabled
 */
function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

/**
 * this function turn sound on or of
 */
function toggleMute() {
    document.getElementById('idMute1').classList.toggle('d-none');
    document.getElementById('idUnMute1').classList.toggle('d-none');
    document.getElementById('idMute').classList.toggle('d-none');
    document.getElementById('idUnMute').classList.toggle('d-none');
    mute = !mute;
    world.mute = mute;
}

/**
 * this function checks if the montior orientation is in Landscape
 */
function screenCheck() {
    if(window.screen.orientation.type === 'portrait-primary'){
        document.getElementById('idTurnMonitor').classList.remove('d-none');
        document.getElementById('idBodyContainer').classList.add('d-none');
    }else{
        document.getElementById('idTurnMonitor').classList.add('d-none');
        document.getElementById('idBodyContainer').classList.remove('d-none');
        if(window.innerWidth < 1000) canvas.width  = document.getElementById('idBodyContainer').offsetWidth;
    } 
}