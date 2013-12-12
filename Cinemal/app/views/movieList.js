var 
    $           = require('jquery')
    , Backbone  = require('Backbone')
    , jade      = require('jade')
    , MovieView = require('../views/movie')
	;

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},

	render: function() {
		var movieView;

		this.collection.each(function (m) {
			console.log(m.attributes);
			// movieView = new MovieView({
			// 	model: m
			// });

			this.el += movieView.render().el;
		});
		
		return this;
	}
});