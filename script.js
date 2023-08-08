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

score0.textContent = 0;
score1.textContent = 0;

// Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Displaying the dice image
btnRoll.addEventListener("click", () => {
  const diceNum = Math.trunc(Math.random() * 6) + 1;

  dice.src = `dice-${diceNum}.png`;
  console.log("dice rolled:", diceNum);

  // Adding the current score
  if (diceNum !== 1) {
    currentScore += diceNum;
    current0.textContent = currentScore;
  } else {
    currentScore = 0;
    current0.textContent = currentScore;
  }
});

btnHold.addEventListener("click", () => {
  scores[0] = currentScore;
  score0.textContent = scores[0];
  currentScore = 0;
  current0.textContent = currentScore;
});
