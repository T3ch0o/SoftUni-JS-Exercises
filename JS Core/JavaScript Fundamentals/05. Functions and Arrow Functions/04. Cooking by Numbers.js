function cookingWithNumbers(input) {
    let number = Number(input.splice(0,1));

    for (let i = 0; i < input.length; i++) {
        number = command(input[i], number);
        console.log(number);
    }

    function command(str, number) {
        switch (str) {
            case 'chop': return number / 2;
            case 'dice': return Math.sqrt(number);
            case 'spice': return number + 1;
            case 'bake': return number * 3;
            case 'fillet': return number - (number * 0.2);
        }
    }
}

cookingWithNumbers(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);