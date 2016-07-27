var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var SerialPort = require('serialport');
var fs = require('fs');
var rl = require('readline');


// Alternatively new SerialPort("/dev/tty-usbserial1", { baudrate: 9600})
// or new SerialPort("/dev/cu-usbmodel1421", options)
// or new SerialPort('COM4', options);
var options = { baudrate: 9600, parser: SerialPort.parsers.readline('\n') };
var serialPort = new SerialPort('/dev/cu.usbmodem1421', options);
var port = 3000;
var log;
var socketlist = [];
var isoDate;

app.use(express.static('./client/'));
console.log('Daemon is listening on port ' + port + '.\nPress ctrl + c to close.');
server.listen(port);

isoDate = new Date().toISOString();

log = fs.createWriteStream(isoDate + '.log.csv');
log.write('UtcDate;TemperatureC;\n');

serialPort.on('open', function() {
  serialPort.on('data', function(data) {
    log.write(isoDate + ';' + data + ';\n');
    io.sockets.emit('sense-temperature', { temperature: data, date: isoDate });
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
