function move(command) {
    let option = $('#towns option:selected');

    function moveUp() {
        const nextOption = option.next();
        option.insertAfter(nextOption);
    }

    function moveDown() {
        const prevOption = option.prev();
        option.insertBefore(prevOption);
    }

    switch (command) {
        case 1:
            moveUp();
            break;
        case -1:
            moveDown();
            break;
    }
}