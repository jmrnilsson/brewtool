#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// Assign the addresses of your 1-Wire temp sensors. See the tutorial on how to obtain these addresses:
// http://www.hacktronics.com/Tutorials/arduino-1-wire-address-finder.html

DeviceAddress thermometer = { 0x28, 0x7A, 0x33, 0x49, 0x05, 0x00, 0x00, 0xC5 };

void setup(void)
{
  Serial.begin(9600);
  sensors.begin();
  sensors.setResolution(insideThermometer, 10);
}

void printTemperature(DeviceAddress deviceAddress)
{
  float celcius = sensors.getTempC(deviceAddress);
  if (celcius == -127.00) 
  {
    Serial.print("Error getting temperature");
  }
  else
  {
    Serial.print(celcius);
  }
  Serial.print("\n\r");
}

void loop(void)
{ 
  delay(100);
  sensors.requestTemperatures();
  printTemperature(thermometer);
}

