var Backbone    = require('Backbone')
, bcrypt        = require('bcryptjs')
, SALT_WORK_FACTOR = 10
;

module.exports = Backbone.Model.extend({
    mongooseModel:  'User',
    idAttribute:    '_id',
    
    hashPassword: function() {
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
        , hashed = bcrypt.hashSync(this.get('password'), salt)
        ;
        this.set('password', hashed);
    }
});