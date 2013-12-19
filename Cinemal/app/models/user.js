var Backbone    = require('Backbone')
, bcrypt        = require('bcryptjs')
, SALT_WORK_FACTOR
;

module.exports = Backbone.Model.extend({
    mongooseModel:  'User',
    idAttribute:    '_id',
    
    hashPassword: function(password) {
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
        , hashed = bcrypt.hashSync(password, salt)
        ;

        this.set('password', hashed);
    },
    
    comparePassword: function(candidatePassword, callback) {
        var password = this.get('password');

        bcrypt.compare(candidatePassword, password, function(err, isMatch) {
            if (err) {
                return callback(err);
            }
            return callback(null, isMatch);
        });
    }, 

    authorizeUser: function(username, password, done) {
        var model = this;
        
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                return done(err);
            }
            
            if (!user) {
                return done(null, false, { message: 'Unknown user ' + username });
            }

            model.comparePassword(password, function(compareError, isMatch) {
                if (compareError) {
                    return done(compareError);
                }
                
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }
});