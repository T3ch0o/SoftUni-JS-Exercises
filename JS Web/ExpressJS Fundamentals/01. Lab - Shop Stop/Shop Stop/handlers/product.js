const database = require('../config/database');
const fs = require('fs');
const qs = require('querystring');

module.exports = (req, res) => {
    if (req.pathname === '/product/add' && req.method === 'GET') {
        fs.readFile('./views/products/add.html', 'utf8', function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();

        })
    } else if (req.pathname === '/product/add' && req.method === 'POST') {
        let dataString = '';

        req.on('data', function(data) {
            dataString += data;
        });

        req.on('end', function() {
            let product = qs.parse(dataString);
            database.products.add(product);

            res.writeHead(302, {
                Location: '/'
            });

            res.end();
        })
    } else {
        return true;
    }
};