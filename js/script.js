/*---- constants ----*/
import { words, lettersArray } from "./library.js";

const spinnerArr = [
  "100",
  "150",
  "200",
  "250",
  "300",
  "350",
  "500",
  "LOSE TURN",
  "LOSE POINTS",
];
const numOfRounds = 3;
const timerSolvePuzz = 500; //500ms
/*---- app's state (variables) ----*/
let round;
let player;
let instruct;
let trackerArr;
let compareCharArr; //array to compare guessed letter with letters in word
let word;
let theme;
let currentPlayer;
let spinResult = 0;
let spinButtStatus;
let letterButtStatus;
let p1Solve;
let p2Solve;
let clear;
/*---- cached element references ----*/
const roundEl = document.getElementById("round");
const instructEl = document.getElementById("instruct");
const p1NameEl = document.getElementById("p1name");
const p2NameEl = document.getElementById("p2name");
const p1PointsEl = document.getElementById("p1points");
const p2PointsEl = document.getElementById("p2points");
const p1SolveEl = document.getElementById("p1solve");
const p2SolveEl = document.getElementById("p2solve");
const gameBoardEl = document.getElementById("gameboard");
const lettersEl = document.getElementById("letters");
const spinnerEl = document.getElementById("spinner");
const spinButtEl = document.getElementById("spinbutt");
const themeEl = document.getElementById("theme");
const spin1El = document.getElementById("spin1");
const p1winsEl = document.getElementById("p1wins");
const p2winsEl = document.getElementById("p2wins");

/*---- event listeners ----*/
//embedded in functions due to switching listeners off and on based ongame state

init();
newRound();

/*---- FUNCTIONS ----*/
function init() {
  round = 0;
  player = [
    {
      name: "Player 1",
      wins: 0,
      points: 0,
    },
    {
      name: "Player 2",
      wins: 0,
      points: 0,
    },
  ];
  currentPlayer = player[0];
  instruct = `${currentPlayer.name} press the spin button`;
  trackerArr = [];
  compareCharArr = [];
  p1Solve = "SOLVE";
  p2Solve = "SOLVE";
  theme = "The word or phrase hint will appear here";
  spin1El.textContent = "0";
  spinButtStatus = true;
  letterButtStatus = false;
}
function render() {
  roundEl.textContent = `Round ${round} of ${numOfRounds}`;
  instructEl.textContent = instruct;
  p1NameEl.textContent = player[0].name;
  p2NameEl.textContent = player[1].name;
  p1PointsEl.textContent = `${player[0].points}`;
  p2PointsEl.textContent = `${player[1].points}`;
  themeEl.textContent = theme;
  p1winsEl.textContent = `Wins: ${player[0].wins}`;
  p2winsEl.textContent = `Wins: ${player[1].wins}`;
  lettersEl;
  spin1El.textContent = spinResult;
  spinButtEl;
  buttonState();
}
function newRound() {
  clearBoard();
  render();
  trackerArr = [];
  compareCharArr = [];
  round = round + 1;
  player[0].points = 0;
  player[1].points = 0;
  word = randomWord(words);
  theme = word[0];
  generateBoards(word);
  spin1El.textContent = "0";
  render();
}
function generateBoards(selectedWord) {
  let spltword = [];
  let wordDivContainer = [];
  let charDivContainer = [];
  let letterDivContainer = [];
  let spltphrase = [];
  let count = 0;
  //split phrase into array of words: [word,word,word]
  spltphrase = selectedWord[1].split(" ");
  console.log(spltphrase);
  //split into array of array of characters:[['a','b','c'],['d','f',c],['y','t','a']]
  spltphrase.forEach((word, i) => {
    spltword[i] = word.split("");
  });
  // console.log(spltword);
  //create div containers for word characters
  for (let i = 0; i < spltphrase.length; i++) {
    wordDivContainer[i] = document.createElement("div");
    wordDivContainer[i].classList.add("wordContainer");
    gameBoardEl.append(wordDivContainer[i]);
    //create large character array of all letters and symbols without spaces to track letter selection to
    compareCharArr.push(...spltphrase[i]);
    trackerArr.push(...spltphrase[i]);

    for (let j = 0; j < spltword[i].length; j++) {
      charDivContainer[j] = document.createElement("div");
      charDivContainer[j].id = count;
      charDivContainer[j].classList.add("letterContainer");
      // charDivContainer[j].textContent = spltword[i][j];
      wordDivContainer[i].append(charDivContainer[j]);
      count = count + 1;
      //Show characters in the squares if not letters of alphabet
      if (
        spltword[i][j] === "'" ||
        spltword[i][j] === "-" ||
        spltword[i][j] === "!" ||
        spltword[i][j] === "?" ||
        spltword[i][j] === '"' ||
        spltword[i][j] === "." ||
        spltword[i][j] === ":" ||
        spltword[i][j] === ","
      ) {
        charDivContainer[j].classList.remove("letterContainer");
        charDivContainer[j].classList.add("symbols");
        charDivContainer[j].textContent = spltword[i][j];
      }
    }
    //create array with charcters AND spaces for comparing
  }
  // generate letters to choose from and add to letters container
  lettersArray.forEach(function (letter, i) {
    letterDivContainer[i] = document.createElement("div");
    letterDivContainer[i].id = letter;
    letterDivContainer[i].textContent = letter;
    letterDivContainer[i].classList.add("chooseletter");
    lettersEl.append(letterDivContainer[i]);
  });
}
function randomWord(wordArr) {
  let themeIndex = Math.floor(Math.random() * wordArr.length);
  let wordIndex =
    Math.floor(Math.random() * (wordArr[themeIndex].length - 1) - 1 + 1) + 1;
  //return array that contains [theme,word]
  return [wordArr[themeIndex][0], wordArr[themeIndex][wordIndex]];
}
//returns a random element from an array and adjusts player totals
function playerSpin() {
  spinResult = spinnerArr[randomNumberGen(spinnerArr.length - 1, 0)];
  render();
  if (spinResult === "LOSE TURN") {
    render();
    switchPlayer();
  } else if (spinResult === "LOSE POINTS") {
    currentPlayer.points = 0;
    render();
    switchPlayer();
  } else if (spinResult !== "LOSE TURN" || spinResult !== "LOSE POINTS") {
    instruct = `${currentPlayer.name}, choose a letter or click solve to solve the puzzle`;
    //deactivate spinner button so that player can't spin again.
    //activate letter buttons
    spinButtStatus = false;
    letterButtStatus = true;
    render();
  }
}
function checkBoard(letter) {
  //return true if selected character exists
  let x = compareCharArr.some(function (char) {
    return char === letter;
  });
  if (x === true) {
    letterButtStatus = false;
    buttonState();
    compareCharArr.forEach(function (char, i) {
      if (char === letter) {
        currentPlayer.points = currentPlayer.points + parseInt(spinResult);
        document.getElementById(i).textContent = letter;
        document.getElementById(i).classList.remove("letterContainer");
        document.getElementById(i).classList.add("guessedletter");
      }
    });
    //create temp array to copy items over taht aren't the target letter then reassign to tempArr
    let tempArr = [];
    trackerArr.forEach(function (char, i) {
      if (
        char !== letter &&
        char !== `'` &&
        char !== `"` &&
        char !== "!" &&
        char !== "?" &&
        char !== "-"
      ) {
        tempArr.push(trackerArr[i]);
      }
    });
    //overwrite trackerArr with tempArr
    trackerArr = tempArr;
    //Round Win Check
    render();
    switchPlayer();
  } else switchPlayer();
  console.log(trackerArr);
  console.log(trackerArr.length);
  roundProgress();
}

