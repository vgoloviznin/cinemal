var mongoose = require('mongoose');

module.exports = mongoose.model('Movie',  new mongoose.Schema({
    name: String,
    genre: Array,
    date: Date, 
    time: Number, //in minutes
    country: Array,
    rating: String,
    url: String,
    
    budget: Number, // in $
    moneyReceived: Number, //in $
    
    stars: Array, // []
    director: Array,
    writer: Array,
    composer: Array,
    
    metaScore: Array // {}
}));

/*

{
    name: "Awesome movie",
    genre: ["Action", "Thriller"],
    date:  "October 13, 1975 11:13:00",
    time: 123, //in minutes
    country: ["Ukraine", "China"],
    rating: "PG-18",
    url: "http://awesomemovie.com",
    
    budget: 10000, 
    moneyReceived: 100000,
    
    stars: ["Seva Pushok", "Alyosha Online"],
    director: ["Rodion Bykov", "Zahar Zaharov"],
    writer: ["Vikroiya Pavlova"],
    composer: ["Stas"],
    
    metaScore: [{name: "imdb", value: 10.0}] // {}
}

*/