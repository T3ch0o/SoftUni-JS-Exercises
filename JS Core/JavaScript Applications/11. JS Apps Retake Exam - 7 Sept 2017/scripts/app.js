$(() => {
    const app = Sammy('#main', function() {
        this.use('Handlebars', 'hbs');

        this.get('skeleton.html', function(ctx) {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            tweetsService.loadUserChirps(`chirps?query={"author":"${sessionStorage.getItem('username')}"}`)
                .then(function(response) {
                    ctx.chirp = response.length;
                });

            tweetsService.loadUsers()
                .then(function(response) {
                    let count = 0;

                    for (const data of response.map(object => ({subscriptions: object.subscriptions}))) {
                        if (data.subscriptions.includes(sessionStorage.getItem('username'))) {
                            count++;
                        }
                    }

                    ctx.followers = count;
                });

            tweetsService.loadUser()
                .then(function(response) {
                    ctx.following = response[0].subscriptions.length;
                });

            tweetsService.loadChirps()
                .then(function(data) {
                    ctx.chirps = data;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        chirp: './templates/home/chirp.hbs',
                        chirpForm: './templates/home/chirpForm.hbs'
                    }).then(function() {
                        this.partial('./templates/home/home.hbs');
                    });
                }).catch(function(error) {
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    chirp: './templates/home/chirp.hbs',
                    chirpForm: './templates/home/chirpForm.hbs'
                }).then(function() {
                    this.partial('./templates/home/home.hbs');
                });
            });
        });
        this.get('#/home', function(ctx) {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            tweetsService.loadUserChirps(`chirps?query={"author":"${sessionStorage.getItem('username')}"}`)
                .then(function(response) {
                    ctx.chirp = response.length;
                });

            tweetsService.loadUsers()
                .then(function(response) {
                    let count = 0;

                    for (const data of response.map(object => ({subscriptions: object.subscriptions}))) {
                        if (data.subscriptions.includes(sessionStorage.getItem('username'))) {
                            count++;
                        }
                    }

                    ctx.followers = count;
                });

            tweetsService.loadUser()
                .then(function(response) {
                    ctx.following = response[0].subscriptions.filter(a => a !== '').length;
                });

            tweetsService.loadChirps()
                .then(function(data) {
                    ctx.chirps = data;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        chirp: './templates/home/chirp.hbs',
                        chirpForm: './templates/home/chirpForm.hbs'
                    }).then(function() {
                        this.partial('./templates/home/home.hbs');
                    });
                }).catch(function(error) {
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        chirp: './templates/home/chirp.hbs',
                        chirpForm: './templates/home/chirpForm.hbs'
                    }).then(function() {
                        this.partial('./templates/home/home.hbs');
                });
            });
        });

        this.get('#/login', function(ctx) {
            ctx.isAuth = auth.isAuth();

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function() {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function(ctx) {
            const username = ctx.params.username;
            const password = ctx.params.password;



            if (username.length === 0 || password.length === 0) {
                auth.showError('Please fill the form!');
                return;
            }

            auth.login(username, password)
                .then(function(response) {
                    auth.saveSession(response);
                    auth.showInfo('Login successful.');
                    ctx.redirect('#/home');
                })
                .catch(auth.handleError);
        });

        this.get('#/register', function(ctx) {
            ctx.isAuth = auth.isAuth();

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function() {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function(ctx) {
            const username = ctx.params.username;
            const password = ctx.params.password;
            const repeatPassword = ctx.params.repeatPass;

            if (username.length < 5) {
                auth.showError('Name must be at least 5 characters long!');
                return;
            }

            if (password.length === 0 || repeatPassword.length === 0) {
                auth.showError("Password can't be empty!");
                return;
            }

            if (password !== repeatPassword) {
                auth.showError("Passwords don't match!");
                return;
            }

            auth.register(username, password)
                .then(function(response) {
                    auth.showInfo('User registration successful.');
                    auth.saveSession(response);

                    tweetsService.loadUserChirps(`chirps?query={"author":"${username}"}`)
                        .then(function(response) {
                            sessionStorage.setItem('chirps', response.length);
                        });

                    ctx.redirect('#/home');
                })
                .catch(auth.handleError);
        });

        this.get('#/logout', function(ctx) {
            auth.logout()
                .then((response) => {
                    sessionStorage.clear();
                    auth.showInfo('Logged out!');
                    this.redirect('#/home');
                }).catch(auth.handleError);
        });

        this.post('#/chirp', function(ctx) {
            const text = ctx.params.text;

            if (text.length === 0) {
                auth.showError('Please put some comment right there!');
                return;
            }

            if (text.length > 150) {
                auth.showError("It's too long dude calm down!");
                return;
            }

            tweetsService.createChirp(sessionStorage.getItem('username'), text)
                .then(function(response) {
                    auth.showInfo('Chirp published.');
                    ctx.redirect('#/home');
                })

        });

        this.get('#/me', function(ctx) {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            tweetsService.loadUsers()
                .then(function(response) {
                    let count = 0;

                    for (const data of response.map(object => ({subscriptions: object.subscriptions}))) {
                        if (data.subscriptions.includes(sessionStorage.getItem('username'))) {
                            count++;
                        }
                    }

                    ctx.followers = count;
                });

            tweetsService.loadUser()
                .then(function(response) {
                    ctx.following = response[0].subscriptions.filter(a => a !== '').length;
                });

            tweetsService.loadUserChirps(`chirps?query={"author":"${sessionStorage.getItem('username')}"}&sort={"_kmd.ect":-1}`)
                .then(function(response) {
                    ctx.chirps = response;
                    ctx.chirp = response.length;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        chirp: './templates/me/chirp.hbs',
                        chirpForm: './templates/home/chirpForm.hbs'
                    }).then(function() {
                        this.partial('./templates/home/home.hbs');
                    });
                });
        });

        this.get('#/delete/:id', function(ctx) {
            const id = ctx.params.id.slice(1);

            tweetsService.deleteChirp(id)
                .then(function(reposnse) {
                    ctx.redirect('#/me');
                })
        });

        this.get('#/discover', function(ctx) {
            ctx.isAuth = auth.isAuth();

            tweetsService.loadUsers()
                .then(function(response) {
                    ctx.users = response;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        userbox: './templates/discover/userbox.hbs'
                    }).then(function() {
                        this.partial('./templates/discover/discover.hbs');
                    })
                })
        });

        this.get('#/feed/:id', function(ctx) {
            const name = ctx.params.id;
            ctx.username = name;
            ctx.isAuth = auth.isAuth();
            ctx.isNotAuth = name !== sessionStorage.getItem('username');

            tweetsService.loadUsers()
                .then(function(response) {
                    let count = 0;

                    for (const data of response.map(object => ({subscriptions: object.subscriptions}))) {
                        if (data.subscriptions.includes(sessionStorage.getItem('username'))) {
                            count++;
                        }
                    }

                    ctx.followers = count;
                });

            tweetsService.loadUser()
                .then(function(response) {
                    ctx.following = response[0].subscriptions.filter(a => a !== '').length;
                });

            tweetsService.loadUserChirps(`chirps?query={"author":"${name}"}&sort={"_kmd.ect":1}`)
                .then(function(response) {
                    ctx.chirps = response;
                    ctx.chirp = response.length;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        chirp: './templates/viewProfile/chirp.hbs'
                    }).then(function() {
                        this.partial('./templates/viewProfile/profile.hbs');
                    });
                });
        });

        this.get('#/follow', function(ctx) {
            let username = $('#name').text();

            tweetsService.loadUser()
                .then(function(response) {
                    tweetsService.followUser(response[0]._id, response[0].subscriptions, username)
                        .then(function(response) {
                            ctx.redirect(`#/feed/${username}`);
                        })
                })
        });
    });

    app.run();

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut(),
    });
});