function randomNumberGen(highNum, lowNum) {
  return Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
}
function switchPlayer() {
  if (currentPlayer === player[0]) {
    currentPlayer = player[1];
    instruct = `${player[1].name} Hit the SPIN IT!! <spacebar> or click SOLVE <z>`;
    spinButtStatus = true;
    letterButtStatus = false;
  } else if (currentPlayer === player[1]) {
    currentPlayer = player[0];
    instruct = `${player[0].name} Hit the SPIN IT!! <spacebar> or click SOLVE <z>`;
    spinButtStatus = true;
    letterButtStatus = false;
  }
  render();
}
function buttonState() {
  if (spinButtStatus === true) {
    spinButtEl.addEventListener("click", playerSpin);
  } else spinButtEl.removeEventListener("click", playerSpin);
  if (letterButtStatus === true) {
    // lettersEl.addEventListener("click", function (e) {
    //   checkBoard(e.target.id);
    // });
    lettersEl.addEventListener("click", removeLetter);
  } else if (letterButtStatus === false) {
    lettersEl.removeEventListener("click", removeLetter);
  }
}
function removeLetter(e) {
  e.target.classList.remove("chooseletter");
  e.target.classList.add("chooseletterclose");
  checkBoard(e.target.id);
}
function roundProgress() {
  if (trackerArr.length === 0) {
    if (player[0].points > player[1].points) {
      player[0].wins = player[0].wins + 1;
    } else player[1].wins = player[1].wins + 1;
    newRound();
  } else if (trackerArr.length === 0 && player[0].wins == 2) {
    instruct = `${player[0]} WINS!!!!!!`;
    spinButtStatus = false;
    letterButtStatus = false;
    buttonState();
  } else if (trackerArr.length === 0 && player[1].wins == 2) {
    instruct = `${player[1]} WINS!!!!!!`;
    spinButtStatus = false;
    letterButtStatus = false;
    buttonState();
  }
}
function clearBoard() {
  clear = document.querySelectorAll(".chooseletter");
  clear.forEach(function (div) {
    div.remove();
  });
  clear = document.querySelectorAll(".chooseletterclose");
  clear.forEach(function (div) {
    div.remove();
  });
  clear = document.querySelectorAll(".letterContainer");
  clear.forEach(function (div) {
    div.remove();
  });
  clear = document.querySelectorAll(".guessedletter");
  clear.forEach(function (div) {
    div.remove();
  });
  clear = document.querySelectorAll(".symbols");
  clear.forEach(function (div) {
    div.remove();
  });
  clear = document.querySelectorAll(".wordContainer");
  clear.forEach(function (div) {
    div.remove();
  });
}
