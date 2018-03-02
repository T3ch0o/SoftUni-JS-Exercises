function orderRectangles(pairs) {
    let rects = [];

    for (let pair of pairs) {
        rects.push(createRect(pair))
    }

    function createRect([width, height]) {
        let rect = {
            width,
            height,
            area: () => rect.width * rect.height,
            compareTo: function (other) {
                let result = other.area() - rect.area();
                return result || (other.width - rect.width);
            }
        };

        return rect;
    }

    rects.sort((a,b) => a.compareTo(b));
    return rects;
}

console.log(orderRectangles([[10, 5], [5, 12]]));
