define([], function() {
  'use strict';

  /*
  ALCOHOL BY VOLUME FORMULAS

  SIMPLIFIED
  Handy simple formula commonly used.
  http://www.homebrewdad.com/abv_calculator.php

  COMPENSATED
  Makes adjustments for real extract. Slighly better than the simplified formula.
  http://www.ratebeer.com/forums/calculating-abv_121228.htm

  PLATO:
  Less accurate around 5%, but presumably better precision on high gravity > 10%.
  */

  function simple(og, fg) {
    return (og - fg) * 131.25;
  }

  function compensated(og, fg) {
    var constant = 1.25;
    var divisor = (2.0665 - 0.010665 * (668.72 * og - 463.37 - 205.347 * Math.pow(og, 2)));
    var dividend0 = 668.72 * og - 463.37 - 205.347 * Math.pow(og, 2);
    var dividend1 = 0.1808 * (668.72 * og - 463.37 - 205.347 * Math.pow(og, 2));
    var dividend2 = 0.8192 * (668.72 * fg - 463.37 - 205.347 * Math.pow(fg, 2));
    return constant * ((dividend0 - dividend1 - dividend2) / divisor);
  }

  function plato(og, fg) {
    var oe = (1000 * (og - 1)) / 4; // original extract
    var re = (1000 * (fg - 1)) / 4; // real extract
    var abw = (oe - re) / (2.065 - (0.010665 * oe)); // alcohol by weight
    return (abw * (fg / 0.794)); // alcohol by volume
  }

  // Validation
  function validate(mode, originalGravity, finalGravity) {
    var m1 = 'Calculation mode type not available. Options include simple, compensated, plato';
    var m2 = 'Final gravity is greater than original gravity';

    function toMessage(gravityType, message) {
      return gravityType + ' gravity is ' + message;
    }

    function ensureBounds(gravity, gravityType) {
      if (!gravity) throw new TypeError(toMessage(gravityType, 'not set'));
      if (window.isNaN(gravity)) throw new TypeError(toMessage(gravityType, 'not a number'));
      if (gravity < 1) throw new RangeError(toMessage(gravityType, 'too low'));
      if (gravity > 1.3) throw new RangeError(toMessage(gravityType, 'too high'));
    }

    ensureBounds(originalGravity, 'Original');
    ensureBounds(finalGravity, 'Final');

    if (finalGravity > originalGravity) throw new RangeError(m2);
    if (mode !== 'simple' && mode !== 'compensated' && mode !== 'plato') throw new RangeError(m1);
  }

  function toDecimal(value) {
    return value > 1000 ? value / 1000 : value;
  }

  function calculateAbv(mode, originalGravity, finalGravity) {
    var og = toDecimal(originalGravity);
    var fg = toDecimal(finalGravity);
    validate(mode, og, fg);

    switch (mode) {
      case 'simple': return simple(og, fg);
      case 'plato': return plato(og, fg);
      default: return compensated(og, fg);
    }
  }

  return { calculate: calculateAbv };
});
