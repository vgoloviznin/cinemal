module.exports = function (passport) {

	var express             = require('express');
	var router              = new express.Router();
	var userController      = require('../controllers/user')(passport);

	router.get('/login',  userController.loginPage);
	router.post('/login', userController.login);

	return router;
}; 