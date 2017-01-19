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
  console.log(currentPlayer);
  if(!currentPlayer) { gameTurn.passTurn }
  if(socket.id != currentPlayer.id) {
    console.log('not my turn');
    $('#hold').attr('disabled', 'disabled');
    $('#roll-again').attr('disabled', 'disabled');
  } else {
    console.log('my turn');
    $('#hold').removeAttr('disabled');
    $('#roll-again').removeAttr('disabled');
  }


});
