require.config({
  paths: {
    jquery: './libs/jquery.min',
    knockout: './libs/knockout-latest',
    text: './libs/text',
    socketio: './libs/socket.io',
    toastr: './libs/toastr',
    path: './libs/path.min',
    d3: './libs/d3.min',
    c3: './libs/c3/c3'
  },
  shim: {
    path: {exports: 'Path'}
  }
});

require(['app'], function(app) {
  app.start();
});
