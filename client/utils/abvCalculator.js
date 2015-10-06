define(['q'], 
function (Q) {
'use strict';

	// Alcohol by volume formulas
	/////////////////////////////
	
	// Simplified: Handy simple formula commonly used. http://www.homebrewdad.com/abv_calculator.php
	// Compensated. Makes adjustments for real extract. Slighly better than the simplified formula. http://www.ratebeer.com/forums/calculating-abv_121228.htm
	// %ABV = (((668.72*OG - 463.37 - 205.347 * OG^2)-(0.1808*(668.72*OG - 463.37 - 205.347 * OG^2) + 0.8192*(668.72*FG - 463.37 - 205.347 * FG^2)))/(2.0665-0.010665*(668.72*OG - 463.37 - 205.347 * OG^2))/100)*1.25 
	// Plato: Less accurate around 5%, but presumably better precision on high gravity > 10%.
	
	function simple(og, fg){
		return (og - fg) * 131.25;
	}
	
	function compensated(og, fg){
		var constant = 1.25;
		var divisor = (2.0665-0.010665*(668.72*og - 463.37 - 205.347 * Math.pow(og, 2)));
		var divident0 = 668.72*og - 463.37 - 205.347 * Math.pow(og, 2);
		var dividend1 = 0.1808*(668.72*og - 463.37 - 205.347 * Math.pow(og, 2));
		var dividend2 = 0.8192*(668.72*fg - 463.37 - 205.347 * Math.pow(fg, 2));
	
		return constant * ((divident0 - dividend1 - dividend2) / divisor);
	}
	
	function plato(og, fg){
		var oe = (1000 * (og - 1)) / 4; // original extract
		var re = (1000 * (fg - 1)) / 4; // real extract
		var abw = (oe - re) / (2.065 - (0.010665 * oe)); // alcohol by weight
		return (abw * (fg / 0.794)); // alcohol by volume
	}
	
	// Validation
	/////////////
	
	function validateBounds(gravity, gravityType, deferred){
		if (gravity == undefined){
			deferred.reject(new Error(gravityType + ' gravity is not set'));
		}       
		if (isNaN(gravity)){
			deferred.reject(new Error(gravityType + ' gravity is not a number'));
		}        
		if (gravity < 1){
			deferred.reject(new Error(gravityType + ' gravity is too low'));
		}           
		if (gravity > 1.3){
			deferred.reject(new Error(gravityType + ' gravity is too high'));
		}
	};
	
	function validate(deferred, originalGravity, finalGravity){
		var og = originalGravity;
		var fg = finalGravity;

		validateBounds(og, 'Original', deferred);
		validateBounds(fg, 'Final', deferred);
			
		if (fg > og){
			deferred.reject(new Error('Final gravity is greater than original gravity'));
		}
	}; 

	function AbvCalculator(originalGravity, finalGravity){
		var self = this;
		self.valid = false;
		self.validate = validate;
		self.simple = simple;
		self.compensated = compensated;
		self.plato = plato;
        
		// Convert to decimal if > 1000 
		if (originalGravity > 1000){
			originalGravity = originalGravity / 1000;
			finalGravity = finalGravity / 1000;
		};
        
		self.originalGravity = originalGravity;
		self.finalGravity = finalGravity;
     
		self.alcoholByVolume = function(mode){
			var og = self.originalGravity;
			var fg = self.finalGravity;
	
			var deferred = Q.defer();
					
			self.validate(deferred, og, fg);
			if (!self.hasOwnProperty(mode)){
				throw 'Calculation mode type not available. Options include simple, compensated, plato'
			}
					
			var result = self[mode].apply(self, [og, fg]);
			deferred.resolve(result);
			return deferred.promise; 
		};
	};
	return AbvCalculator;
});
