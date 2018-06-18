const Book = require('../models/BookSchema');

module.exports.viewAll = function(req, res) {
    Book.find().then(function(books) {
        res.render('viewAll', { books });
    })
};

module.exports.addGet = function(req, res) {
    res.render('addBook');
};

module.exports.addPost = function(req, res) {
    const bookObj = req.body;

    Book.create(bookObj).then(function(book) {
        book.save();
        res.render('addBook', { status: {success: true} })
    }).catch(function(error) {
        res.render('addBook', { status: {error: true} });
    });
};

module.exports.details = function(req, res) {
    const id = req.params.id;

    Book.findById(id).then(function(book) {
        res.render('details', book);
    });
};