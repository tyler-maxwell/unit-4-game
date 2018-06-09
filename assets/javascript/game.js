var game = {

    gameOver: false,
    playerChar: null,
    enemyChar: null,
    killCount: 0,

    characters: [{
                    name: "Luke Skywalker",
                    baseHP: 150,
                    baseAP: 5,
                    CAP: 15,
                    multiplier: 1,
                    currentHP: this.baseHP,
                    currentAP: this.baseAP * this.multiplier,
                    selected: false,
                    image: ""
                },
                {
                    name: "Obi-wan Kenobi",
                    baseHP: 200,
                    baseAP: 7,
                    CAP: 20,
                    multiplier: 1,
                    currentHP: this.baseHP,
                    currentAP: this.baseAP * this.multiplier,
                    selected: false,
                    image: ""
                },
                {
                    name: "Yoda",
                    baseHP: 250,
                    baseAP: 8,
                    CAP: 25,
                    multiplier: 1,
                    currentHP: this.baseHP,
                    currentAP: this.baseAP * this.multiplier,
                    selected: false,
                    image: ""
                },
                {
                    name: "Darth Vader",
                    baseHP: 300,
                    baseAP: 10,
                    CAP: 30,
                    multiplier: 1,
                    currentHP: this.baseHP,
                    currentAP: this.baseAP * this.multiplier,
                    selected: false,
                    image: ""
                }],

    resetGame: function() {
        // Reset global keys
        this.gameOver = false;
        this.playerChar = null,
        this.enemyChar = null,    
        this.killCount = 0;

        // Reset image in player character div
        $("#playerChar").html("");
        
        // Reset image in enemy character div
        $("#enemyChar").html("");

        // Loop through each object in characters[] and resets stats
        for (i = 0; i < this.characters.length; i++) {
            this.characters[i].multiplier = 1;
            this.characters[i].currentHP = baseHP;
            this.characters[i].selected = false; 

            // Restore opacity of images in roster div
            var string = "#character" + i;
            $(string).animate({ opacity: "1" });
        }
    },

    pickPlayerChar: function(x) {
        // Check if character has already been selected
        if (this.characters[x].selected = false) {

            this.playerChar = x;
            this.characters[x].selected = true;

            // Lower opacity of character image in roster div
            var string = "#character" + x;
            $(string).animate({ opacity: "0.5" });

            // Place character image in player character div
            string = this.characters[x].image;
            $("#playerChar").html("<img src='" + string + "'/>");
        }
    },

    pickEnemyChar: function(x) {
        // Check if character has already been selected AND if current enemy has been defeated
        if (this.characters[x].selected = false && this.characters[this.enemyChar].currentHP <= 0) {

            this.enemyChar = x;
            this.characters[x].selected = true;

            // Lower opacity of character image in roster div
            var string = "#character" + x;
            $(string).animate({ opacity: "0.5" });

            // Place character image in enemy character div
            string = this.characters[x].image;
            $("#enemyChar").html("<img src='" + string + "'/>");
        }
    },

    attack: function() {
        // Subtract player's current AP from enemy's current HP
        this.characters[this.enemyChar].currentHP -= this.characters[this.playerChar].currentAP;
        
        // Update battle-log
        $("#battle-log").append("<p>" + this.characters[this.playerChar].name + " attacked " + this.characters[this.enemyChar].name + " for <span style='color:red;'>" + this.characters[this.playerChar].currentAP + "</span> damage!</p>");

        // Add 1 to player character's multiplier
        this.characters[this.playerChar].multiplier++;

        // Update battle-log
        $("#battle-log").append("<p>" + this.characters[this.playerChar].name + "'s AP has increased to <span style='color:blue;'>" + this.characters[this.playerChar].currentAP + "</span>.</p>");
    },

    counterAttack: function() {
        // Subtract enemy's CAP from players current HP
        this.characters[this.playerChar].currentHP -= this.characters[this.enemyChar].CAP;

        // Update battle-log
        $("#battle-log").append("<p>" + this.characters[this.enemyChar].name + " counterattacked! " + this.characters[this.playerChar0.name] + " was dealt <span style='color:red;'>" + this.characters[this.enemyChar].CAP + "</span> damage!</p>");
    },

    deathCheck: function() {
        if (this.characters[this.playerChar].currentHP <= 0) {
            // Lower opacity of image in player character div
            $("#playerChar").animate({ opacity: "0.5" });

            // Update battle-log
            $("#battle-log").append("<p style='color:red;'>" + this.characters[this.playerChar].name + " was killed by " + this.characters[this.enemyChar].name + "!</p><br/><p style='color:red;'>GAME OVER</p>");

            // Set gameOver to true
            this.gameOver = true;
        }
        if (this.characters[this.enemyChar].currentHP <= 0) {
            // Increase killCount
            this.killCount++;

            // Lower opacity of image in enemy character div
            $("#enemyChar").animate({ opacity: "0.5" });

            // Update battle-log
            $("#battle-log").append("<p style='color:red;'>" + this.characters[this.playerChar].name + " defeated " + this.characters[this.enemyChar].name + "!</p>");

            // Check if all enemies have been defeated
            if (this.killCount == (this.characters.length - 1)) {

                // Set gameOver to true
                this.gameOver = true;
            }
        }
    }
}