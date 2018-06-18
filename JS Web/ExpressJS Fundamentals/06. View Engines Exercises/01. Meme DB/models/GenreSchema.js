const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    genreName: { type: 'String', required: true },
    memeList: [ {type: 'ObjectId', ref: 'Meme'} ]
});

const GenreSchema = mongoose.model('GenreSchema', genreSchema);
module.exports = GenreSchema;