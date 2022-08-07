/*---- constants ----*/
const numOfRounds = 3;
const timerSolvePuzz = 500; //500ms
/*---- app's state (variables) ----*/
let round;
let p1Name;
let p1Points;
let p2Name;
let p2points;
let instruct;
let trackerArr;
let compareArr;
let currentWord;
let playerchoice;

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

/*---- event listeners ----*/
p1SolveEl.addEventListener("keypress");
p2SolveEl.addEventListener("keypress");
spinButtEl.addEventListener("click");
spinButtEl.addEventListener("keypress");
lettersEl.addEventListener("click");

/*---- functions ----*/
function init() {}
function render() {}
function correctLetter() {}
function wrongLetter() {}
function switchPlayer() {}
function checkLetter() {}
function updateTrackerArr() {}
function endRoundCheck() {}
function randomPoints() {}
function revealBoardLetter() {}
function createGameBoard() {}
function disableLetter() {}
function switchbutton() {} //switch solve buttons to buzzers
