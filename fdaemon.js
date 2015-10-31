
var express = require('express')
  , app = module.exports = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , db = require('./db.js');

db.init();
var configurationPort = 3000;
var session = newGuid();

app.use(express.static('./client/'));
server.listen(configurationPort);
console.log('Fake daemon is listening on port ' + configurationPort + '.\nPress ctrl + c to close.');

var push = function (temperature) {
  setTimeout(function() {
    var sense = {session: session, timestamp: new Date().toUTCString(), celsius: temperature}
    //   stmt.run(data.session, data.timestamp, data.celsius);
    db.senses.add(sense);
    //io.sockets.emit('sense-temperature', sense);
    io.sockets.emit('sense-temperature', {temperature: temperature, utc: new Date().toUTCString()});
    push(Math.floor(Math.random() * 3) - 1 + temperature);
  }, 2000);
}

function newGuid() {
  function seed() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return seed() + seed() + '-' + seed() + '-' + seed() + '-' + seed() + '-' + seed() + seed() + seed();
}

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
//
// db.serialize(function() {
//   db.run("CREATE TABLE tGravity (session TEXT, timestamp INTEGER, originalgravity REAL, finalgravity REAL)");
//   db.run("CREATE TABLE tSense (session TEXT, timestamp INTEGER, celsius REAL)");
//
//   var stmt = db.prepare("INSERT INTO tGravity VALUES (?, ?, ?, ?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run('a'+1, 11000, 1.5, 1.2 + 0.1 * i);
//   }
//   stmt.finalize();
//
//   db.each("SELECT rowid AS id, session, timestamp, originalgravity, finalgravity FROM tGravity", function(err, row) {
//     console.log(err);
//       console.log(row.id + ": " + row.session + ", " + row.timestamp + ", " + row.originalgravity + ", " + row.finalgravity);
//   });
// });
//
// db.close();

push(Math.floor((Math.random() * 100) + 1));
