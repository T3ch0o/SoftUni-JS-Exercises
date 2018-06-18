const Product = require('../models/Product');

module.exports.createGet = function(req, res) {
    res.render('product/create');
};

module.exports.createPost = function(req, res) {
    const productObj = req.body;
    productObj.toppings = productObj.toppings.split(',');
    productObj.user = req.user._id;

    Product.create(productObj)
        .then(function(product) {
            product.save();
            res.redirect('/');
        })
        .catch(function(error) {
            console.log(error);
            const index = error.message.lastIndexOf(':') + 2;
            const message = error.message.slice(index);
            res.render('product/create', { error: message });
        });
};

module.exports.editGet = function(req, res) {
    const id = req.params.id;

    Product.findById(id).then(function(product) {
        product.currentToppings = product.toppings.toString();

        res.render('product/edit', { product });
    });
};

module.exports.editPost = function(req, res) {
    const id = req.params.id;
    const updatedProduct = req.body;

    Product.findByIdAndUpdate(id, { $set: updatedProduct }).then(function(product) {
        res.redirect('/')
    });
};

module.exports.deletePost = function(req, res) {
    const id = req.params.id;

    Product.findOneAndDelete(id).then(function(product) {
        res.redirect('/');
    });
};