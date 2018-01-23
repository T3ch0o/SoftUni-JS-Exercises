function lastDayPrevMonth([day, month, year]) {
    let date = new Date(year, month - 1, 0);

    console.log(date.getDate());
}

lastDayPrevMonth([13, 12, 2004]);