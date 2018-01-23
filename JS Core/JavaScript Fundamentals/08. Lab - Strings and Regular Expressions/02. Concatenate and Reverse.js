function concatAndReverse(input) {
    let charArray = input.join('').split('').reverse();

    console.log(charArray.join(''));
}

concatAndReverse(['I', 'am', 'student']);