module.exports = function (passport) {

	var express             = require('express');
	var router              = new express.Router();
	var movieController     = require('../controllers/movie')(passport);

	router.get('/',           passport.ensureAuthenticated, movieController.getMovies);
	router.get('/:id',        passport.ensureAuthenticated, movieController.getMovie);
	router.get('/:id/delete', passport.ensureAuthenticated, movieController.deleteMovie);
	router.get('/savemodel',  passport.ensureAuthenticated, movieController.savemodel);

	return router;
}; 



