class Quiz {
  constructor() {
    this.pages = document.querySelector('.pages')
    this.page = document.querySelector('.page')
    this.questionP = document.querySelector('.box-images p')
    this.btns = document.querySelectorAll('.answers .btn')
  }

  startsQuiz() {
    this.addStandardQuestion()
    // this.addDataToTheQuiz()
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

  // addDataToTheQuiz() {
  //   const arrayQuestion = import('./dataBase.js').then(array => {
  //     let contador = 2
  //     array.questions.forEach(obj => {
  //       const { question, answers } = obj
  //       const page = this.clonePage()
  //       console.log(obj)

  //       // Pages adicionado
  //       page.innerHTML = `<p>${contador++}</p>`
  //       this.pages.appendChild(page)
  //     })
  //   })
  // }

  clonePage() {
    const clone = this.page.cloneNode(true)
    return clone
  }
}

const quiz = new Quiz()
quiz.startsQuiz()
