define([
  'knockout',
  'text!../bower.json',
  'immutable'
], function (ko, bower, Immutable) {
'use strict';

  var bowerPackage = JSON.parse(bower);
  var defaultRoute = 'temperature';
  var routes = Immutable.List.of(defaultRoute, 'calculator', 'log');
  var route = ko.observable(defaultRoute);
  
  return {
    route: route,
    routes: routes,
    version: bowerPackage.version
  };
});
