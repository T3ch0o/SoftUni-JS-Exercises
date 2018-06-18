const controllers = require('../controllers');

module.exports = function(app) {
    app.get('/', controllers.home.index);

    app.get('/addBook', controllers.book.addGet);
    app.post('/addBook', controllers.book.addPost);

    app.get('/viewAllBooks', controllers.book.viewAll);

    app.get('/books/details/:id', controllers.book.details);
};