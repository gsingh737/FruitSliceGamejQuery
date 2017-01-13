var playing = false;
var score; 
var trialsleft;
var fruits = ["apple", "banana", "cherries", "grapes", "mango", "orange", "peach", "pear", "pineapple"];
var interval;
var step;
$(function(){
	//if we are already playing 
	$("#startreset").click(function(){
		if(playing === true){
			//reload page
            location.reload();
            clearInterval(interval);
		}
        else{
            //we are not playing 
            playing = true;
            score = 0;
            $("#scorevalue").html(score);
            console.log("here");
            //show trialsleft
            $("#trialsleft").show();
            trialsleft=3;
            addHearts();
            $("#startreset").html("Reset Game");
            $("#gameover").hide();
            //start sending fruits
            startAction();
        }
		
	});

    $("#fruit1").mouseover(function(){
       score++;
        $("#scorevalue").html(score);
        $("#sliceaudio")[0].play(); //play sound
        clearInterval(interval); //stop fruit
        //hide fruit
        $("#fruit1").hide("explode", 500);
        //give it 500 ms for animation to finish
        setTimeout(startAction, 500);
    });

function addHearts(){
    $("#trialsleft").empty();
    for(i = 0; i< trialsleft; i++){
        $("#trialsleft").append("<img src='images/heart.png' class='life'>");
    }

}

function startAction(){
//    $("#fruitscontainer").append('<img src="images/apple.png">');
    //chosefruit
    $("#fruit1").show();
    choosefruit();
    $("#fruit1").css({'left': 10 +  Math.round(Math.random()*550), 'top': -50});
    step = 1 + Math.round(Math.random()*5);

    //generate random step 
    interval = setInterval(function(){
                var before = $("#fruit1").position().top;
                var top = step + $("#fruit1").position().top;

                $("#fruit1").css('top', top );
//                console.log('moving fruit ' + top);
//                console.log("Fruit container height " +  $("#fruitscontainer").height() )

//                console.log($("#fruit1").position().top + " " + $("#fruitscontainer").height());
                //check if fruit is too low
                if($("#fruit1").position().top > $("#fruitscontainer").height() ){
                    if(trialsleft > 1){
                        $("#fruit1").show();
                        choosefruit();
                        $("#fruit1").css({'left': 10 + Math.round(Math.random()*600), 'top': -50});
                        step = 1 + Math.round(Math.random()*5);
                        console.log("NEW Fruit + top : " + $("#fruit1").position().top);
                        trialsleft --;
                        addHearts();
                        
                    }
                    else{
                        playing = false;
                        $("#startreset").html("Start Game");
                        $("#gameover").show();
                        $("#gameover").html("<p> Game over ! </p> <p>  Your score is " + score + "</p>");
                        $("#trialsleft").hide();
                        clearInterval(interval);
                        $("#fruit1").hide();
                    }
                }
    }, 10);
}

function choosefruit(){
    var fruit = "images/" + fruits[Math.round(Math.random()*8)] + ".png";
    console.log(fruit);
    $("#fruit1").attr("src", fruit);
        
}
});

//pseudocode
//click on start/reset button we check i
	//if we are playing, if we are reload page
		//yes reload page
		//no show trials left
		//change button text to reset game
		//1/ create a random fruit
		//define a random step
		//2/move fruit down step every 30sec 
			//is fruit too low? 
				//n0-> repeat nb2
				//yes any trials left? 
				//yes repeat nb1
				//no show game over button text: start game 


//slice a fruit 
	//play a sound 
	//explode fruit