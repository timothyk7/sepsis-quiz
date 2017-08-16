<?php
/**
 * Template Name: SepsisQuiz
 */
wp_head(); ?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sepsis</title>
</head>

<body>

<div class="main-container">


    <div id=""></div>

    <div id="questions_container" class="question-container">
        <!-- START EXAMPLE -->
        <!-- The contents of this div get replaced by Javascript -->
        <div id="question-header" class="question-number">Question <span id="question-number"></span></div>
        <div class="under-card-top"></div>
        <div class="card-container">
            <div id="question" class="question">What is sepsis?</div>
            <div id="choices" class="choices">
                <div>An infection in the blood.</div>
                <div>A local infection, such as cellulitis or appendicitis.</div>
                <div class="correct">A toxic reaction to an infection.</div>
                <div class="incorrect">A chronic disease.</div>
            </div>
        </div>
        <div class="under-card-bottom">
            <div class="icon"><i class="fa fa-heartbeat" aria-hidden="true"></i></div>
            <div>Sepsis is not an infection and is not contagious. The infection that triggered sepsis could be contagious but sepsis itself is not.
            </div>
            <div class="learn-more"><a href="" target="_blank">Learn More <i class="fa fa-angle-right" aria-hidden="true"></i></a></div>
        </div>
        <!-- END EXAMPLE -->
    </div>
</div>


</body>
</html>

<?php wp_footer();

