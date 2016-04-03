define([
	'knockout'
], function (ko) {
'use strict';

    function convert(gravity){
        return gravity > 1000 ? gravity / 1000 : gravity;
    }

    var original = ko.observable().extend({gravity: null});
    var final = ko.observable().extend({gravity: null});
    var hasError = ko.pureComputed(function(){return convert(original()) < convert(final());});

    var Gravity = function(originalGravity, finalGravity){
        var self = this;
        self.original = original;
        self.final = final;
        self.hasError = hasError;
        self.original(originalGravity);
        self.final(finalGravity);
    };

    return Gravity;
});
