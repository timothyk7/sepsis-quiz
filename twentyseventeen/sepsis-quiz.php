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
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <link href="https://cdn.rawgit.com/FortAwesome/Font-Awesome/master/css/font-awesome.min.css" rel="stylesheet">
</head>

<body>
<div id="stats" style="position: sticky; top: 24px;">
    <pre>score: <span id="score"></span>, status: <span id="status"></span>, total_questions: <span id="total_count"></span>, answered_count:<span id="answered_count"></span></pre>
</div>
<div class="main-container">
    <div id="questions_container" class="question-container">
        <!-- QUESTION -->
        <div class="question-container">
            <div class="question-number">Question</div>
            <div class="under-card-top under-card-top-hide"></div>

            <!-- MAIN CARD -->
            <div class="card-container">
                  <div class="question">Question</div>
                  <div class="choices">
                  </div>
            </div>

            <!-- BOTTOM CARD -->
            <div class="under-card-bottom-container">
                <div class="under-card-bottom under-card-bottom-reveal">
                    <div>Fact</div>
                    <div class="learn-more"><a href="" target="_blank">Learn More <i class="fa fa-angle-right" aria-hidden="true"></i>
        </a></div>
                </div>
            </div>
        </div>
        <!-- END OF QUESTION -->
    </div>

    <!-- SHARE -->
    <div id="share_container" class="share-container">
        <div class="under-card-top"></div>

        <!-- MAIN CARD -->
        <div class="card-container">
              <div class="question">Question</div>
              <div class="choices">
                    <div>FaceBook</div>
                    <div>Twitter</div>
              </div>
        </div>

        <!-- BOTTOM CARD -->
        <div class="under-card-bottom-container">
            <div class="under-card-bottom">
                <div>Support the Sepsis Alliance during Sepsis Awareness Month. Say Sepsis. Save lives.</div>
                <div class="share-block"><a href="https://donate.sepsis.org/checkout/donation?eid=31711" target="_blank">Donate Now<i class="fa fa-angle-right" aria-hidden="true"></i></a></div>
            </div>
        </div>
    </div>
    <!-- END OF SHARE -->
</div>


</body>
</html>

<?php wp_footer();

