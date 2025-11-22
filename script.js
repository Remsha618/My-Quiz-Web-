// Completely new set of questions
const quizData = [
  {
    q: "Which attribute is used to provide an alternative text for an image?",
    opts: ["alt", "title", "src", "text"],
    ans: 0
  },
  {
    q: "JavaScript is a case-sensitive language.",
    opts: ["True", "False"],
    ans: 0
  },
  {
    q: "Which CSS unit is relative to the root font size?",
    opts: ["px", "em", "rem", "%"],
    ans: 2
  },
  {
    q: "Which method is used to add an element to the end of an array?",
    opts: ["push()", "add()", "insert()", "append()"],
    ans: 0
  },
  {
    q: "CSS stands for?",
    opts: ["Creative Style Sheet", "Cascading Style Sheets", "Control Style Sheet"],
    ans: 1
  }
];
let index = 0;
let userScore = 0;
// DOM elements
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const qTitle = document.getElementById("q-title");
const qOptions = document.getElementById("q-options");
const continueBtn = document.getElementById("continueBtn");
document.getElementById("beginQuiz").onclick = startQuiz;
// Start quiz
function startQuiz() {
  home.classList.remove("active");
  quiz.classList.add("active");
  index = 0;
  userScore = 0;
  loadQuestion();
}
// Load the question
function loadQuestion() {
  continueBtn.classList.add("hide");
  let qObj = quizData[index];
  qTitle.textContent = qObj.q;
  qOptions.innerHTML = "";
  qObj.opts.forEach((option, i) => {
    let div = document.createElement("div");
    div.className = "option";
    div.textContent = option;
    div.addEventListener("click", () => evaluateAnswer(i, div));
    qOptions.appendChild(div);
  });
}
// Evaluate answer
function evaluateAnswer(selectedIndex, element) {
  let correctIndex = quizData[index].ans;
  if (selectedIndex === correctIndex) {
    element.classList.add("correct");
    userScore++;
  } else {
    element.classList.add("wrong");
  }
  // Disable all
  let all = document.querySelectorAll(".option");
  all.forEach(o => o.style.pointerEvents = "none");

  continueBtn.classList.remove("hide");
}
// Next Question
continueBtn.onclick = function () {
  index++;
  if (index < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
};
// Show final results
function showResults() {
  quiz.classList.remove("active");
  result.classList.add("active");
  document.getElementById("finalScore").textContent =
    `${userScore} / ${quizData.length}`;
  if (userScore === quizData.length) {
    document.getElementById("scoreRemark").textContent = "Outstanding Performance!";
  } else if (userScore >= quizData.length / 2) {
    document.getElementById("scoreRemark").textContent = "Nice Work! Keep it Up!";
  } else {
    document.getElementById("scoreRemark").textContent = "Needs Improvement — Try Again.";
  }
}
// Restart
document.getElementById("playAgain").onclick = function () {
  result.classList.remove("active");
  home.classList.add("active");
};
