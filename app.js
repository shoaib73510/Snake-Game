const gameboard = document.getElementById('gameboard');
const context = gameboard.getContext('2d');
const WIDTH = gameboard.width;
const height = gameboard.height;
const scoretext = document.getElementById('score');
const unit = 25;
let foodx;
let foody;
let xvel = 25
let yvel = 0
let score = 0
let active = true
let started = false
let paused = false
let snake=[
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0},
]
window.addEventListener('keydown',keyPress);
startgame();
function startgame()
{
    context.fillStyle = 'white'
    context.fillRect(0,0,WIDTH,height);
    createfood();
    displayfood();
    drawsnake();
}
function clearboard()
{
    context.fillStyle ='white';
    context.fillRect(0,0,WIDTH,height);
}
function createfood()
{
    foodx=Math.floor(Math.random()*WIDTH/unit)*unit;
    foody=Math.floor(Math.random()*WIDTH/unit)*unit;
}
function displayfood()
{
    context.fillStyle = "red";
    context.fillRect(foodx,foody,unit,unit)
}
function drawsnake()
{
    context.fillStyle = 'blue';
    context.strokeStyle = 'black';
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x,snakePart.y,unit,unit)
        context.strokeRect(snakePart.x,snakePart.y,unit,unit)
    });
}

function movesnake()
{
    const head = {x:snake[0].x+xvel,y:snake[0].y+yvel}
    snake.unshift(head);
    if(snake[0].x==foodx && snake[0].y==foody)
    {
        score += 1
        scoretext.textContent = score;
        createfood();
    }
    else
    {
        snake.pop();
    }
}

function nexttick()
{
    if(active && !paused)
    {
        setTimeout(()=>{
        clearboard();
        displayfood();
        movesnake();
        drawsnake();
        checkgameover();
        nexttick();
        },200);

    }
    else if(!active)
    {
        clearboard();
        context.font = "bold 50px serif";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("Game Over!!",WIDTH/2,height/2)
    }
}

function keyPress(event)
{
    if(!started)
    {
        started=true;
        nexttick();
    }
    if(event.keyCode===32){
        console.log('cliked')
        if(paused){
            paused = false;
            nexttick();
        }
        else
        {
            paused = true;

        }
    }
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWn = 40

    switch(true)
    {
        case(event.keyCode==LEFT && xvel!=unit):
        xvel=-unit
        yvel=0;
        break;
        case(event.keyCode==RIGHT && xvel!=-unit):
        xvel=unit
        yvel=0;
        break;
        case(event.keyCode==UP && yvel!=unit):
        xvel=0
        yvel=-unit;
        break
        case(event.keyCode==DOWn && yvel!=-unit):
        xvel=0
        yvel=unit;
        break
    }
}

function checkgameover()
{
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=height):
        active=false;
        break;
}
}