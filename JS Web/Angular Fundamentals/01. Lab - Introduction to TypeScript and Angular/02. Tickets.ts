function tickets(stringArr : string[], sortingCriteria : string) {
    class Ticket {
        public destination : string;
        public price : number;
        public status : string;

        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let tickets : Ticket[] = [];

    for (const ticket of stringArr) {
        const [ destination, price, status ] = ticket.split('|');
        tickets.push(new Ticket(destination, Number(price), status));
    }

    tickets.sort((t1, t2) : number => {
        if (t1[sortingCriteria] > t2[sortingCriteria]) {
            return 1;
        }
        return -1;
    });

    return tickets;
}

console.log(tickets(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status'
));