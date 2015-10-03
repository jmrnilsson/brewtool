define([
	'socketio',
	'knockout'
], function (io, ko) {
'use strict';

	var socket = null;
	var events = ko.observableArray();

	function attach(){
		socket = io.connect('http://' + location.host);
		socket.on('sense-temperature', function (event) {
			emit('sense-temperature', event);
		});
	}

	function emit(topic, data){		
		if (topic == undefined){
            throw "Event is missing a topic";
        }
		events.unshift({
			topic: topic, 
			created: new Date().toUTCString(),
			data: data
		});
		if(events().length > 10000){
			events.pop();
		}
	}

	return {
		events: events, 
		emit: emit, 
		attach: attach
	};		
});