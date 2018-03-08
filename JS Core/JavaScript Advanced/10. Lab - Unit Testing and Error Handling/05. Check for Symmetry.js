function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

let expect = require('chai').expect;

describe('Check Symmetry', function () {
    it('Should return false to {}', function () {
        expect(isSymmetric({})).to.equal(false);
    });

    it('Should return true to [3,2,3]', function () {
        expect(isSymmetric([3,2,3])).to.equal(true);
    });

    it('Should return true to [3,2,2]', function () {
        expect(isSymmetric([3,2,2])).to.equal(false);
    });

    it('Should return true to []', function () {
        expect(isSymmetric([])).to.equal(true);
    });

    it('Should return true to [-3,2,-3]', function () {
        expect(isSymmetric([-3,2,-3])).to.equal(true);
    });

    it('Should return true to [[], []]', function () {
        expect(isSymmetric([[], []])).to.equal(true);
    });
});