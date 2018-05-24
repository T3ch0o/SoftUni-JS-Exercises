let products = [];
let count = 1;

module.exports.products = {};

module.exports.products.add = function(product) {
    product.id = count++;
    products.push(product);
};

module.exports.products.getAll = function() {
    return products;
};

module.exports.products.findByName = function(name) {
      if (products.includes(name)) {
          return products[products.indexOf(name)];
      }
};
