function hungryProgrammer(meals, commands) {
    function editMeals(meals, command) {
        switch (command[0]) {
            case 'Serve':
                console.log(meals.pop() + ' served!');
                break;
            case 'Add':
                let meal = command[1];

                if (meal !== undefined) {
                    break;
                }

                meals.unshift(meal);
                break;
            case 'Shift':
                let firstMeal = meals[command[1]];
                let secondMeal = meals[command[2]];

                meals[command[2]] = firstMeal;
                meals[command[1]] = secondMeal;
                break;
            case 'Eat':
                count += 1;
                console.log(meals.shift() + ' eaten');
                break;
            case 'Consume':
                let startIndex = Number(command[1]);
                let endIndex = Number(command[1]) === 0 ? Number(command[2]) + 1 : Number(command[2]);

                count += endIndex;

                meals.splice(startIndex, endIndex);
                console.log('Burp!');
                break;
        }

        return [meals, count];
    }

    let count = 0;

    for (let command of commands) {
        command = command.split(' ');

        if (command[0] === 'End') {
            console.log(meals.length === 0 ? `The food is gone` : `Meals left: ${meals.join(', ')}`);
            console.log(`Meals eaten: ${count}`);
            break;
        }

        if (meals.length === 0 && command[0] !== 'Add') {
            continue;
        }

        if (command[1] < 0 || command[2] < 0 ||
            command[1] > meals.length - 1 || command[2] > meals.length - 1) {
            continue;
        }

        let data = editMeals(meals, command, count);
        meals = data[0];
        count = data[1];
    }
}

hungryProgrammer([],
['Consume 2 9',
'Add',
'Eat',
'End']
);