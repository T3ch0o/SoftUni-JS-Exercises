function matchMultiplication([text]) {
    let pattern = /-?\d+[ *.]+-?[\d].[\d]+/g;

    text = text.replace(pattern, (match) => {
        let numbers = match.split('*').filter(x => x != '').map(Number);
        return numbers[0] * numbers[1];
    });

    console.log(text);
}

matchMultiplication(['My bill is: 2 * 2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).']);