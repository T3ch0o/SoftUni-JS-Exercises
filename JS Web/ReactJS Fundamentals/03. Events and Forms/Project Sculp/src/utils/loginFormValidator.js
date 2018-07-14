let validationFunc = (
    mail,
    password
) => {
    let validMail = (() => {
        let mailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        return mailRegex.test(mail);
    })();

    let validPassword = (() => {
        return password.length > 7 && password !== '';
    })();

    return {
        validMail,
        validPassword
    }
};

export default validationFunc;
