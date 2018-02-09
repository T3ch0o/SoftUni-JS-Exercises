function buildingWall(numbers) {
    function isEquals(numbers) {
        return numbers === 30
    }
    
    numbers = numbers.map(Number);

    let dailyCubicYards = [];
    let countDays = 0;

    while (!numbers.every(isEquals)) {
        let countCubs = 0;

        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] !== 30) {
                numbers[i]++;
                countCubs++;
            }
        }

        dailyCubicYards.push(195 * countCubs);
        countDays++;
    }

    let totalPesos = dailyCubicYards.reduce((a, b) => a + b);

    console.log(dailyCubicYards.join(', '));
    console.log(`${totalPesos * 1900} pesos`)
}

buildingWall(['21', '25', '28']);