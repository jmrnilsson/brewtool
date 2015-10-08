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
  
  routes.forEach(function(r){
    Path.map('#/' + r).to(function () {route(r);});
  });
  Path.root('#/' + route());
    
  return {
    route: route,
    routes: routes,
    version: bowerPackage.version,
    listen: Path.listen
  };
});
