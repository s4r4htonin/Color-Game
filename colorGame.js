let color = ""; //initialize string to hold random RGB
let winningValue = document.getElementById("winningValue");
let colors = [getRandomRGB(), getRandomRGB(), getRandomRGB(), getRandomRGB(), getRandomRGB(), getRandomRGB()];
let squares = document.querySelectorAll(".square");

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
        squares[i].addEventListener("click", function(){ 
            let clickedColor = this.style.backgroundColor;
            if (clickedColor != winningValue.innerText.toLowerCase()){ //if clicked square is not the winning RGB
                this.style.backgroundColor = document.querySelector("body").style.backgroundColor; //make the square appear to disappear (set it equal to body background color)
            }
        });
    }
}

//Setting a winning color
function setWinningValue() {
    let winner = Math.floor(Math.random() * 6); //pick random number from 0 - 5 (coresponds to index of colors)
    winningValue.textContent = colors[winner].toUpperCase(); //set the winning value to that color
}

//Initializing the game
setSquares();
setWinningValue();
