const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: 'String',
        required: 'Title is required'
    },
    lockedStatus: {
        type: 'Boolean',
        required: 'Locked status is required',
        default: false
    },
    edits: [{
        type: 'ObjectId',
        ref: 'Edit'
    }]
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;