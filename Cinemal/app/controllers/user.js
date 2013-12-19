module.exports = function (passport) {

    var UserCollection = require('../collections/users');
    var UserService = require('../services/userService');

    var UserController = {
        registerPage: function(req, res) {
            res.render('register');
        },

        register: function(req, res) {
            var username = req.body.username;

            var users = new UserCollection;

            users.on('sync', function(col) {
                if (col.length == 1) {
                    res.render('register', { messages: ['Such user already exists'] });
                } else {
                    UserService.saveUser(req, res);
                }
            });

            users.fetch({
                data: {
                    username: username
                }
            });
        },

        loginPage: function(req, res) {
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
    };

    return UserController;
}