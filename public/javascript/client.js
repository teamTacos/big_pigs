$(document).ready(function (){
    $('#createGame').click(function() {
        var playerName = $('#gameName').val();
        var gameName = $('#gameName').val();
        socket.emit('joinSocketServer', {name: playerName});
        socket.emit('createRoom', gameName);
        joinRoom(gameName, playerName);
    });
    $('#games').on('click', '.available-game',function() {
        //alert(this.firstChild.text);
        $('#roomName').html('Join Room :: ' + this.firstChild.text);
        $('.join-room').show();
        joinRoom()
    });
    $('.cancel-join').click(function() {
        $('.join-room').hide();
    });
    $('#join-room').click(function(){

    })
});
//var socket = io();
var socket = io.connect('http://big-pigs.herokuapp.com');
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

// socket.on('chat message', function(msg){
//     $('#messages').append($('<li>').text(msg));
//     $('.chat-list-container').animate({
//         scrollTop: $('#messages li:last-child').offset().top + 'px'
//     }, 1000);
// });

socket.on('listAvailableChatRooms', function(rooms){
    $('#games').empty();
    for(var room in rooms) {
        $('#games').append('<li class="available-game" id="' + room + '"><a href="#">' + rooms[room]['name'] + '</a><span class="badge">' + rooms[room]['people'].length + '</span></li>');
    }
});



// var joinRoom = function(roomName, playerName) {
//
//     $('.navbar-brand').innerText = 'BigPigs :: ' + roomName;
//     // var roomExists = false;
//     // var room = this.roomname;
//     // if (typeof room === 'undefined' || (typeof room === 'string' && room.length === 0)) {
//     //    $scope.error.create = 'Please enter a room name';
//     // } else {
//     //    socket.emit('checkUniqueRoomName', room, function (data) {
//     //        roomExists = data.result;
//     //        if (roomExists) {
//     //            $scope.error.create = 'Room ' + room + ' already exists.';
//     //        } else {
//     //            socket.emit('createRoom', room);
//     //            $scope.error.create = '';
//     //            if (!$scope.user.inroom) {
//     //                $scope.messages = [];
//     //                $scope.roomname = '';
//     //            }
//     //        }
//     //    });
//     // }
// };
