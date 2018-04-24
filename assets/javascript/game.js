 var targetNumber = 0;

  $("#number-to-guess").text(targetNumber);

  var counter = 100;


  var numberOptions = [10, 13, 22, 17];
  var increment = numberOptions[Math.round(Math.random())];

  $("#goodguy").on("click", ".kain", function() {
    counter -= increment;
  }
    $("#goodguy").on("click", ".cloud", function() {
      counter -= increment;
    }



    alert("New score: " + counter);

    if (counter === targetNumber) {
      alert("You win!");
    }

    else if (counter <= targetNumber) {
      alert("You lose!!");
    }

  });


// Everything below is previous code I had tried to get to work. After failing to get it to work 
// I tried to rework the crystal game sample as a starting point for the combat in the RPG however I keep getting stuck.
// images won't load if I have them in the JS file instead of just the HTML and right now I can't even get the .onclick
// to work right for just one image. Since time was starting to run short I started working on the CSS to at least
// make it look good if it's not going to work right   

  
	// atk setup
/*

	var enemyHP = 0;

	$("#number-to-guess").prepend(counter);
	
	var moveSet = $("#moveSet");
	
	var counter = 50;
	var numberOptions = [10];
	
	for (var i = 0; i < numberOptions.length; i++) {
	  var atkButton = $("<img>");
	  atkButton.addClass(".button");
	  atkButton.attr("src", "images/attack.png");
	  atkButton.attr("data-HPvalue", numberOptions[i]);
	  moveSet.append(atkButton);
	}

	
	
	moveSet.on("click", ".atkPic", function() {
	"use strict";
	  var HP = ($(this).attr("data-HPvalue"));
	  HP = parseInt(HP);
	  counter -= HP;
	  
	
	
	  alert("New score: " + counter);

	  if (counter <= enemyHP) {
		alert("You win!");
	  }
	

	});

		
		var atkButton = document.getElementById('moveSet');
if(atkButton && atkButton.style) {
  	atkButton.style.height = "50px";
	atkButton.style.width = "100px";
}




/*	var enemyHP = 0;

	$("#number-to-guess").text(counter);
	
	let moveSet = $("#moveSet");
	
	var counter = 50;
	var numberOptions = [10, 5, 3, 7];
	
	for (var i = 0; i < numberOptions.length; i++) {
	  var atkButton = $("<img>");
	  atkButton.addClass("atkPic");
	  atkButton.attr("src", "images/attack.png");
	  atkButton.attr("data-HPvalue", numberOptions[i]);
	  moveSet.append(atkButton);
	}
	
	moveSet.on("click", ".atkPic", function() {
	
	  var HP = ($(this).attr("data-HPvalue"));
	  HP = parseInt(HP);
	  counter -= HP;
	  
	
	
	  alert("New score: " + counter);

	  if (counter <= enemyHP) {
		alert("You win!");
	  }
	});*/
	
/*


	//Object declaration for characters
	var character = [
		charOne = {
			name: "Sabin",
			//image:
			strength: 5,
			attack: 5,
			health: 50,
		},
	];

	//Object declaration for enemies
	var enemy = [
		enOne = {
			name: "Kefka",
			image: "<src='assets/images/kefka.png'>"
			strength: 5,
			attack: 5,
			health: 50,
		},
	];

	var enemyCount = (enemy.length - 1); 
	console.log(enemyCount);

	$("#attack").empty();
	$('#attackButton').empty();


	function playGame(){
		
	}
	//basic attack set up
	function attack(attacker, defender){
		$("#attackButton").on("click", function(){
			if(enemy === true){
				attack(character)
				console.log(health)
			}
			else if (enemyCount == 0){
				winner(character);
			}
		});
	}

	function attack(attacker, defender){
		defender.health = defender.health - attacker.attack;
		attacker.health = attacker.health - defender.attack;
		attacker.attack = attacker.strength + attacker.attack;
		if(defender.health <= 0){
			attack(attack, defender);
		}
		else if (defender.health <= 0 && attacker.health > 0){
			var dead;
			enemyCount--;
			if(enemyCount == 0){
				winner(attacker);
			}
		}
	} 




});

*/