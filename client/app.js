define([
  'knockout',
  'utils/events',
  'jquery',
  'utils/extensions',
  'path',
  'immutable',
  'text!./package.json',
  'socketio',
  'views',
  'd3'
// eslint-disable-next-line no-unused-vars
], function(ko, events, $, extensions, Path, Immutable, packageJson, io, views, d3) {

  function start() {
    // Declare routes
    var routes = Immutable.List.of('temperature', 'calculator', 'log');
    var model = { route: ko.observable(routes.get(0)) };
    var socket = null;

    // Register ko
    ko.components.register('temperature', { require: 'temperatureView' });
    ko.components.register('calculator', { require: 'calculatorView' });
    ko.components.register('log', { require: 'logView' });
    ko.components.register('graph', { require: 'graphView' });
    ko.extenders.gravity = extensions.gravity;
    ko.extenders.float = extensions.float;

    // Listen to paths
    routes.forEach(function(r, index, all) {
      Path.map('#/' + all.get(index)).to(function() { model.route(all.get(index)); });
    });
    Path.root('#/' + routes.get(0));
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
