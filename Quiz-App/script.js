const quizData = [
  {
    question: "What is 13+99?",
    options: [112, 111, 122, 109],
    correct: "a",
  },
  {
    question: "What is 434+423?",
    options: [564, 857, 854, 902],
    correct: "b",
  },
  {
    question: "What is 22+22?",
    options: [46, 21, 34, 44],
    correct: "d",
  },
  {
    question: "What is 2+2?",
    options: [22, 4, 3, 1],
    correct: "b",
  },
  {
    question: "What is 90+10?",
    options: [25, 70, 80, 100],
    correct: "d",
  },
];

let currentQuiz = 0;
let score = 0;

const answers = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const question_a = document.getElementById("question_a");
const question_b = document.getElementById("question_b");
const question_c = document.getElementById("question_c");
const question_d = document.getElementById("question_d");
const submitBtn = document.querySelector(".submit-btn");

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  questionEl.innerHTML = quizData[currentQuiz].question;
  question_a.innerHTML = quizData[currentQuiz].options[0];
  question_b.innerHTML = quizData[currentQuiz].options[1];
  question_c.innerHTML = quizData[currentQuiz].options[2];
  question_d.innerHTML = quizData[currentQuiz].options[3];
}

function getSelected() {
  let answer = undefined;

  answers.forEach((answers) => {
    if (answers.checked) {
      answer = answers.id;
    }
  });

  return answer;
}

function deselectAnswers() {
  answers.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", function () {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
      currentQuiz++;

      currentQuiz < quizData.length ? loadQuiz() : alert("Finished");
    }
  }
});
