define([
  'knockout'
], function (ko) {
  'use strict';

  function gravityExtension(target) {
    target.hasError = ko.observable();

    function validate(v) {
      var errors = v === undefined || isNaN(v) || v < 1 || v > 1.3 && v < 1000 || v > 1300;
      target.hasError(errors);
    }
    validate(target());
    target.subscribe(validate);
    return target;
  }

  function floatExtension(target) {
    target.hasError = ko.observable();

    function validate(value) {
      target.hasError(value !== undefined && !(value.match(/^-?\d*(\.\d+)?$/)));
    }
    validate(target());
    target.subscribe(validate);
    return target;
  }

  return {
    gravity: gravityExtension,
    float: floatExtension
  };
});
