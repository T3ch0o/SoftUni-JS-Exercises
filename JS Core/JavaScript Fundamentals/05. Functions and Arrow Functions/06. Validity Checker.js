function validyChecker(points) {
    function checkDistance(x1, y1, x2, y2) {
        return Number.isInteger(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)) ? `{${x1}, ${y1}} to {${x2}, ${y2}} is valid` :
            `{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`;
    }

    for (let i = 0; i < 3; i += 2) {
        console.log(checkDistance(points[i], points[i + 1], 0, 0));
    }

    console.log(checkDistance(points[0], points[1], points[2], points[3]));
}

validyChecker([2, 1, 1, 1]);