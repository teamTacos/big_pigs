$(document).ready(function() {
    $('.available-game').click(function() {
        $('.join-room').show();
    });
    $('.cancel-join').click(function() {
        $('.join-room').hide();
    });
    $('.modal').hide();
    // $('#joinGame').click(function(){
    //    alert('blah');
    //    name = $('#playerName').val();
    //    socket.emit('join game', name)
    // })
});