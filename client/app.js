define([
  'knockout',
  'models/events',
  'jquery',
  'models/router',
  'utils/extensions'
], function(ko, events, $, router, extensions){

  function start(){
    
    // Register ko
    ko.components.register('temperature', { require: 'views/temperatureView' });
    ko.components.register('calculator', { require: 'views/calculatorView' });
    ko.components.register('log', { require: 'views/logView' });
    ko.extenders.gravity = extensions.gravity;
  
    // Listen to paths
    router.listen();
    
    // Attach listener (this also wires socket.io)
    events.attach();
    
    $(function(){
      ko.applyBindings(router, document.getElementById('content'));
      ko.applyBindings(router, document.getElementById('bs-navbar-collapse-1'));
    });
  }

  return {
    start: start
  };
});