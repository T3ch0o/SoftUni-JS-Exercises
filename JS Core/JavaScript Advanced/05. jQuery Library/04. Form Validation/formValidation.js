function validate() {
    $('#username').on('change', checkUsername);
    $('#email').on('change', checkEmail);
    $('#password').on('change', checkPassword);
    $('#confirm-password').on('change', checkPassword);
    let company = $('#company');
    company.attr('clicked', 'true');
    company.on('change', checkBox);
    $('#companyNumber').on('change', checkNumber);
    $('#submit').on('click', checkFields);

    let password = '';

    function checkUsername() {
        let username = $(this);

        let usernamePattern = /[a-zA-Z0-9]{3,20}/;

        if (usernamePattern.test(username.val())) {
            username.css('border-color', 'transparent');
            username.attr('valid', 'true');
        } else {
            username.css('border-color', 'red');
            username.attr('valid', 'false');
        }
    }

    function checkEmail() {
        let email = $(this);

        let emailPattern = /[A-z\-.]+@[a-z]+\.[a-z]+/;

        if (emailPattern.test(email.val())) {
            email.css('border-color', 'transparent');
            email.attr('valid', 'true')
        } else {
            email.css('border-color', 'red');
            email.attr('valid', 'false');
        }
    }

    function checkPassword(event) {
        let currentPassword = $(this);

        console.dir(event);

        let passwordPattern = /\w{5,15}/;

        if (passwordPattern.test(currentPassword.val())) {
            let id = currentPassword[0].id;
            let value = currentPassword.val();

            if (id === 'password') {
                currentPassword.css('border-color', 'transparent');
                password = currentPassword.val();
                currentPassword.attr('valid', 'true');
            } else if (value === password) {
                currentPassword.css('border-color', 'transparent');
                currentPassword.attr('valid', 'true');
            } else {
                currentPassword.css('border-color', 'red');
                currentPassword.attr('valid', 'false');
            }
        } else {
            currentPassword.css('border-color', 'red');
            currentPassword.attr('valid', 'false');
        }
    }

    function checkBox() {
        let box = $(this);

        if (box.attr('clicked') === 'true') {
            $('#companyInfo').css('display', 'block');
            box.attr('clicked', 'false')
        } else {
            $('#companyInfo').css('display', 'none');
            box.attr('clicked', 'true')
        }

    }

    function checkNumber() {
        let number = $(this);

        if (number.val() >= 1000 && number.val() <= 9999) {
            number.css('border-color', 'transparent');
            number.attr('valid', 'true');
        } else {
            number.css('border-color', 'red');
            number.attr('valid', 'false');
        }
    }

    function checkFields(event) {
        event.preventDefault();
        let username = $('#username').attr('valid');
        let email = $('#email').attr('valid');
        let password = $('#password').attr('valid');
        let confirmPassword = $('#confirm-password').attr('valid');

        if (username === 'true' && email === 'true' && password === 'true' && confirmPassword === 'true') {
            if ($('#company').attr('clicked') === 'false') {
                let companyNumber = $('#companyNumber').attr('valid');
                if (companyNumber === 'true') {
                    $('#valid').css('display', 'block');
                } else {
                    $('#valid').css('display', 'none');
                }
            } else {
                $('#valid').css('display', 'block');
            }
        } else {
            $('#valid').css('display', 'none');
        }

    }
}
