define([
  'knockout',
  'utils/framework',
  'jquery',
  'utils/extensions',
  'views/routeView',
  'path',
  'immutable',
  'text!./bower.json'
], function(ko, events, $, extensions, routeView, Path, Immutable, bowerConfiguration){

  function start(){
    
    // Declare routes and read configuration
    var bower = JSON.parse(bowerConfiguration);
    var defaultRoute = 'temperature';
    var routes = Immutable.List.of(defaultRoute, 'calculator', 'log');
    var model = {route: ko.observable(defaultRoute)};
      
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
    events.attach();
    
    $(function(){
      var navbar = document.getElementById('navbar-collapse');
      document.getElementsByClassName('navbar-text')[0].innerHTML = bower.version;
      routeView.create(routes, navbar.firstElementChild);
      ko.applyBindings(model, document.body);
    });
  }

  return {
    start: start
  };
});