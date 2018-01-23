function oddOrEven(n) {
    if (n % 2 == 0) console.log('even');
    else if (n == Math.round(n % 2)) console.log('odd');
    else console.log('invalid');
}