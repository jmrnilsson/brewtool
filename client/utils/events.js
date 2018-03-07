define([
  'knockout'
], function(ko) {
  'use strict';

  var session;
  var events = ko.observableArray();
  var fiveMinutes = ko.computed(function() {
    return ko.utils.arrayFilter(events(), function(e) {
      var future = new Date(Date.parse(e.created) + 2 * 60000);
      return future > new Date();
    });
  });

  function newGuid() {
    function s() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s() + s() + '-' + s() + '-' + s() + '-' + s() + '-' + s() + s() + s();
  }

  session = newGuid();

  function emit(topic, data) {
    function add(t, d) {
      if (!t) {
        throw new Error('Event is missing a topic');
      }

      events.unshift({
        topic: t,
        id: newGuid(),
        session: session,
        created: new Date().toUTCString(),
        data: d
      });
      if (events().length > 14400) {
        events.pop();
      }
    }
    setTimeout(add(topic, data), 0);
  }

  return {
    events: events,
    fiveMinutes: fiveMinutes,
    emit: emit
  };
});
