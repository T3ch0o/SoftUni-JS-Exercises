abstract class Melon {
    public weight : number;
    public melonSort : string;
    public element : string;
    public _elementIndex : number;

    protected constructor(weight, melonSort) {
        this.weight = weight;
        this.melonSort = melonSort;
    }

    toString() {
        switch (this.constructor) {
            case Watermelon:
                return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this._elementIndex}`;
            case Firemelon:
                return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this._elementIndex}`;
            case Earthmelon:
                return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this._elementIndex}`;
            case Airmelon:
                return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this._elementIndex}`;
            case Melolemonmelon:
                return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this._elementIndex}`;
        }
    }
}

class Watermelon extends Melon {
    public _elementIndex : number;
    public element : string;

    constructor(weight, melonSort) {
        super(weight, melonSort);
        this._elementIndex = weight * melonSort.length;
        this.element = 'Water';
    }

    get elementIndex() {
        return this._elementIndex;
    }
}

class Firemelon extends Melon {
    public _elementIndex : number;
    public element : string;

    constructor(weight, melonSort) {
        super(weight, melonSort);
        this._elementIndex = weight * melonSort.length;
        this.element = 'Fire';
    }

    get elementIndex() {
        return this._elementIndex;
    }
}

class Earthmelon extends Melon {
    public _elementIndex : number;
    public element : string;

    constructor(weight, melonSort) {
        super(weight, melonSort);
        this._elementIndex = weight * melonSort.length;
        this.element = 'Earth';
    }

    get elementIndex() {
        return this._elementIndex;
    }
}

class Airmelon extends Melon {
    public _elementIndex : number;
    public element : string;

    constructor(weight, melonSort) {
        super(weight, melonSort);
        this._elementIndex = weight * melonSort.length;
        this.element = 'Air';
    }

    get elementIndex() {
        return this._elementIndex;
    }
}

class Melolemonmelon extends Watermelon {
    public element : string;

    constructor(weight, melonSort) {
        super(weight, melonSort);
    }

    morph() {
        if(this.element === "Water"){
            this.element = "Fire";
        } else if (this.element === "Fire"){
            this.element = "Earth";
        } else if(this.element === "Earth"){
            this.element = "Air";
        } else {
            this.element = "Water";
        }
    }
}