//default starting settings (hard mode)
let numSquares = 6; //initialize hard mode w/ six choices
let colors = getRandomColor(numSquares); //gets the random colors for the game

//initialize variables that represent DOM elements
let winningValue = document.getElementById("winningValue");
let squares = document.querySelectorAll(".square"); //color squares
let body = document.querySelector("body");
let messageDisplay = document.getElementById("message");
let h1 = document.querySelector("h1"); //header (game title and winning rgb value)
let newGame = document.getElementById("newGame"); //reset button (new colors/play again)
let difficultyButtons = document.querySelectorAll(".difficulty"); //easy difficulty button

init();

//Initializing the game
function init() {
    newGame.addEventListener("click", reset); //resets game when button for new game is clicked
    difficulty();
    reset();
}

//Picking a difficulty
function difficulty(){
    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener("click", function () { //when mode is clicked
            difficultyButtons[0].classList.remove("selected"); //get rid of selected styling
            difficultyButtons[1].classList.remove("selected"); //get rid of selected styling
            this.classList.add("selected"); //only add selected styling to clicked button
            this.textContent === "EASY" ? numSquares = 3 : numSquares = 6; //if easy - 3 squares, else hard - 6 squares
            reset();
        });
    }
}

//Reset game with default conditions and new random colors
function reset() {
    colors = getRandomColor(numSquares); //gets the random colors for the game
    setWinningColor();
    setSquares();
    messageDisplay.textContent = "";
    newGame.textContent = "NEW COLORS";
    h1.style.backgroundColor = "steelblue";
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block"; //show all the squares
            squares[i].style.background = colors[i]; //set the color of the square to the random color
        } else {
            squares[i].style.display = "none"; //hide the extra squares that don't have colors
        }
    }
}

//Getting the random colors for the current game
function getRandomColor(num) { //takes number of squares as an input
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

//Setting a winning color
function setWinningColor() {
    let winner = Math.floor(Math.random() * colors.length); //pick random number from 0 - 5 (coresponds to index of colors)
    winningValue.textContent = colors[winner].toUpperCase(); //set the winning value to that color
}

//Setting the color of the squares & game play
function setSquares() {
    for (let i = 0; i < squares.length; i++) {
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

//Winning conditions
function winningConditions() {
    messageDisplay.textContent = "Correct!"; //correct!
    newGame.textContent = "PLAY AGAIN?";
    for (let i = 0; i < squares.length; i++) { //set all squares to be the rgb value of the winning color
        squares[i].style.backgroundColor = winningValue.innerText.toLowerCase();
    }
    h1.style.backgroundColor = winningValue.innerText.toLowerCase(); //set header to be the rgb value of the winning color
}