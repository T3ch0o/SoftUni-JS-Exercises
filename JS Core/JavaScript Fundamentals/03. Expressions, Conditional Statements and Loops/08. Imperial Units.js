function convertToInchAndFeet(n) {
    let toInch = Math.floor(n / 12);
    let toFoot = toInch * 12;

    console.log(`${toInch}'-${n - toFoot}"`)
}

convertToInchAndFeet(11);