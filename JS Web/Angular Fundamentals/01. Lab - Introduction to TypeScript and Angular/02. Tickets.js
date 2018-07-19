function tickets(stringArr, sortingCriteria) {
    var Ticket = /** @class */ (function () {
        function Ticket(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
        return Ticket;
    }());
    var tickets = [];
    for (var _i = 0, stringArr_1 = stringArr; _i < stringArr_1.length; _i++) {
        var ticket = stringArr_1[_i];
        var _a = ticket.split('|'), destination = _a[0], price = _a[1], status_1 = _a[2];
        tickets.push(new Ticket(destination, Number(price), status_1));
    }
    tickets.sort(function (t1, t2) {
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
    'Boston|126.20|departed'], 'status'));
