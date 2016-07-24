var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var SerialPort = require('serialport');
var fs = require('fs');
var rl = require('readline');

// Alternatively new SerialPort("/dev/tty-usbserial1", { baudrate: 9600})
// Alternatively new SerialPort("/dev/cu-usbmodel1421", options)
// var serialPort = new SerialPort('COM4', options);
var options = { baudrate: 9600, parser: SerialPort.parsers.readline('\n') };
var serialPort = new SerialPort('/dev/cu.usbmodem1421', options);
var port = 3000;
var log;
app.use(express.static('./client/'));
console.log('Daemon is listening on port ' + port + '.\nPress ctrl + c to close.');
server.listen(port);

function getDateString() {
  var date = new Date();
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
         + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':'
         + date.getMilliseconds();
}
log = fs.createWriteStream(getDateString() + '.log.csv');
log.write('UtcDate;TemperatureC;\n');

serialPort.on('open', function() {
  serialPort.on('data', function(data) {
    var utcDate = new Date().toUTCString();
    log.write(getDateString() + ';' + data + ';\n');
    io.sockets.emit('sense-temperature', { temperature: data, utc: utcDate });
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
  log.end();
  process.exit();
});
