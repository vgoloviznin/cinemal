var Backbone    = require('Backbone')
, Movie         = require("../models/movie")
;

module.exports = Backbone.Collection.extend({
    model:          Movie,
    mongooseModel:  "Movie"
});