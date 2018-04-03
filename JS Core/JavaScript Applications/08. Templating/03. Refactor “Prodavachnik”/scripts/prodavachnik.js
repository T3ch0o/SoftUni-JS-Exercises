function startApp() {
    const loginForm = $('#formLogin');
    const registerForm = $('#formRegister');
    const createAdvertisementForm = $('#formCreateAd');
    const editAdvertisementForm = $('#formEditAd');
    const infoBox = $('#infoBox');
    const errorBox = $('#errorBox');
    const advertisementList = $('#list');

    displayPage('#viewHome');
    displayNavigation(sessionStorage.getItem('username') === null);

    loginForm.find('#buttonLoginUser').click(login);
    registerForm.find('#buttonRegisterUser').click(register);
    createAdvertisementForm.find('#buttonCreateAd').click(createAdvertisement);

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut(),
    });

    function request(url, method, data, link) {
        if (link === 'user') {
            return $.ajax({
                url: `https://baas.kinvey.com/user/kid_HkYDPnPcM/${url}`,
                method: method,
                data,
                contentType: 'application/json',
                headers: {
                    Authorization: `Basic ${btoa('kid_HkYDPnPcM:4fe46653c9624509888d0f8eb317a3c7')}`
                }
            });
        } else {
            return $.ajax({
                url: `https://baas.kinvey.com/appdata/kid_HkYDPnPcM/products/${url}`,
                method: method,
                data,
                contentType: 'application/json',
                headers: {
                    Authorization: `Kinvey ${sessionStorage.getItem('authtoken')}`
                }
            });
        }
    }

    function setSessions(response) {
        sessionStorage.setItem('authtoken', response._kmd.authtoken);
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('userId', response._id);

        displayPage('#viewListAds');
        displayNavigation(false);

        loginForm.trigger('reset');
        registerForm.trigger('reset');
    }

    // Controlling DOM Elements

    function displayPage(page, e) {
        $('section').hide();
        let viewId = page;

        if (viewId === undefined) {
            viewId = $(e.target).attr('id').replace('link', '#view')
        }

        if (viewId === '#viewLogout') {
            logout();
            viewId = '#viewHome';
        }

        if (viewId === '#viewListAds') {
            listAdvertisements();
        }

        $(viewId).show();
    }

    async function displayNavigation(unauthorized) {
        const container = $('#menu');

        const context = {
            unauthorized: unauthorized
        };

        const source = await $.get('templates/menuTemplate.html');
        const template = Handlebars.compile(source);

        container.html(template(context));
        container.find('a').click((e) => displayPage(undefined, e));
        displayGreeting();
    }

    function displayError(reason) {
        errorBox.text(reason.responseJSON.description);
        errorBox.show();

        setInterval(() => errorBox.fadeOut(), 5000);
    }

    function displayMessage(type, message) {
        if (type === 'info') {
            infoBox.text(message);
            infoBox.show();

            setInterval(() => infoBox.fadeOut(), 3000);
        } else {
            errorBox.text(message);
            errorBox.show();

            setInterval(() => errorBox.fadeOut(), 3000);
        }
    }

    function displayGreeting() {
        $('#loggedInUser').text(`Welcome ${sessionStorage.getItem('username')}!`);
    }

    // User session

    function login() {
        const username = loginForm.find('input[name="username"]').val();
        const password = loginForm.find('input[name="passwd"]').val();

        if (username.length === 0 || password.length === 0) {
            displayMessage('', 'Please fill the required fields!');
            return;
        }

        let data = JSON.stringify({
            username,
            password
        });

        request('login', 'POST', data, 'user')
            .then((response) =>  {setSessions(response); displayMessage('info', 'Login Successful!');})
            .catch(displayError);
    }

    function register() {
        const username = registerForm.find('input[name="username"]').val();
        const password = registerForm.find('input[name="passwd"]').val();
        const repeatPassword = registerForm.find('input[name="repeatpasswd"]').val();

        if (username.length === 0 || password.length === 0 || repeatPassword.length === 0) {
            displayMessage('', 'Please fill the required fields!');
            return;
        }

        if (password !== repeatPassword) {
            displayMessage('', "Passwords don't match!");
            return;
        }

        let data = JSON.stringify({
            username,
            password
        });

        request('', 'POST', data, 'user')
            .then((response) =>  {setSessions(response); displayMessage('info', 'Register Successful!');})
            .catch(displayError)
    }

    function logout() {
        $.ajax({
            url: `https://baas.kinvey.com/user/kid_HkYDPnPcM/_logout`,
            method: 'POST',
            headers: {
                Authorization: `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        })
            .then(function(response) {
                sessionStorage.clear();
                displayPage('#viewHome');
                displayNavigation(true);
            })
            .catch(displayError)
    }

    // Advertisement session

    function createAdvertisement() {
        const title = createAdvertisementForm.find('input[name="title"]').val();
        const description = createAdvertisementForm.find('textarea[name="description"]').val();
        const publisher = sessionStorage.getItem('username');
        const date = createAdvertisementForm.find('input[name="datePublished"]').val();
        let price = Number(createAdvertisementForm.find('input[name="price"]').val());

        if (title.length === 0 || description.length === 0 || date.length < 10 || price <= 0) {
            displayMessage('error', 'Please fill the required fields!');
            return;
        }

        if (publisher === null) {
            displayMessage('error', 'You need to be logged in!');
            return
        }

        const data = JSON.stringify({
            title,
            description,
            publisher,
            date,
            price: Number(price.toFixed(2))
        });

        request('', 'POST', data, '')
            .then(function() {
                createAdvertisementForm.trigger('reset');
                displayPage('#viewListAds');
                displayMessage('info', 'Book Created!');
            })
    }

    function listAdvertisements() {
        advertisementList.empty();

        request('', 'GET')
            .then((response) => renderAdvertisements(response));

        async function renderAdvertisements(response) {
            for (const advertisement of response) {
                advertisement.actions = false;

                if (advertisement._acl.creator === sessionStorage.getItem('userId')) {
                    advertisement.actions = true;
                }

                const source = await $.get('templates/advertismentsTemplate.html');
                const tempalte = Handlebars.compile(source);
                document.getElementById('list').innerHTML += tempalte(advertisement);

                let buttonEdit = $(`#e-${advertisement._id}`);
                let buttonDelete = $(`#d-${advertisement._id}`);

                buttonEdit.click(() => editAdvertisement(advertisement));
                buttonDelete.click(() => deleteAdvertisement(advertisement._id));
            }
        }
    }

    function editAdvertisement(advertisement) {
        displayPage('#viewEditAd');

        const title = editAdvertisementForm.find('input[name="title"]');
        const description = editAdvertisementForm.find('textarea[name="description"]');
        const date = editAdvertisementForm.find('input[name="datePublished"]');
        let price = editAdvertisementForm.find('input[name="price"]');

        title.val(advertisement.title);
        description.val(advertisement.description);
        date.val(advertisement.date);
        price.val(advertisement.price);

        editAdvertisementForm.find('#buttonEditAd').click(edit);
        editAdvertisementForm.find('#buttonBack').click(() => displayPage('#viewListAds'));

        function edit() {
            const publisher = sessionStorage.getItem('username');

            if (title.val() === '' || description.val() === '' || date.val().length < 10 || Number(price.val()) <= 0) {
                displayMessage('error', 'Please fill the required fields!');
                return;
            }

            const data = JSON.stringify({
                title: title.val(),
                description: description.val(),
                publisher,
                date: date.val(),
                price: Number(price.val())
            });

            request(advertisement._id, 'PUT', data, '')
                .then(function(response) {
                    displayMessage('info', 'Advertisement Edited!');
                });
        }
    }

    function deleteAdvertisement(id) {
        request(id, 'DELETE', '', '')
            .then(() => {displayMessage('info', 'Book Deleted!'); listAdvertisements();})
    }
}