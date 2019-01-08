var socket = io.connect('http://localhost:3000');

var holdButton = $('#hold')
var rollButton = $('#roll-again')
var die1 = new Die('#die1')
var die2 = new Die('#die2')

var passTurn =  function(){
	socket.emit('pass turn');
}

var roll = function(){
	die1.roll();
  die2.roll();
}

var rollDie = function() {
  var die = [1, 2, 3, 4, 5, 6];
  var randomIndex = Math.floor(Math.random() * die.length);
  return die.splice(randomIndex, 1)[0];
}

var activateGameControls = function() {
	holdButton.removeAttr('disabled');
	rollButton.removeAttr('disabled');
}

var disableGameControls = function() {
	holdButton.attr('disabled', 'disabled');
	rollButton.attr('disabled', 'disabled');
}

holdButton.click(function(){
    console.log('clicky click')
	passTurn()
});

rollButton.click(function(){
    roll();
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
