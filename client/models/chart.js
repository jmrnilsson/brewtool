define([
    'knockout',
    'toastr',
    'utils/framework'
], function (ko, toastr, e) {
'use strict';

    var temperatures = ko.pureComputed(function(){
		return ko.utils.arrayFilter(e.events(), function(ev){
			return ev.topic.indexOf('sense-temperature') > -1;
		});
    });

    var groupedTemperatures = ko.pureComputed(function(){
		return ko.utils.arrayFilter(e.events(), function(ev){
			return ev.topic.indexOf('sense-temperature') > -1;
		});
    });

    function LogViewModel(){
        var self = this;
        self.temperatures = temperatures;
    }
    
    return LogViewModel;
});
