define([
    'knockout',
    'utils/abvCalculator',
    'toastr',
    'utils/framework',
    'models/gravity'
], function (ko, Abv, toastr, events, Gravity) {
'use strict';

    var gravity = new Gravity(1050, 1010);
    var mode = ko.observable('compensated');
    var modeText = ko.pureComputed(function(){return mode().charAt(0).toUpperCase() + mode().slice(1);});
    var abv = ko.observable();

    function calculate(data, event){
        var onclick = arguments.length > 1;
        var model = new Abv(gravity.original(), gravity.final());
        model.alcoholByVolume(mode(), success(onclick), fail);
    };

    function format(alcoholByVolume){
        return alcoholByVolume ? alcoholByVolume + ' %' : 'N/A';
    }

    function fail(failure){
        abv(format(null));
        failure.errors.forEach(function(error){
            toastr.error(error);
        });
    }

    function success(onclick){
        function setAbv(alcoholByVolume){
            abv(format(alcoholByVolume.toFixed(2)));
            if (onclick) {
                events.emit('calculated-abv', {abv: alcoholByVolume, mode: mode()});
            }
        }
        return setAbv;
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
