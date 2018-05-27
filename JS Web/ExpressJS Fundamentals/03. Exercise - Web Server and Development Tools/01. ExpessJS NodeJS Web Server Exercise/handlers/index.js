const filesHandler = require('./static-files');
const homeHandler = require('./home');
const viewAllMoviesHandler = require('./viewAllMovies');
const addMovieHandler = require('./addMovie');
const detailsMovieHandler = require('./details');

module.exports = [ filesHandler, homeHandler, viewAllMoviesHandler, addMovieHandler, detailsMovieHandler ];