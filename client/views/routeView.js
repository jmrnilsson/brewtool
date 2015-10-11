define([
	'models/router',
	'jquery'
], function (router, $) {
'use strict';

	function generateRow(route, i){
		return '<li data-bind="css: {\'active\': \''+ route +'\' === \'route()}\'"><a href="#/' + route + '">' + route.charAt(0).toUpperCase() + route.slice(1) + '</a></li>';
	}

	function generate(routes){
		var html = '';
		routes.forEach(function(route, index, all){
			html += generateRow(all.get(index), index);
		})
		html += '<li><a target="spec" class="header" href="./spec_runner.html">Specifications</a></li>';
		return html;
	}

	function guid() {
		function seed() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return seed() + seed() + '-' + seed() + '-' + seed() + '-' + seed() + '-' + seed() + seed() + seed();
	}

	// Keeping jquery fadeIn seperate from template creations
	function fadeIn(html, parentElement){
		var identities = [];
		$(html).each(function(index, row){
			var id = guid();
			row.style.display = 'none';
			row.id = id;
			identities.push(id);
			$(parentElement).append(row);
		});

		var delay = 100;
		identities.forEach(function(id){
			delay += 100;
			$('#'+id).fadeIn(delay);
		});
	}
	
	function create(routes, parentElement){
		fadeIn(generate(routes), parentElement);
	}
	
	return {create: create};	
});