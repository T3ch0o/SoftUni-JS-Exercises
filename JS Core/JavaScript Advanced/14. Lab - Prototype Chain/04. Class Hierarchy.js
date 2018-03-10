function solve() {
    class Figure {
        constructor() {
            if (new.target === Figure) {
                throw new TypeError("Can't do this");
            }
        }

        get area() {
            switch (this.constructor) {
                case Circle:
                    return Math.PI * Math.pow(this.radius, 2);
                case Rectangle:
                    return this.width * this.height;
            }
        }

        toString() {
            let type = this.constructor.name;
            let props = Object.getOwnPropertyNames(this);

            return type + ' - ' + props.map(p => `${p}: ${this[p]}`);
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this.radius = radius;
        }

        toString() {
            return `${super.toString()} - radius: ${this.radius}`
        }
    }

    class Rectangle extends Figure{
        constructor(width, height) {
            super();
            this.width = width;
            this.height = height;
        }

        toString() {
            return `${super.toString()} - width: ${this.width}, height: ${this.height}`
        }
    }

    return {
        Figure,
        Circle,
        Rectangle
    }
}