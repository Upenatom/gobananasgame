/*---- constants ----*/
import { words, lettersArray } from "./library.js";
const congrats = [
  "C",
  "O",
  "N",
  "G",
  "R",
  "A",
  "T",
  "U",
  "L",
  "A",
  "T",
  "I",
  "O",
  "N",
  "S",
  "!",
  "!",
];
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
const timerSolvePuzz = 1000;
const timerPenalty = -10;
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
let solveButtStatus;
let spinResButtStatus;
let winner;
let solve;
//mode selects between the keyboard on screen in spin
//mode '0' (stops after first letter is selected) or solve
//mode '1'(stops only when user gets the wrong letter)
let mode;
let clear;
let solveTimer;
let solveTimerDisplay;
let stopTimer;
/*---- cached element references ----*/
const roundEl = document.getElementById("round");
const instructEl = document.getElementById("instruct");
const p1NameEl = document.getElementById("p1name");
const p2NameEl = document.getElementById("p2name");
const p1PointsEl = document.getElementById("p1points");
const p2PointsEl = document.getElementById("p2points");
const solveEl = document.getElementById("solve");
const gameBoardEl = document.getElementById("gameboard");
const lettersEl = document.getElementById("letters");
const spinnerEl = document.getElementById("spinner");
const spinButtEl = document.getElementById("spinbutt");
const themeEl = document.getElementById("theme");
const spin1El = document.getElementById("spin1");
const p1winsEl = document.getElementById("p1wins");
const p2winsEl = document.getElementById("p2wins");
const boxcont1El = document.getElementById("boxcont1");
const boxcont2El = document.getElementById("boxcont2");

/*---- event listeners ----*/
function buttonState() {
  if (spinButtStatus === true) {
    spinButtEl.addEventListener("click", playerSpin);
  } else spinButtEl.removeEventListener("click", playerSpin);
  if (letterButtStatus === true) {
    lettersEl.addEventListener("click", removeLetter);
  } else if (letterButtStatus === false) {
    lettersEl.removeEventListener("click", removeLetter);
  }

  if (solveButtStatus === true) {
    solveEl.addEventListener("click", playerSolve);
  } else if (solveButtStatus === false) {
    solveEl.removeEventListener("click", playerSolve);
  }
  if (spinResButtStatus === true) {
    spinnerEl.addEventListener("click", init);
  } else if (solveButtStatus === false) {
    spinnerEl.removeEventListener("click", init);
  }
}

init();

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
  instruct = `${currentPlayer.name}: CLICK THE SPIN BUTTON! THE WORD THEME IS BELOW`;
  trackerArr = [];
  compareCharArr = [];
  solve = "SOLVE";
  spin1El.textContent = "0";
  spinButtStatus = true;
  letterButtStatus = false;
  solveButtStatus = true;
  spinResButtStatus = false;
  winner = "";
  spinResult = "LET'S PLAY!";
  solveTimer = [];
  solveTimerDisplay = [];
  stopTimer = true;
  render();
  clearBoard();
  newRound();
}
function render() {
  roundEl.textContent = `ROUND ${round} OF ${numOfRounds}`;
  instructEl.textContent = instruct;
  p1NameEl.textContent = player[0].name;
  p2NameEl.textContent = player[1].name;
  p1PointsEl.textContent = `${player[0].points}`;
  p2PointsEl.textContent = `${player[1].points}`;
  themeEl.textContent = theme;
  p1winsEl.textContent = `Wins: ${player[0].wins}/2`;
  p2winsEl.textContent = `Wins: ${player[1].wins}/2`;
  lettersEl;
  spin1El.textContent = spinResult;
  spinButtEl;
  buttonState();
}
//selects a new word/theme
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
  solveButtStatus = true;
  spinButtStatus = true;
  instruct = `${currentPlayer.name} CHOOSE THE SPIN OR SOLVE BUTTON`;
  render();
}
//generatesboard based on new word/theme
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
//randomize selection - called by newRound()
function randomWord(wordArr) {
  let themeIndex = Math.floor(Math.random() * wordArr.length);
  let wordIndex =
    Math.floor(Math.random() * (wordArr[themeIndex].length - 1) - 1 + 1) + 1;
  //return array that contains [theme,word]
  return [wordArr[themeIndex][0], wordArr[themeIndex][wordIndex]];
}
//Executes when player clicks spin
function playerSpin() {
  spinResult = spinnerArr[randomNumberGen(spinnerArr.length - 1, 0)];
  animatespinner(spinResult);
  console.log(spinResult);
  if (spinResult === "LOSE TURN") {
    render();
    switchPlayer();
  } else if (spinResult === "LOSE POINTS") {
    currentPlayer.points = 0;
    render();
    switchPlayer();
  } else if (spinResult !== "LOSE TURN" || spinResult !== "LOSE POINTS") {
    instruct = `${currentPlayer.name}: CHOOSE A LETTER`;
    //deactivate spinner button so that player can't spin again.
    //activate letter buttons
    spinButtStatus = false;
    letterButtStatus = true;
    solveButtStatus = false;
    mode = 0;
    render();
  }
}

