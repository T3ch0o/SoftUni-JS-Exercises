function initializeTable() {
    $('#createLink').on('click', addCountry);

    createCountry('Bulgaria', 'Sofia');
    createCountry('Germany', 'Berlin');
    createCountry('Russia', 'Moscow');

    fixLinks();

    function fixLinks() {
        $('tr a').css('display', 'inline');
        $('tr:last-child a:contains(Down)').css('display', 'none');
        $('tr:nth-child(3) a:contains(Up)').css('display', 'none');
    }

    function addCountry() {
        let name = $('#newCountryText').val();
        let capital = $('#newCapitalText').val();
        createCountry(name, capital);
        fixLinks();
    }

    function createCountry(name, capital) {
        let row = $('<tr>')
            .append($(`<td>${name}</td>`))
            .append($(`<td>${capital}</td>`))
            .append($(`<td>`)
                .append($('<a href="#">[Up]</a>').on('click', moveUp))
                .append(' ')
                .append($('<a href="#">[Down]</a>').on('click', moveDown))
                .append(' ')
                .append($('<a href="#">[Delete]</a>').on('click', deleteRow)));
        row.css('display', 'none');
        row.appendTo($('#countriesTable'));
        row.fadeIn();
    }

    function moveUp() {
        let currentRow = $(this).parent().parent();
        currentRow.fadeOut(() => {
            currentRow.insertBefore(currentRow.prev());
            currentRow.fadeIn();
            fixLinks();
        });
    }

    function moveDown() {
        let currentRow = $(this).parent().parent();
        currentRow.fadeOut(() => {
            currentRow.insertAfter(currentRow.next());
            currentRow.fadeIn();
            fixLinks();
        });
    }

    function deleteRow() {
        let currentRow = $(this).parent().parent();
        currentRow.fadeOut(() => {
            currentRow.remove();
            fixLinks();
        });
    }
}