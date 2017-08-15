var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SepsisQuiz = function () {
  function SepsisQuiz(questions) {
    _classCallCheck(this, SepsisQuiz);

    this.questions = questions || [];
    this.renderedQuestions = SepsisQuiz.buildQuestions(this.questions);
    this.score = 0;

    this.status = 'new';
    this.currentQuestionIndex = 0;
  }

  /**
   * Returns the current question
   * @returns {*}
   */


  _createClass(SepsisQuiz, [{
    key: 'finish',


    /**
     * Finishes the quiz
     */
    value: function finish() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        throw Error(this.questions.length - 1 - this.currentQuestionIndex + ' questions left unanswered');
      }
      this.status = 'finished';
    }

    /**
     * Processes the current question and then moves onto the next question
     * @param userInput
     */

  }, {
    key: 'processQuestion',
    value: function processQuestion(userInput) {
      if (!userInput) {
        return;
      }
      this.score += userInput === this.currentQuestion.answer;
      this.currentQuestion.userSelected = userInput;

      var hasUnansweredQuestions = this.currentQuestionIndex < this.questions.length - 1;
      this.currentQuestionIndex += hasUnansweredQuestions;

      this.status = hasUnansweredQuestions ? 'pending' : 'finished';
    }

    /**
     * Resets quiz state (ie isSubmitReady...)
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.score = 0;
      this.status = 'new';
      console.log('reset');
    }

    /**
     *
     * @param evt
     */

  }, {
    key: 'handleOnSelect',
    value: function handleOnSelect(evt) {
      var val = evt.target.value;
      this.processQuestion(val);
    }
  }, {
    key: 'handleOnNext',
    value: function handleOnNext(evt) {
      this.currentQuestionIndex += this.currentQuestionIndex < this.questions.length - 1;
    }
  }, {
    key: 'handleOnPrevious',
    value: function handleOnPrevious(evt) {
      this.currentQuestionIndex -= this.currentQuestionIndex > 0;
    }
  }, {
    key: 'currentQuestion',
    get: function get() {
      return this.questions[this.currentQuestionIndex];
    }
  }], [{
    key: 'renderChoices',
    value: function renderChoices() {
      var choices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return choices.reduce(function (html, choice) {
        return html + ' <button name="choice" value=' + choice + ' >' + choice + '</button>';
      }, '');
    }

    /**
     *
     * @param answer
     * @param distractors
     * @param q
     * @returns {Array}
     * @private
     */

  }, {
    key: 'buildChoices',
    value: function buildChoices(answer, distractors) {

      var choices = [];

      /*all of the  above*/
      if (typeof answer === 'boolean' && distractors instanceof Array) {
        answer = 'all of the above';
        choices = distractors.concat(answer);
      }

      /* true or false */
      else if (typeof answer === 'boolean') {
          choices = ['true', 'false'];
        }

        /* multiple choice*/
        else if (distractors instanceof Array) {
            choices = SepsisQuiz.shuffleArray(distractors.concat(answer)); // shuffle the array
          }

          /* true or false*/
          else if (typeof distractors === 'boolean') {
              choices = ['true', 'false'];
            }

      return choices;
    }

    /**
     * Static function to build the questions with a questions list
     * @param questions
     */

  }, {
    key: 'buildQuestions',
    value: function buildQuestions(questions) {
      if (!questions || !questions instanceof Array) {
        return;
      }
      return questions.map(function (q) {
        q.choices = Object.assign([], SepsisQuiz.buildChoices(q.answer, q.distractors));
        q.renderedChoices = SepsisQuiz.renderChoices(q.choices);

        return q;
      });
    }

    /**
     *  Static fucntion to shuffle an array
     * @param arr
     * @returns {Array.<T>}
     */

  }, {
    key: 'shuffleArray',
    value: function shuffleArray(arr) {
      return arr.sort(function () {
        return Math.random() - 0.5;
      });
    }
  }]);

  return SepsisQuiz;
}();

