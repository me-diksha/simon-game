var buttoncolors = ["green", "red", "yellow", "blue"];
var gamepattern = [];
var userclickedpattern = [];
var level = 0;
var starttoggle = false;
//first time game start so only once shouls start
$(document).keypress(function () {

    if (!starttoggle) {
        $("h1").text("Level " + level);
        nextsequence();

        starttoggle = true;
    }
});
//if game over to restart by reset all variable 
function startover(){
    level=0;
    gamepattern=[]; 
    starttoggle=false;
}
//get input from user on click
$(".btn").click(function (event) {
    var userchossencolor = event.currentTarget.id;
    userclickedpattern.push(userchossencolor);
    // console.log(userclickedpattern);
    playsound(userchossencolor);
    animatepress(userchossencolor);
    var lastindex = userclickedpattern.length - 1;
    checkanswer(lastindex);
});
//to generate random color
function nextsequence() {
    //increase level and change text
    userclickedpattern = []; //make userpattern empty
    level++;
    $("h1").text("Level " + level);
    var randomnumber = Math.random();
    randomnumber = randomnumber * 4;
    randomnumber = Math.floor(randomnumber);

    // console.log(randomnumber);
    randomchossencolor = buttoncolors[randomnumber];
    gamepattern.push(randomchossencolor);

    $("#" + randomchossencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchossencolor);



}
//to playsound when button selected
function playsound(name) {
    var audio1 = new Audio('sounds/' + name + '.mp3');
    audio1.play();
}
//to animate when user clicked
function animatepress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

//to check answer
function checkanswer(currentlevel) {
    //check most recent if ans right
    if (userclickedpattern[currentlevel] == gamepattern[currentlevel]) {
        console.log("success");
        if (userclickedpattern.length === gamepattern.length) {

            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextsequence();
            }, 1000);

        }

    } else {
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
    }
}




