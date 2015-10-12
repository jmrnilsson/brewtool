define([
	'socketio',
	'knockout'
], function (io, ko) {
'use strict';

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
			
			events.unshift({
				topic: topic, 
				created: new Date().toUTCString(),
				data: data
			});
			if(events().length > 10000){
				events.pop();
			}
		}
		
		setTimeout(add(topic, data), 0);
	}

	return {
		events: events, 
		emit: emit, 
		attach: attach
	};		
});