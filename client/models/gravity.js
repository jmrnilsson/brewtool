define([
	'knockout'
], function (ko) {
'use strict';
	
    var original = ko.observable().extend({gravity: null});
    var final = ko.observable().extend({gravity: null});
    var hasErrors = ko.observable();
    
    [original, final].forEach(function(observable){
        observable.subscribe(function(){
            var larger = original() < final();
            hasErrors(larger);
        });
    });

    var Gravity = function(originalGravity, finalGravity){
        var self = this;
        self.original = original;
        self.final = final;
        self.hasErrors = hasErrors;
        self.original(originalGravity);
        self.final(finalGravity);
    };
    return Gravity;
});
