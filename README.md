# Wordpress Sepsis Quiz

## Setup

1. We recommend [this tutorial](https://codex.wordpress.org/Installing_WordPress_Locally_on_Your_Mac_With_MAMP) for getting Wordpress set up locally with MAMP.
2. Once you have Wordpress setup locally, delete your local copy of the "twentyseventeen" theme `rm -r /path-to-wordpress/wp-content/themes/twentyseventeen`
3. Now symlink the theme from this repo into your Wordpress install `ln -s /path-to-sepsis-quiz/twentyseventeen /path-to-wordpress/wp-content/themes/` (note: I'm not a symlink master but they're funny with relative paths. I recommend using the full path for this command).

Now you can develop from this repo (see `sepsis-quiz-js/README.md`) and your Wordpress site will update automagically! Fantastic!

## Setting up the Wordpress Page

From your Wordpress Admin Dashboard (probably located at http://localhost:8888/wp-admin):

1. In the left menu select Pages > Add New
2. Type in a page name
3. In the Page Attributes menu (on the right) select SepsisQuiz as the template.
4. Make sure to press Save Draft or Publish!

## Releasing the Page (into the wild!)

The files that need to be added to Sepsis Alliance's theme are:

1. [sepsis-quiz.php](twentyseventeen/sepsis-quiz.php)
2. [sepsisQuiz.js](twentyseventeen/assets/js/sepsisQuiz.js)
3. [sepsis-quiz.css](twentyseventeen/assets/css/sepsis-quiz.css)

Their [functions.php](twentyseventeen/functions.php) file also needs to be updated with the code inside the `if ( is_page_template('sepsis-quiz.php'))` code block.

## Design Prototype

Check it out on [Invision](https://invis.io/H7CKT3JW2#/244849159_Sepsis-Quiz_Final_1)
