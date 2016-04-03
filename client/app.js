define([
  'knockout',
  'utils/events',
  'jquery',
  'utils/extensions',
  'path',
  'immutable',
  'text!./bower.json',
  'socketio'
], function(ko, events, $, extensions, Path, Immutable, bowerConfiguration, io){

  function start(){
    // Declare routes and read configuration
    var bower = JSON.parse(bowerConfiguration);
    var routes = Immutable.List.of('temperature', 'calculator', 'log');
    var model = {route: ko.observable(routes.get(0))};
    var socket = null;

    // Register ko
    ko.components.register('temperature', { require: 'views/temperatureView' });
    ko.components.register('calculator', { require: 'views/calculatorView' });
    ko.components.register('log', { require: 'views/logView' });
    ko.components.register('chart', { require: 'views/chartView' });
    ko.extenders.gravity = extensions.gravity;
    ko.extenders.float = extensions.float;

    // Listen to paths
    routes.forEach(function(r, index, all){
      Path.map('#/' + all.get(index)).to(function () {model.route(all.get(index));});
    });
    Path.root('#/' + routes.get(0));
    Path.listen();

    // Attach listener (this also wires socket.io)
    (function() {
        socket = io.connect('http://' + location.host);
        socket.on('sense-temperature', function (event) {
            events.emit('sense-temperature', event);
        });

        var navbarText = document.getElementsByClassName('navbar-text')[0];
        navbarText.innerHTML = bower.version;
        ko.applyBindings(model, document.body);
	}());
  }

  return {
    start: start
  };
});
