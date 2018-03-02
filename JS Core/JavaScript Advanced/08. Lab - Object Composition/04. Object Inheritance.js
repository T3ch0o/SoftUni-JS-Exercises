function objectInherit(commands) {
    let commandProcessor = (function () {
        let objects = new Map();
        
        function create(name) {
            objects.set(name, {});
        }

        function inherit(name, parent) {
            objects.set(name, Object.create(objects.get(parent)))
        }

        function set(name, key, value) {
            objects.get(name)[key] = value;
        }
        
        function print(name) {
            let current = objects.get(name);
            let props = [];

            for (let prop in current) {
                props.push(`${prop}:${current[prop]}`)
            }

            console.log(props.join(', '))
        }

        return {create, inherit, set, print};
    })();

    for (let command of commands) {
        command = command.split(' ');

        for (let i = 0; i < command.length; i+=2) {
            if (command[i] === 'inherit') {
                commandProcessor[command[i]](command[i - 1], command[i + 1]);
                continue;
            }

            if (command[i] === 'set') {
                commandProcessor[command[i]](command[i + 1], command[i + 2], command[i + 3]);
                break;
            }

            commandProcessor[command[i]](command[i + 1]);
    }
    }
}

objectInherit(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
);