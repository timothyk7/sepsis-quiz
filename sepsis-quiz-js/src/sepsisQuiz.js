class SepsisQuiz {
  constructor(questions) {
    this.questions = SepsisQuiz.buildQuestions(questions)
    this.renderedQuestions = SepsisQuiz.renderQuestions(this.questions)
    this.score = 0
  }

  static renderChoices(choices = [], questionId) {
    return choices.reduce((html, choice, i) => {
      const id = `choice-${i}`
      return `${html} <div class="field"><input id="${id}" data-question-id="${questionId}" class="choice" value="${choice}" type="submit"/></div>`
    }, '')
  }

  static renderQuestions(questions = []) {
    return questions.reduce((html, question, idx) => {
      return `
        ${html}
          <div class="question-container">
          <div id="question-${idx}" class="question-number">Question #${idx + 1}</div>
          <div class="under-card-top"></div>
          <div class="card-container">
            <div class="question">${question.questionText}</div>
            <div class="choices">
              ${question.renderedChoices}
            </div>
          </div>
          <div class="under-card-bottom-container">
            <div class="under-card-bottom">
              <div>${question.learnMore.text}</div>
              <div class="learn-more"><a href="${question.learnMore.link}" target="_blank">Learn More <i class="fa fa-angle-right" aria-hidden="true"></i></a></div>
            </div>
          </div>
        </div>
      `
    }, '')
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
      answer = 'All of the above.'
      choices = wrongAnswers.concat(answer)
    }

    /* multiple choice*/
    else if (wrongAnswers instanceof Array) {
      choices = SepsisQuiz.shuffleArray(wrongAnswers.concat(answer)) // shuffle the array
    }

    /* true or false */
    else if (typeof answer === 'boolean') {
      choices = ['True.', 'False.']
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
    return questions.map((q, index )=> {
      q.id = index
      q.choices = SepsisQuiz.buildChoices(q.answer, q.wrongAnswers) || []
      q.renderedChoices = SepsisQuiz.renderChoices(q.choices, index)

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
   * Processes the current question and then moves onto the next question
   * @param userInput
   */
  processQuestion(questionIndex, userInput) {
    const question = this.questions[questionIndex]
    if (!userInput || question.userSelected !== undefined) {
      return null
    }

    const isCorrect = userInput === this.questions[questionIndex].answer
    this.score += isCorrect
    this.questions[questionIndex].userSelected = userInput

    // todo remoeeeee
    console.log(this.score, this.questions[questionIndex])

    return isCorrect

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

    /* ------ questions ------ */
    $('#questions_container').html(sepsisQuiz.renderedQuestions);
    $('input.choice').bind('click', onSelect)
  }


  render(sepsisQuiz);

  /* ------ event handlers ------ */
  function onSelect(e) {
    const qId = $(e.target).attr('data-question-id')
    const val = e.target.value

    const res  = sepsisQuiz.processQuestion(qId, val)
    
    if (res !== null) {
      $(e.target).addClass( res ? 'correct' : 'incorrect' )
    }
  }

  console.log('quiz:', sepsisQuiz);
});
