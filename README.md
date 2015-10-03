# brewtool

## Description
A small web application for monitoring brewing temperature when brewing beer or really anything. It also provides a calculator and has a log thingy. It is intended to be used with an Arduino, but does include a fake daemon to "simulate" temperature changes. 

## Simplified setup (without Arduino sensing)
To get started go clone the repo and go to  __server__ directory and type: 

    npm install express socket.io


Then, go to the __client__ direcotory and type:
    
    npm install -g bower
    bower install
    
That's the setup. To start NodeJS, express and socket.io

        node daemonFake.js

Then browse to:
    
    http://localhost:3000/
    
That's it. Btw, there may be dependencies to python from socket.io. There is a dependency to python 2.7.* from serialport (which is used for the Arduino sensing setup mentioned below).

## Preparations before actual sensing with Arduino
### Prerequisites
* Arduino 
* USB-cable
* Temperature sensor (supporting OneWire, i.e. DS18B20, DS1822, DS1820)
* Library: Dallas Temperature, https://github.com/milesburton/Arduino-Temperature-Control-Library
* Library: OneWire, http://playground.arduino.cc/Learning/OneWire

To start sensing with arduino 
* Configure  the identity of the temperature sensor OneWire DeviceAddress in the script called arduino_temp_read.ino
* Install python 2.7.x 
* Connect temperature sensor, USB a.s.o
* Make sure all the node packages are installed (see below)
* Browse to http://localhost:3000/

To make sure all packages are installed type:

        npm install express serialport socket.io
        node daemon.js

## Info on how to include Arduino libraries
See http://arduino.cc/en/Guide/Libraries

