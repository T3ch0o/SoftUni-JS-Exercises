function arithmephile(numbers) {
    numbers = numbers.map(Number);

    let sumOfSequences = [];
    let sequences = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] < 10) {
            let index = i;
            for (let n = 0; n < numbers[i]; n++) {
               sequences.push(numbers[++index])
            }

            let sum = sequences.reduce((a, b) => a * b);
            sumOfSequences.push(sum);
            sequences = [];
        }
    }

    console.log(sumOfSequences.sort((a, b) => b - a)[0]);
}

arithmephile(['9',
    '5652',
    '5652',
    '9190',
    '4172',
    '494',
    '536',
    '9510',
    '1584',
    '0',
    '1',
    '10',
    '6',
    '0',
    '675',
    '8913',
    '1891',
    '4298',
    '269',
    '3754',
    '6459']);