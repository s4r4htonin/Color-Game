let color = ""; //initialize string to hold random RGB

let winningValue = document.getElementById("winningValue");
let squares = document.querySelectorAll(".square");
let body = document.querySelector("body");
let messageDisplay = document.getElementById("message");
let h1 = document.querySelector("h1");

let colors = [getRandomRGB(), getRandomRGB(), getRandomRGB(), getRandomRGB(), getRandomRGB(), getRandomRGB()];

//Randomizing the RGB values
function getRandomRGB() {
    let colorArr = []; //initialize empty array
    for (let i = 0; i < 3; i++) { //randomize a value (0 - 255) for r, g, and b
        let value = Math.floor(Math.random() * 256);
        colorArr.push(value); //add that value to the array
    }
    return color = "rgb(" + colorArr[0].toString() + ", " + colorArr[1].toString() + ", " + colorArr[2].toString() + ")";
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

//New Colors
//add listening event for when clicked
//if clicked, reset game (set squares & winning value)

//Winning conditions
function winningConditions() {
    messageDisplay.textContent = "Correct!"; //correct!
    for (let i = 0; i < squares.length; i++) { //set all squares to be the rgb value of the winning color
        squares[i].style.backgroundColor = winningValue.innerText.toLowerCase();
    }
    h1.style.backgroundColor = winningValue.innerText.toLowerCase(); //set header to be the rgb value of the winning color
    //ask user if they want to reset game
    //new colors = Play again?
}

//Initializing the game
setSquares();
setWinningColor();