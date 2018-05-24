const http  = require('http');
const url = require('url');
const port = 3000;
const handlers = require('./handlers');

http.createServer(function(req, res) {
    req.pathname = req.pathname || url.parse(req.url).pathname;
    res.sendHtml = function(path) {
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Resource not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        })
    };

    for (const handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
}).listen(port);