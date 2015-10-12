define([
    'knockout',
    'toastr',
    'utils/framework'
], function (ko, toastr, e) {
'use strict';

    var query = ko.observable();
    var enabledFilter = ko.pureComputed(function(){return query() !== undefined && query() !== ''; });

    var filteredEvents = ko.pureComputed(function(){
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

    function hashCode(text) {
        var hash = 0, i, chr, len;
        if (text.length == 0) {
            return hash;
        }
        for (i = 0, len = text.length; i < len; i++) {
            chr   = text.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    };

    function LogViewModel(){
        var self = this;
        self.filteredEvents = filteredEvents;
        self.query = query;
        self.enabledFilter = enabledFilter;
    }
    
    return LogViewModel;
});
