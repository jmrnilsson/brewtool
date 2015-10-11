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
  
  function floatExtension(target, args) {
      target.hasError = ko.observable();
      // Currently needs some work in terms of styling and parseFloat will omit some chars.
      function valid(value){
        if (value == undefined){
          return true;
        }
        return (value.match(/^-?\d*(\.\d+)?$/));
        // if (value != undefined){
        //   if (value != ''){
        //     var float = parseFloat(value);
        //     return !isNaN(float);
        //   }
        // }
        // return true;
      }
      function validate(value) {
        target.hasError(!valid(value));
      }      
      validate(target());
      target.subscribe(validate);
      return target;
    };
  
  return {
    gravity: gravityExtension,
    float: floatExtension
  };
});
