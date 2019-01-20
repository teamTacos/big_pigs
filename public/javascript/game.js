var socket = io.connect(window.location.hostname+':'+window.location.port);

var $holdButton = $('#hold')
var $rollButton = $('#roll-again')
var die1 = new Die('#die1')
var die2 = new Die('#die2')
var $currentScore = $('#current-score')
var currentScoreValue = 0

var passTurn =  function(){
	socket.emit('pass turn');
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

$holdButton.click(function(){
	passTurn()
});

$rollButton.click(function(){
    socket.emit('dice roll', roll());
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

  currentScoreValue = currentScoreValue + roll.die1.value + roll.die2.value;
  $currentScore.text(currentScoreValue)
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
