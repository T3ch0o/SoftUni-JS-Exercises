function pyramidOfKingDjoser(base, increment) {
    function sumMaterials(materials, increment) {
        let sum = 0;

        for (let i = 0; i < materials.length; i++) {
            sum += materials[i] * increment;
        }

        return Math.ceil(sum);
    }

    let stone = [];
    let marble = [];
    let lapisLazuli = [];
    let gold = 0;

    let stepsCount = 1;

    while (true){
        let baseSum = base ** 2;
        base -= 2;

        if (base === 0 || base === -1) {
            gold = base === -1 ? Math.ceil(1 * increment) : Math.ceil(4 * increment);

            break;
        }

        let stoneSum = base ** 2;
        stone.push(stoneSum);

        if (stepsCount % 5 === 0) {
            let lapisSum = baseSum - (base ** 2);
            lapisLazuli.push(lapisSum);

            stepsCount++;
            continue;
        }

        let marbleSum = baseSum - (base ** 2);
        marble.push(marbleSum);

        stepsCount++;
    }

    let stoneSum = sumMaterials(stone, increment);
    let marbleSum = sumMaterials(marble, increment);
    let lapisSum = sumMaterials(lapisLazuli, increment);

    let pyramidHeight = Math.floor(stepsCount * increment);

    console.log(`Stone required: ${stoneSum}\nMarble required: ${marbleSum}\nLapis Lazuli required: ${lapisSum}` +
        `\nGold required: ${gold}\nFinal pyramid height: ${pyramidHeight}`);
}

pyramidOfKingDjoser(1, 0.5);