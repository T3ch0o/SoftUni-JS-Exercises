function sumByTowns(input) {
    let obj = {};

    for (let i = 0; i < input.length; i += 2) {
        let town = input[i];
        let totalIncome = Number(input[i + 1]);

        if (!obj.hasOwnProperty(town)) {
            obj[town] = 0;
        }

        obj[town] += totalIncome;
    }

    console.log(JSON.stringify(obj));
}

sumByTowns(['Sofia',
'20',
'Varna',
'3' ,
'Sofia',
'5',
'Varna',
'4'
]);