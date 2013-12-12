var 
    $           = require('jquery')
    , Backbone  = require('Backbone')
    , jade      = require('jade')
    , MovieView = require('../views/movie')
	;

Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "div",
    
	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},

	render: function() {
		var movieView;
        var movies = this;
	    this.collection.each(function (m) {
			movieView = new MovieView({
			    model: m
			});

	        var view = movieView.render().el;
	        console.log(movies.$el);
            movies.$el.append(view);
		});
		
		return this;
	}
});