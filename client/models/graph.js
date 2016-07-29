define([
//  'ko',
  'c3',
  'utils/events',
  'models/alarm'
], function(c3, events, alarm) {
  'use strict';

  var precision = 20;
  var chart;
  var ygridlines = [];

  function columns(avgs) {
    return [
      ['x'].concat(avgs.map(function(s) { return s.time; })),
      ['temp0 (°C)'].concat(avgs.map(function(s) { return s.temperature; }))
    ];
  }

  function evaluateGrid() {
    // https://github.com/c3js/c3/blob/98769492d07b6103bfc30a0254ccb1e1ec1cca50/spec/api.grid-spec.js
    var high = alarm.high();
    var low = alarm.low();

    chart.ygrids.remove(ygridlines);
    ygridlines.length = 0;
    if (low) {
      ygridlines.push({value: low, class: 'gridAlarm', text: 'low'});
    }
    if (high) {
      ygridlines.push({value: high, class: 'gridAlarm', text: 'high'});
    }
    chart.ygrids.add(ygridlines);
  }

  [alarm.low, alarm.high].forEach(function(observable) {
    observable.subscribe(evaluateGrid);
  });

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
          tick: {
            format: function(temp) { return Math.round(temp * 10) / 10; }
          }
        }
        /* ,
        y: {
          max: 100,
          min: 0
        }
        */
      },
      transition: {
        duration: 250
      },
      colors: {
        alarm_low: '#ff0000',
        alarm_high: '#ff0000'
      }
    };
  }

  function Chart() {
    var e;
    var i;
    var avgs;
    var configuration;
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
          temperatures += parseFloat(e[i].data.temperature);
        }
        if (e.length === precision) {
          configuration = {data: {x: 'x', columns: columns(avgs)}};
          Object.assign(configuration, options());
          chart = c3.generate(configuration);
        } else {
          configuration = {data: {x: 'x', columns: columns(avgs)}};
          chart.load({columns: columns(avgs), duration: 250});
        }
      }
    });
  }

  return Chart;
});
