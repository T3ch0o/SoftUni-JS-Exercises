function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}

let expect = require('chai').expect;

describe('Calculator maker', () => {
    let calculator;

    beforeEach (() => {
        calculator = createCalculator();
    });

    it('should return an object', () => {
        expect(typeof calculator).to.equal('object')
    });

    it('should value equals 0 when created', () => {
        expect(calculator.get()).to.equal(0)
    });

    it('should return 2 for 0 + 2', () => {
        calculator.add(2);

        expect(calculator.get()).to.equal(2)
    });

    it('should return 2 for 4 - 2', () => {
        calculator.add(4);
        calculator.subtract(2);

        expect(calculator.get()).to.equal(2);
    });

    it('should return 2 for "4" - "2"', () => {
        calculator.add('4');
        calculator.subtract('2');

        expect(calculator.get()).to.equal(2);
    });

    it('should return 0 for -1 - 1', () => {
        calculator.add(-1);
        calculator.subtract(1);

        expect(calculator.get()).to.equal(-2);
    });

    it('should return NaN for text - text', () => {
        calculator.add('text');
        calculator.subtract('text');

        expect(calculator.get()).to.be.NaN;
    });

    it('should work with fractions', () => {
        calculator.add(3.14);
        calculator.add(1.13);

        expect(calculator.get()).to.be.closeTo(4.27, 0.001);
    });

    it('should work with number string', () => {
        calculator.add('7');
        calculator.add(1);

        expect(calculator.get()).to.equal(8);
    });

});