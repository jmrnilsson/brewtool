define([
    'knockout',
    'util/abvCalculator',
    'toastr',
    'models/events',
    'models/gravity'
], function (ko, Abv, toastr, events, Gravity) {
'use strict';

    var gravity = new Gravity(1050, 1010);
    var mode = ko.observable('compensated');
    var modeText = ko.pureComputed(function(){return mode().charAt(0).toUpperCase() + mode().slice(1);});
    var alcoholByVolume = ko.observable();
    var alcoholByVolumeText = ko.pureComputed(function(){ return alcoholByVolume() ?  alcoholByVolume() + ' %' : 'N/A'});

    function calculate(data, event){
        var model = new Abv(gravity.original(), gravity.final());
        model.alcoholByVolume(mode(), 
        function(abv){
            alcoholByVolume(abv.toFixed(2));
            events.emit('calculated-abv', {abv: abv, mode: mode()});
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
