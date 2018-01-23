function expressionSplit(str) {
    let result = str.split(/[\s(),;.]+/).filter(e => e.length !== 0);

    console.log(result.join('\n'));
}

expressionSplit('let sum = 4 * 4,b = "wow";');