let expect = require('chai').expect;
let PaymentPackage = require('./PaymentPackage').PaymentPackage;

describe('Sumator', function () {
    let paymentPackage;

    describe('General Tests', function () {
        it('this should be a function', function() {
            expect(typeof PaymentPackage).to.equal('function', 'That is not a function!');
        });

        it('check properties', function() {
            paymentPackage = new PaymentPackage('asd', 10);
            expect(Object.getPrototypeOf(paymentPackage).hasOwnProperty('name')).to.equal(true, 'Missing add function');
            expect(Object.getPrototypeOf(paymentPackage).hasOwnProperty('value')).to.equal(true, 'Missing sumNums function');
            expect(Object.getPrototypeOf(paymentPackage).hasOwnProperty('VAT')).to.equal(true, 'Missing sumNums function');
            expect(Object.getPrototypeOf(paymentPackage).hasOwnProperty('active')).to.equal(true, 'Missing removeByFilter function');
            expect(Object.getPrototypeOf(paymentPackage).hasOwnProperty('toString')).to.equal(true, 'Missing toString function');
        });

        it('this should return "Package: asd - Value (excl. VAT): 10 - Value (VAT 20%): 12"', function() {
            paymentPackage = new PaymentPackage('asd', 10);
            expect(paymentPackage.toString()).to.equal('Package: asd\n- Value (excl. VAT): 10\n- Value (VAT 20%): 12', 'Invalid output!');
        });

        it('this should return "Package: asd\n- Value (excl. VAT): 10\n- Value (VAT 50%): 15"', function() {
            paymentPackage = new PaymentPackage('asd', 10);
            paymentPackage.VAT = 50;
            expect(paymentPackage.toString()).to.equal('Package: asd\n- Value (excl. VAT): 10\n- Value (VAT 50%): 15', 'Invalid output!');
        });

        it('this should return "Package: asd\n- Value (excl. VAT): 10\n- Value (VAT 50%): 15"', function() {
            paymentPackage = new PaymentPackage('asd', 10);
            paymentPackage.active = false;
            expect(paymentPackage.toString()).to.equal('Package: asd (inactive)\n- Value (excl. VAT): 10\n- Value (VAT 20%): 12', 'Invalid output!');
        });
    });

    describe('Error Tests', function () {
        it('this should return an Error', function() {
            expect(function() {
                new PaymentPackage('asd');
            }).to.throw(Error);
        });

        it('this should return an Error', function() {
            expect(function() {
                new PaymentPackage('');
            }).to.throw(Error);
        });

        it('this should return an Error', function() {
            expect(function() {
                new PaymentPackage(5, 6);
            }).to.throw(Error);
        });

        it('this should return an Error', function() {
            expect(function() {
                new PaymentPackage('asd', 'asd');
            }).to.throw(Error);
        });

        it('this should return an Error', function() {
            expect(function() {
                new PaymentPackage('asd', -1);
            }).to.throw(Error);
        });

        it('this should return an Error', function() {
            paymentPackage = new PaymentPackage('asd', 10);

            expect(function() {
                paymentPackage.VAT = 'asd';
            }).to.throw(Error);
        });

        it('this should return an Error', function() {
            paymentPackage = new PaymentPackage('asd', 10);

            expect(function() {
                paymentPackage.VAT = -1;
            }).to.throw(Error);
        });

        it('this should return an Error', function() {
            paymentPackage = new PaymentPackage('asd', 10);

            expect(function() {
                paymentPackage.active = 1;
            }).to.throw(Error);
        });

        it('this should return an Error', function() {
            paymentPackage = new PaymentPackage('asd', 10);

            expect(function() {
                paymentPackage.active = null;
            }).to.throw(Error);
        });

    });
});