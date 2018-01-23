function matchDates(input) {
    let pat = /\b(\d{1,2})\-([A-Z][a-z]{2})\-(\d{4}\b)/g;

    for (let i = 0; i < input.length; i++) {
        let result = pat.exec(input[i]);

        if (result == null) {
            continue;
        }

        console.log(`${result[0]} (Day: ${result[1]}, Month: ${result[2]}, Year: ${result[3]})`);
    }
}

matchDates(['I am born on 30-Dec-1994.',
    'This is not date: 512-Jan-1996.',
'My father is born on the 29-Jul-1955.'
]);