define([
    'knockout',
    'models/events',
    'models/alarm'
], function (ko, events, alarm) {
'use strict';
    
    var lowTemperature = ko.observable();
    var highTemperature = ko.observable();

    var sense = ko.pureComputed(function(){
        return ko.utils.arrayFirst(events.events(), function(event){
            return event.topic === 'sense-temperature';
        });
    });
    
    sense.subscribe(function(){
        var temp = sense().data.temperature;
        if (lowTemperature() == undefined || lowTemperature() > temp){
            lowTemperature(temp);
        }
        if (highTemperature() == undefined || highTemperature() < temp){
            highTemperature(temp);
        }
    });

    var temperatureText = ko.computed(function(){
        if (sense() != undefined){
            return sense().data.temperature + ' °C';
        }
        return '';
    });
    var lowText = ko.computed(function(){
        if (lowTemperature() != undefined){
            return lowTemperature() + ' °C';
        }
        return '';
    });
    var highText = ko.computed(function(){
        if (highTemperature() != undefined){
            return highTemperature() + ' °C';
        }
        return '';
    });

    function clear(){
        lowTemperature(null);
        highTemperature(null);
    };

    var TemperatureViewModel = function(){
        var self = this;

        // observables
        self.temperatureText = temperatureText;
        self.lowText = lowText;
        self.highText  = highText;
        self.alarm = alarm;

        // actions
        self.clear = clear;
    };

    return TemperatureViewModel;
});
