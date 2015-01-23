var express = require('express');
var authRouter = require('./auth/auth-router.js');
var apiRouter = require('./api/api-router.js');
var morgan = require('morgan');

// var handler = require('./lib/request-handler');
// var util = require('./lib/utility');

var app = express();

app.use(morgan('combined'));

//router for handling authorization requests
app.use('/auth', authRouter);

//router for handling api calls to our server
app.use('/api', apiRouter);

module.exports = app;
