define([
  'knockout',
  'utils/framework',
  'jquery',
  'utils/extensions',
  'path',
  'immutable',
  'text!./bower.json',
  'utils/guid'
], function(ko, events, $, extensions, Path, Immutable, bowerConfiguration, guid){

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

  function start(){

    // Declare routes and read configuration
    var bower = JSON.parse(bowerConfiguration);
    var routes = Immutable.List.of('temperature', 'calculator', 'log');
    var model = {route: ko.observable(routes.get(0))};

    // Register ko
    ko.components.register('temperature', { require: 'views/temperatureView' });
    ko.components.register('calculator', { require: 'views/calculatorView' });
    ko.components.register('log', { require: 'views/logView' });
    ko.components.register('chart', { require: 'views/chartView' });
    ko.extenders.gravity = extensions.gravity;
    ko.extenders.float = extensions.float;

    // Listen to paths
    routes.forEach(function(r, index, all){
      Path.map('#/' + all.get(index)).to(function () {model.route(all.get(index));});
    });
    Path.root('#/' + routes.get(0));
    Path.listen();

    // Attach listener (this also wires socket.io)
    events.attach();

    $(function(){
      var navbarText = document.getElementsByClassName('navbar-text')[0];
      navbarText.innerHTML = bower.version;
      ko.applyBindings(model, document.body);
    });
  }

  return {
    start: start
  };
});
