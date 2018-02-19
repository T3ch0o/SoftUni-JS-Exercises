function increment(div) {
    let textArea = $('<textarea>');
    textArea.addClass('counter');
    textArea.val(0);
    textArea.prop('disabled', 'true');
    textArea.appendTo(div);

    let button = $('<button>Increment</button>');
    button.addClass('btn');
    button.attr('id', 'incrementBtn');
    button.appendTo(div);

    let addButton = $('<button>Add</button>');
    addButton.addClass('btn');
    addButton.attr('id', 'addBtn');
    addButton.appendTo(div);

    let ul = $('<ul>');
    ul.addClass('results');
    ul.appendTo(div);

    button.on('click', incrementNum);
    addButton.on('click', addNewItem);

    function incrementNum() {
        let value = Number(textArea.val());
        textArea.val(value + 1)
    }

    function addNewItem() {
        $(`<li>${textArea.val()}</li>`).appendTo('.results');
    }
}