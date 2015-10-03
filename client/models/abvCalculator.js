define([], 
function () {
'use strict';

	function AbvCalculator(og, fg){
		var self = this;
		self.valid = false;
        
		// Convert to decimal if > 1000 
		if (og > 1000){
			og = og / 1000;
			fg = fg / 1000;
		};
        
		self.originalGravity = og;
		self.finalGravity = fg;
                
		// http://www.homebrewdad.com/abv_calculator.php
		self.simple = function simple(og, fg){
			return (og - fg) * 131.25;
		}
        
		// Compensates for real extract
		// http://www.ratebeer.com/forums/calculating-abv_121228.htm
		// %ABV = (((668.72*OG - 463.37 - 205.347 * OG^2)-(0.1808*(668.72*OG - 463.37 - 205.347 * OG^2) + 0.8192*(668.72*FG - 463.37 - 205.347 * FG^2)))/(2.0665-0.010665*(668.72*OG - 463.37 - 205.347 * OG^2))/100)*1.25 
		self.compensated = function compensated(og, fg){
			var constant = 1.25;
			var divisor = (2.0665-0.010665*(668.72*og - 463.37 - 205.347 * Math.pow(og, 2)));
			var divident0 = 668.72*og - 463.37 - 205.347 * Math.pow(og, 2);
			var dividend1 = 0.1808*(668.72*og - 463.37 - 205.347 * Math.pow(og, 2));
			var dividend2 = 0.8192*(668.72*fg - 463.37 - 205.347 * Math.pow(fg, 2));
        
			return constant * ((divident0 - dividend1 - dividend2) / divisor);
		}
        
		// Presumably better precision on high gravity
		self.plato = function plato(og, fg){
			var oe = (1000 * (og - 1)) / 4;
			var re = (1000 * (fg - 1)) / 4; 
			var abw = (oe - re) / (2.065 - (0.010665 * oe));
			return (abw * (fg / 0.794));
		}
                
		self.alcoholByVolume = function(mode, success, failure){
			var og = self.originalGravity;
			var fg = self.finalGravity;
                
		if (!self.validate(failure)){
			return undefined;
		}
                
		if (!self.hasOwnProperty(mode)){
			throw 'Calculation mode type not available. Options include simple, compensated, plato'
		}
                
		var result = self[mode].apply(self, [og, fg]);
		success(result);
		};
                
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
                
		self.validate = function(callback){
			var og = self.originalGravity;
			var fg = self.finalGravity;
			var errors = [];
                
			// Intercept callback (= multicast delegate)
			var intercepted = function(message){
				callback(message);
				errors.push(message);
			};
                
			validateBounds(og, 'Original', intercepted);
			validateBounds(fg, 'Final', intercepted);
                
			if (fg > og){
				intercepted('Final gravity is greater than original gravity');
			}
                
			if (errors.length == 0){
				self.valid = true;
				return true;
			}
			else{
				return false;
			}
		};
	};
	return AbvCalculator;
});
