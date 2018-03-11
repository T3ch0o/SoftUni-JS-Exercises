const expect = require('chai').expect;
const Console = require('../05. C# Console').Console;

describe('C# Console Tests', function () {

    describe('General Tests', function () {
        it('check if the Console is class', function () {
            expect(typeof Console).to.equal('function', 'That is not a function!');
        });

        it('should return Test', function () {
            expect(Console.writeLine('Test')).to.equal('Test', 'Function did not return the correct result!');
        });

        it('should return {"a":1,"b":2}', function () {
            expect(Console.writeLine({a: 1, b: 2})).to.equal('{"a":1,"b":2}', 'Function did not return the correct result!');
        });

        it('should return "The sum of 3 and 4 is 7");', function () {
            expect(Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7)).to.equal('The sum of 3 and 4 is 7', 'Function did not return the correct result!');
        });
    });

    describe('Error Tests', function () {
        it('check writeLine without arguments should throw TypeError', function () {
            expect(function () {
                Console.writeLine();
            }).to.throw(TypeError);
        });

        it('check writeLine if the first element is not a string should throw TypeError', function () {
            expect(function () {
                Console.writeLine(1, 5, 3);
            }).to.throw(TypeError);
        });

        it('if the number of parameters does not correspond to the number of placeholders in the template string should throw RangeError', function () {
            expect(function () {
                Console.writeLine("The sum of {0} and {1} is {2}", 5, 5, 10, 13);
            }).to.throw(RangeError);
        });

        it('if the placeholders have indexes not withing the parameters range(for instance we have a 3 placeholders and only 2 params) throw a RangeError.', function () {
            expect(function () {
                Console.writeLine("The sum of {0} and {1} is {2}", 5, 5);
            }).to.throw(RangeError);
        });

        it('if the index of a placeholder do not match the params throw a RangeError.', function () {
            expect(function () {
                Console.writeLine("The sum of {15}", 5);
            }).to.throw(RangeError);
        });
    });
});