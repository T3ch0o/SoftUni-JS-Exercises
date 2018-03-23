function getInfo() {
    const ul =  $('#buses');

    const req = {
        url: `https://judgetests.firebaseio.com/businfo/${$('#stopId').val()}.json`,
        beforeSend: () => ul.empty(),
        success: displayBuses,
        error: () => $('#stopName').text('Error')
    };

    $.ajax(req);

    function displayBuses(data) {
        $('#stopName').text(data.name);

        for (const bus in data.buses) {
            $(`<li>Bus ${bus} arrives in ${data.buses[bus]} minutes</li>`).appendTo(ul);
        }
    }
}