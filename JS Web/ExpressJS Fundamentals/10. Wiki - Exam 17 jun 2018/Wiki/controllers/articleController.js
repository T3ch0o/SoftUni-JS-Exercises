const Article = require('../models/Article');
const Edit = require('../models/Edit');
const User = require('../models/User');

module.exports.createGet = function(req, res) {
    res.render('article/create');
};

module.exports.createPost = function(req, res) {
    const articleObj = req.body;
    const userId = req.user._id;

    Article.create(articleObj).then(function(article) {
        Edit.create(articleObj).then(function(edit) {
            article.edits.push(edit._id);
            article.save().then(function(article) {
                edit.author = userId;
                edit.article = article._id;
                edit.save().then(function(edit) {
                    User.findById(userId).then(function(user) {
                        user.articles.push(article._id);
                        user.save();
                        res.redirect('/');
                    });
                });
            });
        });
    });
};

module.exports.articleDetails = function(req, res) {
    const articleId = req.params.articleId;
    const editId = req.params.editId;

    Article.findById(articleId).then(function(article) {
        Edit.findById(editId).then(function(edit) {
            article.lastContent = edit.content;
            article.editId = edit._id;

            let isAuthor = false;

            if (req.user && !article.lockedStatus) {
                isAuthor = req.user._id.equals(edit.author) || req.user.roles[0] === 'Admin';
            } else if (req.user) {
                isAuthor = req.user.roles[0] === 'Admin'
            }

            res.render('article/article', {article, isAuthor})
        });
    });
};

module.exports.editGet = function(req, res) {
    const id = req.params.id;
    Edit.findById(id).populate('article').then(function(edit) {
        let isLocked = false;

        if (req.user && !edit.article.lockedStatus) {
            isLocked = req.user.articles.includes(edit.article._id.toString()) || req.user.roles[0] === 'Admin';
        } else if (req.user) {
            isLocked = req.user.roles[0] === 'Admin';
        }

        res.render('article/edit', {edit, isLocked})
    });
};

module.exports.editPost = function(req, res) {
    const id = req.params.id;
    const content = req.body;

    Article.findById(id).then(function(article) {
        Edit.create(content).then(function(edit) {
            article.edits.push(edit._id);
            edit.author = req.user._id;
            edit.article = article._id;
            article.save().then(function(article) {
                edit.save();
                res.redirect('/');
            });
        });
    });
};

module.exports.lockStatusPost = function(req, res) {
    const id = req.params.id;

    Article.findByIdAndUpdate(id, {$set: { lockedStatus: true }}).then(function(article) {
        res.redirect('/');
    });
};

module.exports.unlockStatusPost = function(req, res) {
    const id = req.params.id;

    Article.findByIdAndUpdate(id, {$set: { lockedStatus: false }}).then(function(article) {
        res.redirect('/');
    });
};

module.exports.history = function(req, res) {
    const id = req.params.id;

    Article.findById(id).populate('edits').then(function(article) {
        article.currentEdits = formatHistoryText(article.edits);
        console.log(article.currentEdits);

        res.render('article/history', { article })
    });
};

module.exports.all = function(req, res) {
    Article.find().sort({title: 1}).populate('edits').then(function(articles) {
        articles = addLastEditId(articles);
        res.render('article/all-articles', { articles })
    });
};

module.exports.latestArticle = function(req, res) {
    res.redirect('/');
};

module.exports.search = function(req, res) {
    const searchParam = req.query.search;

    Article.find({ title: { $regex: searchParam, $options: 'i' }  }).then(function(articles) {
        addLastEditId(articles);
        res.render('article/search-results', { articles, searchParam });
    });
};

function formatHistoryText(edits) {
    let currentEdits = [];

    for (const edit of edits) {
        User.findById(edit.author).then(function(user) {
            const current = {};
            current.currentCreationDate = edit.creationDate.toLocaleString();
            current.id = edit.article;
            current.editId = edit._id;
            current.creator = user.email;
            currentEdits.push(current);
        });
    }

    return currentEdits;
}

function addLastEditId(articles) {
    for (const article of articles) {
        article.editId = article.edits.slice(-1)[0]._id;
    }

    return articles;
}