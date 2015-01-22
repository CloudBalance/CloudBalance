var express = require('express');
var partials = require('express-partials');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client'));



module.exports = app;