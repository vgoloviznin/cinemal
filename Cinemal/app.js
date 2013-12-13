var express             = require('express');
var http                = require('http');
var path                = require('path');

var Backbone            = require("Backbone");
var mongooseSync        = require("./backbone.mongoose");

var mongoose            = require("mongoose");
var dbconfig            = require("./dbconnect.json");

var MovieModel          = require("./app/models/movie");
var MovieView           = require("./app/views/movie");
var MovieListView       = require("./app/views/movieList");
var MovieCollection     = require("./app/collections/movies");

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));
    
    var config = {
        db_url: ['mongodb:/', dbconfig.host, dbconfig.name].join('/'),
        schema_dir: __dirname + "/schema"
    };
    Backbone.sync = mongooseSync(config);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get("/", function(req, resp) {
    resp.render("index");
});


app.get("/savemodel", function(req, res) {
    var movie = new MovieModel({
        name: "Awesome movie",
        genre: ["Action", "Thriller"],
        date:  "October 13, 1975 11:13:00",
        time: 123, //in minutes
        country: ["Ukraine", "China"],
        rating: "PG-18",
        url: "http://awesomemovie.com",
    
        budget: 10000, 
        moneyReceived: 100000,
    
        stars: ["Seva Pushok", "Alyosha Online"],
        director: ["Rodion Bykov", "Zahar Zaharov"],
        writer: ["Vikroiya Pavlova"],
        composer: ["Stas"],
    
        metaScore: [{name: "imdb", value: 10.0}]
    });
    
    movie.save();

    res.send('');
});

app.get("/movies", function(req, res) {
    var movies
    , listView
    ;

    movies = new MovieCollection;
    
    listView = new MovieListView({
        collection: movies
    });

    movies.on("reset", function() {
        res.send(listView.render().el.innerHTML);
    });
});

app.get("/movies/:id", function(req, res) {
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

    movie.on("sync", function() {
        res.send(movieView.render().el);
    });

    movie.fetch();
    
});

app.get("/movies/:id/delete", function(req, res) {
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