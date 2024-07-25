const playBoard = document.querySelector(".play-board");

let foodX , foodY ;
//Snake Head position will be Fixed
let snakeX = 5 , snakeY = 10 ;

const changeFoodPosition = () => {
    // Passing a random 1 - 30 value as Food-Position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    // grid-area is a shorthand property that sets values for grid item's start and end lines for both the row and column
    
    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

    // Creating a food-div and inserting it in the playboard element
    playBoard.innerHTML = htmlMarkup ;
}
changeFoodPosition();
initGame();
