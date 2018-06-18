const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    bookTitle: { type: 'String', required: true },
    bookYear: { type: 'String', required: true },
    bookPoster: { type: 'String', required: true },
    bookAuthor: { type: 'String', required: true }
});

const BookSchema = mongoose.model('Book', bookSchema);

module.exports = BookSchema;