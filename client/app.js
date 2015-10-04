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
    ko.extenders.gravity = function(target, overrideMessage) {
      //add some sub-observables to our observable
      target.hasError = ko.observable();
      target.hasSuccess = ko.observable();
  
      function errors(gr){
          return gr == undefined || isNaN(gr) || gr < 1 || gr > 1.3 && gr < 1000 || gr > 1300
      };
      
      function validate(newValue) {
        var er = errors(newValue)
          target.hasError(er);
      }
      
      validate(target());
      target.hasSuccess(target() && !target.hasError())
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