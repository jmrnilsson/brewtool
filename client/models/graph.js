define([
//  'ko',
  'c3'
  // , utils/events'
], function(c3) {
  'use strict';

  function Chart() {
    c3.generate({
      data: {
        columns: [
          ['data1', 100, 200, 150, 300, 200, 340, 475, 280, 275, 290],
          ['data2', 400, 500, 250, 700, 300, 320, 500, 700, 240, 275]
        ]
      }
    });
  }

  /*
  var data = ko.pureComputed(function() {
    return events.events().map(function(e) {return e.data.temperature;});
  });
  var labels = ko.pureComputed(function() {
    return events.events().map(function(e) {return e.data.date;});
  });
  */

  return Chart;
});
