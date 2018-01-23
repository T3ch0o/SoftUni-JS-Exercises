function diagonalSums(matrix) {
    let n = matrix.length - 1;

    let firstDiagonalSum = matrix[0][0];
    let secondDiagonalSum = matrix[0][n];

    for (let i = 1; i < matrix.length; i++, n--) {
        firstDiagonalSum += matrix[i][i];
        secondDiagonalSum += matrix[i][n - 1];
    }

    console.log(firstDiagonalSum + ' ' + secondDiagonalSum);
}

diagonalSums([[20, 40], [10, 60]]);