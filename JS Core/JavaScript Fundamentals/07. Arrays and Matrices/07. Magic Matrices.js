function magicMatrix(elements) {
    let sum = elements[0].reduce((a, b) => a + b, 0);

    let isTrue = true;

    for (let row = 0; row < elements.length; row++) {
        let currentSumOfCol = elements[row].reduce((a, b) => a + b, 0);

        if (sum != currentSumOfCol) {
            isTrue = false;
            break;
        }

        let currentSumOfRow = 0;

        for (let i = 0; i < elements.length; i++) {
            currentSumOfRow += elements[i][row]
        }

        if (currentSumOfCol != sum) {
            isTrue = false;
            break;
        }
    }

    console.log(isTrue);
}

magicMatrix([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
);