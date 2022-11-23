const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext("2d");
var covid = new Image();
covid.src = '/images/covid.png';
let zeroTime = new Date();
let currentTime = new Date();
var x, y, radius, lateralspeed, platformcolor, onPlatform, score, mouseX, mouseY, downPressed, upPressed, leftPressed, rightPressed, lastPressedColor, zeroTimeMs, currentTimeMs, elapsedTime, timeDecay, ballColor, id, z, gravity, jumpforce, jumpspeed;
function setDefaults() {
    radius = 50;
    x = 400;
    y = -2*radius;
    score = 0;
    onPlatform = false;
    platformcolor = "black"
    //var mouseX;
    //var mouseY;
    zeroTimeMs = zeroTime.getTime();
    //let currentTime = new Date();
    currentTimeMs = zeroTimeMs;
    elapsedTime = 0;
    timeDecay = 1000;
    //var ballColor;
    //var id;
    z = 600;
    //jumpgame specifics
    gravity = .05;
    jumpforce = 5;
    jumpspeed = 0;
    lateralspeed = 0;
    thrustTime = 0;
}
ctx.fillStyle = "black";
ctx.fillRect(0,0, canvas.clientWidth, canvas.height);
//game loop


function drawGame(){
    id = requestAnimationFrame(drawGame);
    clearScreen();
    drawBlob();
    drawPlatforms();
    setNewCoords();
    applyGravity();
    thrustCheck();
    detectCollision();
    document.getElementById("score").innerHTML = "Score: " + score;
    if (y > 610) {
        //cancelAnimationFrame(id);
        youLose();
        //alert('hey');
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

function drawPlatforms(){
    ctx.beginPath();
    ctx.fillStyle = platformcolor;
    ctx.fillRect(200,300,100,10);
}
function clearScreen(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height);
}

function detectCollision(){
    // add a thing to make the speed not get set to zero if onPlatform is already true
    if ((x > 200) && (x < 300) && (y > 290) && (y < 310)){
        onPlatform = true;
        jumpspeed = 0;
        console.log(onPlatform);
        platformcolor = "yellow";
    }  if (y > 550){
        onPlatform = true;
        jumpspeed = Math.floor(-.5*jumpspeed);

    }

}

document.body.addEventListener('keyup', keyUp);

function keyUp(event){
    if ((jumpspeed <= 0) && (event.key == 'ArrowUp')) {
            jumpspeed = jumpforce;
            console.log('keyup if activated');
    }
    if (event.key == 'ArrowLeft') {
        lateralspeed = 5;
        
        thrustTime = 0;
    }
    if (event.key == 'ArrowRight') {
        lateralspeed = -5;
        thrustTime = 0;
    }
}

function applyGravity(){
    if (Math.abs(jumpspeed) > 0){
        jumpspeed = jumpspeed -gravity;
    }
} 

function thrustCheck(){
    thrustTime += 1;
    if (thrustTime >= 15){
        lateralspeed = 0;
    }
}


function setNewCoords(){
    y = y - jumpspeed;
    x = x - lateralspeed;
}

function youLose() {
    jumpspeed = 0;
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

