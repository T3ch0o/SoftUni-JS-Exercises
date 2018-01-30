function jansNotation(input) {
    function calculator(a, b, operator) {
        let sum = 0;

        switch (operator) {
            case '+':
                sum += a + b;
                break;
            case '-':
                sum += a - b;
                break;
            case '*':
                sum += a * b;
                break;
            case '/':
                sum += a / b;
                break;
        }

        return sum;
    }

    let numbers = [];

    for (let data of input) {
        if (Number.isInteger(data)) {
            numbers.push(data);
            continue;
        }

        if (numbers.length < 2) {
            return console.log('Error: not enough operands!');
        }

        let firstNum = numbers.pop();
        let secondNum = numbers.pop();

        let sum = calculator(secondNum, firstNum, data);

        numbers.push(sum)
    }


    if (numbers.length >= 2) {
        return console.log('Error: too many operands!')
    }

    console.log(numbers[0]);
}

jansNotation([5,
    -1,
        33]

);