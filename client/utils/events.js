define([
  'knockout'
], function (ko) {
  'use strict';

  var session;
  var events = ko.observableArray();

  function newGuid() {
    function s() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s() + s() + '-' + s() + '-' + s() + '-' + s() + '-' + s() + s() + s();
  }


  function emit(topic, data) {
    function add(t, d) {
      if (t === undefined) {
        throw new Error('Event is missing a topic');
      }

      events.unshift({
        topic: t,
        id: newGuid(),
        session: session,
        created: new Date().toUTCString(),
        data: d
      });
      if (events().length > 10000) {
        events.pop();
      }
    }
    setTimeout(add(topic, data), 0);
  }

// Move to string prototype or use ko-mapper in log-model
/*
  function hashCode(text) {
    var hash = 0;
    var i;
    var chr;
    var len;
    if (text.length == 0) {
      return hash;
    }
    for (i = 0, len = text.length; i < len; i++) {
      chr = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  };
*/


  session = newGuid();

  return {
    events: events,
    emit: emit
  };
});
