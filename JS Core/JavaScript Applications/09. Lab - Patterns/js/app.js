const handlers = {};

$(() => {
    const app = Sammy('#main', function() {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', handlers.homeHandler);

        this.post('#/login', function() {
            const username = this.params.username;
            const password = this.params.pass;

            auth.login(username, password)
                .then((response) => {
                    auth.saveSession(response);
                    this.redirect('#/index.html');
                })
                .catch(console.error);
        });

        this.get('#/register', function() {
            this.loadPartials({
                header: './templates/common/header.hbs',
                navigation: './templates/common/navigation.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function() {
                this.partial('./templates/forms/registerForm.hbs')
            });
        });

        this.post('#/register', function() {
            const username = this.params.username;
            const password = this.params.pass;
            const repeatPassword = this.params.repeatPass;

            if (password !== repeatPassword) {
                alert('Password do not match!');
            } else {
                auth.register(username, password);
            }
        });
    });

    app.run();
});