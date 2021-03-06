define([
  'knockout',
  'utils/events'
], function(ko, events) {
  'use strict';

  var played = null;
  var low = ko.observable().extend({ float: null });
  var high = ko.observable().extend({ float: null });
  var on = ko.observable(false);

  var sense = ko.pureComputed(function() {
    return ko.utils.arrayFirst(events.events(), function(event) {
      return event.topic === 'sense-temperature';
    });
  });

  function evaluate() {
    var temp = sense().data.temperature;
    // Allow floats as it's quite possible to be super-specific
    var below = parseFloat(low()) > temp;
    var above = parseFloat(high()) < temp;
    var play = !played || (new Date().getTime() - played) > 10000;

    if (play && on() && (above || below)) {
      new Audio('./resources/Blop-Mark_DiAngelo-79054334.mp3').play();
      played = new Date().getTime();
      events.emit('alarm', { below: below, above: above, temperature: temp });
    }
  }

  // Less eager than wrapping evaluate as computed
  [sense, low, high, on].forEach(function(observable) {
    observable.subscribe(evaluate);
  });

  return {
    low: low,
    high: high,
    on: on
  };
});
