require.config({
  paths: {
    jquery: './node_modules/jquery/dist/jquery.min',
    knockout: './node_modules/knockout/build/output/knockout-latest',
    text: './node_modules/text/text',
    socketio: './node_modules/socket.io-client/socket.io',
    toastr: './node_modules/toastr/toastr',
    path: './lib/path.min',
    immutable: './node_modules/immutable/dist/immutable'
  },
  shim: {
    path: {exports: 'Path'}
  }
});

require(['app'], function(app) {
  app.start();
});
