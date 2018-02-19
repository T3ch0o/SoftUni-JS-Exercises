function createBook(selector, title, author, isbn) {
    let container = $(selector);

    $('<div>').attr('id', `book1`)
        .append($(`<p>${title}</p>`).addClass('title'))
        .append($(`<p>${author}</p>`).addClass('author'))
        .append($(`<p>${isbn}</p>`).addClass('isbn'))
        .append($(`<button>Select</button>`))
        .append($(`<button>Deselect</button>`)).appendTo(container);

    let buttons = document.querySelectorAll('#wrapper button');

    $(buttons[0]).on('click', select);
    $(buttons[1]).on('click', deselect);

    function select() {
        $('#book1').css('border', '2px solid blue');
    }

    function deselect() {
        $('#book1').css('border', 'none');
    }
}