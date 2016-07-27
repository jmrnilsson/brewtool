
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 3000;

app.use(express.static('./client/'));
server.listen(port);
console.log('Fake daemon is listening on port ' + port + '.\nPress ctrl + c to close.');

function emit(temperature) {
  var current = {
    temperature: temperature,
    date: new Date().getTime()
  };
  var next = Math.floor(Math.random() * 3) - 1 + temperature;

  function send() {
    io.sockets.emit('sense-temperature', current);
    emit(next);
  }

  setTimeout(send, 100);
}

emit(Math.floor((Math.random() * 100) + 1));
