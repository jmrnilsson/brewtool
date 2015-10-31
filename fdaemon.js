'use strict';

var express = require('express')
  , app = module.exports = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , db = require('./db.js')
  , utils = require('./utils.js').utils
  , moment = require('moment');

db.init();
var port = 3000;
var session = utils.guid.new();
var Memento = utils.Memento;

app.use(express.static('./client/'));
server.listen(port);
console.log('Fake daemon is listening on port ' + port + '.');
console.log('Press ctrl + c to close.');

var push = function (temperature) {
  setTimeout(function() {
    var sense = {session: session, timestamp: moment.utc().valueOf(), celsius: temperature}
    db.senses.add(sense);
    io.sockets.emit('sense-temperature', sense);
    push(Math.floor(Math.random() * 3) - 1 + temperature);
  }, 2000);
}

io.on('connection', function (socket) {
  socket.on('calculated-abv', function (data) {
    var gravity =
    {
      session: session,
      timestamp: moment.utc().valueOf(),
      originalGravity: data.originalGravity,
      finalGravity: data.finalGravity
    };
    db.gravities.add(gravity);
  });
  socket.on('reset-session', function (data) {
    session = utils.guid.new();
  });
});

push(Math.floor((Math.random() * 100) + 1));
