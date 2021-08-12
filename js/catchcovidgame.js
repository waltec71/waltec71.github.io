const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext("2d");

let x = 400;
let y = 300;
let radius = 98;
let ballSpeed = 5;
let score = 0;
var mouseX;
var mouseY;
let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;
let lastPressedColor = "blue";
let zeroTime = new Date();
let zeroTimeMs = zeroTime.getTime();
let currentTime = new Date();
let currentTimeMs = zeroTimeMs;
let elapsedTime = 0;
let timeDecay = 2000;
var ballColor;
var covid = new Image();
covid.src = '/images/covid.png';
//game loop
function drawGame(){
    requestAnimationFrame(drawGame);
    clearScreen();
    newBall();
    drawBlob();
    document.getElementById("score").innerHTML = "Score: " + score;
}

function newBall() {
    if (updateTimes()) {
        setNewCoords();
        return
    }

    if (clickInBall()) {
        setNewCoords();
        score += 1;
        zeroTime = new Date();
        zeroTimeMs = zeroTime.getTime();
    }
}

function updateTimes() {
    currentTime = new Date();
    currentTimeMs = currentTime.getTime();
    elapsedTime = currentTimeMs - zeroTimeMs;
    if (elapsedTime > timeDecay) {      
        zeroTimeMs = currentTimeMs;
        return true
    } else {
        return false
    }  
}

function drawBlob(){
    ctx.drawImage(covid, x, y);
}

function clearScreen(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height);
}

document.body.addEventListener('click', mouseClick);

function mouseClick(event){
    mouseX = event.offsetX;     // Get the horizontal coordinate
    mouseY = event.offsetY;     // Get the vertical coordinate
    //console.log("x: " + mouseX + " y: " + mouseY);  
}

function clickInBall(){
    if ((mouseX > x && mouseX < (x+2*radius)) && (mouseY > y && mouseY < (y+2*radius))){ 
        return true
    } else {
        return false
    }
}

function setNewCoords(){
    x = Math.floor(Math.random() * (canvas.width - 2*radius));
    y = Math.floor(Math.random() * (canvas.height- 2*radius));
    //ballColor = "#" + (Math.floor(Math.random() * 2 ** 24)).toString(16).padStart(0, 6); // generate new color for next ball
    //console.log(x + ", " + y)
}

drawGame();

