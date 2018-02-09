function solve(startingYield) {
    startingYield = Number(startingYield);

    let countDays = 0;
    let workersConsume = [];

    while (startingYield >= 100) {
        workersConsume.push(startingYield - 26);
        startingYield -= 10;
        countDays++;
    }

    let totalAmount = workersConsume.length !== 0 ? workersConsume.reduce((a, b) => a + b) - 26 : 0;

    console.log(countDays);
    console.log(totalAmount);
}

solve('0');