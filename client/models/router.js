define([
  'knockout',
  'path',
  'text!../bower.json'
], function (ko, Path, bower) {
'use strict';

  var bowerPackage = JSON.parse(bower);
  var defaultRoute = 'temperature';
  var routes = [defaultRoute, 'calculator', 'log'];
  var route = ko.observable(defaultRoute);
  var combinedRoutes = [];
  
  function Route(routeText){
    var self = this;
    self.href = '#/' + routeText;
    self.value = routeText;
    self.text = routeText.charAt(0).toUpperCase() + routeText.slice(1);
  }
  
  routes.forEach(function(r){
    Path.map('#/' + r).to(function () {route(r);});
    combinedRoutes.push(new Route(r));
  });
  Path.root('#/' + route());
    
  return {
    route: route,
    routes: combinedRoutes,
    version: bowerPackage.version,
    listen: Path.listen
  };
});
