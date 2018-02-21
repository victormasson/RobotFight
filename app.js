const express = require('express');
const http = require('http').Server(express);
const io = require('socket.io')(http);

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