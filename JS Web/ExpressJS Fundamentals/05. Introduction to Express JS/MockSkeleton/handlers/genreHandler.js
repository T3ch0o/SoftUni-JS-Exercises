const Genre = require('../models/GenreSchema');

module.exports.addGet = function(req, res) {
    res.render('genre/addGenre');
};

module.exports.addPost = function(req, res) {
    const genreObj = req.body;

    Genre.create(genreObj).then(function(genre) {
        genre.save();
        res.redirect('/');
    });
};