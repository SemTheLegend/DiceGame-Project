"use strict";

// Selecting Elements
// Selecting DOM Element
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

// Selecting Players
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Selecting Dice element
const diceEl = document.querySelector(".dice");

// Selecting Buttons
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, playing, activePlayer, currentScore;

const init = () => {
  // Starting Conditions

  // Variable for storing playing state
  playing = true;
  // Variable for storing active player
  activePlayer = 0;
  // Variables for storing scores
  scores = new Array(0, 0);

  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
}

init();

const switchPlayer = () => {
  // Reset curent score
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  // Switch Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

btnRoll.addEventListener("click", () => {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice roll
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check if rolled 1: if tue, switch to next player
    if (dice !== 1) {
      // Add dice to current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player score >= 100,
    if (scores[activePlayer] >= 100) {
      // 3. Finish the game
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // 4. Else, Switch to next player.
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", init);

