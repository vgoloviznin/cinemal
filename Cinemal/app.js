var express             = require('express');
var http                = require('http');
var path                = require('path');
var Backbone            = require('Backbone');
var mongoose            = require('mongoose');
var passport            = require('./app/passportSetup');
var mongooseSync        = require('./backbone.mongoose');
var dbconfig            = require('./dbconnect.json');
var movieController     = require('./app/controllers/movie')();
var userController      = require('./app/controllers/user')(passport);
var app                 = express();

app.configure(function() {
    
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.set('mongooseConfig', {
        db_url: ['mongodb:/', dbconfig.host, dbconfig.name].join('/'),
        schema_dir: __dirname + '/schema'
    });

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'awesomecinemalsecret' }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    Backbone.sync = mongooseSync(app.get('mongooseConfig'));
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', userController.loginPage);
app.post('/login', userController.login);

app.get('/savemodel', movieController.savemodel);

app.get('/movies', passport.ensureAuthenticated, movieController.getMovies);
app.get('/movies/:id', passport.ensureAuthenticated, movieController.getMovie);
app.get('/movies/:id/delete', passport.ensureAuthenticated, movieController.deleteMovie);
