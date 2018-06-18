const fs = require('fs');

const Meme = require('../models/MemeSchema');
const Genre = require('../models/GenreSchema');

module.exports.viewAll = function(req, res) {
    Meme.find().then(function(memes) {
        const memesList = memes.sort((a, b) => b.dateStamp - a.dateStamp);

        res.render('meme/viewAll', { memes: memesList })
    })
};

module.exports.addGet = function(req, res) {
    Genre.find().then(function(genres) {
        res.render('meme/addMeme', { genres });
    });
};

module.exports.addPost = function(req, res) {
    const memeObj = req.body;
    memeObj.memePath = '\\' + req.file.path;

    Meme.create(memeObj).then(function(meme) {
        Genre.findOne({ genreName: memeObj.genreSelect }).then(function(genre) {
            genre.memeList.push(meme._id);
            genre.save();
        });
        res.redirect('/');
    });
};

module.exports.detailsGet = function(req, res) {
    const id = req.query.id;

    Meme.findById(id).then(function(meme) {
        res.render('meme/details', { meme } );
    });
};

module.exports.deletePost = function(req, res) {
    const id = req.params.id;

    Genre.findOne({ memeList: id }).then(function(genreToEdit) {
        const index = genreToEdit.memeList.indexOf(id);

        if (index >= 0) {
            genreToEdit.memeList.splice(index, 1);
        }

        genreToEdit.save().then(() => {
            Meme.findByIdAndRemove(id).then((memeToRemove) => {
                fs.unlink('.' + memeToRemove.memePath, function(error) {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    res.redirect('/');
                });
            });
        });
    });
};

module.exports.searchGet = function(req, res) {
    Genre.find().then(function(genres) {
        res.render('meme/search', { genres });
    });
};

module.exports.searchPost = function(req, res) {
    const searchedMemeObj = req.body;

    Genre.findOne({ genreName: searchedMemeObj.genreSelect }).then(function(genre) {
        const memeList = genre.memeList;

        Meme.find().then(function(memes) {
            let list = [];

            for (const meme of memes) {
                const index = memeList.indexOf(meme._id);

                if (index >= 0) {
                    list.push(meme._doc);
                }
            }

            res.render('meme/viewSearched', { memes: list });
        });
    });
};