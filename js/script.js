class Quiz {
  constructor() {
    this.pages = document.querySelector('.pages')
    this.page = document.querySelector('.page')
    this.pageP = this.page.querySelector('p')
    this.questionP = document.querySelector('.box-images p')
    this.btns = document.querySelectorAll('.answers .btn')
    this.image = document.querySelector('.box-images img')
  }

  startsQuiz() {
    this.addStandardQuestion()
    this.addPages()
  }

  addStandardQuestion() {
    const arrayQuestion = import('./dataBase.js').then(obj => {
      const { standardQuestion } = obj
      this.questionP.innerText = standardQuestion.question

      const answersArray = standardQuestion.answers.map(obj => {
        const { answer, status } = obj

        return { answer, status }
      })

      this.btns.forEach((btn, index) => {
        btn.setAttribute('class', answersArray[index].status)
        btn.innerText = answersArray[index].answer

        btn.addEventListener('click', e => {
          const el = e.target
          if (el.classList.contains('true')) {
            return true
          }
        })
      })
    })
  }

  addPages() {
    const arrayQuestion = import('./dataBase.js')
      .then(obj => {
        return obj['questions']
      })
      .then(array => {
        for (let i = 2; i <= array.length + 1; i++) {
          const clonePage = this.page.cloneNode()
          const p = this.createP()

          this.pageP.setAttribute('class', 'page-p')
          p.setAttribute('class', 'page-p')
          p.innerText = i

          clonePage.appendChild(p)
          this.pages.appendChild(clonePage)
        }

        this.addContentToNextPages()
      })
  }

  addContentToNextPages() {
    document.addEventListener('click', e => {
      const el = e.target

      if (el.classList.contains('page-p')) {
        this.getContentForNextPages(el.innerText)
      }
    })
  }

  getContentForNextPages(text) {
    const arrayQuestion = import('./dataBase.js').then(obj => {
      const { questions } = obj

      if (Number(text) === 1) {
        const { standardQuestion } = obj
        this.image.src = standardQuestion.image
        this.addStandardQuestion()
        return
      }

      const { question, answers, image } = questions[Number(text) - 2]
      this.image.src = image
      this.questionP.innerText = question

      const answersArray = answers.map(obj => {
        const { answer } = obj

        return { answer }
      })

      this.btns.forEach((btn, index) => {
        btn.setAttribute('class', answersArray[index].status)
        btn.innerText = answersArray[index].answer

        btn.addEventListener('click', e => {
          const el = e.target
          if (el.classList.contains('true')) {
            return true
          }
        })
      })
    })
  }

  clonePage() {
    const clone = this.page.cloneNode(true)
    return clone
  }

  createP() {
    const p = document.createElement('p')
    return p
  }
}

const quiz = new Quiz()
quiz.startsQuiz()
