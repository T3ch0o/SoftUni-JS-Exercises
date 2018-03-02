(function () {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    Array.prototype.skip = function (n) {
        let result = this.slice(n, this.length);

        return result;
    };

    Array.prototype.take = function (n) {
        let result = this.slice(0, n);
        return result;
    };

    Array.prototype.sum = function () {
        let result = this.reduce((a, b) => a + b);
        return result;
    };

    Array.prototype.average = function () {
        let result = this.sum() / this.length;
        return result;
    };
})();