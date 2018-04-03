function startApp() {
    const loginForm = $('#formLogin');
    const registerForm = $('#formRegister');
    const createBookForm = $('#formCreateBook');
    const formEditBook = $('#formEditBook');
    const section = $('section');
    const viewHome = $('#viewHome');
    const logInUser = $('#loggedInUser');
    const infoBox = $('#infoBox');
    const errorBox = $('#errorBox');
    const tbody = $('#list');

    viewHome.show();

    // Attach Event Listeners

    $('#menu').find('a').click(displayPage);
    loginForm.submit(login);
    registerForm.submit(register);
    createBookForm.submit(createBook);

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut(),
    });

    displayGreeting();
    displayMenu(localStorage.getItem('username') !== null);

    function request(url, method, data, link) {
        if (link === 'user') {
            return $.ajax({
                url: `https://baas.kinvey.com/user/kid_Syv0sPL9M/${url}`,
                method: method,
                data,
                contentType: 'application/json',
                headers: {
                    Authorization: `Basic ${btoa('kid_Syv0sPL9M:f47b1982c2d5420b964eff3c949eb5bb')}`
                }
            });
        } else {
            return $.ajax({
                url: `https://baas.kinvey.com/appdata/kid_Syv0sPL9M/books/${url}`,
                method: method,
                data,
                contentType: 'application/json',
                headers: {
                    Authorization: `Kinvey ${localStorage.getItem('authtoken')}`
                }
            });
        }
    }

    function displayPage() {
        $('section').hide();
        let viewId = $(this).attr('id').replace('link', '#view');

        if (viewId === '#viewLogout') {
            logout();
            viewId = '#viewHome';
        }

        if (viewId === '#viewBooks') {
            listAllBooks()
        }

        $(viewId).show();
    }

    function displayError(reason) {
        errorBox.text(reason.responseJSON.description);
        errorBox.show();

        setInterval(() => errorBox.fadeOut(), 3000);
    }

    function displayGreeting() {
        const username = localStorage.getItem('username');

        if (username) {
            logInUser.text(`Welcome, ${username}!`);
        } else {
            logInUser.empty();
        }
    }

    function displayMenu(authorize) {
        if (authorize) {
            $('#linkBooks, #linkCreateBook, #linkLogout').show();
            $('#linkLogin, #linkRegister').hide();
        } else {
            $('#linkBooks, #linkCreateBook, #linkLogout').hide();
            $('#linkLogin, #linkRegister').show();
        }
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

    // User session

    function login(e) {
        e.preventDefault();

        const username = loginForm.find('input[type="text"]');
        const password = loginForm.find('input[type="password"]');

        if (username.val() === '' || password.val() === '') {
            displayMessage('', 'Please fill the required fields!');
            return;
        }

        let data = JSON.stringify({
            username: username.val(),
            password: password.val()
        });

        request('login', 'POST', data, 'user')
            .then(function(response) {
                localStorage.setItem('authtoken', response._kmd.authtoken);
                localStorage.setItem('username', response.username);
                localStorage.setItem('userId', response._id);
                logInUser.text(`Welcome, ${response.username}!`);

                loginForm.trigger('reset');
                displayMenu(true);
                listAllBooks();

                section.hide();
                $('#viewBooks').show();
            }, displayMessage('info', 'Login Success!'))
            .catch(displayError)
    }

    function register(e) {
        e.preventDefault();

        const username = registerForm.find('input[name="username"]');
        const password = registerForm.find('input[name="passwd"]');
        const repeatPassword = registerForm.find('input[name="repeatpasswd"]');

        if (username.val() === '' || password.val() === '' || repeatPassword === '') {
            displayMessage('', 'Please fill the required fields!');
            return;
        }

        if (password.val() !== repeatPassword.val()) {
            displayMessage('', "Passwords don't match!");
            return;
        }

        let data = JSON.stringify({
            username: username.val(),
            password: password.val()
        });

        request('', 'POST', data, 'user')
            .then(function(response) {
                localStorage.setItem('authtoken', response._kmd.authtoken);
                localStorage.setItem('username', response.username);
                localStorage.setItem('userId', response._id);

                registerForm.trigger('reset');
                displayMenu(true);
                section.hide();
                viewHome.show();
            }, displayMessage('info', 'Registration Successful!'))
            .catch(displayError)
    }

    function logout() {
        $.ajax({
            url: `https://baas.kinvey.com/user/kid_Syv0sPL9M/_logout`,
            method: 'POST',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authtoken')}`
            }
        })
            .then(function(response) {
                localStorage.clear();
                displayMenu(false);

                displayGreeting();
            })
            .catch(displayError)
    }

    // CRUD Books

    function createBook(e) {
        e.preventDefault();

        const title = createBookForm.find('input[name="title"]');
        const author = createBookForm.find('input[name="author"]');
        const description = createBookForm.find('textarea[name="description"]');

        if (title.val() === '' || author.val() === '' || description.val() === '') {
            displayMessage('error', 'Please fill the required fields!');
            return;
        }

        const data = JSON.stringify({
            title: title.val(),
            author: author.val(),
            description: description.val()

        });

        request('', 'POST', data, '')
            .then(function(response) {
                createBookForm.trigger('reset');
                listAllBooks();
                section.hide();
                $('#viewBooks').show();
            })
            .catch(displayError)
    }

    function listAllBooks() {
        tbody.empty();
        request('', 'GET', '', '')
            .then(function(response) {
                for (let book of response) {
                    let buttons = [];

                    if (book._acl.creator === localStorage.getItem('userId')) {
                        let buttonEdit = $('<button>&#9998;</button>');
                        let buttonDelete = $('<button>&#10006;</button>');

                        buttonEdit.click((e) => updateBook(book, e));
                        buttonDelete.click(() => deleteBook(book._id));

                        buttons.push(buttonEdit);
                        buttons.push(buttonDelete);
                    }

                    $('<tr>')
                        .append($(`<td>${book.title}</td>`))
                        .append($(`<td>${book.author}</td>`))
                        .append($(`<td>${book.description}</td>`))
                        .append($(`<td>`).append(buttons))
                        .appendTo(tbody);
                }

            })
    }

    function updateBook(book, e) {
        e.preventDefault();

        $('section').hide();
        $('#viewEditBook').show();

        const title = formEditBook.find('input[name="title"]');
        const author = formEditBook.find('input[name="author"]');
        const description = formEditBook.find('textarea[name="description"]');

        title.val(book.title);
        author.val(book.author);
        description.val(book.description);

        formEditBook.submit(edit);

        function edit() {
            if (title.val() === '' || author.val() === '' || description.val() === '') {
                displayMessage('error', 'Please fill the required fields!');
                return;
            }

            const data = JSON.stringify({
                title: title.val(),
                author: author.val(),
                description: description.val()

            });

            request(book._id, 'PUT', data, `Kinvey ${localStorage.getItem('authtoken')}`)
                .then(function(response) {
                    listAllBooks();
                    section.hide();
                    $('#viewBooks').show();
                });
        }
    }

    function deleteBook(id) {
        request(id, 'DELETE', '', '')
            .then(function(response) {
                console.log(response);
                displayMessage('info', `Book Deleted!`);
                listAllBooks();
            });
    }

}
