const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '/database.json');

module.exports.products = {};

module.exports.products.add = function(product) {
    let products = getProducts();
    product.id = products.length + 1;
    products.push(product);
    saveProducts(products);
};

function saveProducts(products) {
    let json = JSON.stringify(products);
    fs.writeFileSync(dbPath, json);
}
function getProducts() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, '[]');
        return [];
    }

    let json = fs.readFileSync(dbPath).toString() || '[]';
    let products = JSON.parse(json);
    return products;
}

module.exports.products.getAll = getProducts;

module.exports.products.findByName = function(name) {
      if (products.includes(name)) {
          return products[products.indexOf(name)];
      }
};


