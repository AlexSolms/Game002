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
        }
        if(world.won){
            world.clearGameIntervals();
            clearInterval(startInterval);
            document.getElementById('idYouWonScreen').classList.remove('d-none');
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



/* window.addEventListener("keydown", (e) => {
    //console.log(e);
    if(e.code === "ArrowUp" || e.code === "KeyW") keyboard.up = true;
    if(e.code === "ArrowDown" || e.code === "KeyS") keyboard.down = true;
    if(e.code === "ArrowLeft" || e.code === "KeyA") keyboard.left = true;
    if(e.code === "ArrowRight" || e.code === "KeyD") keyboard.right = true;
    if( e.code === "KeyE") keyboard.E = true; // bottle throw
    if(e.code === "KeyB") keyboard.debug = !keyboard.debug; //debug mode
    if(e.code === "Space") keyboard.space = true;
    (keyboard.up||keyboard.down||keyboard.left||keyboard.right) ? keyboard.press = true : keyboard.press = false;
 });
 
 
 
 window.addEventListener("keyup", (e) => {
    if(e.code === "ArrowUp" || e.code === "KeyW") keyboard.up = false;
    if(e.code === "ArrowDown" || e.code === "KeyS") keyboard.down = false;
    if(e.code === "ArrowLeft" || e.code === "KeyA") keyboard.left = false;
    if(e.code === "ArrowRight" || e.code === "KeyD") keyboard.right = false;
    if( e.code === "KeyE") keyboard.E = false;
    if(e.code === "Space") keyboard.space = false;
    keyboard.press = false;
 }); */