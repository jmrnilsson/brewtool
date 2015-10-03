# brewtool

## Description
Application for monitoring brewing temperature when brewing beer or really just anything. It also provides a calculator and has a log thingy. It is intended to be used with an Arduino, but does include a fake daemon that "simulate" temperature changes and that sends over websockets. 

## Simplified setup
To simulate temperature reading start express and socket.io browser into the "client" folder and type:
    
    npm install -g bower
    bower install

Then browser into the "server" folder type,

    npm install express socket.io
    node daemonFake.js

Then browse to:
    
    http://localhost:3000/
    
That's it. 

## Preparations before actual sensing with Arduino

### Prerequisites
* Arduino 
* USB-cable
* Temperature sensor (supporting OneWire)
* Library: Dallas Temperature, https://github.com/milesburton/Arduino-Temperature-Control-Library
* Library: OneWire, http://playground.arduino.cc/Learning/OneWire

To start sensing with arduino 
* Adjust the temperature OneWire DeviceAddress in the script called arduino_temp_read.ino
* Flash the arduino
* Attach it with USB
* Install python and type the following the "server" folder 

    npm install express serialport socket.io
    node daemonFake.js

* Start 'node daemon.js'
* Browse to http://localhost:3000/

## Info on how to include Arduino libraries
See http://arduino.cc/en/Guide/Libraries

