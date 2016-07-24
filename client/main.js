require.config({
  paths: {
    jquery: './node_modules/jquery/dist/jquery.min',
    knockout: './node_modules/knockout/build/output/knockout-latest',
    text: './node_modules/text/text',
    socketio: './node_modules/socket.io-client/socket.io',
    toastr: './node_modules/toastr/toastr',
    path: './lib/path.min',
    immutable: './node_modules/immutable/dist/immutable',
    chart: './node_modules/chart.js/dist/Chart',
    knockoutchart: './lib/knockout.chart'
  },
  shim: {
    path: {exports: 'Path'}
  }
});

require(['app'], function(app) {
  app.start();
});
