define([], 
function () {
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
	
	function validateBounds(gravity, gravityType, callback){
		if (gravity == undefined){
			callback(gravityType + ' gravity is not set');
		}       
		if (isNaN(gravity)){
			callback(gravityType + ' gravity is not a number');
		}        
		if (gravity < 1){
			callback(gravityType + ' gravity is too low');
		}           
		if (gravity > 1.3){
			callback(gravityType + ' gravity is too high');
		}
	};
	
	function validate(fail, originalGravity, finalGravity){
		var og = originalGravity;
		var fg = finalGravity;
		var errors = [];
			
		// Intercepted callback
		var intercepted = function(message){
			fail(message);
			errors.push(message);
		};
			
		validateBounds(og, 'Original', intercepted);
		validateBounds(fg, 'Final', intercepted);
			
		if (fg > og){
			intercepted('Final gravity is greater than original gravity');
		}
			
		return errors.length == 0;
	}; 

	function AbvCalculator(originalGravity, finalGravity){
		var self = this;
		self.valid = false;
		self.validate = validate;
		self.simple = simple;
		self.compensated = compensated;
		self.plato = plato;
		
		var og = originalGravity > 1000 ? originalGravity / 1000 : originalGravity;
		var fg = finalGravity > 1000 ? finalGravity / 1000 : finalGravity;
        
		self.alcoholByVolume = function(mode, success, failure){
		        
		if (!self.validate(failure, og, fg)){
			return;
		}   
		if (!self.hasOwnProperty(mode)){
			throw 'Calculation mode type not available. Options include simple, compensated, plato'
		}
                
		var result = self[mode].apply(self, [og, fg]);
			success(result);
		};
                
	};
	return AbvCalculator;
});
