define([
//  'ko',
  'c3',
  'utils/events'
], function(c3, events) {
  'use strict';

  var chart;

  function columns(avgs) {
    return [
      ['x'].concat(avgs.map(function(s) { return s.time; })),
      ['temp0 (°C)'].concat(avgs.map(function(s) { return s.temperature; }))
    ];
  }

  function avg(precision, e) {
    var i;
    var temperatures;
    var times;
    var avgs = [];
    for (i = 0; i < e.length; i++) {
      temperatures = 0;
      times = 0;
      times += e[i].data.date;
      temperatures += e[i].data.temperature;
      if (i % (e.length / precision) === 0 && i > 1) {
        avgs.push({
          temperature: temperatures / (e.length / precision),
          time: parseFloat(times) / (e.length / precision)
        });
      }
    }
    return avgs;
  }

  function generateOrLoad() {
    var e;
    var avgs;
    var precision;
    events.events.subscribe(function() {
      e = events.events().filter(function(event) {
        return event.topic === 'sense-temperature';
      });
      precision = 20;
      avgs = [];
      if (e.length % precision === 0) {
        avgs = avg(precision, e);
        if (e.length === precision) {
          chart = c3.generate({
            data: {x: 'x', columns: columns(avgs)},
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
          });
        } else {
          chart.load({columns: columns(avgs), duration: 250});
        }
      }
    });

  }

  function Chart() {
    var self = this;
    self.generateOrLoad = generateOrLoad;
    self.stop = function() {};

    self.generateOrLoad();
  }

  return Chart;
});
