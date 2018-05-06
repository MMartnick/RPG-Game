// Executes when the DOM is fully loaded
$(document).ready(function () {
	// VARIABLE DECLARATION
	// ===================================================================

	// create an object for holding the characters
	var characters = {
		"Kain Highwind": {
			name: "Kain Highwind",
			health: 120,
			attack: 8,
			imageUrl: "../images/kainSml.png",
			enemyAttackBack: 15
		},

		"Cloud Strife": {
			name: "Cloud Strife",
			health: 120,
			attack: 8,
			imageUrl: "../images/cloudSml.png",
			enemyAttackBack: 15
		},

		"Gilgamesh": {
			name: "Gilgamesh",
			health: 120,
			attack: 8,
			imageUrl: "../images/gilgSml.png",
			enemyAttackBack: 15
		},

		"Golbez": {
			name: "Golbez",
			health: 120,
			attack: 8,
			imageUrl: "../images/golbezSml.png",
			enemyAttackBack: 15
		},
	};


	// will be populated when player selects a character
	var attacker;
	// populated with all the unselected characters
	var combatants = [];
	//will be populated when player chooses an opponent
	var defender;
	//will keep track of turns in combat (will change to timer)
	var turnCounter = 1;
	// tracks number of defeated opponents
	var killCount = 0;


	// Functions
	//==============================================================================================


	// This function will render a character card to the page
	// the character rendered, the area they are rendered to, and their status is determined by the arguments passed in.
	var renderCharacter = function (character, renderArea) {
		// this block of code builds the character card, and renders it to the page.
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
		var charHealth = $("<div class='character-health'>").text(character.health);
		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);

	};

	//this function will load all characters the characters into the character section to be selected
	var initializeGame = function () {
		// Loop through the characters object and call the renderCharacter function on each character to render their card
		for (var key in characters) {
			renderCharacter(characters[key], "#characters-section");
		}
	};

	// remember to run the function here
	initializeGame();

	// function handles updating the selected player or the current defender. If there is no selected player/defender this
	// function will also place the character based on the areaRender chosen (e.g. #selected-character or #defender)
	
	var updateCharacter = function (charObj, areaRender) {
		// First we empty the area so that we can re-render the new object
		$(areaRender).empty();
		renderCharacter(charObj, areaRender);
	};

	// this function will render the available-to-attack enemies. This should be run once after a character has been selected 
	var renderEnemies = function (enemyArr) {
		for (var i = 0; i < enemyArr.length; i++) {
			renderCharacter(enemyArr[i], "#available-to-attack-section");
		}
	};

	//function to handle rendering game messages.
	var renderMessage = function (message) {
		// builds the message and appends it to the page 
		var gameMessageSet = $("#game-message");
		var newMessage = $("<div>").text(message);
		gameMessageSet.append(newMessage);
	};

	// function which handles restarting the game after victory or defeat
	var restartGame = function (resultMessage) {
		// When the "Restart" button is clicked, reload
		var restart = $("<button>Restart</button>").click(function () {
			location.reload();
		});

		// Build div that will display the victory/defeat message
		var gameState = $("<div>").text(resultMessage);

		// render the restart button and victory/defeat to the page
		$("body").append(gameState);
		$("body").append(restart);
	};


	// function to clear the game message action
	var clearMessage = function () {
		var gameMessage = $("#game-message");

		gameMessage.text("");
	};

	//====================================================================================

	// on click event for selecting our character 
	$("#characters-section").on("click", ".character", function () {
		// saving the clicked characters name
		var name = $(this).attr("data-name");

		// if a player character has not yet been chosen
		if (!attacker) {
			// we populate attacker with the selected characters and push them to the combatants array
			attacker = characters[name];
			// we then loop through the remaining characters and push them to the combatants array
			for (var key in characters) {
			if (key !== name) {
				combatants.push(characters[key]); 
			}
		}

			// hide the character select div
			$("#characters-section").hide();

			// then render our selected character and our combatants
			updateCharacter(attacker, "#selected-character");
			renderEnemies(combatants);
		}
	});

	// creates an on click event for each enemy
	$("#available-to-attack-section").on("click", ".character", function () {
		// saving the oppont's name 
		var name = $(this).attr("data-name");

		// if there is no defender, the clicked enemy will become the defender
		if ($("#defender").children().length === 0) {
			defender = characters[name];
			updateCharacter(defender, "#defender");

			//remove elements as it will now be a new defender
			$(this).remove();
			clearMessage();
		}
	});

	// when you click the attack button, run the following game logic
	$("#attack-button").on("click", function () {
		// if there is a defender, combat will occur
		if ($("#defender").children().length !== 0) {
			// creates messages for our attack and our opponents counter attack
			var attackMessage = "You attacked" + defender.name + "for" + attacker.attack * turnCounter + "damage.";
			var counterAttackMessage = defender.name + " attacked you back for " + defender.enemyAttackBack + "damage.";
			clearMessage();

			// Reduce defender's health by your attack value.
			defender.health -= attacker.attack * turnCounter;

			// If the enemey st has health
			if (defender.health > 0) {
				// Render the enemy's updated character card.
				updateCharacter(defender, "#defender");

				// Render the combat messages.
				renderMessage(attackMessage);
				renderMessage(counterAttackMessage);

				// Reduce your attack health by the opponents attack value.
				attacker.health -= defender.enemyAttackBack;

				//render the player's updated character card.
				updateCharacter(attacker, "#selected-character");

				// If you have less than zero health the game ends. 
				// We call the restartGame function to allow the user to restart the game and play again.
				if (attacker.health <= 0) {
					clearMessage();
					restartGame("Game Over");
					$("#attack-button").off("click");
				}
			} else {
				// if the enemy has less than zero health they are defeated
				// remove your opponents character card. 
				$("#defender").empty();

				var gameStateMessage = "You have defeated " + defender.name + ", you can choose to fight another enemy";
				renderMessage(gameStateMessage);

				// Increment your kill count
				killCount++;

				// If you have killed all of your opponents you win
				// Call the restartGame function to allow the user to restart the game and play again
				if (killCount >= combatants.length) {
					clearMessage();
					$("#attack-button").off("click");
					restartGame("You Won");
				}
			}
			// Increment turn counter. This is used for determining how much damage the player does.
			turnCounter++;
		} else {
			// If there is no defender, render an error message
			clearMessage();
			renderMessage("No enemy here");

		}
	});
});


