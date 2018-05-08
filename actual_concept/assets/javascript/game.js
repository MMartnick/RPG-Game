// Executes when the DOM is fully loaded
$(document).ready(function () {


var playerCharacters = {
	"Kain Highwind": {
		name: "Kain Highwind",
		health: 120,
		attack: 8,
		imageUrl:"../images/kainSml.png",
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
		imageUrl:"../images/gilgSml.png",
		enemyAttackBack: 15
	},

	"Golbez": {
		name: "Golbez",
		health: 120,
		attack: 8,
		imageUrl:"../images/golbezSml.png",
		enemyAttackBack: 15
	},

};

var enemyCharacters = {
	"Kain Highwind": {
		name: "Kain Highwind",
		health: 120,
		attack: 8,
		imageUrl:"../images/kainEnemy.png",
		enemyAttackBack: 15
	},

	"Cloud Strife": {
		name: "Cloud Strife",
		health: 120,
		attack: 8,
		imageUrl: "../images/cloudEnemy.png",
		enemyAttackBack: 15
	},

	"Gilgamesh": {
		name: "Gilgamesh",
		health: 120,
		attack: 8,
		imageUrl:"../images/gilgEnemy.png",
		enemyAttackBack: 15
	},

	"Golbez": {
		name: "Golbez",
		health: 120,
		attack: 8,
		imageUrl:"../images/golbezEnemy.png",
		enemyAttackBack: 15
	},

};

// will be populated when player selects a character team
var attacker1;
var attacker2;
var attacker3;
var attacker4;



// World Clock API will be used to create a day/night cycle. May change over to one that can adapt local time if that's possible. 
// Will see what can be done in conjunction with googlemaps
 var timeURL = "http://worldclockapi.com/api/json/utc/now";

 $.ajax({
	url: timeURL,
	method: "GET"
  }).then(function(response) {
	$("#currentDateTime").text(JSON.stringify(response));
	console.log(response);
  });
//----------------------------------------------------------------------------

	// Homepage begins on start screen with following screens hidden.
	// this section is designated for those hidden sections and creates initial 
	// function for section progression.

	$("#game-start-screen").hide();
	$("#team-character-select").show();
	$("#combat-arena").hide();


	$("#game-start-screen").click(function () {
		$(this).toggleClass("off");
	});
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

	$("#team-character-select").click(function () {
		$(this).toggleClass("off");
	});
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

	$("#combat-arena").click(function () {
		$(this).toggleClass("off");
	});
	var combatToggle;
	$("#end-match").click(function () {
		if (combatToggle) {
			combatToggle.appendTo("body");
			combatToggle = null;
		} else {
			combatToggle = $("#combat-arena").detach();
			$("#game-start-screen").show();
		}
	});

});

//------------------------------------------------------------------------------------

