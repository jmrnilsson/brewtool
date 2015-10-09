define([
	'models/router',
	'immutable',
	'jquery'
], function (router, Immutable, $) {
'use strict';
	
	// To be replaced with templated string in ES6. Remove jquery and id and inline-style of li-elements,
	// index in row-function and jquery when cleaning up jquery from this.
	
	function row(route, i){
		return '<li style="display:none;" id="navitem'+i+'" data-bind="css: {\'active\': \''+ route +'\' === route()}"><a href="#/' + route + '">' + route.charAt(0).toUpperCase() + route.slice(1) + '</a></li>';
	}
	
	function generate(routes, parentElement){
		var html = '';
		routes.forEach(function(route, index, all){
			html += row(all.get(index), index);
		})
		html += '<li id="navitem3" style="display:none;"><a target="spec" class="header" href="./spec_runner.html">Specifications</a></li>';
		parentElement.innerHTML = html;	

		$('#navitem'+0).fadeIn(200);
		$('#navitem'+1).fadeIn(300);	
		$('#navitem'+2).fadeIn(400);	
		$('#navitem'+3).fadeIn(500);
	}
	return {create: generate};	
});