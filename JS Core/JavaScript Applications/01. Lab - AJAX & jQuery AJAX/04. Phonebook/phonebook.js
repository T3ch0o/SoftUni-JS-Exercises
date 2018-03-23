function attachEvents() {
    let ul = $('#phonebook');

    getData();

    $('#btnLoad').click(getData);
    $('#btnCreate').click(createContact);

    function loadContacts(contacts) {
        ul.empty();
        console.log(contacts);

        for (let contact in contacts) {
            let deleteBtn = $('<button>[Delete]</button>');
            ul.append($(`<li>${contacts[contact].person}: ${contacts[contact].phone} </li>`).append(deleteBtn));

            deleteBtn.click(function () {
                let req = {
                    url: `https://phonebook-nakov.firebaseio.com/phonebook/${contact}.json`,
                    method: 'Delete',
                    success: getData
                };

                $.ajax(req);
            });
        }
    }

    function createContact() {
        let person = $('#person');
        let phone = $('#phone');

        if (person.val() === '' || phone.val() === '') {
            throw new Error('Invalid params');
        }

        let contact = JSON.stringify({
            person: person.val(),
            phone: phone.val()
        });

        let req = {
            url: 'https://phonebook-nakov.firebaseio.com/phonebook/.json',
            method: 'Post',
            contentType: 'application/json',
            data: contact,
            success: getData
        };

        $.ajax(req);

        person.val('');
        phone.val('');
    }

    function getData() {
        let req = {
            url: 'https://phonebook-nakov.firebaseio.com/phonebook/.json',
            method: 'GET',
            success: loadContacts
        };

        $.ajax(req);
    }
}