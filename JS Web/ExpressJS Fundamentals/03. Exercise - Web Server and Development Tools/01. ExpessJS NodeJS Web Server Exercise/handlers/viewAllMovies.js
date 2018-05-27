const fs = require('fs');
const database = require('../config/dataBase');

module.exports = (req, res) => {
    if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        fs.readFile('./views/viewAll.html', 'utf8', function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 not found!');
                res.end();
                return;
            }

            let dataString = '';
            let iteration = 0;
            for (const movie of database) {
                dataString += `<div class="movie">
                            <a href="/movies/details/${iteration}"><img class="moviePoster" src="${decodeURIComponent(movie.moviePoster)}"/></a>          
                        </div>`;
                iteration++;
            }

            const html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', dataString);

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