function cappyJuice(input) {
    let juicesData = new Map();
    let bottles = new Map();

    for (let data of input) {
        let [juice, quantity] = data.split(' => ');

        if (!juicesData.has(juice)) {
            juicesData.set(juice, 0);
        }

        let currentQuantity = juicesData.get(juice);
        juicesData.set(juice, currentQuantity + Number(quantity));

        currentQuantity = juicesData.get(juice);
        if (currentQuantity >= 1000) {
            bottles.set(juice, Math.floor(currentQuantity / 1000))
        }
    }

    for (let [k, v] of bottles) {
        console.log(`${k} => ${v}`)
    }
}

cappyJuice(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']);