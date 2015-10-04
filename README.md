# brewtool

## Description
A small web application for monitoring brewing temperature when brewing beer or really anything. It also provides a calculator and has a log thingy. It is intended to be used with an Arduino, but does include a fake daemon to "simulate" temperature changes. 

## Simplified setup (without Arduino sensing)
Nodejs and Bower is need to install the necessary packages. The following command installs Bower globally,

    npm install -g bower
    
To get started, clone the repo and type:

    git clone https://github.com/jmrnilsson/brewtool.git
    cd brewtool
    cd client
    bower install
    cd ..
    cd server
    npm install express socket.io

That's the setup. To start type the following command (assuming current directory is the root of the repository):

    cd server
    node daemonFake.js
    
Nodejs, Express and socket.io should be up and running. You should be able to browse to url indicated by node, usually:

    http://localhost:3000/
    
That's it. There may be dependencies to Python from socket.io. There is a dependency to Python 2.7.* from serialport (which is used for the Arduino sensing setup mentioned below).

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
    cd ..

To start type:

    cd server
    node daemon.js

### Additional information about the Arduino setup
* For information on how to include Arduino libraries see, http://arduino.cc/en/Guide/Libraries. 
* How to wire or solder the temperature sensor is detailed at http://www.hobbytronics.co.uk/ds18b20-arduino.
* How to assign the addresses of a 1-Wire temp sensors? Look through the tutorial at http://www.hacktronics.com/Tutorials/arduino-1-wire-address-finder.html

## Licensing information 
The software licensed under MIT although dependencies, fonts and media may covered by their respective licenses. 
