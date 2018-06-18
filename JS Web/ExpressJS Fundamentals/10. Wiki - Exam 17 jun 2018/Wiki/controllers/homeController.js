const Article = require('../models/Article');

module.exports.index = function(req, res) {
    Article.find().populate('edits').then(function(articles) {
        if (articles.length !== 0) {
            addLastEditId(articles);
            const latestArticle = articles.slice(-1)[0];
            const lastEdit = latestArticle.edits.pop();
            latestArticle.content = lastEdit.content.slice(0,50);
            articles.sort((a1, a2) => a1.title > a2.title);
            return res.render('home/index', { articles, latestArticle, lastEdit });
        }

        res.render('home/index', { articles });
    });
};

function addLastEditId(articles) {
    for (const article of articles) {
        article.editId = article.edits.slice(-1)[0]._id;
    }

    return articles;
}