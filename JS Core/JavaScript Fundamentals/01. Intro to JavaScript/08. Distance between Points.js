function sumNumbers(x1, y1, x2, y2) {
    let obj = {x1, y1, x2, y2};

    let dx = obj.x1 - obj.x2;
    let dy = obj.y1 - obj.y2;

    let dist = Math.sqrt(dx * dx + dy * dy);

    console.log(dist);
}