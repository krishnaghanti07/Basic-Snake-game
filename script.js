const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false ;

let foodX , foodY ;
//Snake Head position will be Fixed
let snakeX = 5 , snakeY = 10 ;
let snakeBody = [] ;
let velocityX = 0 , velocityY = 0 ;
let setIntervalId ;

let score = 0 ;

// Getting The High-Score from the Local-Storage
let highScore = localStorage.getItem("high-score") || 0 ;
highScoreElement.innerText = `High Score: ${highScore}` ;


const changeFoodPosition = () => {
    // Passing a random 1 - 30 value as Food-Position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // Clearing The timer and Reloading the Page on Game-Over
    clearInterval(setIntervalId);
    alert ("Game Over ...! , Press OK to replay ...");
    location.reload();
}

const changeDirection = (e) => {
    // console.log (e); // Getting Details of the Pressed Key ...

    // Changing The velocity based on the "Key-Press"
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0 ;
        velocityY = -1 ;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0 ;
        velocityY = 1 ;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1 ;
        velocityY = 0 ;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1 ;
        velocityY = 0 ;
    }
    // initGame();
}

controls.forEach (key => {
    key.addEventListener("click" ,() => {
        // console.log (key);

        //Calling changeDirection on Each key-Click and Passing key-dataset values as an object
        changeDirection({ key: key.dataset.key });
    });
});

const initGame = () => {

    if (gameOver) return handleGameOver() ;

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    // grid-area is a shorthand property that sets values for grid item's start and end lines for both the row and column
    
    // Checking if The Snake hits the Food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX , foodY]); //Pushing Food position to Snake-Body Array
        // console.log (snakeBody);

        score++ ; //increment Teh Score by 1

        // Set High-Score to Score-Value if the Score-Value is Greater than the High-Score
        highScore = (score >= highScore) ? score : highScore ;
        localStorage.setItem("high-score" , highScore);
        
        scoreElement.innerText = `Score: ${score}` ;
        highScoreElement.innerText = `High Score: ${highScore}` ;
    }

    for (let i=snakeBody.length-1 ; i>0 ; i--) {
        //  Shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX , snakeY]; // Setting first element of snake-body to current snake-position

    // Updating The Snake's Head Position based on The Current velocity
    snakeX += velocityX ;
    snakeY += velocityY ;

    // Checking if the Snake's head is out of wall , if so setting gameOver to "true"
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        // console.log (Game Over ..)
        gameOver = true ;
    }

    for (let i=0 ; i<snakeBody.length ; i++) {
        // Adding a div for each part of the Snake's Body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        // Checking if the Snake's head hit the body , if so Set The Game-Over to True ...
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    // Creating a food-div and inserting it in the playboard element
    playBoard.innerHTML = htmlMarkup ;
}
changeFoodPosition();
// initGame();

// Now The Head will move after every 125 mili-seconds .
setIntervalId = setInterval (initGame , 125);

document.addEventListener("keydown" , changeDirection);
