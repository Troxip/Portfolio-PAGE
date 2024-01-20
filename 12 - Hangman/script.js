const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");
const words = [
  "programming",
  "hangman",
  "descriptive",
  "cool",
  "poor",
  "fixed",
  "selective",
  "dapper",
  "homeless",
  "noxious",
  "annoyed",
  "romantic",
  "tough",
  "charming",
  "loving",
  "yielding",
  "historical",
  "cruel",
  "unbecoming",
  "chunky",
  "absent",
];

let randomWord = words[Math.floor(Math.random() * words.length)];
const correctLetter = [];
const wrongLetter = [];

//Start Game
function displayWord() {
  wordEl.innerHTML = `${randomWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetter.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  innerWord === randomWord && results("Congratulations! You Won! 🏆");
}

//Update the wrong letter
function updateWrongLettersEl() {
  wrongLetterEl.innerHTML = `
    ${wrongLetter.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetter.map((letter) => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    let error = wrongLetter.length;

    // Checks If current part index is less than error.length (wrong letters length) If true, then add style display block
    index < error
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });

  wrongLetter.length >= figureParts.length && results("You Lost ❌");
}
//Show Notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Key Event Listener
function handleKeyDown(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    randomWord.includes(letter)
      ? !correctLetter.includes(letter)
        ? (correctLetter.push(letter), displayWord())
        : showNotification()
      : !wrongLetter.includes(letter)
      ? (wrongLetter.push(letter), updateWrongLettersEl())
      : showNotification();
  }
}

//Add Event Listener
window.addEventListener("keydown", handleKeyDown);

//Play Again Button
playAgainButton.addEventListener("click", () => {
  correctLetter.splice(0);
  wrongLetter.splice(0);

  randomWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none";
  window.addEventListener("keydown", handleKeyDown);
});
displayWord();

function results(resultMsg) {
  (finalMessage.textContent = resultMsg), (popup.style.display = "flex");
  window.removeEventListener("keydown", handleKeyDown);
}
