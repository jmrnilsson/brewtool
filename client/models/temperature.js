define([
    'knockout',
    'models/events',
    'models/alarm'
], function (ko, events, alarm) {
'use strict';
    
    var low = ko.observable();
    var high = ko.observable();
    var temp = ko.pureComputed(function(){
        var first = ko.utils.arrayFirst(events.events(), function(event){
            return event.topic === 'sense-temperature';
        });
        return first ? first.data.temperature : '';
    });
    var tempText = ko.pureComputed(function(){
        return temp() ? temp() + ' °C': '';
    });
    var lowText = ko.pureComputed(function(){
        return low() ? low() + ' °C' : '';
    });
    var highText = ko.pureComputed(function(){
        return high() ? high() + ' °C' : '';
    }); 

    temp.subscribe(function(){
        var t = temp();
        if (low() == undefined || low() > t){
            low(t);
        }
        if (high() == undefined || high() < t){
            high(t);
        }
    });

    function clear(){
        low(null);
        high(null);
    };

    var TemperatureViewModel = function(){
        var self = this;

        // observables
        self.tempText = tempText;
        self.lowText = lowText;
        self.highText  = highText;
        self.alarm = alarm;

        // actions
        self.clear = clear;
    };

    return TemperatureViewModel;
});
