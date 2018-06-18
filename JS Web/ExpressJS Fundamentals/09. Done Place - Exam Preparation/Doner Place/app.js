const port = 3000;
const config = require('./config/config');
const database = require('./config/database-config');
const express = require('express');

const app = express();

database(config);
require('./config/express')(app);
require('./config/routes')(app);
require('./config/passport')();

app.listen(port);