let handlers = {};

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.homeHandler);
        this.get('#/home', handlers.homeHandler);

        this.get('#/login', function(ctx) {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function() {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function() {
            const username = this.params.username;
            const password = this.params.password;

            auth.login(username, password)
                .then((response) => {
                    auth.showInfo('Successfully logged in!');
                    auth.saveSession(response);
                    this.redirect('#/home')
                })
                .catch(auth.handleError);
        });

        this.get('#/register', function(ctx) {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function() {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function() {
            const username = this.params.username;
            const password = this.params.password;
            const repeatPassowrd = this.params.repeatPassword;

            if (password !== repeatPassowrd) {
                auth.showError('Passwords do not match!');

            } else {
                auth.register(username, password)
                    .then((response) => {
                        auth.saveSession(response);
                        auth.showInfo('Successfully registered!');
                        this.redirect('#/home');
                    })
                    .catch(auth.handleError);
            }
        });

        this.get('#/logout', function() {
            auth.logout()
                .then((response) => {
                    sessionStorage.clear();
                    auth.showInfo('Logged out!');
                    this.redirect('#/home');
                }).catch(auth.handleError);
        });

        this.get('#/about', function(ctx) {
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/about/about.hbs');
            });
        });
        
        this.get('#/catalog', function(ctx) {
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            teamsService.loadTeams()
                .then(function(response) {
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === null ||sessionStorage.getItem('teamId') === 'undefined';
                    ctx.teams = response;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }).then(function() {
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
                });
        });

        this.get('#/create', function(ctx) {
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function() {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function(ctx) {
            const name = ctx.params.name;
            const comment = ctx.params.comment;

            if (name === '') {
                auth.showError('Please enter a team name!');
            } else {
                teamsService.createTeam(name, comment)
                    .then((response) => {
                        teamsService.joinTeam(response._id)
                            .then((response) => {
                                auth.saveSession(response);
                                auth.showInfo('Team has been created!');
                                ctx.redirect('#/catalog');
                            }).catch(auth.handleError);
                    }).catch(auth.handleError);
            }
        });

        this.get('#/catalog/:id', function(ctx) {
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            const id = ctx.params.id.slice(1);

            teamsService.loadTeamDetails(id)
                .then(function(response) {
                    ctx.teamId = id;
                    ctx.isAuthor = response._acl.creator === sessionStorage.getItem('userId');
                    ctx.comment = response.comment;
                    ctx.isOnTeam = id === sessionStorage.getItem('teamId');

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function() {
                        this.partial('./templates/catalog/details.hbs');
                    });
                });
        });

        this.get('#/join/:id', function(ctx) {
            const id = ctx.params['id'].slice(1);
            
            teamsService.joinTeam(id)
                .then(function(response) {
                    auth.saveSession(response);
                    auth.showInfo('Team joined!');
                    ctx.redirect('#/catalog')
                })
        });

        this.get('#/leave', function(ctx) {
            teamsService.leaveTeam()
                .then(function(response) {
                    auth.saveSession(response);
                    auth.showInfo('Team leaved!');
                    ctx.redirect('#/catalog');
                })
        });

        this.get('#/edit/:id', function(ctx) {
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            const id = ctx.params.id.slice(1);

            teamsService.loadTeamDetails(id)
                .then(function(response) {
                    ctx.teamId = id;
                    ctx.name = response.name;
                    ctx.comment = response.comment;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function() {
                        this.partial('./templates/edit/editPage.hbs');
                    });
                })
        });

        this.post('#/edit/:id', function(ctx) {
            const name = ctx.params.name;
            const comment = ctx.params.comment;
            const id = ctx.params.id.slice(1);

            console.log('I am here');

            if (name === '') {
                auth.showError('Please enter a team name!');
            } else {
                teamsService.edit(id, name, comment)
                    .then(function(response) {
                        auth.showInfo('Team edited!');
                        ctx.redirect(`#/catalog/:${id}`);
                    });
            }
        });
    });

    app.run();
});

