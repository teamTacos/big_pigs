var socket = io();


var gameTurn = {
  holdButton: $('#hold'),
  rollButton: $('#roll-again'),

  passTurn: function(){
    socket.emit('pass turn');
  },
  roll: function(){

  }

};

//gameTurn.click(passTurn());
socket.on('player list', function(players){
  //alert('socket: ' + socket.id);
  var currentPlayer;

  players.forEach(function(player) {
    if (player.turn == true) {
      currentPlayer = player;
    }
  });
  if(socket.id != currentPlayer.id) {
    gameTurn.holdButton.disabled = true;
    gameTurn.rollButton.disabled = true;
  } else {
    gameTurn.holdButton.disabled = false;
    gameTurn.rollButton.disabled = false;
  }


});
