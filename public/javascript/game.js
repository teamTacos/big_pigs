var socket = io.connect('http://localhost:3000');

var holdButton = $('#hold')
var rollButton = $('#roll-again')

var passTurn =  function(){
	socket.emit('pass turn');
}

var roll = function(){
	//alert('they see me rollin');
  return 5;
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
