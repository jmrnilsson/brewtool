define([
  'c3'
  // 'utils/events'
], function(c3) {
  'use strict';

  function Chart() {
    c3.generate({
      data: {
        columns: [
          ['data1', 100, 200, 150, 300, 200],
          ['data2', 400, 500, 250, 700, 300]
        ]
      }
    });
  }

  return Chart;
});
