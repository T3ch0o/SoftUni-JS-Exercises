const http  = require('http');
const url = require('url');
const port = 3000;
const handlers = require('./handlers');

http.createServer(function(req, res) {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    for (const handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
}).listen(port);