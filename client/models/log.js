define([
  'knockout',
  'toastr',
  'utils/events'
], function(ko, toastr, e) {
  'use strict';

  var query = ko.observable();
  var enabledFilter = ko.pureComputed(function() {
    return query() !== undefined && query() !== '';
  });

  var filteredEvents = ko.pureComputed(function() {
    var currentQuery = query();
    if (!!currentQuery) {
      return e.events().slice(0, 250);
    }
    return ko.utils.arrayFilter(e.events(), function(ev) {
      return ev.topic.indexOf(currentQuery) > -1;
    });
  });

  function LogViewModel() {
    var self = this;
    self.filteredEvents = filteredEvents;
    self.query = query;
    self.enabledFilter = enabledFilter;
  }

  return LogViewModel;
});
