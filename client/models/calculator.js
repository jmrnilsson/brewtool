define([
    'knockout',
    'utils/abvCalculator',
    'toastr',
    'models/events',
    'models/gravity'
], function (ko, Abv, toastr, events, Gravity) {
'use strict';

    var gravity = new Gravity(1050, 1010);
    var mode = ko.observable('compensated');
    var modeText = ko.pureComputed(function(){return mode().charAt(0).toUpperCase() + mode().slice(1);});
    var alcoholByVolume = ko.observable();
    // Perhaps this shouldn't be computed. It is determined on very specific occasions i.e. when 'calculate' is called. Rather have
    // a function that formats to the correct output when setting. However both abv and formatted abv needs to provided by this 
    // view model.
    var alcoholByVolumeText = ko.pureComputed(function(){ return alcoholByVolume() ?  alcoholByVolume() + ' %' : 'N/A'});

    function calculate(data, event){
        var requested = arguments.length > 1;
        var model = new Abv(gravity.original(), gravity.final());
        model.alcoholByVolume(mode(), 
        function(abv){
            alcoholByVolume(abv.toFixed(2));
            // Make pretty after Q.promise has been merged from ES6 branch or replaced with synchronous call 
            // (but then validation needs to be incorporated into calculator.js or gravity.js)
            if (requested) {
                events.emit('calculated-abv', {abv: abv, mode: mode()});
            }
        },    
        function(error){
            toastr.error(error);
            alcoholByVolume(null);
        });
    };
    
    var CalculatorViewModel = function(){
        var self = this;

        // observables
        self.gravity = gravity;
        self.alcoholByVolumeText = alcoholByVolumeText;
        self.modeText = modeText;

        // actions
        self.calculate = calculate;     
        self.mode = mode;
        
        self.calculate();
    };

    return CalculatorViewModel;
});
