var Backbone = require('Backbone');
var bcrypt = require("bcryptjs");
var SALT_WORK_FACTOR;

module.exports = Backbone.Model.extend({
    mongooseModel: "User",
    idAttribute: '_id',
    
    saveUser: function(options) {
        var model = this;
        bcrypt.genSalt(SALT_WORK_FACTOR = 5, function(saltErr, salt) {
            if (!saltErr) {
                var password = model.get('password');
                bcrypt.hash(password, salt, function(hashErr, hash) {
                    if (!hashErr) {
                        model.save({'password' : hash}, options);
                    }
                });
            }
            //ToDo add error handling
        });
    }
});