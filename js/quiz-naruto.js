import { standardQuestion, questions } from './dataBaseNaruto.js'

class Quiz {
  constructor() {
    this.question = document.querySelector('#question')
    this.btnsOptions = document.querySelectorAll('.btn-option')
    this.containerPages = document.querySelector('.container-pages')
    this.boxPage = this.containerPages.querySelector('.box-page')
    this.image = document.querySelector('.container-image-question img')
    this.questionP = document.querySelector('#question')
    this.contador = 1
  }

  startQuiz() {
    console.log('Jogo foi iniciado...')
    this.addPages()
    this.addDefaultQuestion()
    this.addDefaultTextOptions()
    this.listenClick()
  }

  finishQuiz() {
    alert('Quiz finalizado, parabéns por ter terminado.')

    setTimeout(() => {
      location.href = 'index.html'
    }, 1000)
  }

  listenClick() {
    this.boxPage.setAttribute('id', 'selected-page')

    document.addEventListener('click', e => {
      const el = e.target
      const boxPageAll = document.querySelectorAll('.box-page')

      if (el.classList.contains('true')) {
        this.boxPage.style.backgroundColor = 'green'
        this.boxPage.style.color = 'white'
        this.goToNextPage()
        return
      }

      if (el.classList.contains('false')) {
        this.boxPage.style.backgroundColor = 'red'
        this.boxPage.style.color = 'white'
        this.goToNextPage()
        return
      }
    })
  }

  addNewOptions(indexQuestion) {
    const { question, options } = questions[indexQuestion - 1]
    let indexOption = 0

    this.btnsOptions.forEach(btn => {
      btn.innerText = options[indexOption].option
      btn.setAttribute('class', options[indexOption].status)
      indexOption++
    })
  }

  addNewQuestion(indexQuestion) {
    const { question } = questions[indexQuestion - 1]
    this.questionP.innerText = question
  }

  addNewImage(indexQuestion) {
    const { question, options, image } = questions[indexQuestion - 1]
    this.image.src = image
  }

  goToNextPage() {
    this.boxPage.setAttribute('id', 'selected-page')

    this.boxPage.removeAttribute('id')

    const nextPage = document.querySelectorAll('.box-page')

    if (this.contador === nextPage.length) {
      this.contador--
      nextPage[this.contador].setAttribute('id', 'selected-page')
      this.finishQuiz()
      return
    }

    nextPage[this.contador].setAttribute('id', 'selected-page')
    this.boxPage = nextPage[this.contador]

    // this.addNewQuestion(this.contador)
    this.addNewImage(this.contador)
    this.addNewQuestion(this.contador)
    this.addNewOptions(this.contador)

    this.contador++
  }

  addDefaultTextOptions() {
    for (let i = 0; i < this.btnsOptions.length; i++) {
      this.btnsOptions[i].innerText = standardQuestion.options[i].option
      if (standardQuestion.options[i].status) {
        this.btnsOptions[i].setAttribute('class', 'true')
        continue
      }

      this.btnsOptions[i].setAttribute('class', 'false')
    }
  }

  addDefaultQuestion() {
    this.question.innerText = standardQuestion.question
  }

  createEl(text) {
    const tag = document.createElement(text)
    return tag
  }

  addPages() {
    for (let i = 2; i <= questions.length + 1; i++) {
      const cloneBoxPage = this.boxPage.cloneNode()
      const p = this.createEl('p')
      p.innerText = i

      cloneBoxPage.appendChild(p)
      this.containerPages.appendChild(cloneBoxPage)
    }
  }
}

const quiz = new Quiz()
quiz.startQuiz()
