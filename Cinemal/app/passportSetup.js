var passport        = require('passport')
, LocalStrategy     = require('passport-local').Strategy
, bcrypt            = require('bcryptjs')
, UserCollection    = require('./collections/users')
, UserModel 		= require('./models/user')
;

passport.serializeUser(function(user, done) {
    done(null, user.get('id'));
});

passport.deserializeUser(function(id, done) {
    var user = new UserModel({id: id});

    user.fetch({
        success: function(u) {
            done(null, u);
        },
        error: function(err) {
            done(err, null);
        }
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
    var users = new UserCollection;

    users.fetch({
        data: {
            username: username
        },
        success: function(col) {
            if (col.length == 1) {
                var found = col.at(0);
                var isMatch = bcrypt.compareSync(password, found.get('password'));
                if (isMatch) {
                    return done(null, found);
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            } else {
                return done(null, false, { message: 'Incorrect username' });
            }
        },
        error: function(err) {
            return done(err);
        }
    });
}));

passport.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/user/login');
    }
}

passport.ensureNotAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = passport;
