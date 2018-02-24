function solution() {
    let ingredients = {
        'protein': 0,
        'carbohydrate': 0,
        'fat': 0,
        'flavour':0
    };

    function restock(microElement, quantity) {
        quantity = Number(quantity);
        ingredients[microElement] += quantity;
        return 'Success';
    }

    function prepare(recipe, quantity) {
        quantity = Number(quantity);
        let message = '';

        switch (recipe) {
            case 'apple':
                if (ingredients['flavour'] < quantity * 2) {
                    message =  'Error: not enough flavour in stock';
                }
                if (ingredients['carbohydrate'] < quantity) {
                    message =  'Error: not enough carbohydrate in stock';
                }

                if (message === '') {
                    ingredients['flavour'] -= quantity * 2;
                    ingredients['carbohydrate'] -= quantity;
                    return 'Success';
                }
                return message;
            case 'coke':
                if (ingredients['flavour'] < quantity * 20) {
                    message = 'Error: not enough flavour in stock';
                }
                if (ingredients['carbohydrate'] < quantity * 10) {
                    message = 'Error: not enough carbohydrate in stock';
                }
                if (message === '') {
                    ingredients['flavour'] -= quantity * 20;
                    ingredients['carbohydrate'] -= quantity * 10;
                    return 'Success';
                }
                return message;
            case 'burger':
                if (ingredients['flavour'] < quantity * 3) {
                    message = 'Error: not enough flavour in stock';
                }
                if (ingredients['fat'] < quantity * 7) {
                    message = 'Error: not enough fat in stock';
                }
                if (ingredients['carbohydrate'] < quantity * 5) {
                    message = 'Error: not enough carbohydrate in stock';
                }
                if (message === '') {
                    ingredients['flavour'] -= quantity * 3;
                    ingredients['fat'] -= quantity * 7;
                    ingredients['carbohydrate'] -= quantity * 5;
                    return 'Success';
                }
                return message;
            case 'omelet':
                if (ingredients['flavour'] < quantity) {
                    message = 'Error: not enough flavour in stock';
                }
                if (ingredients['fat'] < quantity) {
                    message = 'Error: not enough fat in stock';
                }
                if (ingredients['protein'] < quantity * 5) {
                    message = 'Error: not enough protein in stock';
                }
                if (message === '') {
                    ingredients['flavour'] -= quantity;
                    ingredients['fat'] -= quantity;
                    ingredients['protein'] -= quantity * 5;
                    return 'Success';
                }
                return message;
            case 'cheverme':
                if (ingredients['flavour'] < quantity * 10) {
                    message = 'Error: not enough flavour in stock';
                }
                if (ingredients['fat'] < quantity * 10) {
                    message = 'Error: not enough fat in stock';
                }
                if (ingredients['carbohydrate'] < quantity * 10) {
                    message = 'Error: not enough carbohydrate in stock';
                }
                if (ingredients['protein'] < quantity * 10) {
                    message = 'Error: not enough protein in stock';
                }
                if (message === '') {
                    ingredients['flavour'] -= quantity * 10;
                    ingredients['fat'] -= quantity * 10;
                    ingredients['carbohydrate'] -= quantity * 10;
                    ingredients['protein'] -= quantity * 10;
                    return 'Success';
                }
                return message;
            }
    }

    function report() {
        return `protein=${ingredients['protein']} carbohydrate=${ingredients['carbohydrate']} fat=${ingredients['fat']} flavour=${ingredients['flavour']}`;
    }


    return function (command) {
        let [action, recipe, quantity] = command.split(' ');

        let obj = {
            'restock': restock(recipe, quantity),
            'prepare': prepare(recipe, quantity),
            'report': report()
        };

        return obj[action];
    }
}

let manager = solution();

console.log(manager('restock carbohydrate 10'));
console.log(manager('restock flavour 10'));
console.log(manager('prepare apple 1'));
console.log(manager('restock fat 10'));
console.log(manager('prepare burger 1'));
console.log(manager('report'));
