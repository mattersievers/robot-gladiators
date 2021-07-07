//This function simulates fighting a robot.
var fight = function (enemy) {
  while (playerInfo.health > 0 && enemy.health> 0) {
    //Alert players that they are starting the round
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP'to choose.");
    
    //if player choses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
        //Confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        //if yes (true), leave fight
        if(confirmSkip) {
          window.alert(playerInfo.name + " has chosen to skip this fight. Goodbye!");
          // subtract money from playerInfo.money for skipping
          playerInfo.money = Math.max(0, playerInfo.money - 10);
          console.log("playerInfo.money", playerInfo.money);
          break;
          }
    }    
        
      //Subtract the value of random 'damage' generated from the `playerInfo.attack` attribute from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
      enemy.health= Math.max(0, enemy.health- damage);
    
      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerInfo.name + " attacked " + enemy.name + " . " + enemy.name + " now has " + enemy.health+ " health remaining."
      );
    
      //check enemy's health
      if (enemy.health<= 0) {
      window.alert(enemy.name + " has died!");
      break;
      }
      else {
        window.alert(enemy.name + " still has " + enemy.health+" health left.");
      }
   
      // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
      var damage = randomNumber(enemy.attack-3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);
   
      // Log a resulting message to the console so we know that it worked.
      console.log(
      enemy.name + " attacked " + playerInfo.name + " . " + playerInfo.name + " now has " + playerInfo.health + " health remaining." 
      );

      //Check player health
      if(playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
      }
      else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
  };

//Starts fight with enemy robot and offers shop option
var startGame = function () {
  //Reset player stats
  playerInfo.reset();

  for (var i=0; i < enemyInfo.length; i++){
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round" + (i+1) );
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40,60);
      fight(pickedEnemyObj);
      
      //Player is still alive and still has enemy's left to fight
      if(playerInfo.health > 0 && i < enemyInfo.length -1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, take them to the store
        if (storeConfirm) {
          shop();
        }
      }
    }
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  endGame();
};

//Displays after player beats all robots or dies.
var endGame = function () {
  //If player is alive, they win
  if (playerInfo.health > 0) {
    window.alert ("Great Job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  //If dead, then they lost
  else {
    window.alert("You've lost your robot in battle.");
  }
  
  var playAgainConfirm = window.confirm ("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  }
  else{
    window.alert("Thank you for playing Robot Gladiators! Come back soon!")
  }
};

//The shop option after each round
var shop = function() {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  )

  switch(shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;
    
    case "UPGRADE": 
    case "upgrade":
      playerInfo.upgradeAttack();
      break;

    case "LEAVE":  
    case "leave":
      window.alert("leaving the store.");
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;  
  }
};

//Random number generator
var randomNumber = function (min,max){
  var value = Math.floor(Math.random()*(max - min + 1) + min);
  
  return value;
};

//Rejects blank and null/cancel options.
var getPlayerName = function() {
  var name="";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
};

//Player stats
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function(){
    if (this.money >=7) {
      window.alert("Refilling player's health by 20 for 7 dollars.")
      this.health +=20;
      this.money -= 7;
    }
    else{
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if(this.money >=7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.")
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!")
    }
  }
};
  
//Enemy stats
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14) 
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }  
];
  
  

startGame();