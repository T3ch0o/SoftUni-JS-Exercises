function dnaHelix(n) {
    let str = 'ATCGTTAGGG';

    let currentIndex = 0;

    for (let i = 0; i < n; i++) {
        let currentRow = i % 4;

        if (currentRow == 0) {
            console.log('**' + str[currentIndex++] + str[currentIndex++] + '**');
        } else if (currentRow == 1 || currentRow == 3) {
            console.log('*' + str[currentIndex++] + '--' + str[currentIndex++] + '*');
        } else {
            console.log(str[currentIndex++] + '----' + str[currentIndex++]);
        }

        if (currentIndex > 9)
            currentIndex = 0;
    }
}

dnaHelix(10);