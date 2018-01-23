function getInfraction([speed, place]) {
    if (getLimit(place) >= speed) {
    } else {
        let overLimit = speed - getLimit(place);

        if (overLimit <= 20)
                console.log('speeding');
        else if (overLimit <= 40)
                console.log('excessive speeding');
        else
                console.log('reckless driving');
    }

    function getLimit(zone) {
        switch (zone) {
            case 'motorway': return 130;
            case 'interstate': return 90;
            case 'city': return 50;
            case 'residential': return 20;
        }
    }
}

getInfraction([21, 'residential']);