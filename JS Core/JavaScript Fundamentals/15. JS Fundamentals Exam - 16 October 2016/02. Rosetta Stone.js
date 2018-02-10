function solve(input) {
    let templateMatrix = [];
    let lines = Number(input.shift());

    for (let i = 0; i < lines; i++) {
        let numbers = input.shift().split(' ').map(Number);
        templateMatrix.push(numbers);
    }

    let matrix = [];
    let length = input.length;

    for (let i = 0; i < length; i++) {
        let numbers = input.shift().split(' ').map(Number);
        matrix.push(numbers);
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            matrix[row][col] += templateMatrix[row%templateMatrix.length][col%templateMatrix[0].length];
            matrix[row][col] %= 27;
        }
    }

    let alphabet = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let message = '';

    for (let row of matrix) {
        for (let col of row) {
            message += alphabet[col];
        }
    }

    console.log(message);
}

solve([ '2',
    '59 36',
    '82 52',
    '4 18 25 19 8',
    '4 2 8 2 18',
    '23 14 22 0 22',
    '2 17 13 19 20',
    '0 9 0 22 22']);