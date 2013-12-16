var Backbone = require('Backbone');
var User = require("../models/user");

module.exports = Backbone.Collection.extend({
    model: User,
    mongooseModel: "User",
    
    initialize: function() {
        this.fetch({
            reset: true
        });
    }
});