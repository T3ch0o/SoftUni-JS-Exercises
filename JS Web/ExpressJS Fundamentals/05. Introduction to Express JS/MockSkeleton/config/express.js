const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.engine('hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
    app.set('view engine', 'hbs');

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(function(req, res, next) {
       if (req.url.startsWith('/static')) {
           req.url = req.url.replace('/static', '');
       }

       next();
    }, express.static('public'));
};