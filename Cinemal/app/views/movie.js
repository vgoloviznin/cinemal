var 
    $               = require('jquery')
    , Backbone      = require('Backbone')
    , jade          = require("jade")
	;

Backbone.$ = $;

module.exports = Backbone.View.extend({

	template: jade.compile("div= name"),

	render: function() {
		this.el = this.template(this.model.toJSON());
		return this;
	}
});