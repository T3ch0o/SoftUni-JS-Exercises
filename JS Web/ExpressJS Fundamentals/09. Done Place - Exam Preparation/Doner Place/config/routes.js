const controllers = require('../controllers');
const auth = require('./auth');

module.exports = function(app) {
    app.get('/', controllers.home.index);

    app.get('/user/register', auth.isAlreadyAuthenticated, controllers.user.registerGet);
    app.post('/user/register', auth.isAlreadyAuthenticated, controllers.user.registerPost);

    app.get('/user/login', auth.isAlreadyAuthenticated, controllers.user.loginGet);
    app.post('/user/login', auth.isAlreadyAuthenticated, controllers.user.loginPost);

    app.get('/user/logout', auth.isAuthenticated, controllers.user.logout);

    app.get('/product/add', auth.isInRole('Admin'), controllers.product.createGet);
    app.post('/product/add', auth.isInRole('Admin'), controllers.product.createPost);

    app.get('/product/:id', auth.isAuthenticated, controllers.order.orderGet);
    app.post('/product/:id', auth.isAuthenticated, controllers.order.orderPost);

    app.get('/order/details/:id', auth.isAuthenticated, controllers.order.orderDetails);

    app.get('/order-status', auth.isAuthenticated, controllers.order.orderStatus);

    app.get('/order-status/admin', auth.isInRole('Admin'), controllers.order.orderStatusAdminGet);
    app.post('/order-status/admin', auth.isInRole('Admin'), controllers.order.orderStatusAdminPost);

    app.get('/edit/:id', auth.isInRole('Admin'), controllers.product.editGet);
    app.post('/edit/:id', auth.isInRole('Admin'), controllers.product.editPost);

    app.get('/delete/:id', auth.isInRole('Admin'), controllers.product.deletePost);
};

