function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

let expect = require('chai').expect;

describe('Test RGB to Hex', function () {
    describe('General tests', function () {
        it('Should be a function', function () {
            expect(typeof rgbToHexColor).to.equal('function');
        });
    });

    describe('Value test', function () {
        it('Should return #0C0D0E for (12, 13, 14)', function () {
            expect(rgbToHexColor(12, 13, 14)).to.equal('#0C0D0E');
        });

        it('Should return #FF9EAA for (255, 158, 170)', function () {
            expect(rgbToHexColor(255, 158, 170)).to.equal('#FF9EAA');
        });

        it('Should return #FFFFFF for (255, 255, 255)', function () {
            expect(rgbToHexColor(255, 255, 255)).to.equal('#FFFFFF');
        });

        it('Should return #000000 for (0, 0, 0)', function () {
            expect(rgbToHexColor(0, 0, 0)).to.equal('#000000');
        });

        it('Should return undefined to negative values', function () {
            expect(rgbToHexColor(1, -5, 3)).to.undefined;
        });

        it('Should return undefined to invalid input', function () {
            expect(rgbToHexColor('5',[1],{8:9})).to.undefined;
        });

        it('Should return undefined to one argument', function () {
            expect(rgbToHexColor(1)).to.undefined;
        });

        it('Should return undefined to decimal numbers', function () {
            expect(rgbToHexColor(3.14, 5, 10)).to.undefined;
        });

        it('Should return undefined to over 255', function () {
            expect(rgbToHexColor(256, 5, 10)).to.undefined;
        });

        it('Should return undefined', function () {
            expect(rgbToHexColor(1, 2, 256)).to.equal(undefined);
        });
    });
});