// Executes when the DOM is fully loaded
// sets difficulty
function difficulty() {
	var userInput, text;
	userInput = document.getElementById("number").value;
	if (isNaN(userInput) || userInput < 1 || userInput > 10) {
		text = "Input not valid";
	} else {
		text = "Input OK";
	}
	document.getElementById("test").innerHTML = text;
};




var x = document.getElementById("demo");

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
		lat = Position.coords.latitude;
		lon = Position.coords.longitude;

	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	x.innerHTML = "Latitude: " + position.coords.latitude +
		"<br>Longitude: " + position.coords.longitude;
}

//-----weather API

var APIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + latitude + "&" + longitude + "=101&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
		url: weatherURL,
		method: "GET"
	})
	// We store all of the retrieved data inside of an object called "response"
	.then(function (response) {

		// Log the queryURL
		console.log(queryURL);

		// Log the resulting object	
		console.log(response);

		// Transfer content to HTML
		$(".city").html("<h1>" + response.name + " Weather Details</h1>");
		$(".wind").text("Wind Speed: " + response.wind.speed);
		$(".humidity").text("Humidity: " + response.main.humidity);
		$(".temp").text("Temperature (F) " + response.main.temp);

		// Log the data in the console as well
		console.log(response.name);
		console.log("Wind Speed: " + response.wind.speed);
		console.log("Humidity: " + response.main.humidity);
		console.log("Temperature (F): " + response.main.temp);
	});



	
