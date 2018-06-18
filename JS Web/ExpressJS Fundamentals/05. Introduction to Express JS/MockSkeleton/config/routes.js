const handlers = require('../handlers');
const multer = require('multer');

const upload = multer({ dest: './static/memeStorage' });

module.exports = function(app) {
    app.get('/', handlers.home.index);

    app.get('/addMeme', handlers.meme.addGet);
    app.post('/addMeme', upload.single('image'), handlers.meme.addPost);

    app.get('/addGenre', handlers.genre.addGet);
    app.post('/addGenre', handlers.genre.addPost);

    app.get('/viewAllMemes', handlers.meme.viewAll);

    app.get('/getDetails', handlers.meme.detailsGet);

    // Post Delete Meme
    app.get('/deleteMeme/:id', handlers.meme.deletePost);

    app.get('/searchMeme', handlers.meme.searchGet);
    app.post('/searchMeme', handlers.meme.searchPost);
};