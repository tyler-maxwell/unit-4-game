var game = {

    gameOver: false,
    playerChar: null,
    enemyChar: null,
    killCount: 0,

    characters: [{
                    name: "Luke Skywalker",
                    baseHP: 100,
                    baseAP: 15,
                    CAP: 5,
                    multiplier: 1,
                    currentHP: this.baseHP,
                    currentAP: 15,
                    selected: false,
                    image: "assets/images/luke-skywalker.png"
                },
                {
                    name: "Obi-wan Kenobi",
                    baseHP: 120,
                    baseAP: 8,
                    CAP: 10,
                    multiplier: 1,
                    currentHP: this.baseHP,
                    currentAP: 8,
                    selected: false,
                    image: "assets/images/obiwan-kenobi.jpg"
                },
                {
                    name: "Yoda",
                    baseHP: 150,
                    baseAP: 7,
                    CAP: 20,
                    multiplier: 1,
                    currentHP: this.baseHP,
                    currentAP: 7,
                    selected: false,
                    image: "assets/images/yoda.jpeg"
                },
                {
                    name: "Darth Vader",
                    baseHP: 180,
                    baseAP: 4,
                    CAP: 25,
                    multiplier: 1,
                    currentHP: this.baseHP,
                    currentAP: 4,
                    selected: false,
                    image: "assets/images/darth-vader.jpg"
                }],

    resetGame: function() {
        // Reset global keys
        this.gameOver = false;
        this.playerChar = null,
        this.enemyChar = null,    
        this.killCount = 0;

        // Reset image in player character div
        $("#playerChar").html("");
        $("#playerChar").animate({ opacity: "1" });
        
        // Reset image in enemy character div
        $("#enemyChar").html("");
        $("#enemyChar").animate({ opacity: "1" });


        // Loop through each object in characters[] and resets stats
        for (i = 0; i < this.characters.length; i++) {
            this.characters[i].multiplier = 1;
            this.characters[i].currentHP = this.characters[i].baseHP;
            this.characters[i].currentAP = this.characters[i].baseAP * this.characters[i].multiplier;
            this.characters[i].selected = false; 

            // Restore opacity of images in roster div
            $("#character" + i).animate({ opacity: "1" });
        }
    },

    pickPlayerChar: function(x) {
        // Check if character has already been selected
        this.playerChar = x;
        this.characters[x].selected = true;

        // Lower opacity of character image in roster div
        var string = "#character" + x;
        $(string).animate({ opacity: "0.5" });

        // Place character image in player character div
        string = this.characters[x].image;
        $("#playerChar").html("<img src='" + string + "'/>");

        // Display Name, HP, and AP
        $("#playerName").text(this.characters[x].name);
        $("#playerHP").text("HP: " + this.characters[x].currentHP);
        $("#playerAP").text("AP: " + this.characters[x].currentAP);
    },

    pickEnemyChar: function(x) {
        // Check if character has already been selected AND if current enemy has been defeated
        if (this.enemyChar == null || (this.characters[x].selected == false && this.characters[this.enemyChar].currentHP <= 0)) {

            this.enemyChar = x;
            this.characters[x].selected = true;

            // Lower opacity of character image in roster div
            var string = "#character" + x;
            $(string).animate({ opacity: "0.5" });

            // Place character image in enemy character div
            string = this.characters[x].image;
            $("#enemyChar").html("<img src='" + string + "'/>");
            $("#enemyChar").animate({ opacity: "1" });

            // Display Name, HP, and CAP
            $("#enemyName").text(this.characters[x].name);
            $("#enemyHP").text("HP: " + this.characters[x].currentHP);
            $("#enemyAP").text("AP: " + this.characters[x].CAP);
        }
    },

    pickCharacter: function(x) {
        if (this.playerChar == null) {
            this.pickPlayerChar(x);
        }
        else {
            this.pickEnemyChar(x);
        }
    },

    attack: function() {
        // Subtract player's current AP from enemy's current HP
        this.characters[this.enemyChar].currentHP -= this.characters[this.playerChar].currentAP;
        
        // Update battle-log
        $("#battle-log").prepend("<p>" + this.characters[this.playerChar].name + " attacked " + this.characters[this.enemyChar].name + " for <span style='color:red;'>" + this.characters[this.playerChar].currentAP + "</span> damage!</p>");
        $("#enemyHP").text("HP: " + this.characters[this.enemyChar].currentHP);

        // Update player character's AP
        this.updateAP();

        // Update battle-log
        $("#battle-log").prepend("<p>" + this.characters[this.playerChar].name + "'s AP has increased to <span style='color:blue;'>" + this.characters[this.playerChar].currentAP + "</span>.</p>");
    },

    counterAttack: function() {
        // Subtract enemy's CAP from players current HP
        this.characters[this.playerChar].currentHP -= this.characters[this.enemyChar].CAP;

        // Update battle-log
        $("#battle-log").prepend("<p>" + this.characters[this.enemyChar].name + " counterattacked! " + this.characters[this.playerChar].name + " was dealt <span style='color:red;'>" + this.characters[this.enemyChar].CAP + "</span> damage!</p>");
        $("#playerHP").text("HP: " + this.characters[this.playerChar].currentHP);
    },

    updateAP: function() {
        // Add 1 to player character's multiplier AND recalculate currentAP
        this.characters[this.playerChar].multiplier++;
        this.characters[this.playerChar].currentAP = this.characters[this.playerChar].baseAP * this.characters[this.playerChar].multiplier;
        $("#playerAP").text("AP: " + this.characters[this.playerChar].currentAP);
    },

    playerDeathCheck: function() {
        if (this.characters[this.playerChar].currentHP <= 0) {
            // Lower opacity of image in player character div
            $("#playerChar").animate({ opacity: "0.5" });

            // Update battle-log
            $("#battle-log").prepend("<p style='color:red;'>GAME OVER</p><p style='color:red;'>" + this.characters[this.playerChar].name + " was defeated by " + this.characters[this.enemyChar].name + "!</p>");

            // Set gameOver to true
            this.gameOver = true;

            // Create button to restart game
            $("#controls").append("<button id='restart'>Restart</button>")
            $("#restart").on("click", function() {
                $("#restart").remove();
                $("#battle-log").empty();
                $("#playerHP").text("");
                $("#playerAP").text("");
                $("#enemyHP").text("");
                $("#enemyAP").text("");
                $("#playerName").text("Player Character");
                $("#enemyName").text("Enemy Character");
                game.resetGame();
            });
        }
    },

    enemyDeathCheck: function() {
        if (this.characters[this.enemyChar].currentHP <= 0) {
            // Increase killCount
            this.killCount++;

            // Lower opacity of image in enemy character div
            $("#enemyChar").animate({ opacity: "0.5" });

            // Update battle-log
            $("#battle-log").prepend("<p style='color:red;'>" + this.characters[this.playerChar].name + " defeated " + this.characters[this.enemyChar].name + "!</p>");

            // Check if all enemies have been defeated
            if (this.killCount == (this.characters.length - 1)) {

                // Set gameOver to true
                this.gameOver = true;
                $("#battle-log").prepend("<p style='color:red;'>You win! GAME OVER</p>");

                // Create button to restart game
                $("#controls").append("<button id='restart'>Restart</button>")
                $("#restart").on("click", function() {
                    $("#restart").remove();
                    $("#battle-log").empty();
                    $("#playerHP").text("");
                    $("#playerAP").text("");
                    $("#enemyHP").text("");
                    $("#enemyAP").text("");
                    $("#playerName").text("Player Character");
                    $("#enemyName").text("Enemy Character");
                    game.resetGame();
                });

            }
        }
    },

    fight: function() {
        var kCount = this.killCount;

        // Run only if current enemy has not been defeated AND if player has not been defeated
        if (this.characters[this.enemyChar].currentHP > 0  && this.gameOver == false) {
            this.attack();
            this.enemyDeathCheck()
            if (kCount == this.killCount) {
                this.counterAttack();
                this.playerDeathCheck();
            }
        }
    }
};

window.onload = function() {

    // Starts the game
    game.resetGame();

    // Roster click events
    $("#character0").on("click", function() {
        game.pickCharacter(0);
    });
    $("#character1").on("click", function() {
        game.pickCharacter(1);
    });
    $("#character2").on("click", function() {
        game.pickCharacter(2);
    });
    $("#character3").on("click", function() {
        game.pickCharacter(3);
    });

    // Fight button click event
    $("#fight").on("click", function() {
        game.fight();
    });
};