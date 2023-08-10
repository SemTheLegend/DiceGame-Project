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

// Version 1 of the Code.

// // Dice Element 
// const dice = document.querySelector(".dice");

// // Player elements 
// const player0 = document.querySelector(".player--0");
// const player1 = document.querySelector(".player--1");

// // Player Current Scores
// const score0 = document.getElementById("score--0");
// const score1 = document.getElementById("score--1");
// const scores = new Array(0, 0);
// const current0 = document.getElementById("current--0");
// const current1 = document.getElementById("current--1");
// let currentScore = 0;

// // Sets the current player for the game
// let currentPlayer = player0;
// let notCurrentPlayer = player1;

// // set the current game status
// let playing = true;

// score0.textContent = 0;
// score1.textContent = 0;

// // Buttons
// const btnNew = document.querySelector(".btn--new");
// const btnRoll = document.querySelector(".btn--roll");
// const btnHold = document.querySelector(".btn--hold");

// // Toggle function for switching players
// const toggle = (player1, player2) => {
//   if (player1.classList.contains("player--active")) {
//     player1.classList.remove("player--active");
//     player2.classList.add("player--active");
//   } else {
//     player1.classList.add("player--active");
//     player2.classList.remove("player--active");
//   }

//   // Swaps the current player with non current player.
//   currentPlayer = player2;
//   notCurrentPlayer = player1;
// }

// // Displaying the dice image
// if (playing) {
//   btnRoll.addEventListener("click", () => {
//     const diceNum = Math.trunc(Math.random() * 6) + 1;

//     dice.src = `dice-${diceNum}.png`;
//     // console.log("dice rolled:", diceNum);

//     // Adding the current score
//     if (scores[0] >= 100) {
//       alert("🎉Player 1 Has won the game.🎉");
//       playing = false;
//     } else if (scores[1] >= 100) {
//       alert("🎉Player 2 Has won the game.🎉");
//       playing = false;
//     } else {
//       if (diceNum !== 1) {
//         currentScore += diceNum;

//         if (currentPlayer === player0) {
//           current0.textContent = currentScore;
//         }

//         if (currentPlayer === player1) {
//           current1.textContent = currentScore;
//         }
//       } else {
//         currentScore = 0;

//         if (currentPlayer === player0) {
//           current0.textContent = currentScore;
//         }
//         if (currentPlayer === player1) {
//           current1.textContent = currentScore;
//         }
//         toggle(currentPlayer, notCurrentPlayer)
//       }
//     }
//   });
// }

// // When the hold button is clicked, execute
// btnHold.addEventListener("click", () => {
//   if (currentPlayer === player0) {
//     scores[0] += currentScore;
//     score0.textContent = scores[0];
//     if (scores[0] >= 100) {
//       alert("🎉Player 1 Has won the game.🎉");
//       playing = false;
//     }
//     currentScore = 0;
//     current0.textContent = currentScore;
//   } else if (currentPlayer === player1) {
//     scores[1] += currentScore;
//     score1.textContent = scores[1];
//     if (scores[1] >= 100) {
//       alert("🎉Player 2 Has won the game.🎉");
//       playing = false;
//     }
//     currentScore = 0;
//     current1.textContent = currentScore;
//   }
//   // Switch the player
//   toggle(currentPlayer, notCurrentPlayer);
// });

// // When the new game button is clicked, reset game stats.
// btnNew.addEventListener("click", () => {
//   playing = true
//   scores[0] = 0;
//   scores[1] = 0;
//   currentScore = 0;
//   currentPlayer = player0;
//   notCurrentPlayer = player1;
//   score0.textContent = scores[0];
//   score1.textContent = scores[1];
//   current0.textContent = currentScore;
//   current1.textContent = currentScore;
//   player1.classList.remove("player--active");
//   player0.classList.add("player--active");
// });
