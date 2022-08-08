/*---- constants ----*/
// import { words } from "./library.js";

const words = [
  [
    "STAR WARS",
    "STORM TROOPER",
    `"IT'S A TRAP!"`,
    `"PATIENCE YOU MUST LEARN"`,
    `"I FIND YOUR LACK OF FAITH DISTURBING"`,
    "OBI-WAN KENOBI",
    "GENERAL GRIEVOUS",
    "AHSOKA TANO",
    `"YOUR PATH YOU MUST DECIDE"`,
    "BOUNTY HUNTER",
    "BE CAREFUL NOT TO CHOKE ON YOUR ASPIRATIONS",
  ],
  [
    "FOOD",
    "MORROCAN CHICKEN STEW",
    "MACARONI AND CHEESE",
    "DOUBLE CHOLATE LAYER CAKE",
    "CEDAR PLANK SALMON",
    "BOUILLABAISSE",
    "CHICKEN SHAWARA",
    "KUNG PAO CHICKEN",
    "SPICEY FRIED BASIL RICE",
    "MASALA DOSA",
    "SEAFOOD PAELLA",
    "BUTTERED TOAST WITH MARMITE",
    "SHISH KEBAB",
    "PASTEL DE NATA",
    "TOM YUM GOONG",
    "PEKING DUCK",
    "MASSAMAN CURRY",
  ],
  [
    "TV-SHOWS",
    "FRESH PRINCE OF BEL-AIR",
    "BREAKING BAD",
    "WHEEL OF FORTUNE",
    "HOUSE OF CARDS",
    "THE SOPRANOS",
    "ARRESTED DEVELOPMENT",
    "CURB YOUR ENTHUSIASM",
    "ALL IN THE FAMILY",
    "SONS OF ANARCHY",
    "I LOVE LUCY",
    "BATTLESTAR GALACTICA",
    `IT'S ALWAYS SUNNY IN PHILADELPHIA`,
    "FREAKS AND GEEKS",
    "DOCTOR WHO",
    `LATE NIGHT WITH CONAN O'BRIEN`,
    "FAWLTY TOWERS",
    "BUFFY THE VAMPIRE SLAYER",
    "GAME OF THRONES",
    "JERSEY SHORE",
  ],
];

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
let lettersArr;

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

init(words);
render();
console.log(word);

/*---- functions ----*/
function init(wordArr) {
  round = 1;
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
  lettersArr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  word = randomWord(wordArr);
}
function render() {
  roundEl.textContent = `Round ${round} of ${numOfRounds}`;
  instructEl.textContent = instruct;
  p1NameEl.textContent = p1Name;
  p2NameEl.textContent = p2Name;
  p1PointsEl.textContent = `Points: ${p2Points}`;
  p2PointsEl.textContent = `Points: ${p2Points}`;
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
  return [wordArr[themeIndex][0], wordArr[themeIndex][wordIndex], wordIndex];
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
