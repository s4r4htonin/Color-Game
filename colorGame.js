//initialize variables that represent DOM elements
let winningValue = document.getElementById("winningValue");
let squares = document.querySelectorAll(".square");
let body = document.querySelector("body");
let messageDisplay = document.getElementById("message");
let h1 = document.querySelector("h1");
let newGame = document.getElementById("newGame");

//Getting the random colors for the current game
function getRandomColor(num) {
    let colorArr = []; //initialize empty array to hold the colors
    for (let i = 0; i < num; i++) { //repeat for number of squares chosen: easy = 3, hard = 6)
        colorArr.push(generateRandomRGB()); //push each color to the color array
    }
    return colorArr;
}

//Generate random RGB values for each random color
function generateRandomRGB() {
    let rgbArr = []; //initialize empty array to hold the r, g, an b value for each color
    for (let i = 0; i < 3; i++) { //randomize a value (0 - 255) for r, g, and b
        let value = Math.floor(Math.random() * 256);
        rgbArr.push(value); //add that value to the rgb array
    }
    return "rgb(" + rgbArr[0].toString() + ", " + rgbArr[1].toString() + ", " + rgbArr[2].toString() + ")"; //the color is the combination of r, g, and b values
}

//Setting the color of the squares
function setSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === winningValue.innerText.toLowerCase()) { //if clicked square is not the winning RGB
                winningConditions();
            } else {
                this.style.backgroundColor = body.style.backgroundColor; //make the square appear to disappear (set it equal to body background color)
                messageDisplay.textContent = "Try Again"; //try again
            }
        });
    }
}

//Setting a winning color
function setWinningColor() {
    let winner = Math.floor(Math.random() * colors.length); //pick random number from 0 - 5 (coresponds to index of colors)
    winningValue.textContent = colors[winner].toUpperCase(); //set the winning value to that color
}

//Reset game with default conditions and new random colors
function reset(){
    colors = getRandomColor(6); //gets the random colors for the game
    setWinningColor();
    setSquares();
    messageDisplay.textContent = "";
    newGame.textContent = "NEW COLORS";
    h1.style.backgroundColor = "blue";
}

//Winning conditions
function winningConditions() {
    messageDisplay.textContent = "Correct!"; //correct!
    newGame.textContent = "PLAY AGAIN?";
    for (let i = 0; i < squares.length; i++) { //set all squares to be the rgb value of the winning color
        squares[i].style.backgroundColor = winningValue.innerText.toLowerCase();
    }
    h1.style.backgroundColor = winningValue.innerText.toLowerCase(); //set header to be the rgb value of the winning color
    //ask user if they want to reset game
    //new colors = Play again?
}

//Initializing the game
let colors = getRandomColor(6); //gets the random colors for the game
setWinningColor();
setSquares();
newGame.addEventListener("click", reset);
