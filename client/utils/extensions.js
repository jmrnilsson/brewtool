define([
  'knockout'
], function (ko) {
'use strict';
	
  function gravityExtension(target, args) {
      target.hasError = ko.observable();
      
      function validate(value) {
        var errors = value == undefined || isNaN(value) || value < 1 || value > 1.3 && value < 1000 || value > 1300;
          target.hasError(errors);
      }      
      validate(target());
      target.subscribe(validate);
      return target;
    };
  
  return {
    gravity: gravityExtension
  };
});
