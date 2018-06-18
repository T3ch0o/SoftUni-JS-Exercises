const mongoose = require('mongoose');

const editSchema = mongoose.Schema({
    author: {
        type: 'ObjectId',
        ref: 'User'
    },
    creationDate: {
        type: 'Date',
        default: Date.now()
    },
    content: {
        type: 'String',
        required: true
    },
    article: {
        type: 'ObjectId',
        ref: 'Article'
    }
});

const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;