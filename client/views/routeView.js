define([
	'models/router',
	'immutable'
], function (router, Immutable) {
'use strict';
	
	// To be replaces with templated string in ES6
	function row(route){
		return '<li data-bind="css: {\'active\': \''+ route +'\' === route()}"><a href="#/' + route + '">' + route.charAt(0).toUpperCase() + route.slice(1) + '</a></li>';
	}
	
	function generate(routes, parentElement){
		var html = '';
		routes.forEach(function(route, index, all){
			html += row(all.get(index));
		})
		html += '<li><a target="spec" class="header" href="./spec_runner.html">Specifications</a></li>';
		parentElement.innerHTML = html;	
	}

	return {create: generate};	
});