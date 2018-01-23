function equalNeighbors(matrix) {
    let count = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === matrix[i][j+1]) {
                count++;
            }

            if (i != matrix.length - 1 && matrix[i][j] === matrix[i + 1][j]) {
                count++;
            }
        }
    }

    console.log(count);
}

equalNeighbors([['2', '2', '5', '7', '4'],
    ['4', '0', '5', '3', '4'],
    ['2', '5', '5', '4', '2']]
);