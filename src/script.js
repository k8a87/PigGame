"use strict";
// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

import dice1 from "./images/dice-1.png";
import dice2 from "./images/dice-2.png";
import dice3 from "./images/dice-3.png";
import dice4 from "./images/dice-4.png";
import dice5 from "./images/dice-5.png";
import dice6 from "./images/dice-6.png";

const diceArr = [dice1, dice2, dice3, dice4, dice5, dice6];

// Roll dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = diceArr[dice - 1];

    //3. Check for rolled 1: if true switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      //Dynamically picks the player currently active
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //NOTE:CHANGE LATER
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // 3. add confetti
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

// Close Modal
const modal = document.querySelector(".modal");

const closeModal = () => {
  modal.classList.add("hide");
};
const closeModalBtn = document.querySelector(".btn--closeModal");
closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function logKey(e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

// Open Modal
const openModal = () => {
  modal.classList.remove("hide");
};
const openModalBtn = document.querySelector(".btn--how");
openModalBtn.addEventListener("click", openModal);
