let StringBuilder = require('./string-builder').StringBuilder;
let expect = require('chai').expect;

describe('StringBuilder tests', function () {
    let builder;

    describe('General Tests', function () {
        it('this should be a function', function () {
            expect(typeof StringBuilder).to.equal('function', 'That is not a function!');
        });

        it('with a number parameter, should return undefined', function () {
            builder = new StringBuilder();
            expect(Object.getPrototypeOf(builder).hasOwnProperty('append')).to.equal(true, 'Missing append function');
            expect(Object.getPrototypeOf(builder).hasOwnProperty('prepend')).to.equal(true, 'Missing prepend function');
            expect(Object.getPrototypeOf(builder).hasOwnProperty('insertAt')).to.equal(true, 'Missing insertAt function');
            expect(Object.getPrototypeOf(builder).hasOwnProperty('remove')).to.equal(true, 'Missing remove function');
            expect(Object.getPrototypeOf(builder).hasOwnProperty('toString')).to.equal(true, 'Missing toString function');
        });

        it('with a string parameter, should return the hello', function () {
            builder = new StringBuilder('hello');
            expect(builder.toString()).to.equal('hello', 'Function did not return the correct result!');
        });

        it('with a string parameter, should return the []', function () {
            builder = new StringBuilder();
            expect(builder.toString()).to.equal('', 'Function did not return the correct result!');
        });

        it('with a command append parameter, should return the hello, there', function () {
            builder = new StringBuilder('hello');
            builder.append(', there');
            expect(builder.toString()).to.equal('hello, there', 'Function did not return the correct result!');
        });

        it('with a command prepend parameter, should return the User, hello', function () {
            builder = new StringBuilder('hello');
            builder.prepend('User, ');
            expect(builder.toString()).to.equal('User, hello', 'Function did not return the correct result!');
        });

        it('with a command insertAt parameter, should return the hello woop', function () {
            builder = new StringBuilder('hello');
            builder.insertAt(' woop', 5);
            expect(builder.toString()).to.equal('hello woop', 'Function did not return the correct result!');
        });

        it('with a command remove parameter, should return the he', function () {
            builder = new StringBuilder('hello');
            builder.remove(2,3);
            expect(builder.toString()).to.equal('he', 'Function did not return the correct result!');
        });
    });

    describe('Error Tests', function () {
        it('if the argument is not a string should return TypeError', function () {
            expect(function () {
                new StringBuilder(2);
            }).to.throw(TypeError);
        });

        it('if the argument is not a string should return TypeError', function () {
            expect(function () {
                new StringBuilder('asd').prepend(2);
            }).to.throw(TypeError);
        });

        it('if the argument is not a string should return TypeError', function () {
            expect(function () {
                new StringBuilder('asd').append(2);
            }).to.throw(TypeError);
        });

        it('if the argument is not a string should return TypeError', function () {
            builder = new StringBuilder('asd');

            expect(function () {
                builder.insertAt(8,6)
            }).to.throw(TypeError);
        });
    });
});