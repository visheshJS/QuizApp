// there you go
const confettiContainer = document.querySelector(".confetti-container");

const questions_set = [
  {
    question: "Which is the largest animal on earth ?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Lion", correct: false },
    ],
  },

  {
    question: "Who is father of our nation ?",
    answers: [
      { text: "Mahatma Gandhi", correct: true },
      { text: "Nathuram Godse", correct: false },
      { text: "Jawaharlal Nehru", correct: false },
      { text: "Thala", correct: false },
    ],
  },
  {
    question: "National animal of india ?",
    answers: [
      { text: "lion", correct: false },
      { text: "penguin", correct: false },
      { text: "whale", correct: false },
      { text: "tiger", correct: true },
    ],
  },
  {
    question: "koi tumse pyar kyun karega ?",
    answers: [
      { text: "Nahi karega i know", correct: true },
      { text: "mere paise ke liye", correct: false },
      { text: "mere looks ke liye", correct: false },
      { text: "mai to single hi best hu", correct: false },
    ],
  },
];

const sawal = document.getElementById("quest");
const jawab = document.getElementById("answer-buttons");
const next = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  next.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions_set[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  sawal.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    jawab.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  next.style.display = "none";
  while (jawab.firstChild) {
    jawab.removeChild(jawab.firstChild);
  }
}

function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    selectedbtn.classList.add("clickedcorrect");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
    selectedbtn.classList.add("clickedwrong");
  }
  Array.from(jawab.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  next.style.display = "block";
}
function showScore() {
  sawal.innerHTML = `You scored ${score} out of ${questions_set.length}!`;
  next.innerHTML = "Play Again !";
  next.style.display = "block";
  createConfetti();
}
function createConfetti(){
    const confetticontainer = document.getElementById("confetti");
    confetticontainer.style.display="block"; //make the confetti container visible
    confetticontainer.style.innerHTML="";//remove previous confetti peices

    //create multiple confetti peices
    for(let i=0;i<150;i++){ //creating 150 peices
        const peices = document.createElement("div");
        peices.style.left=Math.random()*100 +"%"//randomize the horizontal position
        peices.style.backgroundColor=`hsl(${Math.random()*360},100%,50%)` //random color for each peice in HSL form, selecting random hue 
        peices.style.animationDelay=`${Math.random()*0.3}s` //random delay for each peice
        confetticontainer.appendChild(peices);  //add the peices to the confetti container
        
        //remove the peices when the animation is done
        peices.addEventListener("animationend",() => {
          peices.remove(); //remove from DOM
        });


    } 
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions_set.length) {
    showQuestion();
  } else {
    showScore();
  }
}

next.addEventListener("click", () => {
  if (currentQuestionIndex < questions_set.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
