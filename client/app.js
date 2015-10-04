define([
  'knockout',
  'path',
  'models/events',
  'jquery',
  'text!./bower.json'
], function(ko, Path, events, $, bower){

  var bowerPackage = JSON.parse(bower);

  function start(){
    
    // Register ko
    ko.components.register('temperature', { require: 'views/temperatureView' });
    ko.components.register('calculator', { require: 'views/calculatorView' });
    ko.components.register('log', { require: 'views/logView' });
  
    // Add routes 
    var Routes = {name: ko.observable('temperature')};
    var Navbar = {
      version: bowerPackage.version,
      temperature: ko.pureComputed(function(){return Routes.name() === 'temperature'? 'active':null;}),
      calculator: ko.pureComputed(function(){return Routes.name() === 'calculator'? 'active':null;}),
      log: ko.pureComputed(function(){return Routes.name() === 'log'? 'active':null;}),
    };
    
    // Register paths
    Path.map("#/temperature").to(function () {Routes.name('temperature');});
    Path.map("#/calculator").to(function () {Routes.name('calculator');});
    Path.map("#/log").to(function () {Routes.name('log');});
    Path.root("#/temperature");
    Path.listen();
    
    // Attach listener (this also wires socket.io)
    events.attach();
    
    $(function(){
      document.title = bowerPackage.name + " " + bowerPackage.version;
      ko.applyBindings(Routes, document.getElementById('content'));
      ko.applyBindings(Navbar, document.getElementById('bs-navbar-collapse-1'));
    });
  }

  return {
    start: start
  };
});