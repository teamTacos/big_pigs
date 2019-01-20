var socket = io.connect(window.location.hostname+':443', {transports: ['websocket']});
// var socket = io.connect('big-pigs:server');
var playerList;

function byId(player) {
    return player.id === socket.id;
}

var Message = function(player) {
	this.player = player,
	this.text = ''
}

$('form').submit(function(){
    console.log(socket.id);
    var player = playerList.find(byId);
    message = new Message(player);
    message.text = $('#m').val();
    socket.emit('chat message', message);
    $('#m').val('');
    return false;
});

socket.on('chat message', function(msg){
    $('#messages').append($('<li><strong>' + msg.player.name + ':</strong> ' + msg.text + '</li>'));
    $('.chat-list-container').animate({
        scrollTop: $('#messages li:last-child').offset().top + 'px'
    }, 1000);
});

socket.on('player list', function(players){
    $('#player-list').empty();
    playerList = players;
    players.forEach(function(player){
       if (player.turn === true) {
           $('#player-list').append('<li class="list-group-item active"><h4 class="name">' + player.name + '</h4><span class="badge">' + player.score + '</span></li>')
       } else {
           $('#player-list').append('<li class="list-group-item"><h4 class="name">' + player.name + '</h4><span class="badge">' + player.score + '</span></li>')
       }
    });
});

$('#joinGame').click(function(){
    name = $('#playerName').val();
    //joinRoom(name);
    socket.emit('join game', name);
    $('.overlay').hide();
});
