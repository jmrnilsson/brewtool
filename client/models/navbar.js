define([
  'models/routes',
  'text!../bower.json',
  'knockout'
], function (routes, bower, ko) {
'use strict';
	
  var bowerPackage = JSON.parse(bower);
  
  return {
    version: bowerPackage.version,
    temperature: ko.pureComputed(function(){return routes.name() === 'temperature'? 'active':null;}),
    calculator: ko.pureComputed(function(){return routes.name() === 'calculator'? 'active':null;}),
    log: ko.pureComputed(function(){return routes.name() === 'log'? 'active':null;}),
  };
});
