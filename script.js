const playBoard = document.querySelector(".play-board");

let foodX , foodY ;
//Snake Head position will be Fixed
let snakeX = 5 , snakeY = 10 ;
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
    
    // Updating The Snake's Head Position based on The Current velocity
    snakeX += velocityX ;
    snakeY += velocityY ;

    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

    // Creating a food-div and inserting it in the playboard element
    playBoard.innerHTML = htmlMarkup ;
}
changeFoodPosition();
// initGame();

// Now The Head will move after every 125 mili-seconds .
setInterval (initGame , 125);

document.addEventListener("keydown" , changeDirection);
