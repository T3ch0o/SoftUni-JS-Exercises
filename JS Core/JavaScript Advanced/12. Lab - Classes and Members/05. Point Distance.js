class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(firstPoint, secondPoint) {
        const dx = firstPoint.x - secondPoint.x;
        const dy = firstPoint.y - secondPoint.y;

        return Math.sqrt(dx * dx + dy * dy);
    }
}

let p1 = new Point(5, 5);
let p2 = new Point(9, 8);
console.log(Point.distance(p1, p2));
