module.exports = function() {
    var UserModel = require('../models/user');
    
    var UserService = {
        saveUser: function(req, res) {
            var username = req.body.username;
            var password = req.body.password;

            var user = new UserModel({
                username: username,
                password: password
            });

            user.hashPassword();

            user.save({}, {
                success: function(user) {
                    UserService.loginUser(req, res, user);
                }
            });
        },

        loginUser: function(req, res, user) {
            req.logIn(user, function(loginError) {
                if (loginError) {
                    res.redirect('/login');
                } else {
                    res.redirect('/movies');
                }
            });
        }
    };

    return UserService;
}
