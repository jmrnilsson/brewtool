# brewtool

## Description
A small web application for monitoring brewing and sparging temperature when brewing beer or really anything. It also provides a calculator and has a log thingy. It is intended to be used with an Arduino but also include a fake daemon to "simulate" temperature changes.

## Prerequisites 
Application | Link/Command 
------ | ------ 
nodejs | https://nodejs.org/en/ 
npm | https://nodejs.org/en/download/ 
bower | `npm install -g bower`

## Simplified setup (without Arduino sensing)
To get started; clone the run the setup. This will clear any cached dependencies, if they exists, and install them from scratch:

    git clone https://github.com/jmrnilsson/brewtool.git
    cd brewtool
    sh setup.sh

That's all. To start type command mentioned below. This will start a simulated daemon and open a browser (on OSX at least) which may change the temperature one degree in either direction every two seconds. 

    open http://localhost:3000/
    sh run.sh 
    
That's it. Have fun!

## Setup with sensing
### Prerequisites before sensing with Arduino
Application | Link/Command | Comment   
------ | ------ | ------
python 2.7.* | [https://www.python.org](https://www.python.org/download/releases/2.7/) | Only needed during build of SerialPort by node-gyp
An Arduino board | | 
A USB-cable | | i.e. Rev3 or something similar
Waterproof OneWire temperature sensor | | i.e. DS18B20, DS1822, DS1820
Dallas Temperature | https://github.com/milesburton/Arduino-Temperature-Control-Library | Library 
OneWire | http://playground.arduino.cc/Learning/OneWire | Library
Install Arduino Software | IDE https://www.arduino.cc/en/Guide/HomePage | Other tools can be used of course

### Preparation 
* Connect the thermometer with a correct resistor (according attached instructions). 
* Look at the script in the IC folder. The thermomenter variable needs to be configured to the identity of the temperature sensor. This is the OneWire DeviceAddress. The script is called __./arduino/arduino_temperature_sensing.ino__
* Connect temperature sensor with a USB
* Make sure all the node packages are installed (see below)
* Browse to http://localhost:3000/

Make sure all packages are installed type in the root of the repository:

    npm install serialport --save
    sh setup

To start type:

    node daemon.js

### Additional information about the Arduino setup
* For information on how to include Arduino libraries see, http://arduino.cc/en/Guide/Libraries.
* How to wire or solder the temperature sensor is detailed at http://www.hobbytronics.co.uk/ds18b20-arduino.
* How to assign the addresses of a 1-Wire temp sensors? Look through the tutorial at http://www.hacktronics.com/Tutorials/arduino-1-wire-address-finder.html

## Licensing information
The software licensed under MIT although other licenses also apply. See license __LICENSE.md__ for more information.
* The font __league gothic regular webfont__ is licensed under Open Font License. See https://github.com/theleagueof/league-gothic for more information about their work. See license __Open Font License.markdown__ for more information. Copyright holders are Caroline Hadilaksono & Micah Rich.
* The sound __Blop-Mark_DiAngelo-79054334__ is the word of Mark DiAngelo. It is licensed under CC-BY-3.0 Attribution. See license __CC-BY-3.0-legalcode.txt__ for more information.

## Additional resources
+ 1. PySerial https://github.com/pyserial/pyserial/tree/master/examples
+ 2. SocketIO https://github.com/miguelgrinberg/python-socketio
+ 3. Setting up *wheels* and *virtualenv* http://python-packaging-user-guide.readthedocs.org/en/latest/installing/
+ 4. ChartJS http://www.chartjs.org/docs/
+ 5. http://stackoverflow.com/questions/8110310/simple-way-to-query-connected-usb-devices-info-in-python
+ 6. https://github.com/hotzenklotz/Flask-React-Webpack-Server/
+ 7. http://playground.arduino.cc/Main/InternalTemperatureSensor
+ 8. https://github.com/foreverjs/forever
+ 9. http://socket.io/get-started/chat/
