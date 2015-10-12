define([
  	'utils/framework',
	'jquery',
	'utils/guid'
], function (router, $, guid) {
'use strict';

	// Generates all items at once using an immutable list instead of relying on KO foreach which is rather slow 
	// especially when using containter-less variant.
	function generateRow(route, i){
		return '<li data-bind="css: {\'active\': \''+ route +'\' === route()}"><a href="#/' + route + '">' + route.charAt(0).toUpperCase() + route.slice(1) + '</a></li>';
	}

	function generate(routes){
		var html = '';
		routes.forEach(function(route, index, all){
			html += generateRow(all.get(index), index);
		})
		html += '<li><a target="spec" class="header" href="./spec_runner.html">Specifications</a></li>';
		return html;
	}

	// Seperate plumbing for jquery fade in. All the 'default' templating is done above. 
	function fadeIn(html, parentElement){
		var identities = [];
		$(html).each(function(index, row){
			var id = guid.newGuid();
			row.style.display = 'none';
			row.id = id;
			identities.push(id);
			$(parentElement).append(row);
		});

		var delay = 100;
		identities.forEach(function(id){
			var el = $('#'+id);
			el.fadeIn(delay += 100, function(){
				// Clean up temporary id's once fade is completed
				el.removeAttr('id');
			});
		});
	}
	
	function create(routes, parentElement){
		fadeIn(generate(routes), parentElement);
	}
	
	return {create: create};	
});