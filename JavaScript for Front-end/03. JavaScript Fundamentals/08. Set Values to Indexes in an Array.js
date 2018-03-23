function setValues() {
    let arr = new Array(arguments[0]).fill(0);

    for (let i = 1; i < arguments.length; i++) {
        const currentLine = arguments[i].split(' - ');

        if (Number(currentLine[0]) < arr.length ) {
            arr[currentLine[0]] = currentLine[1];
        }
    }

    return arr.join('\n');
}

console.log(setValues(3,
    '0 - 5',
    '1 - 6',
    '2 - 7'));