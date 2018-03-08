class Stringer {
    constructor(innerString , innerLength) {
        this.innerString = innerString;
        this.innerLength = innerLength;
        this.currentString = this.innerString;
        this.currentLenght = this.innerLength;
    }

    increase(length) {
        this.currentString = this.innerString.slice(0, this.innerLength);
        this.innerLength = this.innerLength + length;
        this.currentLenght = this.innerLength + length;
    }

    decrease(length) {
        let currentLength = this.currentLenght - length < 0 ? 0 : this.currentLenght - length;
        this.currentString = this.innerString.slice(0, currentLength);
        this.currentString += '.'.repeat(this.innerLength - this.currentString.length > 3 ? 3 : this.currentLenght - this.currentString.length);
        this.innerLength = length > this.innerLength ? 0 : length;
        this.currentLenght = length > this.innerLength ? 0 : length;
    }

    toString() {
        return this.currentString;
    }
}

let s = new Stringer("Viktor", 6);
s.increase(3);

console.log(s.toString());