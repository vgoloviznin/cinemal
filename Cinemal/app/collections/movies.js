var Backbone = require('Backbone');
var Movie = require("../models/movie");

var MovieLibrary = Backbone.Collection.extend({
    model: Movie,
    mongooseModel: "Movie",
    
    initialize: function() {
        this.fetch({
            reset: true,
            success: function(col) {
                var a = 1;
            }});
    }
});

exports = module.exports = MovieLibrary;