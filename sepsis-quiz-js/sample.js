
/**
 *
 * This examples instantiates a new SepsisQuiz object and binds data to index.html elements
 */
const questions = [{
  stem: '1+1=?',
  distractors: [1, 10, 5],
  answer: 2,
}, {
  stem: 'Who is not a Kardashian',
  distractors: ['karl', 'kip', 'kyle', 'kevin'],
  answer: true
}]

const sepsisQuiz = new SepsisQuiz(questions)


function render (sepsisQuiz) {
  /* ------ status ------ */
  $('#score').html(sepsisQuiz.score)
  $('#status').html(sepsisQuiz.status)
  $('#current_question_id').html(sepsisQuiz.currentQuestionIndex)

  /* ------ current question------ */
  $('#question').html(sepsisQuiz.currentQuestion.stem)
  $('#description').html(sepsisQuiz.currentQuestion.description)
  $('#choices').html( sepsisQuiz.currentQuestion.renderedChoices )


}
render(sepsisQuiz)

/* ------ event handlers ------ */
$('#reset').on('click', function (e) {
  console.log('reset')
  sepsisQuiz.reset()
  render(sepsisQuiz)
})
$('#submit').on('click', e => {
  const userInput = $('#userInput').val
  sepsisQuiz.processQuestion(userInput)
  render(sepsisQuiz)

})


console.log('quiz:', sepsisQuiz)