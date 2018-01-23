function radioCrystal(input) {
    function switchCommands(c, crystal) {
        switch (c) {
            case 'Cut': return crystal / 4;
            case 'Lap': return crystal * 0.8;
            case 'Grind': return crystal - 20;
            case 'Etch': return crystal - 2;
            default: return crystal;
        }
    }

    let firstCtrystal = input.splice(0, 1)[0];

    let commands = ['Cut', 'Lap', 'Grind', 'Etch', 'X-ray'];
    let command = 0;
    let commandTimes = 0;

    let prevCrystalT = 0;

    for (let i = 0; i < input.length; i++) {
        console.log(`Processing chunk ${input[i]} microns`);
        let currentCrystal = input[i];
        while (currentCrystal != firstCtrystal) {
            if (currentCrystal < firstCtrystal) command = 4;

            prevCrystalT = currentCrystal;
            currentCrystal = switchCommands(commands[command], currentCrystal);

            if (commands[command] == 'X-ray') {
                currentCrystal++;
                commandTimes++;
                continue;
            }

            if (currentCrystal < firstCtrystal && commands[command] != 'Etch') {
                if (commandTimes == 0) {
                    command++;
                    currentCrystal = prevCrystalT;
                    continue;
                }
                currentCrystal = Math.floor(prevCrystalT);
                console.log(`${commands[command]} x${commandTimes}\nTransporting and washing`);
                commandTimes = 0;
                command++;
                continue;
            }

            if (currentCrystal < firstCtrystal && commands[command] == 'Etch') {
                currentCrystal = Math.floor(currentCrystal);
                console.log(`${commands[command]} x${++commandTimes}\nTransporting and washing`);
                command++;
                commandTimes = 0;
                continue;
            }

            commandTimes++;
        }

        console.log(commands[command] == 'X-ray' ? `${commands[command]} x${commandTimes}` :`${commands[command]} x${commandTimes}\nTransporting and washing`);
        console.log(`Finished crystal ${currentCrystal} microns`);
        commandTimes = 0;
    }
}

radioCrystal([1000, 4000, 8100]);