function tickets(arr, sortMethod) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let arrOfTickets = [];

    for (let data of arr) {
        let ticket = data.split('|');

        let currentTicket = new Ticket(ticket[0], Number(ticket[1]), ticket[2]);

        arrOfTickets.push(currentTicket);
    }

    if (sortMethod === 'price') {
        arrOfTickets.sort((a, b) => a[sortMethod] - b[sortMethod]);
    } else {
        arrOfTickets.sort((a, b) => a[sortMethod].localeCompare(b[sortMethod]));
    }

    return arrOfTickets;
}

console.log(tickets(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'price'
));