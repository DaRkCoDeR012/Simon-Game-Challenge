var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var randomNumber;
var randomChosenColor;
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("h1").text("Level " + level);
  randomNumber = Math.round(Math.random() * 3);
  randomChosenColor = colors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function() {
  if (started == true) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var activeButton = $("#" + currentColor);
  $(activeButton).addClass("pressed");
  setTimeout(function() {
    $(activeButton).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] == userClickedPattern[currentlevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".quit-btn").click(function() {
  $(".quit-btn").addClass("pressed");
  setTimeout(function() {
    $(".quit-btn").removeClass("pressed");
  }, 100);
  if (started == true) {
    $("h1").text("Press Any key to Start");
    startOver();
  }
});
