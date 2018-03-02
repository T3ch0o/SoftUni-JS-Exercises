function processor(commands) {
    let listProcessor = (function () {
        let result = [];

        return {
            add: function (word) { result.push(word)},
            remove: function (word) {
                result = result.filter(e => e !== word)
            },
            print: () => console.log(result.toString())
        };
    })();

    for (let command of commands) {
        command = command.split(' ');
        listProcessor[command[0]](command[1]);
    }
}

processor(['add hello', 'add again', 'remove hello', 'add again', 'print']);