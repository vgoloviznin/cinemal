module.exports = function (passport) {

    var UserModel       = require('../models/user');

	return {

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

		createUser: function(req, res) {
			var user = new UserModel({
				username: 'test',
				password: 'test'
			});

			user.hashPassword();

			user.save({
				success: function() {
			    	res.redirect('/movies');
				}
			});
		}
	}
}