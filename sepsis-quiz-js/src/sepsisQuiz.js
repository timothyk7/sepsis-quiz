class SepsisQuiz {
  constructor(questions) {
    this.questions = questions || []
    this.renderedQuestions = SepsisQuiz.buildQuestions(this.questions)
    this.score = 0

    this.status = 'new'
    this.currentQuestionIndex = 0

  }

  /**
   * Returns the current question
   * @returns {*}
   */
  get currentQuestion() {
    return this.questions[this.currentQuestionIndex]
  }

  static renderChoices(choices = []) {
    return choices.reduce((html, choice) => {
      return `${html} <button name="choice" value=${choice} >${choice}</button>`

    }, '')
  }


  /**
   *
   * @param answer
   * @param distractors
   * @param q
   * @returns {Array}
   * @private
   */
  static buildChoices(answer, distractors) {

    let choices = []

    /*all of the  above*/
    if (typeof answer === 'boolean' && distractors instanceof Array) {
      answer = 'all of the above'
      choices = distractors.concat(answer)
    }

    /* true or false */
    else if (typeof answer === 'boolean') {
      choices = ['true', 'false']
    }

    /* multiple choice*/
    else if (distractors instanceof Array) {
      choices = SepsisQuiz.shuffleArray(distractors.concat(answer)) // shuffle the array
    }

    /* true or false*/
    else if (typeof distractors === 'boolean') {
      choices = ['true', 'false']
    }

    return choices
  }

  /**
   * Static function to build the questions with a questions list
   * @param questions
   */
  static buildQuestions(questions) {
    if (!questions || !questions instanceof Array) {
      return
    }
    return questions.map(q => {
      q.choices = Object.assign([], SepsisQuiz.buildChoices(q.answer, q.distractors))
      q.renderedChoices = SepsisQuiz.renderChoices(q.choices)

      return q
    })
  }

  /**
   *  Static fucntion to shuffle an array
   * @param arr
   * @returns {Array.<T>}
   */
  static shuffleArray(arr) {
    return arr.sort(() => (Math.random() - 0.5))
  }

  /**
   * Finishes the quiz
   */
  finish() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      throw Error(`${this.questions.length - 1 - this.currentQuestionIndex } questions left unanswered`)
    }
    this.status = 'finished'
  }

  /**
   * Processes the current question and then moves onto the next question
   * @param userInput
   */
  processQuestion(userInput) {
    if (!userInput) {
      return
    }
    this.score += userInput === this.currentQuestion.answer
    this.currentQuestion.userSelected = userInput

    const hasUnansweredQuestions = this.currentQuestionIndex < this.questions.length - 1
    this.currentQuestionIndex += hasUnansweredQuestions

    this.status = hasUnansweredQuestions ? 'pending' : 'finished'

  }

  /**
   * Resets quiz state (ie isSubmitReady...)
   */
  reset() {
    this.score = 0
    this.status = 'new'
    console.log('reset')
  }

  /**
   *
   * @param evt
   */
  handleOnSelect(evt) {
    const val = evt.target.value
    this.processQuestion(val)
  }

  handleOnNext(evt) {
    this.currentQuestionIndex += this.currentQuestionIndex < this.questions.length - 1
  }

  handleOnPrevious(evt) {
    this.currentQuestionIndex -= this.currentQuestionIndex > 0

  }

}







(function( $ ) {

  var questions = [{
    stem: '1+1=?',
    distractors: [1, 10, 5],
    answer: 2
  }, {
    stem: 'Who is not a Kardashian',
    distractors: ['karl', 'kip', 'kyle', 'kevin'],
    answer: true
  }];

  var sepsisQuiz = new SepsisQuiz(questions);

  function render(sepsisQuiz) {
    /* ------ status ------ */
    $('#score').html(sepsisQuiz.score);
    $('#status').html(sepsisQuiz.status);
    $('#current_question_id').html(sepsisQuiz.currentQuestionIndex);

    /* ------ current question------ */
    $('#question').html(sepsisQuiz.currentQuestion.stem);
    $('#description').html(sepsisQuiz.currentQuestion.description);
    $('#choices').html(sepsisQuiz.currentQuestion.renderedChoices);
  }
  render(sepsisQuiz);

  /* ------ event handlers ------ */
  $('#reset').on('click', function (e) {
    console.log('reset');
    sepsisQuiz.reset();
    render(sepsisQuiz);
  });
  $('#submit').on('click', function (e) {
    var userInput = $('#userInput').val;
    sepsisQuiz.processQuestion(userInput);
    render(sepsisQuiz);
  });

  console.log('quiz:', sepsisQuiz);
})( jQuery );
