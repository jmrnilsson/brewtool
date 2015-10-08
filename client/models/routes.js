define([
  'knockout',
  'path',
  'text!../bower.json'
], function (ko, Path, bower) {
'use strict';

  var bowerPackage = JSON.parse(bower);
  var routes = ['temperature', 'calculator', 'log'];
  var route = ko.observable('temperature');
  
  routes.forEach(function(r){
    Path.map('#/' + r).to(function () {route(r);});
  });
  Path.root('#/' + route());
    
  return {
    name: route,
    routes: routes,
    version: bowerPackage.version,
    listen: Path.listen
  };
});
