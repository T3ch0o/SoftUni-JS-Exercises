function findVariableNames(str) {
    let result = [];
    let pattern = /\b_([a-zA-Z0-9]+)\b/g;

    let match = pattern.exec(str);

    while (match != null) {
        result.push(match[1]);

        match = pattern.exec(str);
    }

    console.log(result.join(','));
}

findVariableNames('The _id and _age variables are both integers.');