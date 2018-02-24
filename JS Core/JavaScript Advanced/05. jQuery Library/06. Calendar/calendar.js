function calendar([day, month, year]) {
    month -= 1;

    let date = new Date(year, month, 1);
    let days = [];
    let dayInWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;

    while (date.getMonth() === month) {
        days.push(date.getDate());
        date.setDate(date.getDate() + 1);
    }

    let monthName = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    let table = $('<table>');
    table.append($(`<caption>${monthName[date.getMonth() - 1]} ${year}</caption>`));
    let tbody = $('<tbody>');
    tbody.append($('<tr>').append($('<th>Mon</th>'))
        .append($('<th>Tue</th>'))
        .append($('<th>Wed</th>'))
        .append($('<th>Thu</th>'))
        .append($('<th>Fri</th>'))
        .append($('<th>Sat</th>'))
        .append($('<th>Sun</th>')));

   while (true) {
        let tr = $('<tr>');
        for (let j = 1; j <= 7; j++) {
            if (days.length === 0) {
                for (let left = j; left <= 7; left++) {
                    tr.append($(`<td></td>`));
                }
                break;
            }

            if (dayInWeek > 0 ) {
                tr.append($(`<td></td>`));
                dayInWeek--;
                continue;
            }

            let currentDay = days.shift();

            if (day === currentDay) {
                tr.append($(`<td>${currentDay}</td>`).addClass('today'));
                continue;
            }

            tr.append($(`<td>${currentDay}</td>`))
        }

        tr.appendTo(tbody);

       if (days.length === 0) {
           break;
       }
    }

    tbody.appendTo(table);
    table.appendTo('#content');
}