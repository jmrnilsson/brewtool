define([], 
function () {
'use strict';

	function guid() {
		function seed() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return seed() + seed() + '-' + seed() + '-' + seed() + '-' + seed() + '-' + seed() + seed() + seed();
	}

	return {
		newGuid: guid
	};
});
