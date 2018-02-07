function lost(keyword, text) {
    let regex = /(north|east)\D*(\d{2})[^\,]*\D*(\d{6})/gi;

    let north = '';
    let east = '';

    let match = regex.exec(text);

    while (match) {
        let directions = match[1].toUpperCase();
        let numbers = match[2] + '.' + match[3];

        if (directions === 'EAST') {
            east = numbers + ' E';
        } else {
            north = numbers + ' N';
        }

        match = regex.exec(text);
    }

    let messagePattern = new RegExp(`(${keyword})(.*)\\1`, 'g');
    let message = messagePattern.exec(text)[2];

    console.log(`${north}\n${east}\nMessage: ${message}`);
}

lost('4ds', 'eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532');