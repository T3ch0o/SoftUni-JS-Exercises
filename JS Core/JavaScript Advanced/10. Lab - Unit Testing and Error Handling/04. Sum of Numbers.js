let expect = require('chai').expect;

function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}

describe('sum(arr) - sum array of numbers', function () {
    it('Should return 3 for [1, 2]', function () {
        expect(sum([1,2])).to.equal(3);
    });

    it('Should return 4 for ["2", 2]', function () {
        expect(sum(['2', 2])).to.equal(4);
    });

    it('Should return 0 for []', function () {
        expect(sum([])).to.equal(0);
    });

    it('Should return NaN for ["pesho", 1, 2]', function () {
        expect(sum(['pesho', 1, 2])).to.be.NaN;
    });

    it('Should return 3 for [1.5, 2.5, -1]', function () {
        expect(sum([1.5, 2.5, -1])).to.equal(3);
    });

    it('Should return 1 for [1]', function () {
        expect(sum([1])).to.equal(1);
    });
});
