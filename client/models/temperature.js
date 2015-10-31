define([
    'knockout',
    'utils/events',
    'models/alarm'
], function (ko, events, alarm) {
'use strict';

    var low = ko.observable();
    var high = ko.observable();
    var temp = ko.pureComputed(function(){
        var first = ko.utils.arrayFirst(events.events(), function(event){
            return event.topic === 'sense-temperature';
        });
        return first ? first.data.celsius : '';
    });
    var tempText = ko.pureComputed(function(){return temp() ? temp() + ' °C': '';});

    temp.subscribe(function(){
        var t = temp();
        var l = low();
        var h = high();
        if (l == undefined || l > t){
            low(t);
        }
        if (h == undefined || h < t){
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
        self.temp = temp;
        self.low = low;
        self.high  = high;
        self.alarm = alarm;

        // actions
        self.clear = clear;
    };

    return TemperatureViewModel;
});
