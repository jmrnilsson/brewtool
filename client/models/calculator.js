define([
  'knockout',
  'utils/abvCalculator',
  'toastr',
  'utils/events',
  'models/gravity'
], function(ko, Abv, toastr, events, Gravity) {
  'use strict';

  var gravity = new Gravity(1050, 1010);
  var mode = ko.observable('compensated');
  var modeText = ko.pureComputed(function() {
    return mode().charAt(0).toUpperCase() + mode().slice(1);
  });
  var abv = ko.observable();

  function format(alcoholByVolume) {
    return alcoholByVolume ? alcoholByVolume + ' %' : 'N/A';
  }


  function calculate() {
    var og = gravity.original();
    var fg = gravity.final();
    var result;
    try {
      result = Abv.getAbv(mode(), og, fg);
      abv(format(result.text));

      // Publish only user-initiated
      if (arguments.length > 0) {
        events.emit('calculated-abv', { abv: result, mode: mode() });
      }
    } catch (error) {
      abv(format(null));
      Abv.getErrors(og, fg).forEach(function(e) {
        toastr.error(e);
      });
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
