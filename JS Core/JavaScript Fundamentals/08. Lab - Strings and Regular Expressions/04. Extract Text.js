function matchInBrackets(input) {
    let regex = /\((.*?)\)/g;
    let result = [];
    let match = regex.exec(input);

    while (match != null) {
        result.push(match[1]);

        match = regex.exec(input);
    }

    console.log(result.join(', '));
}

matchInBrackets('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)');