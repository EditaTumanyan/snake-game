const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const controls = document.querySelectorAll(".controls");

let foodX, foodY;
let gameOver = false;
let snakeX = 3, snakeY = 3; 
let velocityX = 0, velocityY = 0;  //the snake is initially stationary and not moving in any direction.
let snakeBody = [];
let setIntervalId;
let score = 0;
let gridSize;
function validateInput(){
     gridSize = Number(prompt("Enter number between 20-30"))
if(isNaN(gridSize) || gridSize < 20 || gridSize > 30){
    alert("PLEASE ENTER A VALID NUMBER")
    validateInput()
    }
        startGame()
}
validateInput()

function startGame(){
playBoard.style.gridTemplate=`repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
console.log(typeof gridSize);

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * gridSize) + 1;
    foodY = Math.floor(Math.random() * gridSize) + 1;
}  //  +1 -range of 1 to 25 (inclusive) instead of 0 to 24. 


// Clearing the timer and reloading the pagei on game over
////The location.reload() is a method in JS , used to reload the current page.
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to start the game"); 
    location.reload();
}


//The function takes an event object (e) as a parameter, representing the key press event.
const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));


const initGame = () => {
    if(gameOver) return handleGameOver();
   // ${foodY} and ${foodX} - represent the current coordinate
   //grid-area property specifies where the element should be placed on the grid. ${foodY} / ${foodX} dynamically 
   //inserts the row and column values, determining the position of the food element on the grid.
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); 
        score++;
        scoreElement.innerText = `Score: ${score}`;
        
    }

    ////This line updates the horizontal position; . If velocityX is pos,snake ->right; if neg -> left. top, down
    snakeX += velocityX;  
    snakeY += velocityY;
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]; //During each iteration, it moves each body segment to the position of the segment in front of it
    }
    snakeBody[0] = [snakeX, snakeY]; 
    // snakeBody[0] -head of the snake. This line is  executed after the body segments have been shifted towards the head in the game loop


    //Check if the snake's head is out of bounds
    //left-right, right- left
    if(snakeX <= 0) {
        snakeX = gridSize;
        } else if(snakeX > gridSize) {
        snakeX = 1;
        }
    //top-bottom, bottom-top
        if(snakeY <= 0) {
        snakeY = 25;
        } else if(snakeY > gridSize) {
        snakeY = 1; 
        }


         // Adding a div for each part of the snake's body:This part is responsible for dynamically creating
         // HTML elements to represent each part of the snake's body on the game board.
        for (let i = 0; i < snakeBody.length; i++) {
            html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        
             // Checking if the snake head hit the body , set gameOver to true
            if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
                gameOver = true;
            }
        }
        playBoard.innerHTML = html;
        //innerHTML -this property allows to get or set the HTML content within(nersum tarri) an element.
         //dynamically update the display of a game 
    }

    updateFoodPosition();
    setIntervalId = setInterval(initGame, 120);
    document.addEventListener("keyup", changeDirection);

}
//snakeBody[0][1] is the X coordinate of the head of the snake.
//snakeBody[0][0] is the Y coordinate of the head of the snake.
//snakeBody[i][1] is the X coordinate of the i-th body segment.
//snakeBody[i][0] is the Y coordinate of the i-th body segment.



