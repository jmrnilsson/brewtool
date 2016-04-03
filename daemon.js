var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

// Alternatively new SerialPort("/dev/tty-usbserial1", { baudrate: 9600})
var options = { baudrate: 9600, parser: serialport.parsers.readline('\n\r') };
var serialPort = new SerialPort('COM4', options);
var port = 3000;

app.use(express.static('./client/'));
console.log('Daemon is listening on port ' + port + '.\nPress ctrl + c to close.');
server.listen(port);


serialPort.on('open', function() {
  serialPort.on('data', function(data) {
    io.sockets.emit('sense-temperature', { temperature: data, utc: new Date().toUTCString() });
  });
});
