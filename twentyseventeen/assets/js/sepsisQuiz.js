var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SepsisQuiz = function () {
  function SepsisQuiz(questions) {
    _classCallCheck(this, SepsisQuiz);

    this.questions = SepsisQuiz.buildQuestions(questions);
    this.renderedQuestions = SepsisQuiz.renderQuestions(this.questions);
    this.score = 0;
  }

  _createClass(SepsisQuiz, [{
    key: 'renderShareBlock',
    value: function renderShareBlock(tweet) {
      var twitterLink = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet.text) + (tweet.url ? '&url=' + encodeURIComponent(tweet.url) : '');
      return '\n    <div class="under-card-top"></div>\n    <div class="card-container">\n      <div class="share">Share</div>\n        <div class="choices">\n          <div>FaceBook</div>\n            <a class="twitter-button" href=' + twitterLink + ' target="_blank">\n                      Twitter</a>\n          </div>\n        </div>\n      <div class="under-card-bottom-container">\n        <div class="under-card-bottom">\n          <div>Support the Sepsis Alliance during Sepsis Awareness Month. Say Sepsis. Save lives.</div>\n          <div class="share-block"><a href="https://donate.sepsis.org/checkout/donation?eid=31711" target="_blank">Donate Now<i class="fa fa-angle-right" aria-hidden="true"></i>\n            </a>\n          </div>\n        </div>\n      </div>\n    ';
    }
  }, {
    key: 'renderProgressBar',
    value: function renderProgressBar() {
      var percentage = this.score / this.questions.length * 100;
      return '\n      <p>You got ' + this.score + '/' + this.questions.length + ' right</p>\n      <div class="progress-bar-container">\n        <div class="progress-bar" id="progress-bar" style="width:' + percentage + '%"></div>\n      </div>\n    ';
    }

    /**
     *
     * @param answer
     * @param wrongAnswers
     * @param q
     * @returns {Array}
     * @private
     */

  }, {
    key: 'processQuestion',


    /**
     * Processes the current question and then moves onto the next question
     * @param userInput
     */
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
     *
     * @param evt
     */

  }, {
    key: 'handleOnSelect',
    value: function handleOnSelect(evt) {
      var val = evt.target.value;
      this.processQuestion(val);
    }
  }], [{
    key: 'renderChoices',
    value: function renderChoices() {
      var choices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return choices.reduce(function (html, choice) {
        return html + ' <div class="choice">' + choice + '</div>';
      }, '<div id="choices" class="choices">') + '</div>';
    }
  }, {
    key: 'renderQuestions',
    value: function renderQuestions() {
      var questions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return questions.reduce(function (html, question, idx) {
        return '\n        ' + html + '\n          <div class="question-container">\n          <div class="question-number">Question #' + (idx + 1) + '</div>\n          <div class="under-card-top"></div>\n          <div class="card-container">\n            <div class="question">' + question.questionText + '</div>\n            <div class="choices">\n              ' + question.renderedChoices + '\n            </div>\n          </div>\n          <div class="under-card-bottom-container">\n            <div class="under-card-bottom">\n              <div>' + question.learnMore.text + '</div>\n              <div class="learn-more"><a href="' + question.learnMore.link + '" target="_blank">Learn More <i class="fa fa-angle-right" aria-hidden="true"></i></a></div>\n            </div>\n          </div>\n        </div>\n      ';
      }, '');
    }
  }, {
    key: 'buildChoices',
    value: function buildChoices(answer, wrongAnswers) {

      var choices = [];

      /*all of the  above*/
      if (typeof answer === 'boolean' && wrongAnswers instanceof Array) {
        answer = 'All of the above.';
        choices = SepsisQuiz.shuffleArray(wrongAnswers).concat(answer);
      }

      /* multiple choice*/
      else if (wrongAnswers instanceof Array) {
          choices = SepsisQuiz.shuffleArray(wrongAnswers.concat(answer)); // shuffle the array

          // Hack to deal with our one none of the above (it's not the answer!)
          var none = 'None of the above.';
          var idx = choices.indexOf(none);
          if (idx > -1) {
            choices.splice(idx, 1);
            choices.push(none);
          }
        }

        /* true or false */
        else if (typeof answer === 'boolean') {
            choices = ['True.', 'False.'];
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
      if (!questions || !(questions instanceof Array)) {
        return [];
      }
      return questions.map(function (q) {
        q.choices = SepsisQuiz.buildChoices(q.answer, q.wrongAnswers) || [];
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

// Loads code on screen


jQuery(document).ready(function ($) {

  var questions = [{
    questionText: "About how many people in the U.S. die each year because of sepsis?",
    wrongAnswers: ["45,000", "1,200,000", "10,000"],
    answer: "258,000",
    learnMore: {
      text: "Every two minutes, a life is lost to sepsis in the U.S., totaling over a quarter million people every year. That number jumps to an estimated 8 million across the globe.",
      link: "http://www.sepsis.org/resources/diagnosed-with-sepsis/"
    }
  }, {
    questionText: "What is sepsis?",
    wrongAnswers: ["A local infection, such as cellulitis or appendicitis.", "An infection in the blood.", "A contagious disease."],
    answer: "Your body's toxic response to an infection.",
    learnMore: {
      text: "More than 40% of Americans have never heard the word sepsis. It’s your body’s extreme and toxic response to an infection. It's life threatening and, without the right treatment, can cause organ failure, amputation, and death.",
      link: "http://www.sepsis.org/sepsis/definition/"
    }
  }, {
    questionText: "Sepsis can develop from:",
    wrongAnswers: ["A cut on your finger.", "A mosquito bite.", "A tattoo.", "A urinary tract infection (UTI)."],
    answer: true,
    learnMore: {
      text: "As many as 92% of sepsis cases come from the community, not the hospital. That means sepsis can develop from any type of infection including a UTI, strep throat, flu, pneumonia, and more. In fact, any time your body has a break in the skin, like from a cut or even a piercing, there's a chance it could cause an infection. Preventing and treating infections as soon as they develop are key to helping prevent sepsis.",
      link: "http://www.sepsis.org/sepsis-and/"
    }
  }, {
    questionText: "All of the following are signs of sepsis EXCEPT:",
    wrongAnswers: ["Fever or feeling chilled.", "Confusion/difficult to arouse.", 'Extreme pain or discomfort ("worst ever").', "Rapid breathing."],
    answer: "Slow heart rate.",
    learnMore: {
      text: "Less than 1% of Americans can correctly name all the common signs of sepsis, one of which is a rapid heart rate as your heart works to pump blood through your body. You can save a life just by arming yourself by knowing the signs of sepsis.",
      link: "http://www.sepsis.org/sepsis/symptoms/"
    }
  }, {
    questionText: "Who is at highest risk for developing sepsis?",
    wrongAnswers: ["Newborn babies.", "People with cancer.", "People over 65 years old."],
    answer: true,
    learnMore: {
      text: "Anyone can develop sepsis, no matter how healthy they are. However, it's especially risky for those with weaker immune systems.",
      link: "http://www.sepsis.org/sepsis/risk-factors/"
    }
  }, {
    questionText: "When someone has severe sepsis, their chances of survival drop by almost 8% for every _____ that goes by without treatment.",
    wrongAnswers: ["Minute.", "Day.", "None of the above."],
    answer: "Hour.",
    learnMore: {
      text: "Sepsis can be treated if it's identified early, which prevents it from progressing and leading to extreme consequences like amputation or death. Getting medical attention right away if you suspect sepsis is as important as treating heart attacks and strokes quickly.",
      link: "http://www.sepsis.org/sepsis/treatment/"
    }
  }, {
    questionText: "Adults older than 65 are _____ times more likely to be hospitalized with sepsis than adults younger than 65.",
    wrongAnswers: ["5", "20", "27"],
    answer: "13",
    learnMore: {
      text: "Did you know sepsis is the most costly condition billed to Medicare? As people age, their immune systems can't fight off infections as easily, making them at greater risk for developing sepsis. Mary Beth West was 72 when she survived sepsis from a UTI, read her story.",
      link: "http://www.sepsis.org/faces/mary-beth-west/"
    }
  }, {
    questionText: "Every day, an average of _____ amputations occur because of sepsis.",
    wrongAnswers: ["10", "52", "29"],
    answer: "38",
    learnMore: {
      text: "Unfortunately, amputation is a very real consequence of sepsis. Blockages inside the blood vessels cause the body's tissue to die which can require amputation. Michael Stolzenberg was 8 years-old when sepsis led to amputation to both his arms and legs. Watch Michael's inspiring story.",
      link: "http://www.sepsis.org/erin/"
    }
  }, {
    questionText: "Sepsis symptoms can be different for children and adults. Which of the below is a symptom of sepsis in a child?",
    wrongAnswers: ["High fever (above 100.4 degrees).", "General illness or a previous injury, such as a scrape or cut.", "Very fast or rapid breathing.", "Lethargy or difficulty waking up."],
    answer: true,
    learnMore: {
      text: "Sepsis in children is a problem - more than 75,000 children develop severe sepsis each year in the U.S. and many have lasting complications. If a child has a combination of any of these symptoms, it's important to get medical attention right away. Best rule of thumb? When in doubt, check with your doctor or bring your child to the emergency room for evaluation.",
      link: "http://www.sepsis.org/sepsis-and/children/"
    }
  }, {
    questionText: "Which of the following is NOT likely to be a complication after surviving sepsis?",
    wrongAnswers: ["Insomnia.", "Post-traumatic stress disorder (PTSD).", "Decreased mental functioning.", "Amputations."],
    answer: "Improved memory.",
    learnMore: {
      text: "There are more than 1.6 million cases of sepsis every year and survivors often face long-term effects, also known as post-sepsis syndrome, including amputations, anxiety, memory loss, chronic pain and fatigue, and more.",
      link: "http://www.sepsis.org/life-after-sepsis/"
    }
  }];

  var sepsisQuiz = new SepsisQuiz(questions);

  function render(sepsisQuiz) {
    /* ------ status ------ */
    $('#score').html(sepsisQuiz.score);

    /* ------ questions ------ */
    $('#questions_container').html(sepsisQuiz.renderedQuestions);

    /* ------ share ------ */
    $('#progress_container').html(sepsisQuiz.renderProgressBar());

    var tweet = {
      text: "Share Awareness",
      url: "http://www.sepsis.org/"
    };
    $('#share_container').html(sepsisQuiz.renderShareBlock(tweet));
  }
  render(sepsisQuiz);

  /* ------ event handlers ------ */
  // :O

  console.log('quiz:', sepsisQuiz);
});