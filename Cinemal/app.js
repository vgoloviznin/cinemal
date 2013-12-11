var express = require('express');
var http = require('http');
var path = require('path');

var Backbone = require("Backbone");
var mongooseSync = require("./backbone.mongoose");

var mongoose = require("mongoose");
var dbconfig = require("./dbconnect.json");

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));
    
    var config = {
        db_url: ['mongodb:/', dbconfig.host, dbconfig.name].join('/'),
        schema_dir: __dirname + "/schema"
    };
    Backbone.sync = mongooseSync(config);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get("/", function(req, resp) {
    resp.render("index");
});