const Article = require('../models/Article');
const User = require('../models/User');

module.exports.createGet = function(req, res) {
    res.render('article/create');
};

module.exports.createPost = function(req, res) {
    const articleObj = req.body;
    const userId = req.user._id;
    articleObj.author = userId;

    Article.create(articleObj)
        .then(function(article) {
            article.save()
                .then(function(article) {
                    User.findById(userId).then(function(user) {
                         user.articles.push(article._id);
                         user.save();
                         res.redirect('/');
                    });
                });
        })
        .catch(function(error) {
            const index = error.message.lastIndexOf(':') + 2;
            const message = error.message.slice(index);
            res.render('article/create', { error: message });
        });
};

module.exports.details = function(req, res) {
    const id = req.params.id;

    Article.findById(id).then(function(article) {
        let userdId = '';

        if (req.user) {
            userdId =  req.user._id;
        }

        const isUserAuthorized = article.author.equals(userdId);

        res.render('article/details', { article, isUserAuthorized });
    });
};