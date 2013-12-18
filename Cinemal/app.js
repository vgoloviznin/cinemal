var express             = require('express');
var http                = require('http');
var path                = require('path');
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;
var bcrypt              = require("bcryptjs");
var Backbone            = require('Backbone');
var mongooseSync        = require('./backbone.mongoose');
var mongoose            = require('mongoose');
var dbconfig            = require('./dbconnect.json');
var UserModel           = require('./app/models/user');
var UserCollection      = require('./app/collections/users');
var appController       = require('./app/controllers/main')(passport);;

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'awesomecinemalsecret' }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    var config = {
        db_url: ['mongodb:/', dbconfig.host, dbconfig.name].join('/'),
        schema_dir: __dirname + '/schema'
    };

    Backbone.sync = mongooseSync(config);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

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
    var user = new UserModel({ username: username });
    var users = new UserCollection;

    users.fetch({
        success: function(col) {
            var found = col.findWhere(user.toJSON());

            if (found) {
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

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', appController.indexPage);
app.get('/login', appController.loginPage);
app.post('/login', appController.login);
app.get('/savemodel', appController.savemodel);
app.get('/movies', ensureAuthenticated, appController.getMovies);
app.get('/movies/:id', ensureAuthenticated, appController.getMovie);
app.get('/movies/:id/delete', ensureAuthenticated, appController.deleteMovie);