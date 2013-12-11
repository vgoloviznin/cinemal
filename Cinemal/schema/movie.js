var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    name: String
});

exports = module.exports = mongoose.model('Movie', MovieSchema);