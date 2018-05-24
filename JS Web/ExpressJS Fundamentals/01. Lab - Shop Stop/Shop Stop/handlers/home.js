const url = require('url');
const fs = require('fs');
const database = require('../config/database');
const qs = require('querystring');

module.exports = (req, res) => {
    if (req.pathname === '/' && req.method === 'GET') {
        fs.readFile('./views/home/index.html', 'utf8', function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 not found!');
                res.end();
                return;
            }

            let products = database.products.getAll();
            let queryData = qs.parse(url.parse(req.url).query);
            let content = '';

            if (queryData.query) {
                products = products.filter(p => p.name === queryData.query);
            }

            for (const product of products) {
                content +=
                    `<div class="product-card">
                            <img class="product-img" src="${product.image}">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                         </div>`
            }

            let html = data.toString().replace('{content}', content);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(html);
            res.end();
        })
    } else {
        return true;
    }
};