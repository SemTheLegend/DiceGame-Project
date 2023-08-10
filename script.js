"use strict";

// Dice Element 
const dice = document.querySelector(".dice");

// Player elements 
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// Player Current Scores
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const scores = new Array(0, 0);
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
let currentScore = 0;

// Sets the current player for the game
let currentPlayer = player0;
let notCurrentPlayer = player1;

score0.textContent = 0;
score1.textContent = 0;

// Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Toggle function for switching players
const toggle = (player1, player2) => {
  if (player1.classList.contains("player--active")) {
    player1.classList.remove("player--active");
    player2.classList.add("player--active");
  } else {
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  }

  currentPlayer = player2;
  notCurrentPlayer = player1;
}

// Displaying the dice image
btnRoll.addEventListener("click", () => {
  const diceNum = Math.trunc(Math.random() * 6) + 1;

  dice.src = `dice-${diceNum}.png`;
  console.log("dice rolled:", diceNum);

  // Adding the current score
  if (scores[0] >= 100) {
    alert("🎉Player 1 Has won the game.🎉")
  } else if (scores[1] >= 100) {
    alert("🎉Player 2 Has won the game.🎉");
  } else {
    if (diceNum !== 1) {
      currentScore += diceNum;

      if (currentPlayer === player0) {
        current0.textContent = currentScore;
      }

      if (currentPlayer === player1) {
        current1.textContent = currentScore;
      }
    } else {
      currentScore = 0;

      if (currentPlayer === player0) {
        current0.textContent = currentScore;
      }
      if (currentPlayer === player1) {
        current1.textContent = currentScore;
      }
      toggle(currentPlayer, notCurrentPlayer)
    }
  }
});

btnHold.addEventListener("click", () => {
  if (currentPlayer === player0) {
    scores[0] += currentScore;
    score0.textContent = scores[0];
    if (scores[0] >= 100) {
      alert("🎉Player 1 Has won the game.🎉");
    }
    currentScore = 0;
    current0.textContent = currentScore;
  } else if (currentPlayer === player1) {
    scores[1] += currentScore;
    score1.textContent = scores[1];
    if (scores[1] >= 100) {
      alert("🎉Player 2 Has won the game.🎉");
    }
    currentScore = 0;
    current1.textContent = currentScore;
  }

  toggle(currentPlayer, notCurrentPlayer);
});

btnNew.addEventListener("click", () => {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  currentPlayer = player0;
  notCurrentPlayer = player1;
  score0.textContent = scores[0];
  score1.textContent = scores[1];
  current0.textContent = currentScore;
  current1.textContent = currentScore;
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
});
