/* eslint-disable max-len */

define(['utils/abvCalculator'], function(Abv) {
  describe('Given OG 1050 and FG 1010', function() {
    var og = 1050;
    var fg = 1010;

    it('Compensated should be 5.20', function() {
      expect(Abv.getAbv('compensated', og, fg).text).toEqual('5.20');
    });

    it('Simple should be 5.25', function() {
      expect(Abv.getAbv('simple', og, fg).text).toEqual('5.25');
    });

    it('Plato should be 6.59', function() {
      expect(Abv.getAbv('plato', og, fg).text).toEqual('6.59');
    });

    it('Plato should be 6.5851246761', function() {
      expect(Abv.getAbv('plato', og, fg).value.toFixed(10)).toEqual('6.5851246761');
    });
  });

  describe('Given OG and FG is defined as thousands and decimal at the same time', function() {
    it('Plato should be 6.59 when FG is decimal', function() {
      expect(Abv.getAbv('plato', 1050, 1.010).text).toEqual('6.59');
    });

    it('Plato should be 6.59 when OG is decimal', function() {
      expect(Abv.getAbv('plato', 1.050, 1.010).text).toEqual('6.59');
    });
  });

  describe('Given OG 1.080 and FG 1.010', function() {
    it('Simple should be 9.19', function() {
      expect(Abv.getAbv('simple', 1.080, 1.010).text).toEqual('9.19');
    });

    it('Compensated should be 9.23', function() {
      expect(Abv.getAbv('compensated', 1.080, 1.010).text).toEqual('9.23');
    });

    it('Plato should be 12.02', function() {
      expect(Abv.getAbv('plato', 1.080, 1.010).text).toEqual('12.02');
    });
  });

  describe('Given erronous input', function() {
    it('Final gravity is greater than original gravity', function() {
      expect(function() { Abv.getAbv('plato', 1010, 1050); }).toThrow(new Error('Final gravity is greater than original gravity'));
    });

    it('Final gravity is not a number', function() {
      expect(function() { Abv.getAbv('compensated', 1111, 'a'); }).toThrow(new Error('Final gravity is not a number'));
    });

    it('Original gravity is not a number', function() {
      expect(function() { Abv.getAbv('compensated', 'a', 1.111); }).toThrow(new Error('Original gravity is not a number'));
    });

    it('Original gravity is too high', function() {
      expect(function() { Abv.getAbv('compensated', 10000, 1001); }).toThrow(new Error('Original gravity is too high'));
    });

    it('Original gravity is too low', function() {
      // eslint-disable-next-line no-floating-decimal
      expect(function() { Abv.getAbv('compensated', .1, 1001); }).toThrow(new Error('Original gravity is too low'));
    });

    it('Original gravity error throws first', function() {
      // eslint-disable-next-line no-floating-decimal
      expect(function() { Abv.getAbv('xo', .1, 'a'); }).toThrow(new Error('Original gravity is too low'));
    });

    it('Original gravity error throws first', function() {
      // eslint-disable-next-line no-floating-decimal
      var errs = Abv.getErrors('xo', .1, 'a');
      console.log(errs);
      expect(errs.length).toBeGreaterThan(2);
    });

    it('Should request a mode of calculation', function() {
      expect(function() { Abv.getAbv('xo', 1050, 1010); }).toThrow(new Error('Calculation mode type not available. Options include simple, compensated, plato'));
    });
  });
});
/* eslint-enable max-len */
