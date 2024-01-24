const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const wordList = [
  "random",
  "word",
  "list",
  "creator",
  "javascript",
  "function",
  "tool",
  "easy",
  "generate",
  "creativity",
  "writing",
  "educational",
  "vocabulary",
  "inspiration",
  "project",
  "naming",
  "study",
  "spelling",
  "game",
  "MadLibs",
  "Pictionary",
  "challenge",
  "family",
  "friends",
  "office",
  "social",
  "media",
  "share",
  "learn",
  "grow",
  "unusual",
  "weird",
  "quirky",
  "fun",
];

let randomWord;

let score = 0;

let time = 10;

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus on text on starts
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Add word to dom
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game Over
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDom();

//Event Listener
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 4;
    } else if (difficulty === "easy") {
      time += 5;
    }

    updateTime();
  }
});

//Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
