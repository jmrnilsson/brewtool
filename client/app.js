define([
  'knockout',
  'path',
  'models/events',
  'jquery',
  'models/routes',
  'models/navbar'
], function(ko, Path, events, $, routes, navbar){

  function start(){
    
    // Register ko
    ko.components.register('temperature', { require: 'views/temperatureView' });
    ko.components.register('calculator', { require: 'views/calculatorView' });
    ko.components.register('log', { require: 'views/logView' });
  
    // Register extenders
    ko.extenders.gravity = function(target, args) {
      target.hasError = ko.observable();
      target.hasSuccess = ko.observable();
      
      function validate(value) {
        var errors = value == undefined || isNaN(value) || value < 1 || value > 1.3 && value < 1000 || value > 1300;
          target.hasError(errors);
          target.hasSuccess(!errors);
      }
      
      validate(target());
      target.subscribe(validate);
      return target;
    };
  
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