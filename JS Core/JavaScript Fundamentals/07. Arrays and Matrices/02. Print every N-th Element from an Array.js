function printNthElemets(input) {
    let n = Number(input.pop());

    for (let i = 0; i < input.length; i += n) {
        console.log(input[i]);
    }
}

printNthElemets(['5', '20', '31', '4', '20', '2']);