// Declare variables and constants
let goingTo = { x: 0, y: 0 };
const Eat = new Audio('Assets/Eat.wav');
const GameOver = new Audio('Assets/GameOver.wav');
const turn = new Audio('Assets/Turn.wav');
let lastPaintTime = 0;
let speed = 6;
let snake = [{ x: 10, y: 10 }];
let box = document.querySelector('.box');
let food = { x: 12, y: 12 };
let score = 0;
let scoreplay = document.getElementById('score');
let highscore = document.getElementById('high');
let final = 0;

// let easy = document.getElementsByClassName('easy');
// let medium = document.getElementsByClassName('medium');
// let hard = document.getElementsByClassName('hard');
// Game loop function

// let name = alert("Enter your name");
let userInput = prompt("Please enter your name:");
let message = "Hello, " + userInput + "!! Enjoy the game and suggest any kind of improvement or feedback";
alert(message);

function animation(ctime) {
    window.requestAnimationFrame(animation);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return; 
    }
    lastPaintTime = ctime;
    game();
}

// Main game logic
function game() {
    box.innerHTML = "";
    // Render snake
    snake.forEach((e, index) => {
        snakeTail = document.createElement('div');
        snakeTail.style.gridRowStart = e.y;
        snakeTail.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeTail.classList.add('head');
        } else {
            snakeTail.classList.add('remain');
        }
        box.appendChild(snakeTail);
    });

    // Render food
    foodItem = document.createElement('div');
    foodItem.style.gridRowStart = food.y;
    foodItem.style.gridColumnStart = food.x;
    foodItem.classList.add('eat');
    box.appendChild(foodItem);

    // Check if snake has eaten the food
    if (snake[0].y === food.y && snake[0].x === food.x) {
        snake.unshift({ x: snake[0].x + goingTo.x, y: snake[0].y + goingTo.y });
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        Eat.play();
        score += 1;
        scoreplay.innerHTML = `Score - ${score}`;
        if(final<=score){
            highscore.innerHTML = `High Score - ${score}`
        }
    }

    // Move snake
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += goingTo.x;
    snake[0].y += goingTo.y;

    let temp =0 ;

    // Check for game over condition
    if (lose(snake)) {
        GameOver.play();
        goingTo = { x: 0, y: 0 };
        alert("GAME OVER. Press any key to play again");
        snake = [{ x: 10, y: 10 }];
        if(temp>score){
            
        }
        else{
            temp = score;
        }
        highscore.innerHTML = `High Score - ${temp}`
        final = temp;
        score = 0;
        scoreplay.innerHTML = `Score - 0`;
    }
}

// Handle keydown events
window.addEventListener('keydown', e => {
    turn.play();
    switch (e.key) {
        case "ArrowUp":
            goingTo = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            goingTo = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            goingTo = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            goingTo = { x: 1, y: 0 };
            break;
    }
});

// Start the game loop
window.requestAnimationFrame(animation);

// Function to check game over condition
function lose(snake) {
    for(let i=1;i<snake.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
        if(snake[0].x >=22 ||snake[0].x <=-1 || snake[0].y >=22 ||snake[0].y <=-1){
            return true;
        }

}


// easy.addEventListener('click',()=>{
//         speed = 4;
// });

// medium.addEventListener('click',()=>{
//     speed = 7;
// });

// hard.addEventListener('click',()=>{
//     speed = 20;
// });

document.querySelector('.easy').addEventListener('click', () => {
    speed = 4;
});

document.querySelector('.medium').addEventListener('click', () => {
    speed = 7;
});

document.querySelector('.hard').addEventListener('click', () => {
    speed = 20;
});


