define([
	'socketio',
	'knockout',
	'jquery'
], function (io, ko, $) {
'use strict';

	var session = newGuid();
	var socket = null;
	var events = ko.observableArray();

	function attach(){
		socket = io.connect('http://' + location.host);
		socket.on('sense-temperature', function (event) {emit('sense-temperature', event);});
	}

	function emit(topic, data){
		function add(topic, data){
			if (topic == undefined){
				throw new Error("Event is missing a topic");
			}

			if (topic === 'calculated-abv'){
				socket.emit(topic, data);
			}

			if (topic === 'reset-session'){
				socket.emit(topic, {});
			}

			events.unshift({
				topic: topic,
				id: newGuid(),
				session: session,
				created: new Date().toUTCString(),
				data: data
			});
			if(events().length > 10000){
				events.pop();
			}
		}

		setTimeout(add(topic, data), 0);
	}
	function formatTime(myDate){
		return myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
	}

	// Move to string prototype or use ko-mapper in log-model
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

	function newGuid() {
		function seed() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return seed() + seed() + '-' + seed() + '-' + seed() + '-' + seed() + '-' + seed() + seed() + seed();
	}

	return {
		events: events,
		emit: emit,
		attach: attach
	};
});