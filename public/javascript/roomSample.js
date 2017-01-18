var socket = io();
var playerList;

function playerName(player) {
    return player.id === socket.id;
}

$('form').submit(function(){
    console.log(socket.id);
    var player = playerList.find(playerName);
    socket.emit('chat message', player.name + ': ' + $('#m').val());
    $('#m').val('');
    return false;
});

socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    $('.chat-list-container').animate({
        scrollTop: $('#messages li:last-child').offset().top + 'px'
    }, 1000);
});

$('#joinGame').click(function(){
    name = $('#playerName').val();
    socket.emit('join game', name);
    $('.overlay').hide();
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
    // for(x in players) {
    //     var player;
    //     if (players[x].turn === true ) {
    //         player = '<li class="list-group-item active"><h4 class="name">' + players[x].name + '</h4><span class="badge">' + players[x].score + '</span></li>';
    //     } else {
    //         player = '<li class="list-group-item"><h4 class="name">' + players[x].name + '</h4><span class="badge">' + players[x].score + '</span></li>';
    //     }
    //     //player.add('');
    //     $('#player-list').append(player);
    // }
    //alert(socket.id);
});

$('#hold').click(function() {
    score = 5;
    socket.emit('pass turn', score);
});

