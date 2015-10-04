define([
  'knockout',
  'path',
  'models/events',
  'jquery',
  'models/routes',
  'models/navbar',
  'utils/extensions'
], function(ko, Path, events, $, routes, navbar, extensions){

  function start(){
    
    // Register ko
    ko.components.register('temperature', { require: 'views/temperatureView' });
    ko.components.register('calculator', { require: 'views/calculatorView' });
    ko.components.register('log', { require: 'views/logView' });
    ko.extenders.gravity = extensions.gravity;
  
    // Register paths
    Path.map("#/temperature").to(function () {routes.name('temperature');});
    Path.map("#/calculator").to(function () {routes.name('calculator');});
    Path.map("#/log").to(function () {routes.name('log');});
    Path.root("#/temperature");
    Path.listen();
    
    // Attach listener (this also wires socket.io)
    events.attach();
    
    $(function(){
      ko.applyBindings(routes, document.getElementById('content'));
      ko.applyBindings(navbar, document.getElementById('bs-navbar-collapse-1'));
    });
  }

  return {
    start: start
  };
});