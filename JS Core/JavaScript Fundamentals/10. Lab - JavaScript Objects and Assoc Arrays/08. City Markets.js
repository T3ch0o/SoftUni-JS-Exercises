function cityMarkets(input) {
    let towns = new Map();

    for (let data of input) {
        let [town, product, price] = data.split(' -> ');

        price = price.split(' : ');
        price = price.reduce((a, b) => a * b);

        if (!towns.has(town)) {
            towns.set(town, new Map());
        }

        if (!towns.get(town).has(product)) {
            towns.get(town).set(product, 0)
        }

        let currentPrice = towns.get(town).get(product);

        towns.get(town).set(product, currentPrice + price)
    }

    for (let [k, v] of towns) {
        console.log(`Town - ${k}`);
        for (let [key, value] of v) {
            console.log(`$$$${key} : ${value}`);
        }
    }
}

cityMarkets(['Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3']);