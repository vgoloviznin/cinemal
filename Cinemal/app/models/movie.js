var Backbone = require('Backbone');

var Movie = Backbone.Model.extend({
    mongooseModel: "Movie",
    idAttribute: '_id'
});

exports = module.exports = Movie;