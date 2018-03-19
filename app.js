const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/asset', express.static(__dirname + '/resources/'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// io.on('connection', function(socket) {
//     console.log('a user connected');
// });

var placeBonome = { left : 40, top : 40 };
var placeWindows = { right : 0, down : 0 };
var element = { x : 0, y : 0, x1 : 0, y1 : 0};
var placeFireBall = { left : 0, top : 0 };
var placeWindows = { right : 0, down : 0 };

//Création écouteur sockets
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('btnPlay', function(msg){
        console.log(msg);
        placeWindows.right = msg.wRight;
        placeWindows.down = msg.wDown;

        placeBonome.left = 40;
        placeBonome.top = 40;

        socket.emit('btnPlay', placeBonome);
        socket.broadcast.emit('btnPlay', placeBonome);
    });

    socket.on('btnLeft', function(){
        //console.log('btnLeft');
        if (placeBonome.left > 0) {
            placeBonome.left -= 20;
            //console.log('btnLeft: ' + placeBonome.left);
        
        }
        socket.emit('btnLeft', placeBonome);
        socket.broadcast.emit('btnLeft', placeBonome);
    });

    socket.on('btnRight', function(){
        if (placeBonome.left + 200 < placeWindows.right) {
            placeBonome.left += 20;
            // console.log('btnRight: ' + placeBonome.left);
        }
        socket.emit('btnRight', placeBonome);
        socket.broadcast.emit('btnRight', placeBonome);
    });

    socket.on('btnTop', function(){
        // console.log('btnTop');
        if (placeBonome.top - 25 > 0) {
            placeBonome.top -= 20;
            // console.log('btnTop: ' + placeBonome.top);
        }
        socket.emit('btnTop', placeBonome);
        socket.broadcast.emit('btnTop', placeBonome);
    });

    socket.on('btnDown', function(){
        // console.log('btnDown');
        if (placeBonome.top + 350 < placeWindows.down) {
            placeBonome.top += 20;
            // console.log('btnDown: ' + placeBonome.top);
        }
        socket.emit('btnDown', placeBonome);
        socket.broadcast.emit('btnDown', placeBonome);
    });

    socket.on('btnSpace', function(){ 
        placeFireBall.top = placeBonome.top;
        placeFireBall.left = placeBonome.left + 50
        socket.emit('btnSpace', placeFireBall);
        socket.broadcast.emit('btnSpace', placeFireBall);
    });
});


const port = 9909;
http.listen(port, function(){
    console.log('listening on *: http://localhost:' + port);
});