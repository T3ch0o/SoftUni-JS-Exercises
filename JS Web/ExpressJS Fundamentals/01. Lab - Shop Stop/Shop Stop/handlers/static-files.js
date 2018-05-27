const fs = require('fs');
const mimeTypes = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.ico': 'image/x-icon',
    '.png': 'image/png'
};

function getContentType(url) {
    url = url.match(/\.[a-z]+/g);

    return mimeTypes[url];
}

module.exports = (req, res) => {
    if (req.pathname.startsWith('/content/') && req.method === 'GET') {
        fs.readFile(`.${req.pathname}`, function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Resource not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            });

            res.write(data);
            res.end();

        })
    } else {
        return true;
    }
};