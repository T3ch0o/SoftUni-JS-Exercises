function domSearch(selector, caseSensitive) {
    $('<div>').addClass('add-controls')
        .append($('<label>Enter text: </label>').append($('<input>')))
        .append($('<a>Add</a>').addClass('button').on('click', addItem))
        .appendTo(selector);

    $('<div>').addClass('search-controls')
        .append($('<lable>Search</lable>').append($('<input>').on('change', searchItem)))
        .appendTo(selector);

    $('<div>').addClass('result-controls')
        .append($('<ul>').addClass('items-list'))
        .appendTo(selector);

    function addItem() {
        let text = $('.add-controls label input');

        if (text.val() === '') {
            return;
        }

        $('.items-list')
            .append($('<li>').addClass('list-item')
                .append($('<a>X</a>').addClass('button').on('click', deleteItem))
                .append($(`<strong>${text.val()}</strong>`)));
        text.val('');
    }
    
    function deleteItem() {
        $(this).parent().remove();
    }
    
    function searchItem() {
        let text = $(this).val();

        $('.list-item').each((index, li) => matches(li, text))
    }

    function matches(li, text) {
        $(li).css('display', 'block');
        if(caseSensitive) {
            if ($(li).find('strong').text().indexOf(text) == -1) {
                $(li).css('display', 'none');
            }
        } else {
            if ($(li).find('strong').text().toLowerCase().indexOf(text.toLowerCase()) == -1) {
                $(li).css('display', 'none');
            }
        }
    }
}