# brewtool

## Description
A small web application for monitoring brewing temperature when brewing beer or really anything. It also provides a calculator and has a log thingy. It is intended to be used with an Arduino, but does include a fake daemon to "simulate" temperature changes. 

## Simplified setup (without Arduino sensing)
To get started clone the repo and go to the  __client__ directory and type:

    npm install -g bower
    bower install

Then, go to the  __server__ directory and type: 

    npm install express socket.io

Still in the __server__ directory, type:

    node daemonFake.js

That's the setup. Nodejs, Express and socket.io should be up and running. Then you should be able to browse to:

    http://localhost:3000/
    
That's it. Btw, there may be dependencies to python from socket.io. There is a dependency to python 2.7.* from serialport (which is used for the Arduino sensing setup mentioned below).

## Setup with sensing
### Prerequisites before actual sensing with Arduino
* Arduino 
* USB-cable
* Waterproof temperature sensor supporting OneWire (i.e. DS18B20, DS1822, DS1820)
* Library: Dallas Temperature, https://github.com/milesburton/Arduino-Temperature-Control-Library
* Library: OneWire, http://playground.arduino.cc/Learning/OneWire
* Install Python 2.7.x, https://www.python.org/downloads/. This is used by SerialPort during package installation and creates OS-specific packages.
* Install Arduino Software, IDE https://www.arduino.cc/en/Guide/HomePage

### To start sensing with arduino 
* Configure  the identity of the temperature sensor OneWire DeviceAddress in the script  __./arduino/arduino_temperature_sensing.ino__
* Connect temperature sensor, USB a.s.o
* Make sure all the node packages are installed (see below)
* Browse to http://localhost:3000/

To make sure all packages are installed type in the root of the repository:

    cd server
    npm install express serialport socket.io
    node daemon.js
    cd ../client
    bower install

### Additional information about the Arduino setup
For information on how to include Arduino libraries see http://arduino.cc/en/Guide/Libraries. How to wire or solder the temperature sensor is detailed at http://www.hobbytronics.co.uk/ds18b20-arduino.