/*
$("#number-to-guess").text(targetNumber);

let enemyHp = 250;

var kainWeapon = 7;
var kainStrength = 1 + Math.floor(Math.random() * 10);
var kainAtk = kainWeapon + kainStrength;

$("#kain").on("click", ".kain", function () {
	console.log("one");

	let newScore = enemyHp - kainAtk;




	var cloudWeapon = 5;
	var cloudStrength = 1 + Math.floor(Math.random() * 10);
	var cloudAtk = cloudWeapon + cloudStrength;

	$("#cloud").on("click", ".cloud", function () {
		console.log("one");

		let newScore = enemyHp - cloudAtk;

		alert("New score: " + newScore);


		var gilgWeapon = 7;
		var gilgStrength = 1 + Math.floor(Math.random() * 12);
		var gilgAtk = gilgWeapon + gilgStrength;

		$("#gilg").on("click", ".gilg", function () {
			console.log("one");

			let newScore = enemyHp - gilgAtk;

			alert("New score: " + newScore);



			var golbezWeapon = 7;
			var golbezStrength = 1;
			var golbezAtk = golbezWeapon + golbezStrength;
	
			$("#golbez").on("click", ".golbez", function () {
				console.log("one");
	
				let newScore = enemyHp - golbezAtk;
	
				alert("New score: " + newScore);

			if (newScore <= 0) {
				alert("You win!");
			} else if (counter >= targetNumber) {
				alert("You lose!!");
			}

			document.getElementById("counter").innerHTML = newScore;



		})
		})
	})

});



// Everything below is previous code I had tried to get to work. After failing to get it to work 
// I tried to rework the crystal game sample as a starting point for the combat in the RPG however I keep getting stuck.
// images won't load if I have them in the JS file instead of just the HTML and right now I can't even get the .onclick
// to work right for just one image. Since time was starting to run short I started working on the CSS to at least
// make it look good if it's not going to work right  

/* Edit: This is as functional as I can get the game to run. I added the additional characters in and when
things started to actually work I attempted to put together an array for the characters and their stats but I was unable to 
get that to run appropriately. I think in that case I'd have to designate a seperate class to call the character variables from 
that array which I'll have to try more of later. To test this just click on the characters like you would for
the crystal game. Also the Hit Point counter isn't subtracting right but I'll figure that out. 





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


----------------------------------------------------------------------------------
	var enemyHP = 0;

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
	});
	

---------------------------------------------------------------------

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

---------------------------------------------------------------
		
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