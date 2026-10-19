const words = [
  { word: "butterfly", category: "Nature" },
  { word: "mountain", category: "Outdoors" },
  { word: "keyboard", category: "Everyday things" },
  { word: "pineapple", category: "Food" },
  { word: "telescope", category: "Science" },
  { word: "jazz", category: "Music" },
  { word: "compass", category: "Travel" },
  { word: "volcano", category: "Nature" },
  { word: "pancake", category: "Food" },
  { word: "library", category: "Places" },
  { word: "dolphin", category: "Animals" },
  { word: "rainbow", category: "Nature" },
  { word: "backpack", category: "Everyday things" },
  { word: "astronaut", category: "Science" },
  { word: "pumpkin", category: "Food" },
  { word: "bicycle", category: "Travel" },
  { word: "whistle", category: "Everyday things" },
  { word: "strawberry", category: "Food" },
  { word: "penguin", category: "Animals" },
  { word: "thunder", category: "Weather" }
];

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const wordElement = document.querySelector("#word");
const keyboardElement = document.querySelector("#keyboard");
const messageElement = document.querySelector("#message");
const categoryElement = document.querySelector("#category");
const missCountElement = document.querySelector("#miss-count");
const playAgainButton = document.querySelector("#play-again");
const bodyParts = [...document.querySelectorAll(".body-part")];

let currentWord;
let guessedLetters;
let misses;
let gameOver;

function startGame() {
  const availableWords = words.filter((entry) => entry.word !== currentWord?.word);
  currentWord = availableWords[Math.floor(Math.random() * availableWords.length)];
  guessedLetters = new Set();
  misses = 0;
  gameOver = false;

  categoryElement.textContent = currentWord.category;
  missCountElement.textContent = "0";
  messageElement.textContent = "Choose a letter to begin.";
  messageElement.className = "game-message";
  playAgainButton.hidden = true;
  drawWord();
  drawKeyboard();
  bodyParts.forEach((part) => part.classList.remove("visible"));
}

function drawWord() {
  wordElement.replaceChildren();
  for (const letter of currentWord.word) {
    const slot = document.createElement("span");
    slot.className = "letter-slot";
    const isRevealed = guessedLetters.has(letter) || gameOver;
    if (isRevealed) {
      slot.textContent = letter;
      slot.classList.add("revealed");
      if (gameOver && !guessedLetters.has(letter)) {
        slot.classList.add("missed-word");
      }
    }
    wordElement.append(slot);
  }
  wordElement.setAttribute("aria-label", `${currentWord.word.length} letter word`);
}

function drawKeyboard() {
  keyboardElement.replaceChildren();
  for (const letter of alphabet) {
    const key = document.createElement("button");
    key.type = "button";
    key.className = "key";
    key.textContent = letter;
    key.setAttribute("aria-label", `Guess ${letter.toUpperCase()}`);
    key.disabled = guessedLetters.has(letter) || gameOver;
    if (guessedLetters.has(letter)) {
      key.classList.add(currentWord.word.includes(letter) ? "correct" : "incorrect");
    }
    key.addEventListener("click", () => guess(letter));
    keyboardElement.append(key);
  }
}

function guess(letter) {
  if (gameOver || guessedLetters.has(letter) || !alphabet.includes(letter)) return;

  guessedLetters.add(letter);
  if (!currentWord.word.includes(letter)) {
    misses += 1;
    missCountElement.textContent = String(misses);
    bodyParts[misses - 1]?.classList.add("visible");
  }

  const hasWon = [...currentWord.word].every((character) => guessedLetters.has(character));
  if (hasWon) {
    finishGame(true);
  } else if (misses >= bodyParts.length) {
    finishGame(false);
  } else if (currentWord.word.includes(letter)) {
    messageElement.textContent = "Nice one. Keep going!";
  } else {
    messageElement.textContent = "Not this time. Try another letter.";
  }

  drawWord();
  drawKeyboard();
}

function finishGame(won) {
  gameOver = true;
  messageElement.textContent = won
    ? "You got it! A fresh word is waiting."
    : `That's six misses. The word was ${currentWord.word}.`;
  messageElement.className = `game-message ${won ? "win" : "loss"}`;
  playAgainButton.hidden = false;
}

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
  guess(event.key.toLowerCase());
});

document.querySelector("#new-game").addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
startGame();
