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

var MovieModel          = require('./app/models/movie');
var MovieView           = require('./app/views/movie');
var MovieListView       = require('./app/views/movieList');
var MovieCollection     = require('./app/collections/movies');

var UserModel           = require('./app/models/user');
var UserCollection      = require('./app/collections/users');

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
//ToDo ??

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



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req, resp) {
    resp.render('index');
});


app.get('/savemodel', function(req, res) {
    var movie = new MovieModel({
        name: 'Awesome movie' + Math.random().toFixed(2) * 100,
        genre: ['Action', 'Thriller'],
        date:  'October 13, 1975 11:13:00',
        time: 123, //in minutes
        country: ['Ukraine', 'China'],
        rating: 'PG-18',
        url: 'http://awesomemovie.com',
    
        budget: 10000, 
        moneyReceived: 100000,
    
        stars: ['Seva Pushok', 'Alyosha Online'],
        director: ['Rodion Bykov', 'Zahar Zaharov'],
        writer: ['Vikroiya Pavlova'],
        composer: ['Stas'],
    
        metaScore: [{name: 'imdb', value: 10.0}]
    });
    
    movie.save();

    res.send('');
});

app.get('/movies', ensureAuthenticated, function(req, res) {
    var movies
    , listView
    ;

    movies = new MovieCollection;
    
    listView = new MovieListView({
        collection: movies
    });

    movies.on('reset', function() {
        res.send(listView.render().el.innerHTML);
    });
});

app.get('/movies/:id', ensureAuthenticated, function(req, res) {
    var movie
    , movieView
    , id
    ;

    id = req.params.id;
    
    movie = new MovieModel({
        _id: id
    });

    movieView = new MovieView({
        model: movie
    });

    movie.on('sync', function() {
        res.send(movieView.render().el);
    });

    movie.fetch();
    
});

app.get('/movies/:id/delete', ensureAuthenticated, function(req, res) {
    var movie
    , id
    ;

    id = req.params.id;
    
    movie = new MovieModel({
        _id: id
    });
 
    movie.destroy({
        success: function(d) {
            res.redirect('/movies');
        }
    });
});

app.get('/user/create', function(req, res) {
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
});

//login
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.render('/login', { messages: [info.message] });
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
});