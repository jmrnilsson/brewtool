
var express = require('express')
  , app = module.exports = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var configurationPort = 3000;

app.use(express.static('./client/'));
server.listen(configurationPort);
console.log('Fake daemon is listening on port ' + configurationPort + '.\nPress ctrl + c to close.');

var push = function (temperature) {
  setTimeout(function() {
    io.sockets.emit('sense-temperature', {
        temperature: temperature,
        utc: new Date().toUTCString()
      });
    push(Math.floor(Math.random() * 3) - 1 + temperature);
  }, 2000);
}

push(Math.floor((Math.random() * 100) + 1));
