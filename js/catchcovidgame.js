const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext("2d");
var covid = new Image();
covid.src = '/images/covid.png';
let zeroTime = new Date();
let currentTime = new Date();
var x, y, radius, score, mouseX, mouseY, downPressed, upPressed, leftPressed, rightPressed, lastPressedColor, zeroTimeMs, currentTimeMs, elapsedTime, timeDecay, ballColor, id, z;
function setDefaults() {
    x = 400;
    y = 300;
    radius = 98;
    ballSpeed = 5;
    score = 0;
    //var mouseX;
    //var mouseY;
    downPressed = false;
    upPressed = false;
    leftPressed = false;
    rightPressed = false;
    lastPressedColor = "blue";
    zeroTimeMs = zeroTime.getTime();
    //let currentTime = new Date();
    currentTimeMs = zeroTimeMs;
    elapsedTime = 0;
    timeDecay = 1000;
    //var ballColor;
    //var id;
    z = 600;
}
ctx.fillStyle = "black";
ctx.fillRect(0,0, canvas.clientWidth, canvas.height);
//game loop
function drawGame(){
    id = requestAnimationFrame(drawGame);
    clearScreen();
    newBall();
    drawBlob();
    document.getElementById("score").innerHTML = "Score: " + score;
    if (timeDecay <= -2500) {
        //cancelAnimationFrame(id);
        youLose();
        //alert('hey');
    }
    mouseX = 10000; //make sure next ball does not land on last mouse position
    mouseY = 10000; //
}

function newBall() {
    if (updateTimes()) {
        setNewCoords();
        timeDecay -= 50;
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

function youLose() {
    clearScreen();
    var loser = new Image();
    loser.src = '/images/lose.png';
    ctx.drawImage(loser, 0, z);
    if (z>= 0) {
        z -= 2;
    }


}

function startGame() {
    setDefaults;
    cancelAnimationFrame(drawGame);
    setDefaults();
    drawGame();
}

