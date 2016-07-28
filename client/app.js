define([
  'knockout',
  'utils/events',
  'jquery',
  'utils/extensions',
  'path',
  'text!./package.json',
  'socketio',
  'views'
// eslint-disable-next-line no-unused-vars
], function(ko, events, $, extensions, Path, packageJson, io, views) {

  function start() {
    // Declare routes
    var model = { route: ko.observable('temperature') };
    var socket = null;

    // Register ko
    ko.components.register('temperature', { require: 'temperatureView' });
    ko.components.register('calculator', { require: 'calculatorView' });
    ko.components.register('log', { require: 'logView' });
    ko.components.register('graph', { require: 'graphView' });
    ko.extenders.gravity = extensions.gravity;
    ko.extenders.float = extensions.float;

    // Listen to paths
    Path.map('#/temperature').to(function() { model.route('temperature'); });
    Path.map('#/calculator').to(function() { model.route('calculator'); });
    Path.map('#/log').to(function() { model.route('log'); });
    Path.root('#/temperature');
    Path.listen();

    // Bind ko
    document.getElementsByClassName('navbar-text')[0].innerHTML = JSON.parse(packageJson).version;
    ko.applyBindings(model, document.body);

    // Attach listener (this also wires socket.io)
    socket = io.connect('http://' + location.host);
    socket.on('sense-temperature', function(event) {
      events.emit('sense-temperature', event);
    });

  }

  return { start: start };
});
