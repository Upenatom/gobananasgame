/*---- constants ----*/
import { words, lettersArray } from "./library.js";

// const words = [
//   [
//     "STAR WARS",
//     "STORM TROOPER",
//     `"IT'S A TRAP!"`,
//     `"PATIENCE YOU MUST LEARN"`,
//     `"I FIND YOUR LACK OF FAITH DISTURBING"`,
//     "OBI-WAN KENOBI",
//     "GENERAL GRIEVOUS",
//     "AHSOKA TANO",
//     `"YOUR PATH YOU MUST DECIDE"`,
//     "BOUNTY HUNTER",
//     "BE CAREFUL NOT TO CHOKE ON YOUR ASPIRATIONS",
//   ],
//   [
//     "FOOD",
//     "MORROCAN CHICKEN STEW",
//     "MACARONI AND CHEESE",
//     "DOUBLE CHOLATE LAYER CAKE",
//     "CEDAR PLANK SALMON",
//     "BOUILLABAISSE",
//     "CHICKEN SHAWARA",
//     "KUNG PAO CHICKEN",
//     "SPICEY FRIED BASIL RICE",
//     "MASALA DOSA",
//     "SEAFOOD PAELLA",
//     "BUTTERED TOAST WITH MARMITE",
//     "SHISH KEBAB",
//     "PASTEL DE NATA",
//     "TOM YUM GOONG",
//     "PEKING DUCK",
//     "MASSAMAN CURRY",
//   ],
//   [
//     "TV-SHOWS",
//     "FRESH PRINCE OF BEL-AIR",
//     "BREAKING BAD",
//     "WHEEL OF FORTUNE",
//     "HOUSE OF CARDS",
//     "THE SOPRANOS",
//     "ARRESTED DEVELOPMENT",
//     "CURB YOUR ENTHUSIASM",
//     "ALL IN THE FAMILY",
//     "SONS OF ANARCHY",
//     "I LOVE LUCY",
//     "BATTLESTAR GALACTICA",
//     `IT'S ALWAYS SUNNY IN PHILADELPHIA`,
//     "FREAKS AND GEEKS",
//     "DOCTOR WHO",
//     `LATE NIGHT WITH CONAN O'BRIEN`,
//     "FAWLTY TOWERS",
//     "BUFFY THE VAMPIRE SLAYER",
//     "GAME OF THRONES",
//     "JERSEY SHORE",
//   ],
// ];

const numOfRounds = 3;
const timerSolvePuzz = 500; //500ms
/*---- app's state (variables) ----*/
let round;
let p1Name;
let p1Points;
let p2Name;
let p2Points;
let instruct;
let trackerArr;
let compareArr;
let currentWord;
let playerchoice;
let word;
let p1Solve;
let p2Solve;
let theme;

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
/*---- functions ----*/
function init() {
  round = 0;
  p1Name = "Player 1";
  p1Points = 0;
  p2Name = "Player 2";
  p2Points = 0;
  instruct = `Let's get ready to play!!
    Please enter your names in the prompt boxes`;
  trackerArr = [];
  compareArr = [];
  p1Solve = "SOLVE";
  p2Solve = "SOLVE";
  theme = "The word or phrase hint will appear here";
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
  console.log(spltword);
  //create div containers for word characters
  for (let i = 0; i < spltphrase.length; i++) {
    wordDivContainer[i] = document.createElement("div");
    wordDivContainer[i].classList.add("wordContainer");
    gameBoardEl.append(wordDivContainer[i]);
    for (let j = 0; j < spltword[i].length; j++) {
      count = count + 1;
      charDivContainer[j] = document.createElement("div");
      charDivContainer[j].id = `gbLetter${count}`;
      charDivContainer[j].classList.add("letterContainer");
      wordDivContainer[i].append(charDivContainer[j]);
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
function render() {
  roundEl.textContent = `Round ${round} of ${numOfRounds}`;
  instructEl.textContent = instruct;
  p1NameEl.textContent = p1Name;
  p2NameEl.textContent = p2Name;
  p1PointsEl.textContent = `${p2Points}`;
  p2PointsEl.textContent = `${p2Points}`;
  p1SolveEl.textContent = p1Solve;
  p2SolveEl.textContent = p2Solve;
  themeEl.textContent = theme;
  lettersEl;
  spinnerEl;
  spinButtEl;
}
function randomWord(wordArr) {
  let themeIndex = Math.floor(Math.random() * wordArr.length);
  let wordIndex =
    Math.floor(Math.random() * (wordArr[themeIndex].length - 1) - 1 + 1) + 1;
  //return array that contains [theme,word]
  return [wordArr[themeIndex][0], wordArr[themeIndex][wordIndex]];
}
function randomPlayerSelect() {}
function correctLetter() {}
function wrongLetter() {}
function switchPlayer() {}
function checkLetter() {}
function updateTrackerArr() {}
function endRoundCheck() {}
function randomPoints() {}
function revealBoardLetter() {}
function createGameBoard() {} //create gameboard based on random selection of theme and phrase
function disableLetter() {}
function switchbutton() {} //tobble solve buttons to buzzers
