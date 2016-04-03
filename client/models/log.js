define([
  'knockout',
  'toastr',
  'utils/events'
], function(ko, toastr, e) {
  'use strict';

  var query = ko.observable();
  var enabledFilter = ko.pureComputed(function() {
    var q = query();
    return q !== undefined && q !== '';
  });

  var filteredEvents = ko.pureComputed(function() {
    var q = query();
    if (q === undefined || q === '') {
      return e.events().slice(0, 250);
    }
    return ko.utils.arrayFilter(e.events(), function(ev) {
      return ev.topic.indexOf(q) > -1;
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
