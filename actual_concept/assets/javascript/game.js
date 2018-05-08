// Executes when the DOM is fully loaded
$(document).ready(function () {


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

	var enemyCharacters = {
		"Kefka": {
			name: "Kefka",
			health: 120,
			attack: 8,
			imageUrl: "../images/kefka.png",
			enemyAttackBack: 15
		},


	};

	// will be populated when player selects a character team
	var attacker1;
	var attacker2;
	var attacker3;
	var attacker4;

	var party = [attacker1, attacker2, attacker3, attacker4, ];
	var unUsed = [];



	//----------Functions	-------------------------------------------


	// designates which frame is shown on load
	$("#game-start-screen").hide(); 
	$("#team-character-select").hide(); 
	$("#combat-arena").show();

	//id="team-character-select"

	// renders char to the page
	var renderCharacter = function (character, renderArea) {
		// this block of code builds char card and renders it to the page
		// needs to happen on both select screen and combat arena

		var charDiv = $("<div id='attacker-one' data-name='" + character.name + "'>")
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
		var charName = $("<div class='character-name'>").text(character.name);
		var charHealth = $("<div class='character-health'>").text(character.health);


		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);
	}

	// function to load all characters into the select screen
	var initializeGame = function () {
		// loop through characters and call renderCharacter function
		for (var key in characters) {
			renderCharacter(characters[key], "#team-character-select");
		}
	};

	// runs initializeGame function
	initializeGame();

	// function handles updating the selected players
	// function will also place the character based on the areaRender chosen (#player-section)

	var updateCharacters = function (charObj, areaRender) {
		// First we empty the area so that we can re-render new objects
		$(areaRender).empty();
		renderCharacter(charObj, areaRender);

	};

	//=====================================================
	// following commented out function will be replaced with enemy array seperate from player characters, keeping it here now for reference
	/*
	// this function will render the available-to-attack enemies. This should be run once after a character has been selected 
	var renderCharacter = function (enemyArr) {
		for (var i = 0; i < enemyArr.length; i++) {
			renderCharacter(enemyArr[i], "#available-to-attack-section");
		}
	};*/
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
	if (!attacker1) {
		// we populate attacker with the selected character and push to the selected characters and party array
		attacker1 = characters[name];
	};

	if (!attacker2) {
		attacker2 = characters[name];	
	}

	// we then loop through the remaining characters and push them to the unUsed array
	for (var key in characters) {
		if (key !==name) {
			unUsed.push(characters[key]);
		}
	}

	// Once characters are selected .click function proceeds to combat screen and detachs character select screen
	$("#team-character-select").click(function () {
		$(this).toggleClass("off");
	});
	var selectToggle; $("#char-select").click(function () {
		if (selectToggle) {
			selectToggle.appendTo("body");
			selectToggle = null;
		} else {
			selectToggle = $("#team-character-select").detach();
			$("#combat-arena").show("slow");
		}
	});

	// then render our selected characters to #player-section
	updateCharacter(attacker1, "#attacker-one");
	updateCharacter(attacker2, "#attacker-two");

	 
});


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




$("#game-start-screen").click(function () {
	$(this).toggleClass("off");
});
var startToggle; $("#start-game").click(function () {
	if (startToggle) {
		startToggle.appendTo("body");
		startToggle = null;
	} else {
		startToggle = $("#game-start-screen").detach();
		$("#team-character-select").show("slow");
	}
});



$("#combat-arena").click(function () {
	$(this).toggleClass("off");
});
var combatToggle; $("#end-match").click(function () {
	if (combatToggle) {
		combatToggle.appendTo("body");
		combatToggle = null;
	} else {
		combatToggle = $("#combat-arena").detach();
		$("#game-start-screen").show();
	}
});



//----------End Frame Transitions-----------------------------------------

});