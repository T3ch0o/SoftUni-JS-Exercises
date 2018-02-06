function expedition(primaryMatrix, secondaryMatrix, pointsMatrix, startIndexes) {
    function chooseQuadrant(row, col, resultMatrix) {
        let length = resultMatrix.length / 2;

        let quadrant = 0;

        if (row < length && col >= length) {
            quadrant = 1;
        } else if (row < length && col < length) {
            quadrant = 2
        } else if (row >= length && col < length) {
            quadrant = 3;
        } else if (row >= length && col >= length) {
            quadrant = 4;
        }

        return quadrant;
    }
    function matrixCorner(row, col, matrix) {
        if (row === 0) {
            return 'Top';
        } else if (row === matrix.length - 1) {
            return 'Bottom';
        } else if (col === 0 ) {
            return 'Left';
        } else if (col === matrix[1].length - 1) {
            return 'Right';
        } else {
            return 'Dead end ' + chooseQuadrant(row, col, matrix);
        }
    }

    let resultMatrix = primaryMatrix;

    for (let i = 0; i < pointsMatrix.length; i++) {
        let row = pointsMatrix[i][0];
        let col = pointsMatrix[i][1];

        for (let r = 0; r < secondaryMatrix.length; r++) {
            if (row + r > resultMatrix.length - 1) {
                break;
            }

            for (let c = 0; c < secondaryMatrix[r].length; c++) {
                if (col + c > resultMatrix[r].length - 1) {
                    break;
                }

                let currentNum = secondaryMatrix[r][c];

                if (currentNum === 1) {
                    resultMatrix[row + r][col + c] = resultMatrix[row + r][col + c] === 1 ? 0 : 1;
                } else {
                    resultMatrix[row + r][col + c] = resultMatrix[row + r][col + c];
                }
            }
        }
    }

    let row = startIndexes[0];
    let col = startIndexes[1];

    let steps = 0;

    if (resultMatrix[row][col] === 1) {
        let quadrant = chooseQuadrant(row, col, resultMatrix);

        console.log(steps);
        console.log(`Dead end ${quadrant}`);
        return;
    }

    steps++;

    while (true) {
        let commandUse = 0;

        //moving up
        if (row !== 0) {
            if (resultMatrix[row - 1][col] !== 1) {
                steps++;
                row--;
                resultMatrix[row + 1][col] = 1;
                commandUse++;
            }
        }

        //moving down
        if (row !== resultMatrix.length - 1) {
            if (resultMatrix[row + 1][col] !== 1) {
                steps++;
                row++;
                resultMatrix[row - 1][col] = 1;
                commandUse++;
            }
        }

        //moving left
        if (col !== 0) {
            if (resultMatrix[row][col - 1] !== 1) {
                steps++;
                col--;
                resultMatrix[row][col + 1] = 1;
                commandUse++;
            }
        }

        //moving right
        if (col !== resultMatrix[row].length - 1) {
            if (resultMatrix[row][col + 1] !== 1) {
                steps++;
                col++;
                resultMatrix[row][col - 1] = 1;
                commandUse++;
            }
        }

        if (commandUse === 0) {
            break;
        }
    }

    let side = matrixCorner(row, col, resultMatrix);

    console.log(`${steps}\n${side}`);
}

expedition([[1, 0, 1, 0],
        [1, 0, 1, 1],
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 1, 0, 1],
        [1, 1, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 0]],
    [[1, 1, 1, 0],
        [1, 0, 1, 1]],
    [[1, 1],
        [0, 1],
        [6, 0],
        [8, 0]],
    [8, 3]

);