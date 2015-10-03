define([
  'knockout',
  'path',
  'models/events',
  'jquery'
], function(ko, Path, events, $){

  var version = [0, 0, 0, 2];

  function start(){
    
    // Register ko
    ko.components.register('temperature', { require: 'views/temperatureView' });
    ko.components.register('calculator', { require: 'views/calculatorView' });
    ko.components.register('log', { require: 'views/logView' });
  
    // Add routes 
    var Routes = {name: ko.observable('temperature')};
    
    // Register paths
    Path.map("#/temperature").to(function () {Routes.name('temperature');});
    Path.map("#/calculator").to(function () {Routes.name('calculator');});
    Path.map("#/log").to(function () {Routes.name('log');});
    Path.root("#/temperature");
    Path.listen();
    
    // Attach listener (this also wires socket.io)
    events.attach();
    
    $(function(){
      document.getElementById('app-version').innerHTML = version.join('.');;
      ko.applyBindings(Routes, document.getElementById('content'));
    });
  }

  return {
    start: start
  };
});