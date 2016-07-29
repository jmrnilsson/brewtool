define([
//  'ko',
  'c3',
  'utils/events'
], function(c3, events) {
  'use strict';

  function columns(avgs) {
    return [
      ['x'].concat(avgs.map(function(s) { return s.time; })),
      ['temp0 (°C)'].concat(avgs.map(function(s) { return s.temperature; }))
    ];
  }

  function options() {
    return {
      axis: {
        x: {
          type: 'x',
          tick: {
            count: 4,
            format: function(dt) {
              return Math.round((new Date().getTime() - Math.round(dt)) / 1000) + ' s';
            }
          }
        },
        y: {
          max: 100,
          min: 0
        }
      },
      transition: {
        duration: 250
      }
    };
  }

  function Chart() {
    var e;
    var i;
    var avgs;
    var precision;
    var chart;
    var input;
    var temperatures;
    var times;

    events.events.subscribe(function() {
      e = events.events().filter(function(event) {
        return event.topic === 'sense-temperature';
      });
      precision = 20;
      avgs = [];
      if (e.length % precision === 0) {
        for (i = 0; i < e.length; i++) {
          if (i % (e.length / precision) === 0) {
            if (i > 0) {
              avgs.push({
                temperature: temperatures / (e.length / precision),
                time: parseFloat(times) / (e.length / precision)
              });
            }
            temperatures = 0;
            times = 0;
          }
          times += e[i].data.date;
          temperatures += e[i].data.temperature;
        }
        if (e.length === precision) {
          input = {};
          Object.assign(input, {data: {x: 'x', columns: columns(avgs)}}, options());
          chart = c3.generate(input);
        } else {
          chart.load({columns: columns(avgs), duration: 250});
        }
      }
    });
  }

  return Chart;
});
