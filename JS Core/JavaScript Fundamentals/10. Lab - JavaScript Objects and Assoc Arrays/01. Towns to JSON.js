function townsToJSON(towns) {
    towns.shift();

    let result = [];

    for (let i = 0; i < towns.length; i++) {
       let [town, lat, lng] = towns[i].split(/\s*\|\s*/).filter(e => e !== '');

       let townProp = {
           Town: town,
           Latitude: Number(lat),
           Longitude: Number(lng)
       };

       result.push(townProp)
    }

    console.log(JSON.stringify(result));
}

townsToJSON(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
);