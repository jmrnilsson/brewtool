define([
//  'ko',
  'c3',
  'utils/events'
], function(c3, events) {
  'use strict';

  // var load = 0;

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
    var j;
    var chunked;
    var temperatures;
    var times;
    var avgs;
    var precision;
    var chart;
    var input;
    events.events.subscribe(function() {
      e = events.events().filter(function(event) {
        return event.topic === 'sense-temperature';
      });
      j = -1;
      precision = 20;
      chunked = [];
      avgs = [];
      if (e.length % precision === 0) {
        for (i = 0; i < e.length; i++) {
          if (i % (e.length / precision) === 0) {
            j ++;
            chunked[j] = [];
          }
          chunked[j].push({time: e[i].data.date, temperature: e[i].data.temperature});
        }
        for (i = 0; i < chunked.length; i++) {
          temperatures = 0;
          times = 0;
          for (j = 0; j < chunked[i].length; j++) {
            temperatures += chunked[i][j].temperature;
            times += chunked[i][j].time;
          }
          avgs.push(
            {
              temperature: temperatures / (e.length / precision),
              time: parseFloat(times) / (e.length / precision)
            });
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
