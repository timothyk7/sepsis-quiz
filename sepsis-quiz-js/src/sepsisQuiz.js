class SepsisQuiz {
  constructor(questions) {
    this.questions = SepsisQuiz.buildQuestions(this.questions)
    this.renderedQuestions = SepsisQuiz.renderQuestions(this.questions)
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
      return `${html} <div>${choice}</div>`
    }, `<div id="choices" class="choices">`) + `</div>`
  }

  static renderQuestions(questions = []) {
    return `<p>Michael was here</p>`
  }


  /**
   *
   * @param answer
   * @param wrongAnswers
   * @param q
   * @returns {Array}
   * @private
   */
  static buildChoices(answer, wrongAnswers) {

    let choices = []

    /*all of the  above*/
    if (typeof answer === 'boolean' && wrongAnswers instanceof Array) {
      answer = 'all of the above'
      choices = wrongAnswers.concat(answer)
    }

    /* true or false */
    else if (typeof answer === 'boolean') {
      choices = ['true', 'false']
    }

    /* multiple choice*/
    else if (wrongAnswers instanceof Array) {
      choices = SepsisQuiz.shuffleArray(wrongAnswers.concat(answer)) // shuffle the array
    }

    /* true or false*/
    else if (typeof wrongAnswers === 'boolean') {
      choices = ['true', 'false']
    }

    return choices
  }

  /**
   * Static function to build the questions with a questions list
   * @param questions
   */
  static buildQuestions(questions) {
    if (!questions || !(questions instanceof Array)) {
      return []
    }
    return questions.map(q => {
      q.choices = SepsisQuiz.buildChoices(q.answer, q.wrongAnswers) || []
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







jQuery(document).ready(function($) {

  var questions = [
    {
      questionText: "About how many people in the U.S. die each year because of sepsis?",
      wrongAnswers: [
        "45,000",
        "1,200,000",
        "10,000",
      ],
      answer: "258,000",
      learnMore: {
        text: "Every two minutes, a life is lost to sepsis in the U.S., totaling over a quarter million people every year. That number jumps to an estimated 8 million across the globe.",
        link: "http://www.sepsis.org/resources/diagnosed-with-sepsis/",
      },
    },
    {
      questionText: "What is sepsis?",
      wrongAnswers: [
        "A local infection, such as cellulitis or appendicitis.",
        "An infection in the blood.",
        "A contagious disease.",
      ],
      answer: "Your body's toxic response to an infection.",
      learnMore: {
        text: "More than 40% of Americans have never heard the word sepsis. It’s your body’s extreme and toxic response to an infection. It's life threatening and, without the right treatment, can cause organ failure, amputation, and death.",
        link: "http://www.sepsis.org/sepsis/definition/",
      },
    },
  ];

  var sepsisQuiz = new SepsisQuiz(questions);

  function render(sepsisQuiz) {
    /* ------ status ------ */
    $('#score').html(sepsisQuiz.score);
    $('#status').html(sepsisQuiz.status);
    $('#current_question_id').html(sepsisQuiz.currentQuestionIndex);

    /* ------ questions ------ */
    $('#questions_container').html(sepsisQuiz.renderedQuestions);
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
});
