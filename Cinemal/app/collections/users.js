var Backbone    = require('Backbone')
, User          = require('../models/user')
;

module.exports = Backbone.Collection.extend({
    model:          User,
    mongooseModel:  "User"
    
    /*fetchByUsername: function(username, options) {
        var fetchSuccess = options.success || function(col) {
            if (col.length == 1) {
                Backbone.trigger('userModel:checkUser:found');
            } else {
                Backbone.trigger('userModel:checkUser:notFound');
            }
        };

        var fetchError = options.error || function(err) {
            console.log(err);
            Backbone.trigger('userModel:checkUser:error');
        };
        var collection = this;
        
        collection.fetch({
            data: {
                username: username
            },
            
            success: fetchSuccess,
            error: fetchError
        });
    }*/
});