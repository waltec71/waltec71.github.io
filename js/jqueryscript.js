console.log("hello");
const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext("2d");

let x = 150;
let y = 100;
let radius = 100;
let ballSpeed = 5;
let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;
let lastPressedColor = "blue";
//game loop
function drawGame(){
    console.log('draw');
    requestAnimationFrame(drawGame);
    clearScreen();
    inputs();
    boundaryCheck();
    drawGreenBlob();
}

function boundaryCheck(){
    //this function makes the ball jump from one edge to the opposite one
    //top
    if (y < 0 - radius){
        y = canvas.height + radius;
    }
     //bottom
     if (y > canvas.height + radius){
        y = 0 - radius;
    }
    //left
    if (x < 0 - radius){
        x = canvas.width + radius;
    }
     //right
     if (x > canvas.width + radius){
        x = 0 - radius;
    }       
}

function inputs(){
    if(downPressed){
        y = y + ballSpeed;
    }
    if(upPressed){
        y = y - ballSpeed;
    }
    if(leftPressed){
        x = x - ballSpeed;
    }
    if(rightPressed){
        x = x + ballSpeed;
    }
}

function drawGreenBlob(){
    ctx.fillStyle = "blue";
    if(upPressed){
        ctx.fillStyle = 'red';
    }
    if(downPressed){
        ctx.fillStyle = 'orange';
    }
    if(leftPressed){
        ctx.fillStyle = 'yellow';
    }
    if(rightPressed){
        ctx.fillStyle = 'purple';
    }
    ctx.beginPath();
    ctx.arc(x,y, radius,0,Math.PI*2);
    ctx.fill();
}

function clearScreen(){
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height);
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

function keyDown(event){
    if (event.key == "ArrowDown") {
        downPressed = true;
    }
    if (event.key == "ArrowUp") {
        upPressed = true;
    }
    if (event.key == "ArrowLeft") {
        leftPressed = true;
    }
    if (event.key == "ArrowRight") {
        rightPressed = true;
    }
}

function keyUp(event){
    if (event.key == "ArrowDown") {
        downPressed = false;
    }
    if (event.key == "ArrowUp") {
        upPressed = false;
    }
    if (event.key == "ArrowLeft") {
        leftPressed = false;
    }
    if (event.key == "ArrowRight") {
        rightPressed = false;
    }
}
drawGame();

