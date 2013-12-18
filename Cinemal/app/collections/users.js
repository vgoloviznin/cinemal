var Backbone    = require('Backbone')
, User          = require('../models/user')
;

module.exports = Backbone.Collection.extend({
    model:          User,
    mongooseModel:  "User"
});