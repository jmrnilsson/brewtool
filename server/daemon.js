var express = require('express')
  , app = module.exports = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , serialport = require("serialport")
  , SerialPort = serialport.SerialPort
  , util = require("util")
  , repl = require("repl")
  ;
  
var configurationPort = 3000;

app.use(express.static('./client/'));
console.log('Listening on port ' + configurationPort + '.\nPress ctrl + c to close.');
server.listen(configurationPort);

// Alternatively new SerialPort("/dev/tty-usbserial1", { baudrate: 9600})
var serialPort = new SerialPort('COM4', { baudrate: 9600,  parser: serialport.parsers.readline('\n\r')})

serialPort.on("open", function () {
  serialPort.on('data', function(data) {
    io.sockets.emit('sense-temperature', {temperature: data, utc: new Date().toUTCString()});
  });

});