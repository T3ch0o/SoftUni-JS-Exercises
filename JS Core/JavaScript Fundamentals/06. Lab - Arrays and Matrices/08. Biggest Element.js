function biggestElement(arr) {
    let result = arr.reduce((a, b) => a.concat(b));

    console.log(Math.max.apply(null, result));
}

biggestElement([[20, 50, 10], [8, 33, 145]]);