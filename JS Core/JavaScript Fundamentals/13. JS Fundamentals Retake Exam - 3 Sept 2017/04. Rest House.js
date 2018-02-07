function restHouse(inputRooms, inputGuests) {
    let rooms = new Map();

    for (let room of inputRooms) {
        rooms.set(room.number, room.type === 'double-bedded' ? 2 : 3);
    }

    let roomsWithGuests = new Map();
    let gender = new Map();
    let left = 0;

    for (let guest of inputGuests) {
        let roomFound = false;

        if (guest.first.gender !== guest.second.gender) {
            for (let [number, type] of rooms) {
                if (type === 2) {
                    rooms.set(number, 0);
                    if (!roomsWithGuests.has(number)) {
                        roomsWithGuests.set(number, new Map());
                    }
                    roomsWithGuests.get(number).set(guest.first.name, guest.first.age);
                    roomsWithGuests.get(number).set(guest.second.name, guest.second.age);

                    roomFound = true;
                    break;
                }
            }

        } else {
            for (let [number, type] of rooms) {
                if (type === 3) {
                    rooms.set(number, type - 2);
                    if (!roomsWithGuests.has(number)) {
                        roomsWithGuests.set(number, new Map());
                    }
                    roomsWithGuests.get(number).set(guest.first.name, guest.first.age);
                    roomsWithGuests.get(number).set(guest.second.name, guest.second.age);

                    gender.set(number, guest.first.gender);

                    roomFound = true;
                    break;
                }

                if (type === 1 && guest.first.gender === gender.get(number)) {
                    rooms.set(number, 0);
                    if (!roomsWithGuests.has(number)) {
                        roomsWithGuests.set(number, new Map());
                    }
                    roomsWithGuests.get(number).set(guest.first.name, guest.first.age);
                    guest.second.name = 'no';
                    break;
                }
            }
        }

        if (!roomFound) {
            left += guest.second.name === 'no' ? 1 : 2;
        }
    }

    let sortByRooms = [...rooms.keys()].sort(function (a, b) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    });

    for (let roomNumber of sortByRooms) {
        console.log(`Room number: ${roomNumber}`);

        if (roomsWithGuests.has(roomNumber)) {
            let sortByNames = [...roomsWithGuests.get(roomNumber).keys()].sort();

            for (let name of sortByNames) {
                console.log(`--Guest Name: ${name}`);
                console.log(`--Guest Age: ${roomsWithGuests.get(roomNumber).get(name)}`);
            }
        }

        console.log(`Empty beds in the room: ${rooms.get(roomNumber)}`);
    }
    console.log(`Guests moved to the tea house: ${left}`);
}

restHouse([ {"number":"481","type":"triple"},
        {"number":"115A","type":"triple"},
        {"number":"A621","type":"triple"}],
    [ {"first":{"name":"Ora Wilkerson","gender":"female","age":5},"second":{"name":"Lynette Pena","gender":"female","age":28}},
        {"first":{"name":"Jimmy Jimenez","gender":"male","age":33},"second":{"name":"Troy Payne","gender":"male","age":64}},
        {"first":{"name":"Salvatore Carroll","gender":"male","age":26},"second":{"name":"Clinton Santiago","gender":"male","age":63}},
        {"first":{"name":"Tyrone Hogan","gender":"male","age":59},"second":{"name":"Jim Graham","gender":"male","age":6}},
        {"first":{"name":"Katie Fisher","gender":"female","age":69},"second":{"name":"Erin Moreno","gender":"female","age":33}} ]

);