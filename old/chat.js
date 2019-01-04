var socket = io();

var playerChat = {

    form: $("form"),
    container: $(".chat-list-container"),
    messages: $("#messages"),
    newMessage: $("#m"),

    logMessage: function(msg) {
        playerChat.messages.append($('<li>').text(msg));
        playerChat.scrollMessages();
    },
    scrollMessages: function() {
        playerChat.container.animate({
           scrollTop: $('li:last-child', playerChat.messages).offset().top + 'px'
        }, 1000);
    },
    sendMessage: function() {
        socket.emit('chat message', playerChat.newMessage.val());
        playerChat.newMessage.val('');
        return false;
    }
};

playerChat.form.submit(playerChat.sendMessage);

socket.on('chat message', function(msg){
    playerChat.logMessage(msg + 'chat');
});

