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
    npm install

That's the setup. To start type the following command (assuming current directory is the root of the repository):

    cd server
    node fdaemon.js

__Note__: fdaemon is a fake daemon that simulates getting sensing information by randomizing a temperature change of 0, -1, 1 degree C every two seconds
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

### Before sensing with arduino
* Look at the script in the IC folder. The thermomenter variable needs to be configured to the identity of the temperature sensor. This is the OneWire DeviceAddress. The script is called __./arduino/arduino_temperature_sensing.ino__
* Connect temperature sensor, USB a.s.o
* Make sure all the node packages are installed (see below)
* Browse to http://localhost:3000/

Make sure all packages are installed type in the root of the repository:

    npm install
    npm install serialport
    node daemon.js
    cd ..
    cd client
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
