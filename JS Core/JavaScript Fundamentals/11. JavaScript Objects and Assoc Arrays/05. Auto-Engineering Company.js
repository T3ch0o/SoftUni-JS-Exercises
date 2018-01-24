function carModels(input) {
    let carBrands = new Map();

    for (let data of input) {
        let [brand, model, producedCars] = data.split(" | ");

        if (!carBrands.has(brand)) {
            carBrands.set(brand, new Map());
        }

        if (!carBrands.get(brand).has(model)) {
            carBrands.get(brand).set(model, 0);
        }

        let currentProducedCars = carBrands.get(brand).get(model);

        carBrands.get(brand).set(model, currentProducedCars + Number(producedCars));
    }

    for (let [key, value] of carBrands) {
        console.log(`${key}`);

        for (let [k, v] of value) {
            console.log(`###${k} -> ${v}`)
        }
    }
}

carModels(["Audi | Q7 | 1000", 
    "Audi | Q6 | 100", 
    "BMW | X5 | 1000", 
    "BMW | X6 | 100", 
    "Citroen | C4 | 123", 
    "Volga | GAZ-24 | 1000000",
    "Lada | Niva | 1000000", 
    "Lada | Jigula | 1000000",
    "Citroen | C4 | 22", 
    "Citroen | C5 | 10"]);