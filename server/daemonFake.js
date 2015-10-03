var express = require('express')
  , app = module.exports = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , util = require("util")
  , repl = require("repl")
  ;
var configurationPort = 3000;
 
app.use(express.static('../client/'));
console.log('Listening on port ' + configurationPort + '.\nPress ctrl + c to close.');
server.listen(configurationPort);

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
