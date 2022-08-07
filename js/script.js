/*---- constants ----*/
const numOfRounds = 3;
const timerSolvePuzz = 500; //500ms
/*---- app's state (variables) ----*/

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
