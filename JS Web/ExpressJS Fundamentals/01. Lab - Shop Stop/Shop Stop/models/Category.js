const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {type: 'String', required: true, unique: true},
    creator: {type: 'ObjectId', ref: 'User', required: true},
    products: [{type: 'ObjectId', ref: 'Product'}]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;