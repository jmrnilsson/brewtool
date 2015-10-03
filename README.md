# brewtool

## Description
A small web application for monitoring brewing temperature when brewing beer or really anything. It also provides a calculator and has a log thingy. It is intended to be used with an Arduino, but does include a fake daemon to "simulate" temperature changes. 

## Simplified setup
To get started go clone the repo and go to  __server__ directory and type: 

    npm install express socket.io


Then, go to the __client__ direcotory and type:
    
    npm install -g bower
    bower install
    
That's the setup. To start NodeJS, express and socket.io

        node daemonFake.js

Then browser into the "server" folder type,

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

