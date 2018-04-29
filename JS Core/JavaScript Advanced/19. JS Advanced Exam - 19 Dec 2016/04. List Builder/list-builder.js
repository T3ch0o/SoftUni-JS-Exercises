function listBuilder(selector) {
    function createNewList() {
        $(selector).append($('<ul>'));
    }
    
    function addItem(text) {
        let buttonUp = $('<button>Up</button>');
        let buttonDown = $('<button>Down</button>');

        buttonUp.click(function () {
            const prevLi = $(this).parent().prev();
            $(this).parent().insertBefore(prevLi);
        });

        buttonDown.click(function () {
            const nextLi = $(this).parent().next();
            $(this).parent().insertAfter(nextLi);
        });

        let li = $('<li>');

        li.append(text)
            .append(buttonUp)
            .append(buttonDown);

        let ul = $(selector).find('ul');

        ul.append(li)
    }

    return {
        createNewList,
        addItem
    }
}
