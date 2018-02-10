function solve(input) {
    function sortBySubs(registered) {
        let person = '';
        let max = -1;

        for (let [key, value] of registered) {
            if (value.size > max) {
                max = value.size;
                person = key;
                continue;
            }

            if (value.size === max) {
                let currentPerson = personSubToOther.get(key);
                let maxPerson = personSubToOther.get(person);

                person = currentPerson > maxPerson ? key : person;
            }
        }
        return person;
    }
    
    let registered = new Map();
    let personSubToOther = new Map();

    for (let data of input) {
        if (data.length === 1) {
            if (!registered.has(data)) {
                registered.set(data, new Set());
                personSubToOther.set(data, 0);
            }
            continue;
        }

        let subscribe = data.split('-');

        if (registered.has(subscribe[1]) && subscribe[0] !== subscribe[1] && !registered.get(subscribe[1]).has(subscribe[0])
        && registered.has(subscribe[0])) {
            registered.get(subscribe[1]).add(subscribe[0]);

            let subs = personSubToOther.get(subscribe[0]);

            personSubToOther.set(subscribe[0], subs + 1);
        }
    }

    let person = sortBySubs(registered);
    let subs = registered.get(person);

    let count = 1;

    console.log(person);
    for (let sub of subs) {
        console.log(`${count}. ${sub}`);
        count++;
    }
}

solve(['T',
        'E',
        'S',
        'T',
        'D-D',
        'Q-P',
        'R-D'
    ]
);