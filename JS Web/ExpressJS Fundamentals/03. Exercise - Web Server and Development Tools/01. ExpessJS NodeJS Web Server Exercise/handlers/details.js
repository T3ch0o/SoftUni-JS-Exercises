const fs = require('fs');
const database = require('../config/dataBase');

module.exports = (req, res) => {
    const index = req.pathname.slice(-1);
    if (req.pathname === `/movies/details/${index}` && req.method === 'GET') {
        fs.readFile('./views/details.html', 'utf8', function(err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 not found!');
                res.end();
                return;
            }

            const movie = database[index];
            const dataString = `<div class="content">
                                    <img src="${decodeURIComponent(movie.moviePoster)}" alt=""/>
                                    <h3>Title ${decodeURIComponent(movie.movieTitle)}</h3>
                                    <h3>Year ${decodeURIComponent(movie.movieYear)}</h3>
                                    <p>${decodeURIComponent(movie.movieDescription)}</p>
                                </div>`;
            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', dataString);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
};