function systemComponents(input) {
    function sortSystem(a, b) {
        if(Object.keys(database.get(a)).length === Object.keys(database.get(b)).length) {
            if(a > b) return 1;
            if(a < b) return -1;
        } else {
            return Object.keys(database.get(a)).length < Object.keys(database.get(b)).length;
        }
    }

    let database = new Map();

    for (let data of input) {
        let [system, component, subComponent] = data.split(' | ');
        if (!database.has(system)) {
            database.set(system, new Map);
        }

        if (!database.get(system).has(component)) {
            database.get(system).set(component, [])
        }

        database.get(system).get(component).push(subComponent);
    }

    let sortedSystem = [...database.keys()].sort(sortSystem);

    for (let systemName of sortedSystem) {
        console.log(systemName);

        let system = database.get(systemName);
        let componentsSortedKeys = Object.keys(system).sort((a, b) => {
            return system[a].length < system[b].length
        });

        for (let component of componentsSortedKeys) {
            console.log(`|||${component}`);
            system[component].forEach(subcomponent => {
                console.log(`||||||${subcomponent}`)
            });
        }
    }

}

systemComponents(["SULS | Main Site | Home Page",
    "SULS | Main Site | Login Page",
    "SULS | Main Site | Register Page",
    "SULS | Judge Site | Login Page",
    "SULS | Judge Site | Submittion Page",
    "Lambda | CoreA | A23",
    "SULS | Digital Site | Login Page",
    "Lambda | CoreB | B24",
    "Lambda | CoreA | A24",
    "Lambda | CoreA | A25",
    "Lambda | CoreC | C4",
    "Indice | Session | Default Storage",
    "Indice | Session | Default Security"]);