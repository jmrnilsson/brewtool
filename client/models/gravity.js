define([
	'knockout'
], function (ko) {
'use strict';
	
    var original = ko.observable().extend({gravity: null});
    var final = ko.observable().extend({gravity: null});
    var hasError = ko.pureComputed(function(){
        return original() < final();
    });

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
