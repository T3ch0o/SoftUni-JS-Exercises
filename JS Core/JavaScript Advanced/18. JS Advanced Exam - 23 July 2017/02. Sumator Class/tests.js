let expect = require('chai').expect;
let Sumator = require('./02. Sumator Class').Sumator;

describe('Sumator', function () {
    let sumator;

    describe('General Tests', function () {
        it('this should be a function', function () {
            expect(typeof Sumator).to.equal('function', 'That is not a function!');
        });

        it('check properties', function () {
            sumator = new Sumator();
            expect(Object.getPrototypeOf(sumator).hasOwnProperty('add')).to.equal(true, 'Missing add function');
            expect(Object.getPrototypeOf(sumator).hasOwnProperty('sumNums')).to.equal(true, 'Missing sumNums function');
            expect(Object.getPrototypeOf(sumator).hasOwnProperty('removeByFilter')).to.equal(true, 'Missing removeByFilter function');
            expect(Object.getPrototypeOf(sumator).hasOwnProperty('toString')).to.equal(true, 'Missing toString function');
        });

        it('should add the items and return them', function () {
            sumator = new Sumator();
            sumator.add('pesho');
            sumator.add('gosho');
            sumator.add('ivailo');

            expect(sumator.toString()).to.equal('pesho, gosho, ivailo', 'Function did not return the correct result!');
        });

        it('should sum the numbers', function () {
            sumator = new Sumator();
            sumator.add(1);
            sumator.add(2);
            sumator.add(3);

            expect(sumator.sumNums()).to.equal(6, 'Function did not return the correct result!');
        });

        it('should sum the numbers', function () {
            sumator = new Sumator();
            sumator.add(1);
            sumator.add(2);
            sumator.add(3);

            expect(sumator.sumNums()).to.equal(6, 'Function did not return the correct result!');
        });

        it('without parameters should return zero', function () {
            sumator = new Sumator();
            expect(sumator.sumNums()).to.equal(0, 'Function did not return the correct result!');
        });

        it('without Parameters should return zero', function () {
            sumator = new Sumator();
            sumator.add(1);
            sumator.add(2);
            sumator.add(3);
            sumator.add(4);
            sumator.removeByFilter(x => x % 2 === 0);

            expect(sumator.toString()).to.equal('1, 3', 'Function did not return the correct result!');
        });
    });

    describe('Error Tests', function () {
        it('without parameters should return (empty)', function () {
            sumator = new Sumator();

            expect(sumator.toString()).to.equal('(empty)', 'Function did not return the correct result!');
        });

        it('should return 0', function () {
            sumator = new Sumator();
            sumator.add('1');
            sumator.add('2');
            sumator.add('3');

            expect(sumator.sumNums()).to.equal(0, 'Function did not return the correct result!');
        });
    });
});