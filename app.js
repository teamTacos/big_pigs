var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//var app = express();

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Player = function(name, id) {
    this.name = name;
    this.id = id;
    this.score = 0;
    this.turn = false;
};

var current_player = 0;

//require('./player.js');
var players = [];

server.listen(3000);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    socket.on('join game', function(name){
        console.log('new blood ' + name);
        players.push(new Player(name, socket.id));
        if (players.length == 1) {
            console.log(players[0].turn);
            players[0].turn = true;
        }
        console.log(players);
        io.emit('player list', players);
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('pass turn', function(score){
        var current_player = 0;
        for(player in players) {
            if (players[player].turn == true) {
                current_player = player;
            }
        }
        players[current_player].turn = true;
        console.log('player:' + current_player);
        current_player ++;
        io.emit('player list', players);
    });
    socket.on('disconnect', function() {
        console.log(socket.id + ' disconnected');
        for(var i = players.length - 1; i >= 0; i--) {
            if(players[i].id === socket.id) {
                players.splice(i, 1);
            }
        }
        io.emit('player list', players);
    });
});
io.to('some room').emit('some event');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/jquery/jquery.js', function(req, res) {
    res.sendfile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
