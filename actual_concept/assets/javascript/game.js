// Executes when the DOM is fully loaded
$(document).ready(function () {


	var characters = {

		// Kain is the model that all character objects will be based on
		// once his stats and moveset are functioning the rest will adapt 
		// the same set up with variations 
		"Kain": {
			name: "Kain",
			health: 120,
			strength: 8,
			imageUrl: "assets/images/kainSml.png",
			enemyAttackBack: 15,
			moveSet: {
				attack: 8,
				jump: 16,
				skill: {
					lancet: 20,
					tornado: 27
				},
				defend: 0,
			}
		},

		"Cloud Strife": {
			name: "Cloud Strife",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/cloudSml.png",
			enemyAttackBack: 15
		},

		"Gilgamesh": {
			name: "Gilgamesh",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/gilgSml.png",
			enemyAttackBack: 15
		},

		"Golbez": {
			name: "Golbez",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/golbezSml.png",
			enemyAttackBack: 15
		},
	};

	var enemyCharacters = {
		"Kefka": {
			name: "Kefka",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/kefka.png",
			enemyAttackBack: 15
		},


	};

	// will be populated when player selects a character team
	var dude;
	var counter = 4;
	var party = []; // 4
	var unUsed = [];



	//----------Functions	-------------------------------------------


	// designates which frame is shown on load
	$("#game-start-screen").show();
	$("#team-character-select").hide();
	$("#combat-arena").hide();

	//id="team-character-select"


	var renderCharacter = function (character, renderArea) {
		// this block of code builds the character card, and renders it to the page.
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
		var charHealth = $("<div class='character-health'>").text(character.health);
		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);
	};

	var renderMoveSet = function (character, renderArea) {
		var attack1 = $("<button class='fight' name='" + character.moveSet.attack + "'>");
		$(renderArea).append(attack1);

	};

	var initializeGame = function () {
		$("#start-game").click(function () {
			// Loop through the characters object and call the renderCharacter function on each character to render their card
			for (var key in characters) {
				renderCharacter(characters[key], "#team-character-select");
				console.log(key);
			}
		}, )
	};


	renderMoveSet(characters.Kain, ".moveset-container");



	function updateCharacter(charObj, areaRender) {
		// $(areaRender).empty();
		console.log(charObj);
		renderCharacter(charObj, areaRender);

	};


	$("#team-character-select").on("click", ".character", function () {
		// Saving the clicked character's name.
		dude = $(this).attr("data-name");
		console.log(dude);
		$(this).hide();
		if (counter > 0) {
			counter = counter - 1;
			updateCharacter(characters[dude], "#selected-characters");
			updateCharacter(characters[dude], "#player-section");
		} else {
			window.alert("stop picking peeps!");
		}
	});

	renderCharacter(enemyCharacters.Kefka, "#enemy-section");

	initializeGame();

	/*

		// function to load all characters into the select screen
		var initializeGame = function () {
			// loop through characters and call renderCharacter function
			for (var key in characters) {
				renderCharacter(characters[key], "#team-character-select");
			}
		};

		// runs initializeGame function
		initializeGame();

		// function handles updating the selected characters
		// function will also place the character based on the areaRender chosen (#player-section)

		var updateCharacters = function (charObj, areaRender) {
			// First we empty the area so that we can re-render new objects
			$(areaRender).empty();
			renderCharacter(charObj, areaRender);

		};
	*/
	//=====================================================
	// following commented out function will be replaced with enemy array seperate from player characters, keeping it here now for reference
	/*
	// this function will render the available-to-attack enemies. This should be run once after a character has been selected 
	var renderCharacter = function (enemyArr) {
		for (var i = 0; i < enemyArr.length; i++) {
			renderCharacter(enemyArr[i], "#available-to-attack-section");
		}
	};
	//=====================================================


	//function handles rendering game messages
	var renderMessage = function (message) {
		// builds the message and appends it to the page
		var gameMessageSet = $("#game-message");
		var newMessage = $("<div>").text(message);
		gameMessageSet.append(newMessage);
	};

	// function which handles restarting the game after victory or defeat
	var restartGame = function (resultMessage) {
		// when restart button is clicked, reload
	var restart = $("<button>Main Menu</button>").click(function () {
		location.reload();
	});

	// Build div that will display victory/defeat message
	var gameState = $("<div>").text(resultMessage);

	// render the restart button and victory/defeat message to the page
	$("body").append(gameState);
	$("body").append(restart);
};

// function to clear the game message action
var clearMessage = function () {
	var gameMessage = $("#game-message");
	gameMessage.text("");
};

//--------Character selection-----------------------------------------------

// on click event for selecting our character 
$("#team-character-select").on("click", ".character", function () {
	//saving the clicked characters name
	var name = $(this).attr("data-name");

	//if a player character has not yet been chosen 
	if (!attacker) {
		// we populate attacker with the selected character and push to the selected characters and party array
		attackerChoice = characters[name];
	};

/*	if (!attacker2) {
		attacker2 = characters[name];	
	}
*/

	/*
		// we then loop through the remaining characters and push them to the unUsed array
		for (var key in characters) {
			if (key !==name) {
				unUsed.push(characters[key]);
			}
		}



		// then render our selected characters to #player-section
		updateCharacter(attacker1, "#attacker-one");
		updateCharacter(attacker2, "#attacker-two");

		 
	});

	// here I need to create and populate the moveset
	*/

	//-------API----------------------------------------------------------------

	// World Clock API will be used to create a day/night cycle. May change over to one that can adapt local time if that's possible. 
	// Will see what can be done in conjunction with googlemaps
	var timeURL = "http://worldclockapi.com/api/json/utc/now";

	$.ajax({
		url: timeURL,
		method: "GET"
	}).then(function (response) {
		$("#currentDateTime").text(JSON.stringify(response));
		console.log(response);
	});

	//-----Frame Transitions for content area-----------------------------------

	// Homepage begins on start screen with following screens hidden.
	// this section is designated for those hidden sections and creates initial 
	// function for section progression.

	var startToggle;
	$("#start-game").click(function () {
		if (startToggle) {
			startToggle.appendTo("body");
			startToggle = null;
		} else {
			startToggle = $("#game-start-screen").detach();
			$("#team-character-select").show("slow");
		}
	});

	// Once characters are selected .click function proceeds to combat screen and detachs character select screen

	var selectToggle;
	$("#char-select").click(function () {
		if (selectToggle) {
			selectToggle.appendTo("body");
			selectToggle = null;
		} else {
			selectToggle = $("#team-character-select").detach();
			$("#combat-arena").show("slow");
		}
	});


	var combatToggle;
	$("#end-match").click(function () {
		if (combatToggle) {
			combatToggle.appendTo("body");
			combatToggle = null;
		} else {
			combatToggle = $("#combat-arena").detach();
			$("#game-start-screen").show("slow");
		}
	});



	//----------End Frame Transitions-----------------------------------------

});