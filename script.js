var timeEl = document.querySelector(".timer");

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const startBtn = document.getElementById('starto')
const nextButton = document.getElementById('next-btn')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

//--------------timer----------
var secondsLeft = 30;

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left til game over.";
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000);
  }
  
  setTime();

//-------------question--------------

startBtn.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 1)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startBtn.innerText = 'Restart'
    startBtn.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Does HTML stand for hypertext markup language?',
    answers: [
      { text: 'yes', correct: true },
      { text: 'no', correct: false }
    ]
  },
  {
    question: 'Does CSS mean Caption style sheet?',
    answers: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false }
    ]
  },
  {
    question: 'When are we graduating from this awesome Coding bootcamp?',
    answers: [
      { text: 'jan 2021?', correct: false },
      { text: 'October 19 2020?', correct: true },
      { text: 'December 25 2020?', correct: false },
      { text: 'October 2120?', correct: false }
    ]
  },
  {
    question: 'Who is your favorite instructor of all time?',
    answers: [
      { text: ' Rachel Thiim', correct: true },
      { text: 'or Mrs. Thiim', correct: true }
    ]
  }
  
]
