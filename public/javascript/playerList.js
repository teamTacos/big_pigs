var socket = io();

var playerList = {

    joinGameModal: $('.overlay'),
    joinButton: $('#joinGame'),
    players: $('#player-list'),
    playerName: $('#playerName'),
    listItem: '<li class="list-group-item"></li>',
    playerName: '<h4 class="name"></h4>',
    playerScore: '<span class="badge"></span>',

    clearPlayerList: function() {
        playerList.players.empty();
    },
    populatePlayerList: function(players) {
        playerList.clearPlayerList();
        for(x in players) {
            var player;
            if (players[x].turn === true ) {

            } else {
                
            }
            playerList.players.append(player)
        }
    }


};