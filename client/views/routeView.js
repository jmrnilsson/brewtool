define([
  'utils/framework',
	'jquery',
	'utils/guid'
], function (router, $, guid) {
'use strict';

	function generateRow(route, i, fadeInDelay){
    var capitalizedRoute =  route.charAt(0).toUpperCase() + route.slice(1);
    return '<li class="js-fade is-paused fade-in-'+fadeInDelay+'" data-bind="css: {\'active\': \''+ route +'\' === route()}"><a href="#/' + route + '" >' + capitalizedRoute + '</a></li>';
	}

	function generate(routes, parentElement){
		var html = '';
    var fadeInDelay = 100;
		routes.forEach(function(route, index, all){
			html += generateRow(all.get(index), index, fadeInDelay += 100);
		})
    fadeInDelay += 100;
		html += '<li><a class="js-fade is-paused fade-in-'+ fadeInDelay +'" target="spec" class="header" href="./spec_runner.html">Specifications</a></li>';
    parentElement.innerHTML = html;

    // animation start
    var elements = parentElement.getElementsByClassName('js-fade');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.classList.contains('is-paused')){
        el.classList.remove('is-paused');
      }
    }
	}

	// Seperate plumbing for jquery fade in. All the 'default' templating is done above.
  /*
	function fadeIn(html, parentElement){
		var identities = [];
    var parser = new DOMParser();
    var dom = parser.parseFromString(html,"text/xml");
    var child = html.firstChild;
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
  */

	function create(routes, parentElement){
		generate(routes, parentElement);
	}
	return {create: create};
});
