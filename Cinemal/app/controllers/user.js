module.exports = function (passport) {

    var UserModel = require('../models/user');
    var UserCollection = require('../collections/users');

	var UserController = {
        registerPage: function(req, res){
            res.render('register');
        },

        register: function(req, res) {
            var username = req.body.username;

            var users = new UserCollection;

            users.on('sync', function(col, resp, options){
                if (col.length == 1) {
                    res.render('register', {messages: ['Such user already exists']})
                } else {
                    UserController.saveUser(req, res);
                }
            });

            users.fetch({
                data: {
                    username: username
                }
            });
        },

        saveUser: function(req, res){
            var username = req.body.username;
            var password = req.body.password;

            var user = new UserModel({
				username: username,
				password: password
			});

			user.hashPassword();

			user.save({}, {
				success: function(user) {
                    UserController.loginUser(req, res, user);
				}
			});
        },

        loginUser: function(req, res, user){
            req.logIn(user, function(loginError) {
		        if (loginError) {
		            res.redirect('/login');
		        } else {
		            res.redirect('/movies');
		        }
		    });
        },

		loginPage: function (req, res) {
			res.render('login');
		},

		login: function(req, res, next) {
		    passport.authenticate('local', function(err, user, info) {
		        
		        if (err) {
		            return next(err);
		        }

		        if (!user) {
		            res.render('login', { messages: [info.message] });
		        } else {
		            req.logIn(user, function(loginError) {
		                if (loginError) {
		                    next(loginError);
		                } else {
		                    res.redirect('/movies');
		                }
		            });
		        }
		        
		    })(req, res, next);
		},

        logout: function(req, res) {            
            req.logout();
            res.redirect('/');
        }
	}

    return UserController;
}