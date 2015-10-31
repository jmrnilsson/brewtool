define([
    'knockout',
    'utils/abvCalculator',
    'toastr',
    'utils/events',
    'models/gravity'
], function (ko, Abv, toastr, events, Gravity) {
'use strict';

    var gravity = new Gravity(1050, 1010);
    var mode = ko.observable('compensated');
    var modeText = ko.pureComputed(function(){return mode().charAt(0).toUpperCase() + mode().slice(1);});
    var abv = ko.observable();

    function calculate(data, event){
        var og = gravity.original();
        var fg = gravity.final();
        try {
            var result = Abv.getAbv(mode(), og, fg);
            abv(format(result.text));

            // Only publish if user initiated calculation
            if (arguments.length > 0){
                events.emit('calculated-abv', {abv: result, mode: mode(), originalGravity: og, finalGravity: fg});
            }
        }
        catch(error){
            abv(format(null));
            var errors = Abv.getErrors(og, fg);
            errors.forEach(function(error){
                toastr.error(error);
            })
        }
    };

    function format(alcoholByVolume){
        return alcoholByVolume ? alcoholByVolume + ' %' : 'N/A';
    }

    var CalculatorViewModel = function(){
        var self = this;

        // observables
        self.gravity = gravity;
        self.abv = abv;
        self.modeText = modeText;

        // actions
        self.calculate = calculate;
        self.mode = mode;

        self.calculate();
    };

    return CalculatorViewModel;
});
