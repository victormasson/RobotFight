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

var placeBonome = { left : 0, top : 0 };
var placeFireBall = { left : 0, top : 0 };
var placeWindows = { right : 0, down : 0 };

//Création écouteur sockets
io.on('connection', function(socket){
    console.log('a user connected');
    // console.log(socket);

    socket.on('btnPlay', function(msg){
        console.log(msg);
        placeWindows.right = msg.wRight;
        placeWindows.down = msg.wDown;
    });

    socket.on('btnLeft', function(){
        console.log('btnLeft');
        if (placeBonome.left > 0) {
            placeBonome.left -= 20;
            console.log('btnLeft: ' + placeBonome.left);
        
        }
        socket.emit('btnLeft', placeBonome);
        socket.broadcast.emit('btnLeft', placeBonome);
    });

    socket.on('btnRight', function(){
        if (placeBonome.left + 200 < placeWindows.right) {
            placeBonome.left += 20;
            console.log('btnRight: ' + placeBonome.left);
        }
        socket.emit('btnRight', placeBonome);
        socket.broadcast.emit('btnRight', placeBonome);
    });

    socket.on('btnTop', function(){
        console.log('btnTop');
        if (placeBonome.top - 25 > 0) {
            placeBonome.top -= 20;
            console.log('btnTop: ' + placeBonome.top);
        }
        socket.emit('btnTop', placeBonome);
        socket.broadcast.emit('btnTop', placeBonome);
    });

    socket.on('btnDown', function(){
        console.log('btnDown');
        if (placeBonome.top + 350 < placeWindows.down) {
            placeBonome.top += 20;
            console.log('btnDown: ' + placeBonome.top);
        }
        socket.emit('btnDown', placeBonome);
        socket.broadcast.emit('btnDown', placeBonome);
    });

    socket.on('btnSpace', function(){
        console.log('btnSpace');
        if (placeFireBall.top > 0) {
            placeFireBall.top -= 20;
            console.log('btnSpace: ' + placeFireBall.top);
        }
        socket.emit('btnSpace', placeFireBall);
        socket.broadcast.emit('btnSpace', placeFireBall);
    });
});



http.listen(3000, function(){
    console.log('listening on *:3000');
});