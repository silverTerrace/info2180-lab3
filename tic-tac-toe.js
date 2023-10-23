"use strict";

let squares = null;
let board = ["", "", "", "", "", "", "", "", ""];
let turn = ["X", "O"];
let toggleSwitch = 0;

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

document.addEventListener("DOMContentLoaded", function () {
  squares = document.querySelectorAll("#board > div");
  squares.forEach(function (square) {
    square.classList.add("square");
    let isclicked = false;
    square.addEventListener("click", function () {
      isclicked
        ? null
        : (function () {
            square.classList.toggle(turn[toggleSwitch % 2]);
            square.innerHTML = `${turn[toggleSwitch % 2]}`;
            isclicked = true;
            toggleSwitch++;
          })();
    });
  });
});

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
