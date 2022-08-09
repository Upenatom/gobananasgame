/*---- constants ----*/
import { words, lettersArray } from "./library.js";

const spinnerArr = [
  100,
  150,
  200,
  250,
  300,
  350,
  500,
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
let currentWord;
let playerchoice;
let word;
let p1Solve;
let p2Solve;
let theme;
let currentPlayer;
let spinResult = 0;
let targetLetter;
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

/*---- event listeners ----*/
// p1SolveEl.addEventListener("keypress");
// p2SolveEl.addEventListener("keypress");
// spinButtEl.addEventListener("click");
// spinButtEl.addEventListener("keypress");
// lettersEl.addEventListener("click");

init();
render();
newRound(words);
render();
spinButtEl.addEventListener("click", spinIt);

/*---- FUNCTIONS ----*/
function checkLetter() {}
function init() {
  round = 0;
  player = [
    {
      name: "Player 1",
      points: 0,
    },
    {
      name: "Player 2",
      points: 0,
    },
  ];

  instruct = `Let's get ready to play!!
    Please enter your names in the prompt boxes`;
  trackerArr = [];
  compareCharArr = [];
  p1Solve = "SOLVE";
  p2Solve = "SOLVE";
  theme = "The word or phrase hint will appear here";
  spin1El.textContent = "0";
  currentPlayer = player[0];
}
function render() {
  roundEl.textContent = `Round ${round} of ${numOfRounds}`;
  instructEl.textContent = instruct;
  p1NameEl.textContent = player[0].name;
  p2NameEl.textContent = player[1].name;
  p1PointsEl.textContent = `${player[0].points}`;
  p2PointsEl.textContent = `${player[1].points}`;
  themeEl.textContent = theme;
  lettersEl;
  spin1El.textContent = spinResult;
  spinButtEl;
}
function newRound(wordArr) {
  round = round + 1;
  word = randomWord(wordArr);
  theme = word[0];
  generateBoards(word);
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
function spinIt() {
  spinResult = spinnerArr[randomNumberGen(spinnerArr.length - 1, 0)];
  render();
  if (spinResult === "LOSE TURN") {
    switchPlayer();
  } else if (spinResult === "LOSE POINTS") {
    currentPlayer.points = 0;
    switchPlayer();
  } else if (spinResult !== "LOSE TURN" || spinResult !== "LOSE POINTS") {
    instruct = `${currentPlayer.name}, choose a letter or click solve to solve the puzzle`;
    render();
    //deactivate spinner button so that player can't spin again.
    spinButtEl.removeEventListener("click", spinIt);
    //activate letters button so player can choose letter.
    lettersEl.addEventListener("click", function (e) {
      checkBoard(e.target.id);
      console.log(trackerArr);
    });
  }
}
function randomNumberGen(highNum, lowNum) {
  return Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
}
function switchPlayer() {
  if (currentPlayer === player[0]) {
    currentPlayer = player[1];
    instruct = `${player[1].name} Hit the SPIN IT!! <spacebar> or click SOLVE <z>`;
  } else if (currentPlayer === player[1]) {
    currentPlayer = player[0];
    instruct = `${player[0].name} Hit the SPIN IT!! <spacebar> or click SOLVE <z>`;
  }
}
function checkBoard(letter) {
  compareCharArr.forEach(function (char, i) {
    if (char === letter) {
      currentPlayer.points = currentPlayer.points + spinResult;
      document.getElementById(i).textContent = letter;
      trackerArr.splice(i, 1);
      render();
    }
  });
}
function randomPlayerSelect() {}
function correctLetter() {}
function wrongLetter() {}
function endRoundCheck() {}
function revealBoardLetter() {}
function disableLetter() {}
function switchbutton() {} //tobble solve buttons to buzzers
