let canvas;
let world;
let startScreen = true;
const CANVASWIDTH = 720; // brauche ich das?
const CANVASHEIGHT = 400;
let keyboard = new Keyboard();
let startInterval;

/**
 * this is the init function for starting teh game
 */
function init(){
    canvas = document.getElementById('idCanvas');
    world = new World(canvas, keyboard);
    startInterval = setInterval(() => {
        if(world.lost){
            world.clearGameIntervals();
            clearInterval(startInterval);
            document.getElementById('idYouLostScreen').classList.remove('d-none');
            document.getElementById('idHelpBottonContainer2').classList.add('d-none');
            
        }
        if(world.won){
            world.clearGameIntervals();
            clearInterval(startInterval);
            document.getElementById('idYouWonScreen').classList.remove('d-none');
            document.getElementById('idHelpBottonContainer2').classList.add('d-none');
        }
    }, 100);
}

/**
 * this function toggles the d-none class for specific elements
 */
function start(){
    document.getElementById('idOverlay').classList.remove('d-none');
    document.getElementById('idStartscreen').classList.add('d-none');
    document.getElementById('idGamecontainer').classList.remove('d-none');
    document.getElementById('idHeadline').classList.remove('d-none');
    startScreen = false;
}

function reStart(){
    window.location.reload();    
}

function helpMenu() {
    document.getElementById('idHelpContainer').classList.toggle('d-none');
    document.getElementById('idHelpBottonContainer2').classList.toggle('d-none');
    document.getElementById('idHelpBottonContainer3').classList.toggle('d-none');
}
