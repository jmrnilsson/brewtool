var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var SerialPort = require('serialport');
var fs = require('fs');
var rl = require('readline');

// Common USB COM port names: /dev/tty-usbserial1, /dev/cu-usbmodel1421, COM4
var options = { baudrate: 9600, parser: SerialPort.parsers.readline('\n') };
var serialPort = new SerialPort('/dev/cu.usbmodem1411', options);
var port = 3000;
var log;
var socketlist = [];
var time;

module.exports = app;

app.use(express.static('./client/'));
console.log('Daemon is listening on port ' + port + '.\nPress ctrl + c to close.');
server.listen(port);

log = fs.createWriteStream(new Date().toISOString() + '.log.csv');
log.write('UtcDate;TemperatureC;\n');

serialPort.on('open', function() {
  serialPort.on('data', function(data) {
    time = new Date().getTime();
    log.write(time + ';' + data + ';\n');
    io.sockets.emit('sense-temperature', { temperature: data, date: time });
  });
});

io.sockets.on('connection', function(socket) {
  socketlist.push(socket);
  socket.on('close', function() {
    socketlist.splice(socketlist.indexOf(socket), 1);
  });
});


if (process.platform === 'win32') {
  rl.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', function() {
    process.emit('SIGINT');
  });
}

process.on('SIGINT', function() {
  io.server.close();
  socketlist.forEach(function(socket) {
    socket.destroy();
  });
  log.end();
  process.exit();
});
