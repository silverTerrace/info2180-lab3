"use strict";

let squares = null;
let board = ["", "", "", "", "", "", "", "", ""];
let turn = ["X", "O"];
let toggleSwitch = 0;
let squareCount = 0;
let button = null;

function reset() {
  button = document.querySelector("button");
  //button.addEventListener("click", function());
  board = ["", "", "", "", "", "", "", "", ""];
  toggleSwitch = 0;
  squareCount = 0;

  squares = document.querySelectorAll("#board > div");

  console.log(`board: ${board}`);
  console.log(`t switch: ${toggleSwitch}`);
  console.log(`squareCount: ${squareCount}`);
  console.log(`squares: ${squares}`);

  let statusElem = document.getElementById("status");
  statusElem.innerHTML = `Move your mouse over a square and click to play an X or an O.`;
  statusElem.classList.remove("you-won");

  squares.forEach(function (square) {
    square.classList.remove("X");
    square.classList.remove("O");
    square.classList.add("square");
    square.innerHTML = "";
    let squareNum = squareCount;
    squareCount++;
    let isclicked = false;
    square.addEventListener("mouseover", function () {
      square.classList.add("hover");
    });
    square.addEventListener("mouseout", function () {
      square.classList.remove("hover");
    });
    square.addEventListener("click", function () {
      isclicked
        ? null
        : (function () {
            let player = turn[toggleSwitch % 2];
            square.classList.toggle(player);
            square.innerHTML = `${player}`;
            board[squareNum] = `${player}`;
            isclicked = true;
            checkForWin(player)
              ? (function () {
                  statusElem.innerHTML = `Congratulations! ${player} is the Winner!`;
                  statusElem.classList.add("you-won");
                })()
              : null;
            console.log(
              `Switch for move just played ${toggleSwitch} for player ${
                turn[toggleSwitch % 2]
              }\n`
            );
            toggleSwitch++;
            console.log(
              `if game continues, toggle is now ${toggleSwitch} and next player should be ${
                turn[toggleSwitch % 2]
              }`
            );
          })();
    });
    console.log(`squareninit: ${square}`);
  });
}

// Define winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("DOMContentLoaded", reset);

// Function to check for a win
function checkForWin(player) {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true; // Game Win/End
    }
  }
  return false;
}
