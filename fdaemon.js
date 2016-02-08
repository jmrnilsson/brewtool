
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var configurationPort = 3000;

app.use(express.static('./client/'));
server.listen(configurationPort);
console.log('Fake daemon is listening on port ' + configurationPort + '.\nPress ctrl + c to close.');

var first = Math.floor((Math.random() * 100) + 1)
emit(first);

function emit(temperature){
    var current = {
        temperature: temperature,
        utc: new Date().toUTCString()
    }
    var next = Math.floor(Math.random() * 3) - 1 + temperature;

    function send(){
        io.sockets.emit('sense-temperature', current);
        emit(next);
    }

  setTimeout(send, 2000);
}

