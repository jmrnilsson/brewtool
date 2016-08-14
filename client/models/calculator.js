define([
  'knockout',
  'utils/abvCalculator',
  'toastr',
  'utils/events',
  'models/gravity'
], function(ko, AbvCalculator, toastr, events, Gravity) {
  'use strict';

  var gravity = new Gravity(1050, 1010);
  var mode = ko.observable('compensated');
  var modeText = ko.pureComputed(function() {
    return mode().charAt(0).toUpperCase() + mode().slice(1);
  });
  var abv = ko.observable();

  function toAbvText(alcoholByVolume) {
    return alcoholByVolume ? alcoholByVolume.toFixed(2) + ' %' : 'N/A';
  }

  function calculate() {
    var og = gravity.original();
    var fg = gravity.final();
    var m = mode();
    var nextAlcholByVolume;
    try {
      nextAlcholByVolume = AbvCalculator.calculate(m, og, fg);
      abv(toAbvText(nextAlcholByVolume));

      // Publish ony user-initiated
      if (arguments.length > 0) {
        events.emit('calculated-abv', { abv: nextAlcholByVolume, mode: m });
      }
    } catch (error) {
      abv(toAbvText(null));
      toastr.error(error.message);
    }
  }

  function CalculatorViewModel() {
    var self = this;

    // observables
    self.gravity = gravity;
    self.abv = abv;
    self.modeText = modeText;

    // actions
    self.calculate = calculate;
    self.mode = mode;

    self.calculate();
  }

  return CalculatorViewModel;
});
