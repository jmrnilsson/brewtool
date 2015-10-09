define([
  'knockout',
  'models/events',
  'jquery',
  'models/router',
  'utils/extensions',
  'views/routeView',
  'path'
], function(ko, events, $, router, extensions, routeView, Path){

  function start(){
    
    var routes = router.routes;
    
    // Register ko
    ko.components.register('temperature', { require: 'views/temperatureView' });
    ko.components.register('calculator', { require: 'views/calculatorView' });
    ko.components.register('log', { require: 'views/logView' });
    ko.extenders.gravity = extensions.gravity;
    ko.extenders.float = extensions.float;
  
    // Listen to paths   
    routes.forEach(function(route, index, routeList){
      Path.map('#/' + routeList.get(index)).to(function () {router.route(routeList.get(index));});
    });
    Path.root('#/' + routes.get(0));
    Path.listen();
    
    // Attach listener (this also wires socket.io)
    events.attach();
    
    $(function(){
      routeView.create(router.routes, document.getElementById('navbar'));
      ko.applyBindings(router, document.getElementById('content'));
      ko.applyBindings(router, document.getElementById('bs-navbar-collapse-1'));
    });
  }

  return {
    start: start
  };
});