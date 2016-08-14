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

  function evaluate() {
    // https://github.com/c3js/c3/blob/98769492d07b6103bfc30a0254ccb1e1ec1cca50/spec/api.grid-spec.js
    var high = alarm.high();
    var low = alarm.low();

    if (chart) {
      chart.ygrids.remove(ygridlines);
      ygridlines.length = 0;
      if (low) {
        ygridlines.push({value: low, class: 'low', text: 'low: ' + low + ' °C'});
      }
      if (high) {
        ygridlines.push({value: high, class: 'high', text: 'high: ' + high + ' °C'});
      }
      chart.ygrids.add(ygridlines);
    }
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
          tick: {
            format: function(temp) { return Math.round(temp * 10) / 10; }
          }
        }
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

  function graph(e) {
    var i;
    var configuration;
    var temperatures;
    var times;
    var avgs = [];

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
      chart.load({columns: columns(avgs), duration: 250});
    }
  }

  function subscribe() {
    [alarm.low, alarm.high].forEach(function(observable) {
      observable.subscribe(evaluate);
    });


    events.events.subscribe(function() {
      var e = events.events().filter(function(event) {
        return event.topic === 'sense-temperature';
      });
      if (e.length % precision === 0) {
        setTimeout(function() {
          graph(e);
        }, 0);
      }
    });
  }

  return function() {
    subscribe();
  };
});
