var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$("#play").click(function () {
    if(!started){
        
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
        $("#play").hide();

    }

    
});


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    // 
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length - 1);


});



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 700);

        }

    } else {
        playSound("wrong");
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    $("#level-title").text("Game Over, Press button to restart");
    gamePattern = [];
    $("#play").show();
}



function nextSequence() {
    
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //1. Use jQuery to select the button with the same id as the randomChosenColour
    //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    playSound(randomChosenColour);
    
}






function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentKey){
    $("#"+currentKey).addClass("pressed");

    setTimeout(function(){
        $("#" + currentKey).removeClass("pressed");
    },150);
}




