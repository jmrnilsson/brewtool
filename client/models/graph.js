define([
//  'ko',
  'c3',
  'utils/events'
], function(c3, events) {
  'use strict';

  var e;
  // var chart;
  // var load = 0;

  function Chart() {
    events.events.subscribe(function() {
      e = events.events();
      console.log(e.length);
      // console.log(['x'].concat(e.map(function(s) { return new Date(s.data.date).getTime(); })));
      // console.log(['load0'].concat(e.map(function(s) { return s.data.temperature; })));
      if (e.length % 20 === 0) {
        c3.generate({
          data: {
            x: 'x',
            columns: [
              ['x'].concat(e.map(function(s) { return new Date(s.data.date).getTime(); })),
              ['load0'].concat(e.map(function(s) { return s.data.temperature; }))
            ]
          },
          axis: {
            x: {
              type: 'x',
              tick: { // "2016-07-27 21:56:19:770"
                count: 4,
                format: function(dt) { return dt; }
              }
            },
            y: {
              max: 110,
              min: -10
            }
          }
        });
      }
    });
  }

  /*
  function Chart() {
    var chart;
    var y = ['temp0', 25.0, 23.2];
    var x = ['x', new Date().getTime() - 5000, new Date().getTime()];
    var senses;
    // var i;
    var last;
    var sum;
    // var date = new Date();
    /* for (i = 0; i < 20; i++) {
      y.push(2);
      x.push((i - 20) * 250);
    }

    setInterval(function() {
      senses = events.events();
      if (senses.length < 20) {
        return;
      }
      sum = 0;
      last = senses.splice(0, 21).map(function(s) { return s.data.temperature; });
      last.forEach(function(temperture) {
        sum += temperture;
      }, this);
      sum = sum / 20.0;
      y.push(sum);
      x.push(new Date().getTime());
      if (y > 21) {
        y = y.slice(0, 22);
        x = x.slice(0, 22);
      }
      chart.flow({
        columns: [
          ['temp0', 25.0, 23.2, 22.2, 25.0, 42.2, 2.2],
          ['x', new Date().getTime() - 5000,
            new Date().getTime(), new Date().getTime() + 200, new Date().getTime() + 400,
            new Date().getTime() + 600, new Date().getTime() + 5000]
        ],
        duration: 1000
      });
    }, 700);
  }
    */

  return Chart;
});
