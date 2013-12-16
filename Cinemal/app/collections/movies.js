﻿var Backbone = require('Backbone');
var Movie = require("../models/movie");

module.exports = Backbone.Collection.extend({
    model: Movie,
    mongooseModel: "Movie",
    
    initialize: function() {
        this.fetch({
            reset: true
        });
    }
});