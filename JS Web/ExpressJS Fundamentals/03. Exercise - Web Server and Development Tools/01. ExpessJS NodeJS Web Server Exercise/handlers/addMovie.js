const fs = require('fs');
const qs = require('querystring');
const database = require('../config/dataBase');

function renderHtml(req, res, message) {
    fs.readFile('./views/addMovie.html', 'utf8', function(err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            res.write('404 not found!');
            res.end();
            return;
        }

        const dataString = message === 'error' ? '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>' :
                                                 '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>';
        const html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', dataString);

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write(html);
        res.end();
    });
}

module.exports = (req, res) => {
    if (req.pathname === '/addMovie' && req.method === 'GET') {
        fs.readFile('./views/addMovie.html', 'utf8', function(err, data) {
            if (err) {
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
        });
    } else if (req.pathname === '/addMovie' && req.method === 'POST') {
        let dataString = '';

        req.on('data', function(data) {
            dataString += data;
        });

        req.on('end', function() {
            const movie = qs.parse(dataString);
            let validMovie = true;

            for (const prop in movie) {
                if (movie[prop] === '') {
                    validMovie = false;
                    break;
                }
            }

            if (validMovie) {
                database.push(movie);
                renderHtml(req, res, 'success');

            } else {
                renderHtml(req, res, 'error');
            }
        });
    } else {
        return true;
    }
};