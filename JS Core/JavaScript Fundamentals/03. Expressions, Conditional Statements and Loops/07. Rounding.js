function precisionRound([number, precision]) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

console.log(precisionRound([3.1415926535897932384626433832795, 2]));