var 
    $           = require('jquery')
    , Backbone  = require('Backbone')
    , jade      = require('jade')
    , MovieView = require('../views/movie')
	;

Backbone.$ = $;

module.exports = Backbone.View.extend({
    
	render: function() {
		var movieView
        , moviesView = this
        ;

	    moviesView.collection.each(function (m) {
			
			movieView = new MovieView({
			    model: m
			});

            moviesView.$el.append(movieView.render().el);
		});
		
		return this;
	}
});