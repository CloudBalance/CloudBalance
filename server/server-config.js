var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

var router = express.router();