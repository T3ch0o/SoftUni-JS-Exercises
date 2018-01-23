function higherValue(n) {
    function checkValue(number) {
        if (number / numberToText.length > 5 ) {
            return true;
        }
    }

    let numberToText = n.toString();

    let avg = 0;

    for (let i = 0; i < numberToText.length; i++) {
        avg += Number(numberToText[i]);
    }

    if (checkValue(avg)) {
        return numberToText;
    }

    while (true) {
        numberToText += '9';
        avg += 9;
        if (checkValue(avg)) {
            return numberToText;
        }
    }
}

console.log(higherValue(101));