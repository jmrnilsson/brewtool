define([
    'knockout',
    'models/abvCalculator',
    'toastr',
    'models/events'
], function (ko, AbvCalculator, toastr, events) {
'use strict';

    var originalGravity = ko.observable('1050');
    var finalGravity = ko.observable('1010');
    var mode = ko.observable('compensated');
    var alcoholByVolume = ko.observable();

    var alcoholByVolumeText = ko.computed(function(){
        var abv = alcoholByVolume();
        if (abv == undefined || isNaN(abv)){
            return 'N/A';
        }
        return abv + ' %';
    });
    
    var modeText = ko.computed(function(){
        var modeValue = mode();
        return modeValue.charAt(0).toUpperCase() + modeValue.slice(1);
    });

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
