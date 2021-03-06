function airport(input) {
    let planes = new Set();
    let port = new Map();

    for (let plane of input) {
        let [name, town, ppl, action] = plane.split(' ');
        ppl = Number(ppl);

        if (action === 'depart') {
            if (!planes.has(name)) continue;
            else {
                planes.delete(name);
            }
        }
        if (action === 'land') {
            if (planes.has(name)) continue;
            else {
                planes.add(name);
            }
        }

        if (!port.has(town)) {
            port.set(town, {planes: [], arrivals: 0, departures: 0});
        }
        if (!port.get(town).planes.includes(name)) {
            port.get(town).planes.push(name);
        }
        if (action === "land") {
            port.get(town).arrivals += ppl;
        } else {
            port.get(town).departures += ppl;
        }
    }

    console.log("Planes left:");
    [...planes].sort((p1, p2) => p1.localeCompare(p2)).forEach(p => console.log(`- ${p}`));
    [...port].sort((t1, t2) => {
        if (t1[1].arrivals < t2[1].arrivals) return 1;
        if (t1[1].arrivals > t2[1].arrivals) return -1;
        return t1[0].localeCompare(t2[0]);
    }).forEach(logData);

    function logData(town) {
        console.log(town[0]);
        console.log(`Arrivals: ${town[1].arrivals}`);
        console.log(`Departures: ${town[1].departures}`);
        console.log("Planes:");
        town[1].planes.sort((p1, p2) => p1.localeCompare(p2)).forEach(p => console.log(`-- ${p}`));
    }
}

airport([
    'RTA72 London -10 land',
    'RTA#72 Brussels -110 depart',
'RTA7!2 Warshaw 350 land',
'RTA72 Riga -201 depart',
'rta72 riga -13 land',
'rta Riga -200 depart'

]);