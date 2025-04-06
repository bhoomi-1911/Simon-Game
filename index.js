var colors=["red","blue","green","yellow"];
var gamePattern=[];
var clickedPattern=[];
var level=0;
var started=false;
$(document).on("keydown",function(){
    if(!started){
        $("h1").text("Level "+level);  
        nextSequence();
        started=true;
    }    
})
$(".btn").click(function(){
    var chosenColor=$(this).attr("id");
    clickedPattern.push(chosenColor)
    console.log(clickedPattern);
    playSound(chosenColor);
    animatePress(chosenColor);
    checkAnswer(clickedPattern.length-1);
});
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
    
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);

}
function nextSequence(){
    clickedPattern=[];
    $("h1").text("Level "+level++);  
    var num=Math.floor(Math.random()*4);
    var randomColor=colors[num];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===clickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length===clickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("WRONG");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


