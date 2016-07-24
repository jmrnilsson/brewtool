define([
  'knockout',
  'utils/events',
  'models/alarm'
], function(ko, events, alarm) {
  'use strict';

  var low = ko.observable();
  var high = ko.observable();
  var temp = ko.pureComputed(function() {
    var first = ko.utils.arrayFirst(events.events(), function(event) {
      return event.topic === 'sense-temperature';
    });
    return first ? first.data.temperature : '';
  });
  var tempText = ko.pureComputed(function() {
    var t = temp();
    return t || t === 0 ? temp() + ' °C' : '';
  });
  var temperatureEvents = ko.pureComputed(function() {
    // alert(JSON.stringify(events.events()));
    return events.events().map(function(e) {return e.data.temperature;});
  });

  temp.subscribe(function() {
    var t = temp();
    var l = low();
    var h = high();
    if (!l || l > t) {
      low(t);
    }
    if (!h || h < t) {
      high(t);
    }
  });

  function clear() {
    low(null);
    high(null);
  }

  function TemperatureViewModel() {
    var self = this;

    // observables
    self.tempText = tempText;
    self.temp = temp;
    self.low = low;
    self.high = high;
    self.alarm = alarm;
    self.temperatureEvents = temperatureEvents;

    // actions
    self.clear = clear;
  }

  return TemperatureViewModel;
});
