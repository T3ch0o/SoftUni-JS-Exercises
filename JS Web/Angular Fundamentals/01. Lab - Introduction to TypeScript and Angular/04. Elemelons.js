var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Melon = /** @class */ (function () {
    function Melon(weight, melonSort) {
        this.weight = weight;
        this.melonSort = melonSort;
    }
    Melon.prototype.toString = function () {
        switch (this.constructor) {
            case Watermelon:
                return "Element: " + this.element + "\nSort: " + this.melonSort + "\nElement Index: " + this._elementIndex;
            case Firemelon:
                return "Element: " + this.element + "\nSort: " + this.melonSort + "\nElement Index: " + this._elementIndex;
            case Earthmelon:
                return "Element: " + this.element + "\nSort: " + this.melonSort + "\nElement Index: " + this._elementIndex;
            case Airmelon:
                return "Element: " + this.element + "\nSort: " + this.melonSort + "\nElement Index: " + this._elementIndex;
            case Melolemonmelon:
                return "Element: " + this.element + "\nSort: " + this.melonSort + "\nElement Index: " + this._elementIndex;
        }
    };
    return Melon;
}());
var Watermelon = /** @class */ (function (_super) {
    __extends(Watermelon, _super);
    function Watermelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this._elementIndex = weight * melonSort.length;
        _this.element = 'Water';
        return _this;
    }
    Object.defineProperty(Watermelon.prototype, "elementIndex", {
        get: function () {
            return this._elementIndex;
        },
        enumerable: true,
        configurable: true
    });
    return Watermelon;
}(Melon));
var Firemelon = /** @class */ (function (_super) {
    __extends(Firemelon, _super);
    function Firemelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this._elementIndex = weight * melonSort.length;
        _this.element = 'Fire';
        return _this;
    }
    Object.defineProperty(Firemelon.prototype, "elementIndex", {
        get: function () {
            return this._elementIndex;
        },
        enumerable: true,
        configurable: true
    });
    return Firemelon;
}(Melon));
var Earthmelon = /** @class */ (function (_super) {
    __extends(Earthmelon, _super);
    function Earthmelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this._elementIndex = weight * melonSort.length;
        _this.element = 'Earth';
        return _this;
    }
    Object.defineProperty(Earthmelon.prototype, "elementIndex", {
        get: function () {
            return this._elementIndex;
        },
        enumerable: true,
        configurable: true
    });
    return Earthmelon;
}(Melon));
var Airmelon = /** @class */ (function (_super) {
    __extends(Airmelon, _super);
    function Airmelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this._elementIndex = weight * melonSort.length;
        _this.element = 'Air';
        return _this;
    }
    Object.defineProperty(Airmelon.prototype, "elementIndex", {
        get: function () {
            return this._elementIndex;
        },
        enumerable: true,
        configurable: true
    });
    return Airmelon;
}(Melon));
var Melolemonmelon = /** @class */ (function (_super) {
    __extends(Melolemonmelon, _super);
    function Melolemonmelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    Melolemonmelon.prototype.morph = function () {
        if (this.element === "Water") {
            this.element = "Fire";
        }
        else if (this.element === "Fire") {
            this.element = "Earth";
        }
        else if (this.element === "Earth") {
            this.element = "Air";
        }
        else {
            this.element = "Water";
        }
    };
    return Melolemonmelon;
}(Watermelon));
