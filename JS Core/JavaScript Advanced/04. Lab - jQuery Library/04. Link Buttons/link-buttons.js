function attachEvents() {
    $('.button').on('click', attachClass);

    function attachClass() {
        $('a').removeClass('selected');
        $(this).addClass('selected');
    }
}