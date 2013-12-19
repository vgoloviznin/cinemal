module.exports = function (passport) {

	var express             = require('express');
	var router              = new express.Router();
	var userController      = require('../controllers/user')(passport);

    router.get('/register', passport.ensureNotAuthenticated, userController.registerPage);
    router.post('/register', passport.ensureNotAuthenticated, userController.register);

	router.get('/login', passport.ensureNotAuthenticated,  userController.loginPage);
	router.post('/login', passport.ensureNotAuthenticated, userController.login);

    router.post('/logout', passport.ensureAuthenticated, userController.logout);

	return router;
}; 