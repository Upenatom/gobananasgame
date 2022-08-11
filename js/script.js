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
  "LOSE BANANAS",
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
//mode selects between the keyboard on screen in spin
//mode '0' (stops after first letter is selected) or solve
//mode '1'(stops only when user gets the wrong letter)
let mode;
let clear;
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
const spin1El = document.querySelector(".spin");
const p1winsEl = document.getElementById("p1wins");
const p2winsEl = document.getElementById("p2wins");

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
  instruct = `GAME PROMPTS WILL BE DISPLAYED HERE`;
  theme = "THE THEME OR HINT WILL BE DISPLAYED HERE.";
  trackerArr = [];
  compareCharArr = [];
  spin1El.textContent = "0";
  spinButtStatus = false;
  letterButtStatus = false;
  solveButtStatus = false;
  spinResButtStatus = false;
  winner = "";
  spinResult = "LET'S PLAY!";
  solveTimerDisplay = [];
  stopTimer = true;
  render();
  clearBoard();
  enterName();
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
  // generate keyboard letters to choose from and add to letters container
  lettersArray.forEach(function (letter, i) {
    letterDivContainer[i] = document.createElement("button");
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
  } else if (spinResult === "LOSE BANANAS") {
    currentPlayer.points = 0;
    render();
    switchPlayer();
  } else if (spinResult !== "LOSE TURN" || spinResult !== "LOSE BANANAS") {
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
        char !== "-" &&
        char !== "." &&
        char !== ":"
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
        char !== "." &&
        char !== ":"
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
  e.target.remove();
  checkBoard(e.target.id, mode);
}

function assignRoundWins() {
  if (trackerArr.length === 0) {
    stopTimer = true;
    if (player[0].points > player[1].points) {
      instruct = `${player[0]} WINS ROUND ${round}`;
      player[0].wins = player[0].wins + 1;
      render();
      newRound();
    } else if (player[0].points < player[1].points) {
      instruct = `${player[1]} WINS ROUND ${round}`;
      player[1].wins = player[1].wins + 1;
      render();
      newRound();
    } else if (player[0].wins === 2 || player[1].wins === 2) {
      return;
    }
  }
}
function gameWinLogic() {
  if (player[0].wins === 2) {
    instruct = `${player[0].name} WINS THE GAME!!!!!!`;
    spinButtStatus = false;
    letterButtStatus = false;
    winner = player[0].name;
    theme = `${player[0].name} WINS THE GAME!!!!!!`;
    // buttonState();
    clearBoard();
    displayWinScreen();
  } else if (player[1].wins === 2) {
    instruct = `${player[1].name} WINS THE GAME!!!!!!`;
    spinButtStatus = false;
    letterButtStatus = false;
    winner = player[1].name;
    round = round - 1;
    theme = `${player[1].name} WINS THE GAME!!!!!!`;
    // buttonState();
    clearBoard();
    displayWinScreen();
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
  clear = document.querySelectorAll(".inputField");
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
  spinResult = "PLAY AGAIN? CLICK HERE!";
  spin1El.classList.add("spinwin");
  spinResButtStatus = true;
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
  //create array for display with elements to display during countdown
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
    } Bananas`;
    //subtract points from player
    currentPlayer.points = currentPlayer.points - 10;
    if (currentPlayer.points < 0) {
      currentPlayer.points = 0;
    }
    //stop timer condition added to stop timer when player selects wrong letter
    if (j === 0 || stopTimer === true) {
      clearInterval(timer);
      spin1El.style.fontSize = "75px";
      switchPlayer();
    } else {
      j--;
    }
  }
}
function enterName() {
  clearBoard();
  //Dynamically Create input elements and prompts
  let enterNameEl = document.createElement("div");
  enterNameEl.classList.add("inputField");
  enterNameEl.textContent = "ENTER PLAYER NAMES AND CLICK START:";
  gameBoardEl.append(enterNameEl);
  let nameInputPl1EL = document.createElement("input");
  nameInputPl1EL.classList.add("inputField");
  nameInputPl1EL.setAttribute("type", "text");
  nameInputPl1EL.style.backgroundColor = "#eee8aa";
  nameInputPl1EL.setAttribute("maxlength", "8");
  gameBoardEl.append(nameInputPl1EL);
  nameInputPl1EL.value = player[0].name;
  let nameInputPl2EL = document.createElement("input");
  nameInputPl2EL.classList.add("inputField");
  nameInputPl2EL.setAttribute("type", "text");
  nameInputPl2EL.style.backgroundColor = "#eee8aa";
  nameInputPl1EL.setAttribute("maxlength", "8");
  gameBoardEl.append(nameInputPl2EL);
  nameInputPl2EL.value = player[1].name;
  let submitButtEl = document.createElement("button");
  submitButtEl.textContent = "START";
  submitButtEl.classList.add("inputField");
  gameBoardEl.append(submitButtEl);
  gameBoardEl.style.flexDirection = "column";
  //event listener for submit player buttons
  submitButtEl.addEventListener("click", function () {
    player[0].name = nameInputPl1EL.value.toUpperCase();
    player[1].name = nameInputPl2EL.value.toUpperCase();
    gameBoardEl.style.flexDirection = "row";
    clearBoard();
    newRound();
  });
}
