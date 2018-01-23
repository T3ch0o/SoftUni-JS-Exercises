function addAndRemoveElemtnts(commands) {
    let arr = [];

    let number = 1;

    for (let i = 0; i < commands.length; i++) {
        if (commands[i] === 'add') {
            arr.push(number);
        }

        if (commands[i] == 'remove') {
            arr.pop();
        }

        number++;
    }

    console.log(arr.length == 0 ? 'Empty' : arr.join('\n'));
}

addAndRemoveElemtnts(['add', 'add', 'remove', 'add', 'add' ]);