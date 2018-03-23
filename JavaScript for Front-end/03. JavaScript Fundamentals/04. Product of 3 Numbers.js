function productOfNumbers(x, y, z) {
    return Math.sign(x * y * z) === 1 ? 'positive' : 'negative';
}

console.log(productOfNumbers(2, 1, -1));