$(document).ready(function () {




	var characters = {

		// Kain is the model that all character objects will be based on
		// once his stats and moveset are functioning the rest will adapt 
		// the same set up with variations 
		"Kain": {
			name: "Kain",
			health: 9999,
			strength: 8,
			imageUrl: "assets/images/kainSml.png",
			enemyAttackBack: 15,
			moveSet: {
				attack: 40,
				jump: 16,
				skill: {
					lancet: 20,
					tornado: 27
				},
				defend: 0,
			}
		},

		"Cloud": {
			name: "Cloud",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/cloudSml.png",
			enemyAttackBack: 15,
			moveSet: {
				attack: 5,
				jump: 16,
				skill: {
					lancet: 20,
					tornado: 27
				},
				defend: 0,
			}
		},

		"Gilgamesh": {
			name: "Gilgamesh",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/gilgSml.png",
			enemyAttackBack: 15,
			moveSet: {
				attack: 18,
				jump: 16,
				skill: {
					lancet: 20,
					tornado: 27
				},
				defend: 0,
			}
		},

		"Golbez": {
			name: "Golbez",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/golbezSml.png",
			enemyAttackBack: 15,
			moveSet: {
				attack: 18,
				jump: 16,
				skill: {
					lancet: 20,
					tornado: 27
				},
				defend: 0,
			}
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

		"Ultimecia": {
			name: "Ultimecia",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/ultimecia.png",
			enemyAttackBack: 15
		},

	};

	var spiderHouse = {
		"Ultimecia": {
			name: "Ultimecia",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/ultimecia.png",
			enemyAttackBack: 15
		},

	};

	// Variables for audio -------------------------------------
	var error = new Audio("assets/audio/error.mp3");
	var intro = new Audio("assets/audio/intro.mp3");
	var growl = new Audio("assets/audio/growl.mp3");
	var cursor = new Audio("assets/audio/cursor.mp3");
	var battle1 = new Audio("assets/audio/battle1.mp3");


	// will be populated when player selects a character team

	var dude;
	var badDude;
	var charCounter = 2;
	var killCount = 0;

	var localEnemy;


	//var combatTimer = setInterval(timer, speed);
	//var currentChar = charObj;
	//console.log(charObj);


	// Audio loops --------------------------------------------

	battle1.addEventListener('ended', function () {
		this.currentTime = 0;
		this.play();
	}, false);
	battle1.play();

	intro.addEventListener('ended', function () {
		this.currentTime = 0;
		this.play();
	}, false);
	intro.play();


	//----------Functions-------------------------------------------



	// designates which frame is shown on load
	$("#game-start-screen").show();
	$("#team-character-select").hide();
	$("#combat-arena").hide();





	// renders all characters to the DOM
	var renderCharacter = function (character, renderArea) {
		// this block of code builds the character card, and renders it to the page.
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
		//var charHealth = $("<div class='character-health'>").text(character.health);
		charDiv.append(charName).append(charImage); //.append(charHealth);
		$(renderArea).append(charDiv);
	};

	// renders all characters to the DOM
	var renderEnemy = function (character, renderArea) {
		// this block of code builds the character card, and renders it to the page.
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		// var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
		// var charHealth = $("<div class='character-health'>").text(character.health);
		charDiv /*.append(charName)*/ .append(charImage); //.append(charHealth);
		$(renderArea).append(charDiv);



	};



	var getEnemy = function (latitude, longitude) {
		if ((latitude = 30.295502) && (longitude = -97.7417479)) {
			$(localEnemy = spiderHouse);
		}

	}

	// renders character moveSet to the DOM
	var renderMoveSet = function (character, renderArea) {
		var attack1 = $("<button>");
		//class='combat-attack'  data-type='"+character+"'>");
		attack1.addClass("combat-attack");
		attack1.attr("data-type", character);
		attack1.text(character);
		var something = attack1.attr("data-type");
		console.log(something);
		$(renderArea).append(attack1);
			//combat set up. 

	// when you click the attack button, run the following game logic
	$(".combat-attack").on("click", function () {
		// if there is a defender, combat will occur
		//if ($("#defender").children().length !== 0) {
		// creates messages for our attack and our opponents counter attack
		var whateverANJALIwants = $(this).attr("data-type"); 
		console.log(whateverANJALIwants, "Yo");
		var attackMessage = characters[whateverANJALIwants].name + enemyCharacters.Kefka.name + "for" + characters[whateverANJALIwants].moveSet.attack + " damage.";
		var counterAttackMessage = enemyCharacters.Kefka.name + " did " + enemyCharacters.Kefka.attack + " damage.";
		clearMessage();
		
		// Reduce defender's health by your attack value.



		// If the enemey st has health
		if (enemyCharacters.Kefka.health > 0) {
			// Render the enemy's updated character card.
			// updateCharacter(defender, "#defender");
			enemyCharacters.Kefka.health -= characters[whateverANJALIwants].moveSet.attack;

			console.log("kefka");
			console.log(enemyCharacters.Kefka.health);
			// Render the combat messages.
			renderMessage(attackMessage);
			renderMessage(counterAttackMessage);

			// Reduce your attack health by the opponents attack value.
			characters[whateverANJALIwants].health -= enemyCharacters.Kefka.attack;
			console.log(characters[whateverANJALIwants]);
			console.log(characters[whateverANJALIwants].health);
			//render the player's updated character card.
			//updateCharacter(attacker, "#selected-character");


			if (killCount < enemyCharacters.length && enemyCharacters.Kefka.health <= 0) {
				$(enemyCharacters.Kefka).detach();
				$(enemyCharacters.Kafka).show("slow");
				battle1.pause();
				boss1.play();
			}


			// If you have less than zero health the game ends. 
			// We call the restartGame function to allow the user to restart the game and play again.
			if (characters[whateverANJALIwants].health <= 0) {
				clearMessage();
				// restartGame("Game Over");
				window.alert("You ded")
				$(".combat-attack").off("click");
			}
		} else {
			// if the enemy has less than zero health they are defeated
			// remove your opponents character card. 
			// $("#defender").empty();

			var gameStateMessage = "You have defeated " + enemyCharacters.Kefka.name;
			renderMessage(gameStateMessage);

			// Increment your kill count
			killCount++;

			// If you have killed all of your opponents you win
			// Call the restartGame function to allow the user to restart the game and play again
			if (killCount >= enemyCharacters.length) {
				clearMessage();
				$(".combat-attack").off("click");
				//restartGame("You Won");
				window.alert("You won!!!!");

			}
		}
		// Increment turn counter. This is used for determining how much damage the player does.
		// turnCounter++;
		//} else {
		// If there is no defender, render an error message
		//clearMessage();
		//renderMessage("No enemy here");

		//}
	});


	};



	// renders character info to the DOM
	var renderInfo = function (character, renderArea) {
		var charInfoMenu = $("<div class='char-info-menu' data-name='" + character.name + "'>");
		var charNameMenu = $("<div class='character-name-menu'>").text(character.name);
		var charHealth = $("<div class='character-health'>").text(character.health);
		charInfoMenu.append(charNameMenu).append(charHealth);
		$(renderArea).append(charInfoMenu);
	};


	// updates selected character
	function updateCharacter(charObj, areaRender) {
		// $(areaRender).empty();
		console.log(charObj);
		renderCharacter(charObj, areaRender);

	};



	// initiallizes the game
	var initializeGame = function () {
		$("#start-game").click(function () {
			// Loop through the characters object and call the renderCharacter function on each character to render their card
			for (var key in characters) {

				//renderInfo(characters[key], ".character-menu");
				renderCharacter(characters[key], "#team-character-select");
				//intro.play();
				console.log(key);
			};


			//var result = Object.keys(enemyCharacters).map(function (key) {
			//return [Number(key), enemyCharacters[key]];
			for (var key in enemyCharacters) {
				renderEnemy(enemyCharacters[key], "#enemy-section");
				renderInfo(enemyCharacters[key], ".enemy-menu");
				
			};


				
				console.log(key);
	
		}, )
	};



	// function for selecting characters
	$("#team-character-select").on("click", ".character", function () {
		// Saving the clicked character's name.
		dude = $(this).attr("data-name");
		console.log(dude);

		if (charCounter > 0) {
			charCounter = charCounter - 1;
			updateCharacter(characters[dude], "#selected-characters");
			updateCharacter(characters[dude], "#player-section");
			renderInfo(characters[dude], ".character-menu");
			console.log(characters[dude]);
			renderMoveSet(dude, ".moveset-container");
			$(this).hide();
			console.log("this is where I create a button" + characters[dude].name);
			cursor.play();
		} else {
			error.play();
		}
	});

	//function to handle rendering game messages.
	var renderMessage = function (message) {
		// builds the message and appends it to the page 
		var gameMessageSet = $("#game-message");
		var newMessage = $("<div>").text(message);
		gameMessageSet.append(newMessage);
	};

	// function to clear the game message action
	var clearMessage = function () {
		var gameMessage = $("#game-message");

		gameMessage.text("");
	};



	// functions called

	


	initializeGame();




	//-------API----------------------------------------------------------------

	// World Clock API will be used to create a day/night cycle. May change over to one that can adapt local time if that's possible. 


	var timeURL = "https://maps.googleapis.com/maps/api/timezone/json?location=" + latitude + "," + longitude + "&timestamp=1458000000&key=AIzaSyBrACSj3zHNkqz4JO7ypicGFCE-We1aco8";
	$.ajax({
		url: timeURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);

		//$("#currentDateTime").innerHTML(response);
	});


	var locationURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBrACSj3zHNkqz4JO7ypicGFCE-We1aco8";

	$.ajax({
		url: locationURL,
		method: "GET"
	}).then(function (geolocate) {
		console.log(response);

		var longitude = response.location.lng;
		var latitude = response.location.lat;
		$("#currentDateTime").innerHTML(response);

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
			//intro.pause();
			//growl.play();
			//battle1.play();

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