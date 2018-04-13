$(() => {
    const app = Sammy('#container', function() {
        this.use('Handlebars', 'hbs');

        this.get('index.html', getWelcomePage);
        this.get('#/home', getWelcomePage);

        this.post('#/register', function(ctx) {
            const username = ctx.params.username;
            const password = ctx.params.password;
            const repeatePass = ctx.params.repeatPass;

            if (!/^[A-Za-z]{3,}$/.test(username)) {
                notify.showError('Username should be at least 3 characters long');
            } else if (!/^[A-Z-a-z\d]{6,}$/.test(password)) {
                notify.showError('Password should be at least 6 characters long');
            } else if (repeatePass !== password) {
                notify.showError('Passwords must match!');
            } else {
                auth.register(username, password)
                    .then(function(response) {
                        auth.saveSession(response);
                        notify.showInfo('Registration successful!');
                        ctx.redirect('#/catalog');
                    })
                    .catch(notify.handleError);
            }

        });
        this.post('#/login', function(ctx) {
            const username = ctx.params.username;
            const password = ctx.params.password;

            if (username !== '' || password !== '') {
                notify.showError('All fields should be non-empty!');
            }

            auth.login(username, password)
                .then(function(response) {
                    auth.saveSession(response);
                    notify.showInfo('Login successful!');
                    ctx.redirect('#/catalog');
                })
                .catch(notify.handleError);
        });
        this.get('#/logout', function(ctx) {
            auth.logout()
                .then(function() {
                    sessionStorage.clear();
                    notify.showInfo('Logout successful!');
                    ctx.redirect('#/home');
                })
                .catch(auth.handleError);
        });

        this.get('#/catalog', function(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            posts.getAllPosts()
                .then(function(response) {
                    response.forEach((p, i) => {
                        p.rank = i + 1;
                        p.date = calcTime(p._kmd.ect);
                        p.isAuthor = sessionStorage.getItem('userId') === p._acl.creator;
                    });

                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.posts = response;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        postList: './templates/posts/postList.hbs',
                        post: './templates/posts/post.hbs',
                    }).then(function() {
                        this.partial('./templates/posts/catalogPage.hbs')
                    });
                })
                .catch(notify.handleError);
        });

        this.get('#/create/post', function(ctx) {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs',
                createForm: './templates/forms/create.hbs'
            }).then(function() {
                this.partial('./templates/posts/createPage.hbs')
            });
        });
        this.post('#/create/post', function(ctx) {
            const author = sessionStorage.getItem('username');
            const title = ctx.params.title;
            const description = ctx.params.description;
            const url = ctx.params.url;
            const imageUrl = ctx.params.imageUrl;

            if (title === '') {
                notify.showError('Title is required!');
            } else if (url === '') {
                notify.showError('Url is required!');
            } else if (!url.startsWith('http') || !url.startsWith('https')) {
                notify.showError('Url must be a valid link!');
            } else {
                posts.createPost(author, title, description, url, imageUrl)
                    .then(function() {
                        notify.showInfo('Post created.');
                        ctx.redirect('#/catalog');
                    })
                    .catch(notify.handleError);
            }
        });

        this.get('#/edit/post/:id', function(ctx) {
            posts.getPostById(ctx.params.id)
                .then(function(response) {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.url = response.url;
                    ctx.title = response.title;
                    ctx.imageUrl = response.imageUrl;
                    ctx.description = response.description === '' ? 'No description...' : response.description;
                    ctx.id = response._id;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        editForm: './templates/forms/edit.hbs'
                    }).then(function() {
                        this.partial('./templates/posts/editPage.hbs');
                    });
                })
        });
        this.post('#/edit/post', function(ctx) {
            const author = sessionStorage.getItem('username');
            const title = ctx.params.title;
            const description = ctx.params.description;
            const url = ctx.params.url;
            const imageUrl = ctx.params.imageUrl;
            const postId = ctx.params.postId;

            if (title === '') {
                notify.showError('Title is required!');
            } else if (url === '') {
                notify.showError('Url is required!');
            } else if (!url.startsWith('http') || !url.startsWith('https')) {
                notify.showError('Url must be a valid link!');
            } else {
                posts.editPost(postId, author, title, description, url, imageUrl)
                    .then(function(response) {
                        notify.showInfo('Post edited.');
                        ctx.redirect('#/catalog');
                    })
                    .catch(notify.handleError);
            }
        });

        this.get('#/delete/post/:id', function(ctx) {
            posts.deletePost(ctx.params.id)
                .then(function() {
                    notify.showInfo('Post deleted.');
                    ctx.redirect('#/catalog');
                })
                .catch(notify.handleError);
        });

        this.get('#/posts', function(ctx) {
             posts.getMyPosts(sessionStorage.getItem('username'))
                 .then(function(response) {
                     response.forEach((p, i) => {
                         p.rank = i + 1;
                         p.date = calcTime(p._kmd.ect);
                         p.isAuthor = sessionStorage.getItem('userId') === p._acl.creator;
                     });

                     ctx.isAuth = auth.isAuth();
                     ctx.username = sessionStorage.getItem('username');
                     ctx.posts = response;

                     ctx.loadPartials({
                         header: './templates/common/header.hbs',
                         footer: './templates/common/footer.hbs',
                         navigation: './templates/common/navigation.hbs',
                         postList: './templates/posts/postList.hbs',
                         post: './templates/posts/post.hbs',
                     }).then(function() {
                         this.partial('./templates/posts/myPostsPage.hbs')
                     })
                 })
                 .catch(notify.handleError);
        });

        this.get('#/details/:id', function(ctx) {
            const postId = ctx.params.id;

            const postPromise = posts.getPostById(postId);
            const allCommentsPromise = comments.getPostComments(postId);

            Promise.all([postPromise, allCommentsPromise])
                .then(function([post, comments]) {

                    post.date = calcTime(post._kmd.ect);
                    post.isAuthor = sessionStorage.getItem('userId') === post._acl.creator;

                    comments.forEach((c) => {
                        c.date = calcTime(c._kmd.ect);
                        c.commentAuthor = sessionStorage.getItem('userId') === c._acl.creator;
                    });

                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.post = post;
                    ctx.comments = comments;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigation: './templates/common/navigation.hbs',
                        detailsPost: './templates/posts/detailsPost.hbs',
                        commentForm: './templates/forms/comment.hbs',
                        comment: './templates/posts/comment.hbs'
                    }).then(function() {
                        this.partial('./templates/posts/detailsPage.hbs');
                    })
                })
                .catch(notify.handleError)
        });

        this.post('#/create/comment', function(ctx) {
            const comment = ctx.params.content;
            const postId = ctx.params.postId;

            if (comment === '') {
                notify.showError('You must give a comment!')
            } else {
                comments.createComment(postId, comment, sessionStorage.getItem('username'))
                    .then(function(resposnse) {
                        notify.showInfo('Comment created.');
                        ctx.redirect(`index.html#/details/${postId}`);
                    })
                    .catch(notify.handleError);
            }
        });
        this.get('#/delete/comment/:id', function(ctx) {
            const postId = ctx.params.id;

            comments.deleteComment(postId)
                .then(function() {
                    notify.showInfo('Comment deleted.');
                    ctx.redirect(`#/details/${$('input[name="postId"]').val()}`);
                })
                .catch(notify.handleError);
        });

        function getWelcomePage(ctx) {
            if (!auth.isAuth()) {
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    loginForm: './templates/forms/login.hbs',
                    registerForm: './templates/forms/register.hbs'
                }).then(function() {
                    this.partial('./templates/welcome-anonymous.hbs');
                })
            } else {
                ctx.redirect('#/catalog');
            }


        }

        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);

            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }
    });

    app.run();
});