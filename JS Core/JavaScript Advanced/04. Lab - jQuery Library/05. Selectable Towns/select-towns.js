function attachEvents() {
    $('#items li').on('click', attachClass);
    $('#showTownsButton').on('click', showTowns);

    function attachClass() {
        let li = $(this);

        if (li.attr('data-selected')) {
            li.removeAttr('data-selected');
            li.css('background-color', '');
        } else {
            li.attr('data-selected', 'true');
            li.css('background-color', '#DDD')
        }
    }

    function showTowns() {
        let items = [];

        $('#items li[data-selected]').each((index, element) => items.push(element.textContent));

        $('#selectedTowns').text(`Selected towns: ${items.length === 0 ? 'there is no towns' : items.join(', ')}`)
    }
}