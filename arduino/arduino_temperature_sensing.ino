#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// Assign the addresses of your 1-Wire temp sensors. See the tutorial on how to obtain these addresses:
// http://www.hacktronics.com/Tutorials/arduino-1-wire-address-finder.html

DeviceAddress insideThermometer = { 0x28, 0x7A, 0x33, 0x49, 0x05, 0x00, 0x00, 0xC5 };

void setup(void)
{
  // Start serial port
  Serial.begin(9600);
  // Start up the library
  sensors.begin();
  // Set the resolution to 10 bit (good enough?)
  sensors.setResolution(insideThermometer, 10);
}

void printTemperature(DeviceAddress deviceAddress)
{
  float tempC = sensors.getTempC(deviceAddress);
  if (tempC == -127.00) 
  {
    Serial.print("Error getting temperature");
  }
  else
  {
    Serial.print(tempC);
  }
}

void loop(void)
{ 
  delay(100);
  sensors.requestTemperatures();
  printTemperature(insideThermometer);
  Serial.print("\n\r");
}