//executes whem player clicks Solve
function playerSolve() {
  instruct = `${currentPlayer.name} YOU HAVE 10 SECONDS TO SOLVE. ${timerPenalty} POINTS EVERY SECOND`;
  spinButtStatus = false;
  letterButtStatus = true;
  solveButtStatus = false;
  mode = 1;
  render();
  startSolveTimer(timerSolvePuzz, 10);

  console.log(mode);
}
//runs check on selected letter in mode 0 or mode 2 when letter is clicked(continous selection)
function checkBoard(letter, mode) {
  //return true if selected character exists
  let x = compareCharArr.some(function (char) {
    return char === letter;
  });
  //SPIN MODE (MODE 0)
  if (x === true && mode === 0) {
    letterButtStatus = false;
    buttonState();
    compareCharArr.forEach(function (char, i) {
      //remove letters from keyboard area
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
    assignRoundWins();
    switchPlayer();
    gameWinLogic();
    render();
  }
  //SOLVE MODE (MODE 1)
  else if (mode === 1 && x === true) {
    letterButtStatus = true;
    // buttonState();
    compareCharArr.forEach(function (char, i) {
      //remove letters from keyboard area as they are selected
      if (char === letter) {
        document.getElementById(i).textContent = letter;
        document.getElementById(i).classList.remove("letterContainer");
        document.getElementById(i).classList.add("guessedletter");
      }
    });
    //create temp array to copy items over that aren't the target letter then reassign to tempArr
    let tempArr = [];
    trackerArr.forEach(function (char, i) {
      if (
        char !== letter &&
        char !== `'` &&
        char !== `"` &&
        char !== "!" &&
        char !== "?" &&
        char !== "-" &&
        char !== "."
      ) {
        tempArr.push(trackerArr[i]);
      }
    });
    //overwrite trackerArr with tempArr
    trackerArr = tempArr;
    //Round Win Check
    assignRoundWins();
    gameWinLogic();
    // render();
  } else switchPlayer();
  console.log(trackerArr);
  console.log(trackerArr.length);
}

function randomNumberGen(highNum, lowNum) {
  return Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
}
function switchPlayer() {
  if (currentPlayer === player[0]) {
    currentPlayer = player[1];
    instruct = `${player[1].name} CLICK THE SPIN IT!! OR CLICK SOLVE`;
    spinButtStatus = true;
    letterButtStatus = false;
    solveButtStatus = true;
    stopTimer = true;
    render();
  } else if (currentPlayer === player[1]) {
    currentPlayer = player[0];
    instruct = `${player[0].name} CLICK THE SPIN IT!! OR CLICK SOLVE`;
    spinButtStatus = true;
    letterButtStatus = false;
    solveButtStatus = true;
    stopTimer = true;
    render();
  }
}
function removeLetter(e) {
  e.target.classList.remove("chooseletter");
  e.target.classList.add("chooseletterclose");
  checkBoard(e.target.id, mode);
}

function assignRoundWins() {
  if (trackerArr.length === 0) {
    if (player[0].points > player[1].points) {
      player[0].wins = player[0].wins + 1;
      newRound();
    } else if (player[0].points < player[1].points) {
      player[1].wins = player[1].wins + 1;
      newRound();
    } else if (player[0].wins === 2 || player[1].wins === 2) {
      return;
    }
  }
}
function gameWinLogic() {
  if (player[0].wins === 2) {
    instruct = `${player[0].name} WINS!!!!!!`;
    spinButtStatus = false;
    letterButtStatus = false;
    winner = player[0].name;
    theme = `${player[1].name} WINS!!!!!!`;
    // buttonState();
    clearBoard();
    displayWinScreen();
    render();
  } else if (player[1].wins === 2) {
    instruct = `${player[1].name} WINS!!!!!!`;
    spinButtStatus = false;
    letterButtStatus = false;
    winner = player[1].name;
    round = round - 1;
    theme = `${player[1].name} WINS!!!!!!`;
    // buttonState();
    clearBoard();
    displayWinScreen();
    render();
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
  clear = document.querySelectorAll(".winTheme");
  clear.forEach(function (div) {
    div.remove();
  });
  spin1El.classList.remove("spinwin");
  spin1El.classList.add("spin");
}

function displayWinScreen() {
  let cong = [];
  let banana = [];
  congrats.forEach(function (letter, i) {
    cong[i] = document.createElement("div");
    cong[i].id = letter;
    cong[i].textContent = letter;
    cong[i].classList.add("chooseletter");
    lettersEl.append(cong[i]);
  });
  for (let i = 0; i < 3; i++) {
    banana[i] = document.createElement("div");
    banana[i].classList.add("winTheme");
    gameBoardEl.append(banana[i]);
  }
  spin1El.classList.toggle("spin");
  spin1El.classList.add("spinwin");
  spinResult = "PLAY AGAIN? CLICK HERE!";
  spinResButtStatus = true;
  render();
}
function animatespinner(result) {
  let timer = setInterval(flip, 60);
  let i = 0;
  let count = 0;
  function flip() {
    spin1El.textContent = spinnerArr[i];
    if (count === 20) {
      clearInterval(timer);
      spin1El.textContent = result;
    } else {
      i++;
      count++;
      if (i === 8) {
        i = 0;
      }
    }
  }
}
function startSolveTimer(deltaT, bigNum) {
  stopTimer = false;
  //create array for display purposes during countdown
  for (let j = bigNum; j > 0; j--) {
    solveTimerDisplay[j] = j;
  }
  let timer = setInterval(countDwn, deltaT);
  let j = bigNum;
  spin1El.style.fontSize = "25px";
  function countDwn() {
    //display timer per frame
    spin1El.textContent = `Timer: ${solveTimerDisplay[j]}s. ${
      timerPenalty * j
    } Points`;
    //subtract points from player
    currentPlayer.points = currentPlayer.points - 10;
    //stop timer condition added to stop timer when player selects wrong letter
    if (j === 0 || stopTimer === true) {
      clearInterval(timer);
      switchPlayer();
    } else {
      j--;
    }
  }
}
