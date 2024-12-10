const questions = [
  {
    question: 'which is the largest animal in the world?',
    answers: [
      { text: 'shark', correct: 'false' },
      { text: 'blue whale', correct: 'true' },
      { text: 'elephant', correct: 'false' },
      { text: 'giraffe', correct: 'false' },
    ]
  },
  {
    question: 'which is the smallest country in the world?',
    answers: [
      { text: 'vatican city', correct: 'true' },
      { text: 'Bhutan', correct: 'false' },
      { text: 'Nepal', correct: 'false' },
      { text: 'Srilanka', correct: 'false' },
    ]
  },
  {
    question: 'which is the largest desert in the world?',
    answers: [
      { text: 'Kalahari', correct: 'false' },
      { text: 'Gobi', correct: 'false' },
      { text: 'Sahara', correct: 'false' },
      { text: 'Antarctica', correct: 'true' },
    ]
  },
  {
    question: 'which is the smallest continent in the world?',
    answers: [
      { text: 'Asia', correct: 'false' },
      { text: 'Arctic', correct: 'false' },
      { text: 'Austrailia', correct: 'true' },
      { text: 'Africa', correct: 'false' },
    ]
  }
]

const questionElement = document.querySelector('.question');
const answerButton = document.querySelector('.multiple-options');
const nextButton = document.querySelector('.next');

let score = 0;
let questionIndex = 0;

function startQuiz () {
  score = 0;
  questionIndex = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion () {
  resetState();
  let currentQuestion = questions[questionIndex];
  let currentIndex = questionIndex + 1;
  questionElement.innerHTML = currentIndex + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('options');
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (selectAnswer));
  })
}

function resetState() {
  nextButton.style.display = 'none'
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild)
  }
}


function selectAnswer(e){
    const selectedBtn = e.target ;
    let isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        // selectedBtn.classList.add(".correct");
        selectedBtn.style.background = "green"
        score++
    }else{
        selectedBtn.style.background = "red"
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.style.background = "green" ;
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}
startQuiz(); 

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    questionIndex++;
    if(questionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(questionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

