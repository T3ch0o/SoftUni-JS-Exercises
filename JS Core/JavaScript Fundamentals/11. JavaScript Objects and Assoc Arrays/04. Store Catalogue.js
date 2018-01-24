function storeCatalogue(input) {
    let catalogue = new Map();

    for (let data of input) {
        let [product, price] = data.split(' : ');

        catalogue.set(product, price);
    }

    let letter = new Set();
    Array.from(catalogue.keys()).forEach(e => letter.add(e[0]));

    let sortedLetters = Array.from(letter).sort();
    let sortedProducts = Array.from(catalogue.keys()).sort();

    for (let char of sortedLetters) {
        console.log(char);

        for (let product of sortedProducts) {
            if (product.startsWith(char)) {
                console.log(` ${product}: ${catalogue.get(product)}`)
            }
        }
    }
}

storeCatalogue(['Appricot : 20.4',
    'Fridge : 1500', 'TV : 1499',
    'Deodorant : 10', 'Boiler : 300',
    'Anti-Bug Spray : 15', 'T-Shirt : 10']);