function sumNumbers(number) {
    let parsedNumber = parseInt(number);

    let string = '';

    for (let i = 1; i <= parsedNumber; i++) {
        string += i;
    }

    console.log(string);
}