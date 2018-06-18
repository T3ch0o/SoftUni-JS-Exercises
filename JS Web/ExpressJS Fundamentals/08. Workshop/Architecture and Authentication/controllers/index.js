const homeController = require('./homeController');
const userController = require('./userController');
const articleController = require('./articleController');

module.exports = {
    home: homeController,
    user: userController,
    article: articleController
};