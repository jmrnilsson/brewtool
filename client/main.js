require.config({
  paths: {
    jquery: './bower_components/jquery/dist/jquery.min',
    knockout: './bower_components/knockout/dist/knockout',
    text: './bower_components/text/text',
    socketio: './bower_components/socket.io-client/socket.io',
    toastr: './bower_components/toastr/toastr',
    path: './bower_components/pathjs/path',
    immutable: './bower_components/immutable/dist/immutable',
    moment: './bower_components/moment/moment',
  },
  shim: {
    path: {exports: 'Path'}
  }
});

require([
  'app',
], function(app){
  app.start();
});
