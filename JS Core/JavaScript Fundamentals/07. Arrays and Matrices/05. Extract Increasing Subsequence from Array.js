function extractIncreasingSubsequence(arr) {
    let output = [];

    for (let i = 0; i < arr.length; i++) {
        if (output[output.length - 1] <= arr[i] || output.length == 0) {
            output.push(arr[i]);
        }
    }

    console.log(output.join('\n'));
}

extractIncreasingSubsequence([1,
3,
8,
4,
10,
12,
3,
2,
24]
);