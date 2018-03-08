function subSum(arr, startIndex, endIndex) {
    if (arr.length === 0) {
        return 0;
    }

    if (!isNumeric(arr) || !Array.isArray(arr)) {
        return NaN;
    }

    if (startIndex < 0) {
        startIndex = arr.length + startIndex;
    }

    if (endIndex <= startIndex) {
        endIndex = startIndex + 1;
    }

    function isNumeric(arr) {
        let isTrue = true;

        for (let i = 0; i < arr.length; i++) {
            isTrue = !isNaN(parseFloat(arr[i])) && isFinite(arr[i]);

            if (isTrue === false) {
                break;
            }
        }

        return isTrue;
    }

    arr = arr.slice(startIndex, endIndex);



    return arr.reduce((a, b) => a + b);
}

console.log(subSum([10, 20, 30, 40, 50, 60], 3, 300));