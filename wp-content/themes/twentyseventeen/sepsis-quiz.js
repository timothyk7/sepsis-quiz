const quiz = [
    {
        id: 1,
        question: 'What is sepsis?',
        choices: [
            {text: 'An infection in the blood'},
            {text: 'A local infection, such as cellulitis or appendicitis.'},
            {text: 'A toxic reaction to an infection.', isCorrect: true},
            {text: 'A chronic disease.'}
        ],
        description: 'Sepsis is not an infection and is not contagious. The infection that triggered sepsis could be contagious but sepsis itself is not.'
    },
    {
        id: 2,
        question: 'Sepsis is contagious',
        choices: [
            {text: 'True'},
            {text: 'False', isCorrect: true}
        ],
        description: 'Everyone can develop sepsis, no matter how healthy, but the people listed here are at the highest risk.'
    }
];

/***************************/
var ctrl = {};
var state = {
    currentQuestion: 0,
    score: 0,
    isDirty : false
};

jQuery(document).ready(function ($) {
    'use strict';

    // init functions
    ctrl.nextQuestion = nextQuestion.bind(this);
    ctrl.onSelect = handleOnSelect.bind(this);

    function renderQuestion() {
        $('#question-number').text(quiz[state.currentQuestion].id);
        $('#question').text(quiz[state.currentQuestion].question);
    }

    function renderChoices() {
        var html = quiz[state.currentQuestion].choices.reduce(function (acc, choice, index) {
            if (choice.isCorrect){
                state.currentAnswer = index;
            }
            return acc + '<div onclick="ctrl.onSelect(event,' + index + ')">' + choice.text + '</div>';
        }, '');
        $('#choices').html(html);
    }

    /**
     * Resets all of the fields to prepare for the next question
     */
    function nextQuestion() {
        state.currentQuestion++;
        reset();
    }

    /**
     * Handles user's input
     */
    function handleOnSelect(evt, id) {
        evt.preventDefault();

        if (state.isDirty) {
            return;
        }
        var selected = quiz[state.currentQuestion].choices[id];

        if ( selected.isCorrect ){
            $(evt.target).addClass('correct')
        } else {
            $(evt.target).addClass('incorrect')
        }

        state.isDirty = true;
    }
    function reset() {
        state.isDirty = false;
        renderQuestion();
        renderChoices();
    }


    renderQuestion();
    renderChoices();
});



