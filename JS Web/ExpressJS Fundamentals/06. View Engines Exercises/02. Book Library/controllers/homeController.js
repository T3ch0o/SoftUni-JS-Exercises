const Book = require('../models/BookSchema');

module.exports.index = function(req, res) {
    Book.find().then(function(books) {
        const booksLength = books.length;
        res.render('index', { booksLength });
    });
};