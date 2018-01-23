function populationInTowns(input) {
    let towns = new Map();

    for (let data of input) {
        let [town, population] = data.split(' <-> ');

        if (!towns.has(town)) {
            towns.set(town, 0);
        }

        let currentPopulation = towns.get(town);
        towns.set(town, currentPopulation + Number(population));
    }

    for (let [key, value] of towns) {
        console.log(`${key} : ${value}`)
    }
}

populationInTowns(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']);