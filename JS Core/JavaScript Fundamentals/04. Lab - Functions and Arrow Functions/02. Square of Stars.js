function squareOfStars(n = 5) {
    function printStars(f = n) {
        return console.log('*' + ' *'.repeat(f - 1))
    }

    for (let i = 1; i <= n; i++) {
        printStars()
    }
}

squareOfStars(0);