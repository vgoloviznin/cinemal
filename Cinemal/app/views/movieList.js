var $ = require('jquery');
var Backbone = require('Backbone');
var jade = require("jade");
Backbone.$ = $;

var MovieListView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, "reset", this.render);
    },
    render: function() {
        
        var fn = jade.compile("div= name");

        var a = fn(this.collection.at(0).toJSON());
        this.el = a;
        
        return this;
    }
});

exports = module.exports = MovieListView;