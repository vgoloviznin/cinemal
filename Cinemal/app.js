var express     = require('express')
, http          = require('http')
, path          = require('path')
, Backbone      = require('Backbone')
, mongoose      = require('mongoose')
, passport      = require('./app/passportSetup')
, mongooseSync  = require('./backbone.mongoose')
, dbconfig      = require('./dbconnect.json')
, app           = express()
;

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
    app.use(app.router);
    app.use(express.session({ secret: 'awesomecinemalsecret' }));
    app.use(passport.initialize());
    app.use(passport.session());

    
    app.use('/user',   require('./app/routes/user')(passport).middleware);
    app.use('/movies', require('./app/routes/movie')(passport).middleware);

    app.use(function (req, res) {
        res.render('404');
    });
    
    Backbone.sync = mongooseSync(app.get('mongooseConfig'));
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req, res) {
    res.redirect('/movies');
});




