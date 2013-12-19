module.exports = function (passport) {

    var UserModel = require('../models/user');
    var UserCollection = require('../collections/users');

	return {
        registerPage: function(req, res){
            res.render('register');
        },

        register: function(req, res) {
            var username = req.body.username;
            var password = req.body.password;

            var users = new UserCollection;

            users.fetch({
                data: {
                    username: username
                },
                success: function(col) {
                    if (col.length == 1) {
                        res.render('register', {messages: ['Such user already exists']})
                    } else {
                        var user = new UserModel({
				            username: username,
				            password: password
			            });

			            user.hashPassword();

			            user.save(null, {
				            success: function() {
                                req.logIn(user, function(loginError) {
		                            if (loginError) {
		                                res.redirect('/login');
		                            } else {
		                                res.redirect('/movies');
		                            }
		                        });
				            }, 
                            error: function(err){
                                var a =1;
                            }
			            });
                    }
                },
                error: function(err) {
                    res.render('register', {messages: ['An error occured']})
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
}