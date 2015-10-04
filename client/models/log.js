define([
    'knockout',
    'toastr',
    'models/events'
], function (ko, toastr, e) {
'use strict';

    var query = ko.observable();
    var enabledFilter = ko.computed(function(){return query() !== undefined && query() !== ''; });

    var filteredEvents = ko.computed(function(){
        var currentQuery = query();
        if (currentQuery == undefined || currentQuery == ''){
            return e.events().slice(0, 250);
        }
        else{
            return ko.utils.arrayFilter(e.events(), function(ev){
                return ev.topic.indexOf(currentQuery) > -1;
            });
        }
    }); 

    function LogViewModel(){
        var self = this;
        self.filteredEvents = filteredEvents;
        self.query = query;
        self.enabledFilter = enabledFilter;
    }
    
    return LogViewModel;
});
