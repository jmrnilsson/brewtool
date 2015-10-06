define([
	'knockout'
], function (ko) {
'use strict';
	
    var original = ko.observable().extend({gravity: null});
    var final = ko.observable().extend({gravity: null});
    var hasError = ko.pureComputed(function(){
        var og = original();
        var fg = final();
        og = og > 1000 ? og / 1000 : og;
        fg = fg > 1000 ? fg / 1000 : fg;
        return og < fg;
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
