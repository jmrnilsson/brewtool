# brewtool

## Description
Application for monitoring temperature for brewing. It also provides a calculator and has a log thingy. It intended to be used with an Arduino. It does include a fake daemon that "simulate" temperature changes and that sends over websockets. 

## Simplified setup
To simulate temperature reading start express and socket.io browser into the "server" folder and type:
    
    node daemonFake.js

Then browse to:
    
    http://localhost:3000/
    
That's it. 

## Preparations before actualt sensing with Arduino

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
* Start 'node daemon.js'
* Browse to http://localhost:3000/
