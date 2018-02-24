function solve(commands) {
    let processor = (function () {
       let text = '';

       return function processor(commands) {
           let command = commands.split(' ');

           switch (command[0]) {
               case 'append':
                   text += command[1];
                   break;
               case 'removeStart':
                   text = text.slice(command[1]);
                   break;
               case 'removeEnd':
                   text = text.substr(0, text.length - command[1]);
                   break;
               case 'print':
                   console.log(text);
            }
        }
    })();

    for (let command of commands) {
        processor(command);
    }
}

solve(['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print']
);