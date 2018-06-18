const Product = require('../models/Product');

module.exports.index = function(req, res) {
    Product.find().then(function(products) {
        let isAdmin = false;

        if (req.user) {
            isAdmin = req.user.roles.length === 1;
        }

        const chickens = products.filter(product => product.category === 'chicken').sort((p1, p2) => p1.size > p2.size);
        const beef = products.filter(product => product.category === 'beef').sort((p1, p2) => p1.size > p2.size);
        const lamb = products.filter(product => product.category === 'lamb').sort((p1, p2) => p1.size > p2.size);
        chickens.forEach(e => e.isAdmin = isAdmin);
        beef.forEach(e => e.isAdmin = isAdmin);
        lamb.forEach(e => e.isAdmin = isAdmin);

        res.render('home/index', { chickens, beef, lamb })
    });
};