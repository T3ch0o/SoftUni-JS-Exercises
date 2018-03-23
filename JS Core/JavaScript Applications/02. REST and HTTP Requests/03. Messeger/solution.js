function attachEvents() {
    const messagesTextarea = $('#messages');
    const authorInput = $('#author');
    const contentInput = $('#content');

    refresh();

    function refresh() {
        const req = {
            url: 'https://messenger-cd263.firebaseio.com/-L8C5lLEj9b0_rrXs1QB.json',
            complete: function (data) {
                const messages = Object.values(data.responseJSON);

                messages
                    .sort((first, second) => first.timestamp - second.timestamp)
                    .forEach(message => messagesTextarea.append(`${message.author}: ${message.content}\n`))
            }
        };

        $.ajax(req);
    }

    $('#submit').click(function () {
        const req = {
            url: 'https://messenger-cd263.firebaseio.com/-L8C5lLEj9b0_rrXs1QB.json',
            method: 'POST',
            complete: refresh,
            data: JSON.stringify({
                author: authorInput.val(),
                content: contentInput.val(),
                timestamp: new Date().getTime()
            })
        };

        $.ajax(req);

        contentInput.val('');
        $('#refresh').click(refresh);
    });
}