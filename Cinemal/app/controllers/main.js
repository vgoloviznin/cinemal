module.exports = function (passport) {

	var MovieModel          = require('../models/movie');
	var MovieView           = require('../views/movie');
	var MovieListView       = require('../views/movieList');
	var MovieCollection     = require('../collections/movies');
	var UserModel           = require('../models/user');
	var UserCollection      = require('../collections/users');

	return {

		indexPage:  function(req, resp) {
			resp.render('index');
		},

		savemodel: function(req, res) {
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
		},

		getMovies: function(req, res) {
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
		},

		getMovie: function(req, res) {
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
		    
		},

		deleteMovie: function(req, res) {
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
		}
	}
}