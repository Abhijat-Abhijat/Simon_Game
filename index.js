var buttonColours = ["red", "blue", "green", "yellow"];
var timer = 500;
var gamePattern = [];
var userClickedPattern = [];
var wrong = new Audio("sounds/wrong.mp3");
// generating random sequence
function nextSequence() {
  var num = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[num];
  gamePattern.push(randomChosenColour);
}
// hinting the gamePattern
function hinting(index) {
  setTimeout(function () {
    $("." + gamePattern[index])
      .fadeIn(timer)
      .fadeOut(timer)
      .fadeIn(timer);
    // console.log(gamePattern[index]);
  }, 1000 * index);
}
// calling the hinting function
function indicator() {
  for (var index = 0; index < gamePattern.length; index++) {
    hinting(index);
  }
}

// checking the userClickedPattern with gamePattern
function stringCmp(arr1, arr2) {
  var flag = true;
  for (var index = 0; index < arr1.length; index++) {
    if (arr1[index] !== arr2[index]) {
      flag = false;
    }
  }
  return flag;
}
// sound play
function sound(key) {
  switch (key) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      break;
  }
}

// user btn clicks are pushed to check with gamePattern
$(".btn").click(function () {
  userClickedPattern.push($(this).attr("id"));
  sound($(this).attr("id"));
  console.log(userClickedPattern);
  if (gamePattern.length == userClickedPattern.length) {
    if (stringCmp(userClickedPattern, gamePattern)) {
      nextSequence();
      $("h1").text("Level " + gamePattern.length);
      indicator();
      userClickedPattern = [];
    } else {
      wrong.play();
      setTimeout(function () {
        location.href = 'index.html';
        // location.reload(true);
        // $("h1").text("Game Over, Press Any Key to Restart");

      }, 1000);
    }
  }
});

// starting the game
$(document).keypress(function () {
  nextSequence();
  $("h1").text("Level " + gamePattern.length);
  indicator();
});
