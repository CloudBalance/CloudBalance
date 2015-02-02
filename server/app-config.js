var express = require('express');
var authRouter = require('./auth/auth-router.js');
var apiRouter = require('./api/api-router.js');
var morgan = require('morgan');
var path = require('path');

var app = express();


app.use(morgan('combined'));

//router for handling authorization requests
app.use('/login', function(req, res) {
  res.redirect('/auth/drive');
});

app.use('/auth', authRouter);
app.use(express.static(path.join(__dirname + '/../dist')));

//router for handling api calls to our server
app.use('/api', apiRouter);

module.exports = app;
