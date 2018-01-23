function calculator(num1, num2, op) {
    let calculate = function (a, b, operator) { return operator(a, b)};

    let add = function (a, b) {return a + b};
    let subtract = function (a, b) {return a - b};
    let multiply = function (a, b) {return a * b};
    let divide = function (a, b) {return a / b};

    switch (op) {
        case '+': return calculate(num1, num2, add);
        case '-': return calculate(num1, num2, subtract);
        case '*': return calculate(num1, num2, multiply);
        case '/': return calculate(num1, num2, divide);
    }
}

console.log(calculator(2, 4, '+'));