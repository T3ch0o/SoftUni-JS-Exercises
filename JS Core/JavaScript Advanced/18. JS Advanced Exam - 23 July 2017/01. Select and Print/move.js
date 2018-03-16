function move(command) {
    function moveRight() {
        let option = $('#available-towns option:selected');
        option.appendTo('#selected-towns')

    }

    function moveLeft() {
        let option = $('#selected-towns option:selected');
        option.appendTo('#available-towns')
    }

    function print() {
        let select = $('#selected-towns option');
        let output = [];

        for (const option of select) {
            output.push(option.value);
        }

        $('#output').append(output.join('; '))
    }

    switch (command) {
        case 'left':
            moveLeft();
            break;
        case 'right':
            moveRight();
            break;
        case 'print':
            print();
            break
    }
}