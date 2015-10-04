define([
    'knockout',
    'models/abvCalculator',
    'toastr',
    'models/events'
], function (ko, AbvCalculator, toastr, events) {
'use strict';

    var originalGravity = ko.observable('1050').extend({gravity: "" });
    var finalGravity = ko.observable('1010').extend({gravity: "" });
    var mode = ko.observable('compensated');
    var modeText = ko.pureComputed(function(){return mode().charAt(0).toUpperCase() + mode().slice(1);});
    var alcoholByVolume = ko.observable();
    var alcoholByVolumeText = ko.pureComputed(function(){ return alcoholByVolume() ?  alcoholByVolume() + ' %' : 'N/A'});

    function calculate(data, event){
        var model = new AbvCalculator(originalGravity(), finalGravity());
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
        self.originalGravity = originalGravity;
        self.finalGravity = finalGravity;
        self.alcoholByVolumeText = alcoholByVolumeText;
        self.modeText = modeText;

        // actions
        self.calculate = calculate;     
        self.mode = mode;
        
        self.calculate();
    };

    return CalculatorViewModel;
});
