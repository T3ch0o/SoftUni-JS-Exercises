function attachEvents() {
    const context = {
        towns: []
    };

    $('#btnLoadTowns').click(function() {
        const inputTowns = $('#towns').val();
        if (inputTowns.length !== 0) {
            context.towns = inputTowns.split(', ');
        }
        loadTemplates();
    });

    function loadTemplates() {
        const source = $('#towns-template').html();
        let townTemplate = Handlebars.compile(source);

        $('#root').html(townTemplate(context));
    }
}