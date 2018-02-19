function search() {
    $('body *').css('font-weight', 'normal');
    let input = $('#searchText').val();
    let ul = $(`ul#towns li:contains(${input})`);
    ul.css('font-weight', 'bold');
    $('#result').text(`${ul.length} matches found.`)
}