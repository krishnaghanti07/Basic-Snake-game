const playBoard = document.querySelector(".play-board");

let foodX , foodY ;
//Snake Head position will be Fixed
let snakeX = 5 , snakeY = 10 ;
let snakeBody = [] ;
let velocityX = 0 , velocityY = 0 ;

const changeFoodPosition = () => {
    // Passing a random 1 - 30 value as Food-Position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (e) => {
    // console.log (e); // Getting Details of the Pressed Key ...

    // Changing The velocity based on the "Key-Press"
    if (e.key === "ArrowUp") {
        velocityX = 0 ;
        velocityY = -1 ;
    } else if (e.key === "ArrowDown") {
        velocityX = 0 ;
        velocityY = 1 ;
    } else if (e.key === "ArrowLeft") {
        velocityX = -1 ;
        velocityY = 0 ;
    } else if (e.key === "ArrowRight") {
        velocityX = 1 ;
        velocityY = 0 ;
    }

    // initGame();
}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    // grid-area is a shorthand property that sets values for grid item's start and end lines for both the row and column
    
    // Checking if The Snake hits the Food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX , foodY]); //Pushing Food position to Snake-Body Array
        console.log (snakeBody);
    }

    for (let i=snakeBody.length-1 ; i>0 ; i--) {
        //  Shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX , snakeY]; // Setting first element of snake-body to current snake-position

    // Updating The Snake's Head Position based on The Current velocity
    snakeX += velocityX ;
    snakeY += velocityY ;

    for (let i=0 ; i<snakeBody.length ; i++) {
        // Adding a div for each part of the Snake's Body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    }

    // Creating a food-div and inserting it in the playboard element
    playBoard.innerHTML = htmlMarkup ;
}
changeFoodPosition();
// initGame();

// Now The Head will move after every 125 mili-seconds .
setInterval (initGame , 125);

document.addEventListener("keydown" , changeDirection);
