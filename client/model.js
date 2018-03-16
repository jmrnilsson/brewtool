define([
  'knockout'
], function(ko) {

  function Model() {
    const model = { route: ko.observable() };
    const temperature = ko.observable();
    const temperatureText = ko.pureComputed(() => `${temperature()} °C`);
    const temperatures = ko.observableArray();
    const alarmOn = ko.observable(false);
    const alarmLow = ko.observable().extend({ float: null });
    const alarmHigh = ko.observable().extend({ float: null });
  }

  return Model;
});
