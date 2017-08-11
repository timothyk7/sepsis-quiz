const questions = [{
  question: 'What is sepsis?',
  correct: ['A toxic reaction to an infection.'],
  wrong: ['An infection in the blood', 'A local infection, such as cellulitis or appendicitis.', 'A toxic reaction to an infection.', 'A chronic disease'],
  description: 'Sepsis is not an infection and is not contagious. The infection that triggered sepsis could be contagious but sepsis itself is not.'
}]

const style = `
     display: flex;
     flex-direction: column;
    `

/***************************/
class SepsisQuiz {

  constructor(questions) {
    this.questions = questions
    this.currentIndex = 0
    this.score = 0
    this.isSubmitReady = false
  }

  render() {
    const data = this.questions[this.currentIndex]
    this.renderHeader()
    this.renderChoices()

    this.handleOnSelect = this.handleOnSelect.bind(this)

  }

  renderHeader() {
    const question = this.getCurrent()
    console.log(question)
    return question.question
  }

  renderChoices() {
    const question = this.getCurrent()
    const choices = shuffle(question.wrong, question.correct)
    const self = this
    let html = choices.reduce(function (html, choice) {
      return `${html} <div onclick="self.handleOnSelect(${choice}}> ${choice}</div> ` }, '')

    return `<div class="choices" style="${style}"> ${html} </div>`
  }

  /* -------- helpers -------- s*/
  getCurrent() {
    return this.questions[this.currentIndex]
  }

  getJoinedAnswers() {
    return this.getCurrent().correct.join('')
  }

  handleOnSelect(selectedChoice) {
    // update score
    this.score += this.getJoinedAnswers().indexOf(selectedChoice) > -1 ? 1 : 0
    console.log(this.score)

    // show results

    // show description
  }


  reset() { /*todo */}

  getScore() {
    return this.score
  }


  handleNextClick() { /*todo*/}

  handlePreviousClick() {  /*todo*/}

}

function shuffle(a1, a2) {
  const array = Object.assign(a1, a2, [])
  const length = array.length

  let index = -1
  const lastIndex = length - 1
  const result = Object.assign(array, {})

  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]

    result[rand] = result[index]
    result[index] = value
  }
  console.log('>', result)
  return result
}

/***************************/
jQuery(document).ready(function ($) {
  'use strict'
  const quiz = new SepsisQuiz(questions)

  console.log(quiz)

  $('#choices').html(quiz.renderChoices())
})

