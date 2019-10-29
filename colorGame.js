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
let easyButton = document.getElementById("easy"); //easy difficulty button
let hardButton = document.getElementById("hard"); //hard difficulty button

//Picking easy mode
easyButton.addEventListener("click", function(){
    easyButton.classList.add("selected"); //select easy
    hardButton.classList.remove("selected"); //deselect hard
    numSquares = 3;
    colors = getRandomColor(numSquares); //get 3 new colors for easy mode
    setWinningColor(); //set new winning color
    messageDisplay.textContent = "";
    newGame.textContent = "NEW COLORS"; 
    h1.style.backgroundColor = "steelblue";
    for (let i = 0; i < squares.length; i++){
        if (colors[i]){
            squares[i].style.background = colors[i];
        } else{
            squares[i].style.display = "none";
        }
    }
});

//Picking hard mode
hardButton.addEventListener("click", function(){
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");
    numSquares = 6;
    colors = getRandomColor(numSquares); //get 6 new colors for hard mode
    setWinningColor(); //set new winning color
    messageDisplay.textContent = "";
    newGame.textContent = "NEW COLORS";
    h1.style.backgroundColor = "steelblue";
    for (let i = 0; i < squares.length; i++){
        squares[i].style.background = colors[i];
        squares[i].style.display = "block";
    }
});

//Generate random RGB values for each random color
function generateRandomRGB() {
    let rgbArr = []; //initialize empty array to hold the r, g, an b value for each color
    for (let i = 0; i < 3; i++) { //randomize a value (0 - 255) for r, g, and b
        let value = Math.floor(Math.random() * 256);
        rgbArr.push(value); //add that value to the rgb array
    }
    return "rgb(" + rgbArr[0].toString() + ", " + rgbArr[1].toString() + ", " + rgbArr[2].toString() + ")"; //the color is the combination of r, g, and b values
}

//Getting the random colors for the current game
function getRandomColor(num) { //takes number of squares as an input
    let colorArr = []; //initialize empty array to hold the colors
    for (let i = 0; i < num; i++) { //repeat for number of squares chosen: easy = 3, hard = 6)
        colorArr.push(generateRandomRGB()); //push each color to the color array
    }
    return colorArr;
}

//Setting the color of the squares & game play
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

//Reset game with default conditions and new random colors
function reset(){
    colors = getRandomColor(numSquares); //gets the random colors for the game
    setWinningColor();
    setSquares();
    messageDisplay.textContent = "";
    newGame.textContent = "NEW COLORS";
    h1.style.backgroundColor = "steelblue";
}

//Initializing the game
setWinningColor(); //sets the winning color
setSquares(); //sets the squares and allows game play
newGame.addEventListener("click", reset); //resets game when button for new game is clicked
