const Article = require('../models/Article');

module.exports.index = function(req, res) {
    Article.find().populate('author').then(function(articles) {
        res.render('home/index', { articles });
    });
};