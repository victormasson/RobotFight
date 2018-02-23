const express = require('express');
const http = require('http').Server(express);
const io = require('socket.io')(http);

//Création écouteur sockets
io.on('connection', function(socket){
    console.log('a user connected');
    console.log(socket);

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('message', function(msg){
      console.log('message: ' + msg);
      socket.broadcast.emit('message','message envoyé: ' + msg);
    });   

    socket.on('nbJoueurs', function(nbJ){
        console.log('nbJoueurs: ' + nbJ);
        socket.broadcast.emit('nbJoueurs','Nombre de joueurs: ' + nbJ);
    });   

  });

var app = express();
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/asset', express.static(__dirname + '/img/'));
app.listen(3000);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
});

// http.listen(3000, function(){
//     console.log('listening on *:3000');
// });