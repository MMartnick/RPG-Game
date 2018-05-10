var characters = {
    "Guy1": {
            name: "Guy1",
            health: 120,
            attack: 8
        },

        "Guy2": {
            name: "Guy2",
            health: 120,
            attack: 8
        },

        "Guy3": {
            name: "Guy3",
            health: 120,
            attack: 8
        },
};

var attacker1 = document.getElementById("#attacker-one");
var attacker2 = document.getElementById("#attacker-two");
var party = [attacker1, attacker2 ]; // 2
var unUsed = [];

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

var initializeGame = function () {
    $("#start-game").click(function () {
        // Loop through the characters object and call the renderCharacter function on each character to render their card
        for (var key in characters) {
            renderCharacter(characters[key], "#team-character-select");
        }
    }, )
};


initializeGame();



$(".character").click(function () {
    party.push(".character");
    document.getElementById("#selected-characters").innerHTML = party;
    console.log(party);
});

console.log(party);

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

