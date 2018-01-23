function triangleOfStars(n) {
    function printStars(f) {
        return console.log('*'.repeat(f));
    }

    for (let i = 1; i <= n; i++) {
        printStars(i);
    }

    for (let i = n - 1; i >= 1; i--) {
        printStars(i)
    }
}

triangleOfStars(3);