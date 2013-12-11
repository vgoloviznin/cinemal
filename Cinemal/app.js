var express = require('express');
var http = require('http');
var path = require('path');
var bmongoose = require("./backbone.mongoose.js");

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get("/", function(req, resp) {
    resp.render("index");
});