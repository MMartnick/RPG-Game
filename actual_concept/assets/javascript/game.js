// Executes when the DOM is fully loaded

// sets difficulty

var userInput = 1;
var text;

function difficulty() {
	userInput,
	text;
	userInput = document.getElementById("number").value;
	if (isNaN(userInput) || userInput < 1 || userInput > 10) {
		text = "Input not valid";
	} else {
		text = "Input OK";
	}
	document.getElementById("test").innerHTML = text;

	return userInput;
};

var lat;
var lon;
var x = document.getElementById("demo");


//-----Geolocation API----------------------------------------------------------------
function getLocation() {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);



	} else {
		//x.innerHTML = "Geolocation is not supported by this browser.";
	}



};

function showPosition(position) {
	x /*.innerHTML*/ = /*"Latitude: " + */ position.coords.latitude +
		/*"<br>Longitude: " + */
		position.coords.longitude;

	lat = Math.ceil(position.coords.latitude);
	lon = Math.ceil(position.coords.longitude);
	console.log(lat);
	console.log(lon);
};


//-----------------------------------------------------------------------


$(document).ready(function () {

	var characters = {

		// Kain is the model that all character objects will be based on
		// once his stats and moveset are functioning the rest will adapt 
		// the same set up with variations 
		"Kain": {
			name: "Kain",
			health: 142,
			strength: 12,
			imageUrl: "assets/images/kainSml.png",
			moveSet: {
				attack: 12,
				heal: 26,
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
			attack: 16,
			imageUrl: "assets/images/cloudSml.png",
			moveSet: {
				attack: 5,
				heal: 21,
				jump: 16,
				skill: {
					braver: 20,
					crossSlash: 27
				},
				defend: 0,
			}
		},

		"Ace": {
			name: "Ace",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/aceSml.png",
			enemyAttackBack: 15,
			moveSet: {
				attack: 18,
				heal: 25,
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
			attack: 18,
			imageUrl: "assets/images/golbezSml.png",
			moveSet: {
				attack: 18,
				heal: 22,
				jump: 16,
				skill: {
					lancet: 20,
					tornado: 27
				},
				defend: 0,
			}
		},

		"Locke": {
			name: "Locke",
			health: 142,
			strength: 12,
			imageUrl: "assets/images/lockeSml.png",
			moveSet: {
				attack: 12,
				heal: 26,
				jump: 16,
				skill: {
					lancet: 20,
					tornado: 27
				},
				defend: 0,
			}
		},

		"Vivi": {
			name: "Vivi",
			health: 120,
			attack: 16,
			imageUrl: "assets/images/viviSml.png",
			moveSet: {
				attack: 5,
				heal: 21,
				jump: 16,
				skill: {
					braver: 20,
					crossSlash: 27
				},
				defend: 0,
			}
		},

		"Lulu": {
			name: "Lulu",
			health: 140,
			attack: 16,
			imageUrl: "assets/images/luluSml.png",
			enemyAttackBack: 15,
			moveSet: {
				attack: 18,
				heal: 25,
				jump: 16,
				skill: {
					lancet: 20,
					tornado: 27
				},
				defend: 0,
			}
		},

		"Wol": {
			name: "Wol",
			health: 130,
			attack: 18,
			imageUrl: "assets/images/wolSml.png",
			moveSet: {
				attack: 18,
				heal: 22,
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
		"knight": {
			name: "Knight",
			health: 173,
			attack: 13,
			imageUrl: "assets/images/knight.gif",
		},


		"spiderhouse": {
			name: "Ultimecia",
			health: 310,
			attack: 30,
			imageUrl: "assets/images/ultimecia.png",
		},

		"diablo": { // Austin
			name: "Diablo",
			health: 260,
			attack: 29,
			imageUrl: "assets/images/diablo.gif",
		},

		"ultimecia": { // Seoul
			name: "Ultimecia",
			health: 310,
			attack: 30,
			imageUrl: "assets/images/ultimecia.png",
		},

		"dragon": { // NYC
			name: "Dragon",
			health: 302,
			attack: 30,
			imageUrl: "assets/images/diablo.gif",
		},


		"kefka": { // Pittsburg
			name: "Kefka",
			health: 400,
			attack: 35,
			imageUrl: "assets/images/diablo.gif",
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
	var charCounter = 2;
	var killCount = 0;
	var enemySelected;
	var combatToggle;
	var selectToggle;
	var startToggle;
	var currentEnemy;
	var temperature;
	var charHealth;


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
	$("#character-select-screen").hide();
	$("#combat-arena").hide();
	$("#char-select").hide();
	$(".reset").hide();


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


	// renders all enemies to the DOM
	var renderEnemy = function (character, renderArea) {
		// this block of code builds the character card, and renders it to the page.
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		// var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
		charDiv /*.append(charName)*/ .append(charImage); //.append(charHealth);
		$(renderArea).append(charDiv);
	};


	// renders character moveSet to the DOM
	var renderMoveSet = function (character, renderArea) {
		var attack1 = $("<button>");
		//class='combat-attack'  data-type='"+character+"'>");
		attack1.addClass("combat-attack");
		attack1.attr("data-type", character);
		attack1.text(character);
		// variable for testing to see that the character data renders a distinct button
		var attackData = attack1.attr("data-type");
		console.log(attackData);

		$(renderArea).append(attack1);

		// cure button render
		var heal1 = $("<button>");
		heal1.addClass("combat-heal");
		heal1.attr("data-heal", character);
		heal1.text("Cure");
		// variable for testing to see that the character data renders a distinct button
		var healData = heal1.attr("data-heal");
		console.log(healData);

		$(renderArea).append(heal1);

	};

	// renders character info to the DOM
	var renderInfo = function (character, renderArea) {
		var charInfoMenu = $("<div class='char-info-menu' data-name='" + character.name + "'>");
		var charNameMenu = $("<div class='character-name-menu'>").text(character.name);
		charInfoMenu.append(charNameMenu);
		$(renderArea).append(charInfoMenu);
	};

	// updates selected character
	function updateCharacter(charObj, areaRender) {
		// $(areaRender).empty();
		console.log(charObj);
		renderCharacter(charObj, areaRender);

	};

	var getEnemy = function (latitude, longitude) {


		if ((latitude == 60.295502) && (longitude == -97.7417479)) {
			renderEnemy(enemyCharacters.spiderhouse, "#enemy-section");
			renderInfo(enemyCharacters.spiderhouse, ".enemy-menu");
			currentEnemy = enemyCharacters.spiderhouse;

		} else if ((latitude == 31) && (longitude == -97)) {
			renderEnemy(enemyCharacters.diablo, "#enemy-section");
			renderInfo(enemyCharacters.diablo, ".enemy-menu");
			currentEnemy = enemyCharacters.diablo;

		} else if ((latitude == 38) && (longitude == -127)) {
			renderEnemy(enemyCharacters.ultimecia, "#enemy-section");
			renderInfo(enemyCharacters.ultimecia, ".enemy-menu");
			currentEnemy = enemyCharacters.ultimecia;

		} else if ((latitude == 40) && (longitude == -80)) {
			renderEnemy(enemyCharacters.kefka, "#enemy-section");
			renderInfo(enemyCharacters.kefka, ".enemy-menu");
			currentEnemy = enemyCharacters.kefka;

		} else if ((latitude == 41) && (longitude == -74)) {
			renderEnemy(enemyCharacters.dragon, "#enemy-section");
			renderInfo(enemyCharacters.dragon, ".enemy-menu");
			currentEnemy = enemyCharacters.dragon;

		} else {
			renderEnemy(enemyCharacters.knight, "#enemy-section");
			renderInfo(enemyCharacters.knight, ".enemy-menu");
			currentEnemy = enemyCharacters.knight;
		}

		return currentEnemy;
		console.log(currentEnemy);
	};

	var background = function (temperature) {

		if (temperature >= 299) {
			document.getElementById("combat-arena").style.backgroundImage = "url(assets/images/desert.png)";

		} else if (temperature <= 275) {
			document.getElementById("combat-arena").style.backgroundImage = "url(assets/images/snow.png)";

		} else {
			document.getElementById("combat-arena").style.backgroundImage = "url(assets/images/day.png)";
		}

	};

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

	var initializeGame = function () {
		$("#start-game").click(function () {

			Math.ceil(lat);
			Math.ceil(lon);
			console.log(lat);
			enemySelected = getEnemy(lat, lon);
			console.log(lat);


			console.log(enemySelected);
			console.log(enemySelected.health);
			// Loop through the characters object and call the renderCharacter function on each character to render their card
			for (var key in characters) {
				//renderInfo(characters[key], ".character-menu");
				renderCharacter(characters[key], "#team-character-select");
				intro.play();
				console.log(key);
			};
		});
	};

	// initiallizes the game
	initializeGame();

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
			$("#char-select").show();
			console.log("this is where I create a button" + characters[dude].name);
			cursor.play();
		} else {
			error.play();
		}
	});



	// Homepage begins on start screen with following screens hidden.
	// this section is designated for those hidden sections and creates initial 
	// function for section progression.

	$("#start-game").click(function () {

		var APIKey = "166a433c57516f51dfab1f7edaed8413";

		// Here we are building the URL we need to query the database
		var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
		console.log(lat);
		// Here we run our AJAX call to the OpenWeatherMap API
		$.ajax({
				url: weatherURL,
				method: "GET"
			})
			// We store all of the retrieved data inside of an object called "response"
			.then(function (response) {

				// Log the queryURL
				console.log(weatherURL);

				// Log the resulting object	
				console.log(response);

				// Transfer content to HTML
				//$(".city").html("<h1>" + response.name + " Weather Details</h1>");
				//$(".wind").text("Wind Speed: " + response.wind.speed);
				//$(".humidity").text("Humidity: " + response.main.humidity);
				//$(".temp").text("Temperature (F) " + response.main.temp);

				// Log the data in the console as well


				console.log(response.name);
				console.log("Wind Speed: " + response.wind.speed);
				console.log("Humidity: " + response.main.humidity);
				console.log("Temperature (F): " + response.main.temp);

				temperature = response.main.temp;
				console.log(temperature);
			});

		//-----Frame Transitions for content area-----------------------------------

		if (startToggle) {
			startToggle.appendTo("body");
			startToggle = null;
		} else {
			startToggle = $("#game-start-screen").detach();
			$("#character-select-screen").show("slow");
		}
	});

	// Once characters are selected .click function proceeds to combat screen and detachs character select screen


	$("#char-select").click(function () {

		//document.getElementsByClassName(".character-combat").classList.remove(".character");
		//document.getElementsByClassName(".character").classList.add(".character-combat");

		if (selectToggle) {
			selectToggle.appendTo("body");
			selectToggle = null;
		} else {
			selectToggle = $("#character-select-screen").detach();
			$("#combat-arena").show("slow");
			var kay = document.getElementById("combat-arena").style.backgroundImage;
			console.log(kay);
			background(temperature);

			$(".character-name").hide();
			intro.pause();
			growl.play();
			battle1.play();

		}
	});


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


	// function to clear the game message action
	var clearHealth = function () {
		var gameMessage = $(".character-name-menu");
		gameMessage.text("");
	};

	// when you click the attack button, run the following game logic
	$(".moveset-container").on("click", ".combat-attack", function () {
		console.log(enemySelected.health);
		clearHealth();
		// sets enemy level
		var enemyAttackLevel = enemySelected.attack + ((userInput + 1) * 2);

		var playerName = $(this).attr("data-type");
		console.log(playerName, "Yo");
		// creates messages for our attack and our opponents counter attack
		var attackMessage = characters[playerName].name + " hit " + enemySelected.name + " for " + characters[playerName].moveSet.attack + " damage.";
		var counterAttackMessage = enemySelected.name + " did " + enemyAttackLevel + " damage.";
		console.log(enemySelected);
		clearMessage();

		// Reduce defender's health by your attack value.

		// If the enemey st has health
		if (enemySelected.health > 0) {
			// Render the enemy's updated character card.
			// updateCharacter(defender, "#defender");
			enemySelected.health -= characters[playerName].moveSet.attack;

			console.log(enemySelected.health);
			// Render the combat messages.
			renderMessage(attackMessage);
			renderMessage(counterAttackMessage);

			// Reduce your attack health by the opponents attack value.
			characters[playerName].health -= enemyAttackLevel;
			console.log(characters[playerName]);
			console.log(characters[playerName].health);

			var charHealth = $("<div class>").text(characters[playerName].health);
			$(".character-name-menu").append(charHealth);

			//function to handle rendering game messages.
			var renderHealth = function (message) {
				// builds the message and appends it to the page 
				var gameMessageSet = $(".character-health");
				var newMessage = $("<div>").text(message);
				gameMessageSet.append(newMessage);
			};



			var enemyHealth = $("<div class='enemy-health'>").text(enemySelected.health);

			// For an ongoing string of enemies, future use
			/*if (killCount < enemyCharacters.length && enemySelected.health <= 0) {
				$(enemySelected).detach();
				$(enemySelected).show("slow");
				battle1.pause();
				boss1.play();
			}*/


			// If you have less than zero health the game ends. 
			// We call the restartGame function to allow the user to restart the game and play again.
			if (characters[playerName].health <= 0) {
				clearMessage();

				var gameStateMessage = " You have been defeated by " + enemySelected.name;
				renderMessage(gameStateMessage);

				$(".combat-attack").off("click");
				$(".reset").show().on("click", function () {
					location.reload();
				});
			}
		} else {
			// if the enemy has less than zero health they are defeated
			// remove your opponents character card. 

			(enemySelected.health <= 0)
			var gameStateMessage = " You have defeated " + enemySelected.name;
			renderMessage(gameStateMessage);
			$(".combat-attack").off("click");


			$(".reset").show().on("click", function () {
				location.reload();
			});

			// Increment your kill count
			killCount++;

			// If you have killed all of your opponents you win
			// Call the restartGame function to allow the user to restart the game and play again
			if (killCount >= enemyCharacters.length) {
				clearMessage();


			}
		}

		//clearMessage();

	});


	// Cure button actions
	$(".moveset-container").on("click", ".combat-heal", function () {
		var playerName = $(this).attr("data-heal");
		console.log(playerName, "Yo");
		// creates messages for our attack and our opponents counter attack
		var attackMessage = characters[playerName].name + "gained" + characters[playerName].moveSet.heal + " HP.";
		var healUp = characters[playerName].moveSet.heal + characters[playerName].health;
		console.log(healUp);
		//clearMessage();
	});



});