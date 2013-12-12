var Backbone = require('Backbone');
var Movie = require("../models/movie");

var MovieLibrary = Backbone.Collection.extend({
    model: Movie,
    mongooseModel: "Movie",
    
    initialize: function() {
        this.fetch({
            reset: true
        });
    }
});

exports = module.exports = MovieLibrary;