function sortArray(arr, method) {
    let sortingStrategies = {
        'asc': (a, b) => a - b,
        'desc': (a, b) => b - a
    };

    return arr.sort(sortingStrategies[method]);
}

console.log(sortArray([14, 7, 17, 6, 8], 'asc'));