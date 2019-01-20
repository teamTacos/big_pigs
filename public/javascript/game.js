//var socket = io.connect(window.location.hostname+':80');
var socket = io();

var $holdButton = $('#hold')
var $rollButton = $('#roll-again')
var die1 = new Die('#die1')
var die2 = new Die('#die2')
var $currentScore = $('#current-score')
var currentScoreValue = 0
var $gameMessage = $('#game-message-text')
var $gameMessageDialog = $('#game-message')
var $closeGameMessage = $('#close-message')

var passTurn =  function(){
  socket.emit('pass turn', currentScoreValue);
  currentScoreValue = 0;
  $currentScore.text(currentScoreValue);
}

var roll = function(){
	die1.roll();
  die2.roll();
  return({die1: die1, die2: die2});
}

var rollDie = function() {
  var die = [1, 2, 3, 4, 5, 6];
  var randomIndex = Math.floor(Math.random() * die.length);
  return die.splice(randomIndex, 1)[0];
}

var activateGameControls = function() {
	$holdButton.removeAttr('disabled');
	$rollButton.removeAttr('disabled');
}

var disableGameControls = function() {
	$holdButton.attr('disabled', 'disabled');
	$rollButton.attr('disabled', 'disabled');
}

var evaluateRoll = function(roll){
  var message = '';
  if(roll.die1.value == 1 && roll.die2.value ==1) {
    console.log('snake eyes');
    message = 'SNAKE EYES ... +25 pts and lose your turn'
    $gameMessage.text(message)
    $gameMessageDialog.show();
    currentScoreValue = 25;
    passTurn()
  } else if(roll.die1.value == 1 || roll.die2.value == 1) {
    console.log('lose your turn');
    message = 'You rolled a 1. Your turn is over'
    $gameMessage.text(message)
    $gameMessageDialog.show();
    currentScoreValue = 0;
    passTurn()
  } else if(roll.die1.value == roll.die2.value) {
    console.log('double points');
    message = 'DOUBLES!! Double points!!'
    $gameMessage.text(message)
    $gameMessageDialog.show();
    currentScoreValue = currentScoreValue + (roll.die1.value*2) + (roll.die2.value*2);
  } else {
    console.log('add em up');
    message = ''
    currentScoreValue = currentScoreValue + roll.die1.value + roll.die2.value;
  }
  $currentScore.text(currentScoreValue)
}

$closeGameMessage.click(function(){
  $gameMessageDialog.hide();
})

$holdButton.click(function(){
	passTurn()
});

$rollButton.click(function(){
  rollResult = roll()
  socket.emit('dice roll', rollResult);
  evaluateRoll(rollResult);
});

var updateDieView = function(die) {
  var $die = $(die.target);
  $die.removeClass();
  $die.addClass('die die-' + die.value)
}

socket.on('dice rolled', function(roll){
  console.log(roll);
  console.log(roll.die1);
  updateDieView(roll.die1);
  updateDieView(roll.die2);
});

socket.on('player list', function(players){
  var currentPlayer;
  players.forEach(function(player) {
    if (player.turn == true) {
      currentPlayer = player;
    }
  });
  if(!currentPlayer) { passTurn() }

  players.forEach(function(player) {
    if (socket.id == currentPlayer.id) {
    	console.log('my turn')
      activateGameControls();
    } else {
    	console.log('not your turn')
    	disableGameControls();
    }
  });
});  
