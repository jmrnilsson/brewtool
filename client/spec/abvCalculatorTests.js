define(['utils/abvCalculator'], function(AbvCalculator){

  describe("Given OG 1050 and FG 1010", function() {
    var calc;
  
    beforeEach(function() {
      calc = new AbvCalculator(1050, 1010);
    });
  
    it("Compensated should be 5.20", function() {
      var value;
      calc.alcoholByVolume('compensated', function(abv){value = abv}, null);
      expect(value.toFixed(2)).toEqual('5.20');
    });
    
    it("Simple should be 5.25", function() {
      var value;
      calc.alcoholByVolume('simple', function(abv){value = abv}, null);
      expect(value.toFixed(2)).toEqual('5.25');
    });
    
    it("Plato should be 6.59", function() {
      var value;
      calc.alcoholByVolume('plato', function(abv){value = abv}, null);
      expect(value.toFixed(2)).toEqual('6.59');
    });
  });
  
  describe("Given OG and FG is defined as thousands and decimal at the same time", function() {
        
    it("Plato should be 6.59 when FG is decimal", function() {
      var calc = new AbvCalculator(1050, 1.010);
      var value;
      calc.alcoholByVolume('plato', function(abv){value = abv}, null);
      expect(value.toFixed(2)).toEqual('6.59');
    });

    it("Plato should be 6.59 when OG is decimal", function() {
      var calc = new AbvCalculator(1.050, 1.010);
      var value;
      calc.alcoholByVolume('plato', function(abv){value = abv}, null);
      expect(value.toFixed(2)).toEqual('6.59');
    });
  });
  
  describe("Given OG 1.080 and FG 1.010", function() {
    var calc;
  
    beforeEach(function() {
      calc = new AbvCalculator(1.080, 1.010);
    });
  
    it("Simple should be 9.19", function() {
      var value;
      calc.alcoholByVolume('simple', function(abv){value = abv}, null);
      expect(value.toFixed(2)).toEqual('9.19');
    });
    
    it("Compensated should be 9.23", function() {
      var value;
      calc.alcoholByVolume('compensated', function(abv){value = abv}, null);
      expect(value.toFixed(2)).toEqual('9.23');
    });
    
    it("Plato should be 12.02", function() {
      var value;
      calc.alcoholByVolume('plato', function(abv){value = abv}, null);
      expect(value.toFixed(2)).toEqual('12.02');
    });
    
  });
  
  describe("Given incorrect input", function() {

    it("Final gravity is greater than original gravity", function() {
      var error;
      var calc = new AbvCalculator(1010, 1050);
      calc.alcoholByVolume('compensated', null, function(abv){error = abv});
      expect(error).toContain('Final gravity is greater than original gravity');
    });
    
    it("Final gravity is not a number", function() {
      var error;
      var calc = new AbvCalculator(1111, 'a');
      calc.alcoholByVolume('compensated', null, function(abv){error = abv});
      expect(error).toContain('Final gravity is not a number');
    });
    
    it("Original gravity is not a number", function() {
      var error;
      var calc = new AbvCalculator('a', 1.111);
      calc.alcoholByVolume('compensated', null, function(e){error = e});
      expect(error).toContain('Original gravity is not a number');
    });
    
    it("Original gravity is too high", function() {
      var error;
      var calc = new AbvCalculator(10000, 1001);
      calc.alcoholByVolume('compensated', null, function(abv){error = abv});
      expect(error).toContain('Original gravity is too high');
    });

    it("Should request a mode of calculation", function() {
      var calc = new AbvCalculator(1050, 1010);
      expect( function(){ calc.alcoholByVolume('xo', null, null) }).toThrow("Calculation mode type not available. Options include simple, compensated, plato");
    });

  });
})