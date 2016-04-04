define([
  'knockout'
], function(ko) {
  'use strict';

  function convert(gravity) {
    return gravity > 1000 ? gravity / 1000 : gravity;
  }

  function Gravity(originalGravity, finalGravity) {
    var self = this;
    self.original = ko.observable().extend({ gravity: null });
    self.final = ko.observable().extend({ gravity: null });
    self.hasError = ko.pureComputed(function() {
      return convert(self.original()) < convert(self.final());
    });
    self.original(originalGravity);
    self.final(finalGravity);
  }

  return Gravity;
});
