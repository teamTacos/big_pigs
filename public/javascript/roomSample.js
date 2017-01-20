//var socket = io.connect('http://localhost');
var socket = io.connect('http://big-pigs.herokuapp.com');
var playerList;
var score = 0;

var Roll = function(die1, die2, score) {
    this.die1 = die1;
    this.die2 = die2;
    this.score = score;
};

function byId(player) {
    return player.id === socket.id;
}

function rollDie() {
    var die = [1, 2, 3, 4, 5, 6];
    var randomIndex = Math.floor(Math.random() * die.length);
    return die.splice(randomIndex, 1)[0];
}

function scoreDice(die1, die2) {

}

function joinRoom(name) {
    socket.emit('join game', name)
}

$('form').submit(function(){
    console.log(socket.id);
    var player = playerList.find(byId);
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

socket.on('pass turn', function(){
    console.log('dice passed');
});

$('#joinGame').click(function(){
    name = $('#playerName').val();
    //joinRoom(name);
    socket.emit('join game', name);
    $('.overlay').hide();
});

$('#play-again').click(function(){
   name = $('#playerName2').val();
    joinRoom(name)
    $('.overlay').hide();
});

socket.on('dice rolled', function(turn){
    console.log('did they roll?');
    console.log({turn});
    $('#die1').removeAttr('class');
    $('#die2').removeAttr('class');
    $('#die1').addClass('die die-' + turn.roll.die1);
    $('#die2').addClass('die die-' + turn.roll.die2);
    $('#current-score').text(turn.roll.score);
    console.log(turn.player.name);
    if((turn.player.score + turn.roll.score) >= 100) {
        $('#winner').append('<span>Winner: </span><span>' + turn.player.name + '!</span>');
        $('#playerName').attr('value', playerList.find(byId).name);
        $('#game-over').show();
    }
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

$('#hold').click(function() {
    socket.emit('pass turn', score);
    score = 0;
});

$('#roll-again').click(function() {
    console.log('roll the bones');
    var die1 = rollDie();
    var die2 = rollDie();

    if(die1 === 1 && die2 === 1) {
        console.log('both ones');
        score = 25;
        socket.emit('pass turn', score);
    } else if(die1 === 1 || die2 === 1) {
        console.log('only 1 one');
        score = 0;
        socket.emit('pass turn', score);
    } else if(die1 === die2) {
        console.log('doubles');
        score += (die1 + die2)*2
    } else {
        console.log('rolly pollys');
        score += (die1 + die2);
    }

    currentRoll = new Roll(die1, die2, score);
    socket.emit('dice roll', {player: playerList.find(byId), roll: currentRoll});
    console.log({die1});
    console.log({die2});

    // turn = scoreDice(die1, die2);
    // score += (die1 + die2);
    // console.log(score);
});
