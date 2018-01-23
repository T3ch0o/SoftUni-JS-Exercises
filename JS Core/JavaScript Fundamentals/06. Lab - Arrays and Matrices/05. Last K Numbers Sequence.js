function sequenceOfNumbers(n, k) {
    let arr = [1];

    for (let i = 1; i < n; i++) {
        let start = Math.max(0, i - k);
        let result = arr.slice(start, start + k).reduce((a, b) => a + b, 0);

        arr.push(result)
    }

    console.log(arr.join(' '));
}


sequenceOfNumbers(6, 3);