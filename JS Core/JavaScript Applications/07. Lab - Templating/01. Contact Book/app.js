$(() => {
    const list = $('#list').find('.content');
    const details = $('#details').find('.content');

    const context = {
        contacts: []
    };

    loadData();
    loadTemplates();

    async function loadData() {
        context.contacts = await $.get('data.json');
    }
    
    async function loadTemplates() {
        const [contactSource, listSource, detailsSource] = await Promise.all([
            $.get('templates/contact.html'),
            $.get('templates/listContacts.html'),
            $.get('templates/details.html')
        ]);

        Handlebars.registerPartial('contact', contactSource);

        const listTemplate = Handlebars.compile(listSource);
        const detailsTemplate = Handlebars.compile(detailsSource);
        list.html(listTemplate(context));

        $('.contact').click(function() {
            const index = $(this).closest('.contact').attr('data-id');
            details.html(detailsTemplate(context.contacts[index]));
        });
    }
});