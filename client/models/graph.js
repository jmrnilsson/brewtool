define([
//  'ko',
  'c3',
  'utils/events'
], function(c3, events) {
  'use strict';

  var e;
  var i;
  var j;
  var chunked;
  var temperatures;
  var times;
  var avgs;
  var precision;
  var chart;
  // var load = 0;

  function Chart() {
    events.events.subscribe(function() {
      e = events.events();
      console.log(e.length);
      // console.log(['x'].concat(e.map(function(s) { return new Date(s.data.date).getTime(); })));
      // console.log(['load0'].concat(e.map(function(s) { return s.data.temperature; })));
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
          chart = c3.generate({
            data: {
              x: 'x',
              columns: [
                ['x'].concat(avgs.map(function(s) { return s.time; })),
                ['temp0'].concat(avgs.map(function(s) { return s.temperature; }))
              ]
            },
            axis: {
              x: {
                type: 'x',
                tick: { // "2016-07-27 21:56:19:770" (_final.getTime() - _initial.getTime())/1000
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
          chart.load({
            columns: [
              ['x'].concat(avgs.map(function(s) { return s.time; })),
              ['temp0'].concat(avgs.map(function(s) { return s.temperature; }))
            ],
            duration: 250
          });
        }

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
