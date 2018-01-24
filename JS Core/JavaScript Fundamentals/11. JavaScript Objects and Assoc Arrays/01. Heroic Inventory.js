function heroicInventory(input) {
    let parsedHero = [];

    for (let data of input) {
        let hero = data.split(/\W+/).filter(e => e !== '');

        let name = hero.shift();
        let level = Number(hero.shift());

        let heroObj = {
            name: name,
            level: level,
            items: hero
        };

        parsedHero.push(heroObj)
    }

    console.log(JSON.stringify(parsedHero));
}

heroicInventory(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']);