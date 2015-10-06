define([
   'knockout',
   'models/events'
], function (ko, events) {
'use strict';

	var played = null;
	var low = ko.observable();
	var high = ko.observable();
	var active = ko.observable(false);
	
	var sense = ko.pureComputed(() => 
		ko.utils.arrayFirst(events.events(), event =>
			event.topic === 'sense-temperature'
		));
	
	// Less eager than wrapping evaluate as computed
	[sense, low, high, active].forEach(observable => observable.subscribe(() => evaluate()))

	function evaluate(){
		var temp = sense().data.temperature;
		var below = low() > temp;
		var above = high() < temp;
		var play = played == undefined || (new Date().getTime() - played) > 10000;
		
		if (play && active() && (above || below)){
			var audio = new Audio('./resources/Blop-Mark_DiAngelo-79054334.mp3');
			audio.play();
			played = new Date().getTime();
			events.emit('alarm', {below: below, above: above, temperature: temp});
		}
	}
	
	return {
		low: low,
		high: high,
		active: active
	};
});
