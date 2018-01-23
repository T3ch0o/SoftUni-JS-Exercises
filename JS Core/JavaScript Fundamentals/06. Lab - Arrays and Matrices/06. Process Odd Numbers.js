function processOddNumbers(arr) {
    arr = arr.filter((e, i) => i % 2 != 0).map(e => e * 2).reverse();

    console.log(arr.join(' '));
}

processOddNumbers([10, 15, 20, 25]);