let expect = require('chai').expect;
let makeList = require('./list-add-left-right-clear');


describe('Sumator', function () {
    let myList = {};

    beforeEach(function () {
        myList = makeList();
    });

    describe('General Tests', function () {
        it('this should be a object', function () {
            expect(typeof makeList).to.equal('function', 'That is not a function!');
        });

        it('should add the items and return them', function () {
            myList.addLeft('gosho');
            myList.addLeft('pesho');

            expect(myList.toString()).to.equal('pesho, gosho', 'Function did not return the correct result!');
        });

        it('should add the items and return them', function () {
            myList.addRight('gosho');
            myList.addRight('pesho');

            expect(myList.toString()).to.equal('gosho, pesho', 'Function did not return the correct result!');
        });

        it('should clear the items', function () {
            myList.addRight('gosho');
            myList.addRight('pesho');
            myList.clear('pesho');

            expect(myList.toString()).to.equal('', 'Function did not return the correct result!');
        });

    });
});