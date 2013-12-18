var Backbone = require('Backbone');

module.exports = Backbone.Model.extend({
    mongooseModel:  'Movie',
    idAttribute:    '_id'
});