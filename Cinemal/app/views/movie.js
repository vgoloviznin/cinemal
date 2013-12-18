var $               = require('jquery')
    , Backbone      = require('Backbone')
    , jade          = require('jade')
	;

Backbone.$ = $;

module.exports = Backbone.View.extend({
    template: './app/templates/movie.jade',

    render: function() {
        this.el = jade.renderFile(this.template, this.model.toJSON());
        return this;
    }
});