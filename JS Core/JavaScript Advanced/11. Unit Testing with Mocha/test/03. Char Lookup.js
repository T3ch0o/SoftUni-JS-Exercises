let expect = require('chai').expect;
let lookupChar = require('../03. Char Lookup').lookupChar;

describe('Char Lookup tests', function () {
    it('should return char(a)', function () {
        expect(lookupChar('cat', 1)).to.equal('a', 'Function did not return the correct result!');
    });

    it('should return Incorrect index', function () {
        expect(lookupChar('cat', -1)).to.equal('Incorrect index', 'Function did not return the correct result!');
    });

    it('should return Incorrect index', function () {
        expect(lookupChar('cat', 5)).to.equal('Incorrect index', 'Function did not return the correct result!');
    });

    it('testing with multiple inputs', function () {
        expect(lookupChar('cat', 1)).to.equal('a', 'Function did not return the correct result!');
        expect(lookupChar('dog', 1)).to.equal('o', 'Function did not return the correct result!');
        expect(lookupChar('cow', 1)).to.equal('o', 'Function did not return the correct result!');
    });

    it('should return undefined', function () {
        expect(lookupChar('cat', '1')).to.equal(undefined, 'Function did not return the correct result!');
    });

    it('should return undefined', function () {
        expect(lookupChar([], 1)).to.equal(undefined, 'Function did not return the correct result!');
    });

    it('should return undefined', function () {
        expect(lookupChar('cat', 2)).to.equal('t', 'Function did not return the correct result!');
    });

    it('should return undefined', function () {
        expect(lookupChar('pesho', 3.12)).to.equal(undefined, 'Function did not return the correct result!');
    });
});