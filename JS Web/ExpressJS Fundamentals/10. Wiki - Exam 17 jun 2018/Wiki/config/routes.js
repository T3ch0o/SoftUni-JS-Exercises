const controllers = require('../controllers');
const auth = require('./auth');

module.exports = function(app) {
    app.get('/', controllers.home.index);

    app.get('/user/register', auth.isAlreadyAuthenticated, controllers.user.registerGet);
    app.post('/user/register', auth.isAlreadyAuthenticated, controllers.user.registerPost);

    app.get('/user/login', auth.isAlreadyAuthenticated, controllers.user.loginGet);
    app.post('/user/login', auth.isAlreadyAuthenticated, controllers.user.loginPost);

    app.get('/logout', auth.isAuthenticated, controllers.user.logout);

    app.get('/article/create', auth.isAuthenticated, controllers.article.createGet);
    app.post('/article/create', auth.isAuthenticated, controllers.article.createPost);

    app.get('/article/:articleId/:editId', controllers.article.articleDetails);

    app.get('/edit/:id', auth.isAuthenticated, controllers.article.editGet);
    app.post('/edit/:id', auth.isAuthenticated, controllers.article.editPost);

    app.get('/lock/:id', auth.isAuthenticated, controllers.article.lockStatusPost);
    app.get('/unlock/:id', auth.isAuthenticated, controllers.article.unlockStatusPost);

    app.get('/history/:id', auth.isAuthenticated, controllers.article.history);

    app.get('/allArticles', controllers.article.all);

    app.get('/latestArticle', controllers.article.latestArticle);

    app.get('/search', controllers.article.search);

    app.all('*', function(req, res) {
        res.send('Error 404');
    });
};